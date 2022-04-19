const { Router } = require('express');
const jwt = require('jsonwebtoken');
const Cohort = require('../models/Cohort');
const { findCohortByName, createCohort } = require('../models/Cohort');
// const authenticate = require('../middleware/authenticate');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
const { getUserTeam } = require('../utils/user');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const IS_DEPLOYED = process.env.NODE_ENV === 'production';

module.exports = Router()
  .get('/login', async (req, res, next) => {
    try {
      res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
      );
    } catch (error) {
      next(error);
    }
  })

  .get('/login/callback', async (req, res, next) => {
    try {
      // get code
      const { code } = req.query;

      // exchange code for access token
      const token = await exchangeCodeForToken(code);

      // use token to get user data from github
      const { username } = await getGithubProfile(token);
      // getTeams for user -> with token we got from exchangeCodeForToken
      const teamToken = `${process.env.YEARBOOK_ACCESS_TOKEN}`;

      // findCohortByName
      // Find cohort in database that matches team name
      const userTeam = await getUserTeam(teamToken);
      console.log('userTeam', userTeam);
      const cohortId = userTeam[0].id;
      let cohort = await findCohortByName(userTeam[0].name);

      console.log('cohortId', cohortId);

      if (!cohort) {
        cohort = await Cohort.createCohort({
          githubTeamId: cohortId,
          name: cohort,
        });
      }
      console.log('cohort', cohort);
      // if exists, add user to cohort in database
      // add row to cohort_members table with user_id and cohort_id

      let user = await GithubUser.findByUsername(username);
      // if not, create one
      if (!user)
        user = await GithubUser.createUser({
          username,
        });
      // use created user to generate jwt to save into cookie
      const payload = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      // set cookie and redirect
      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
          secure: IS_DEPLOYED,
          sameSite: IS_DEPLOYED ? 'none' : 'strict',
        })
        // redirect to main yearbook page after user is created/signed in
        // redirect to frontend localhost 7891
        .redirect(
          process.env.NODE_ENV === 'test'
            ? '/api/v1/profile'
            : 'http://localhost:7891/yearbook'
        );
      // .redirect('/api/v1/profile');
    } catch (error) {
      next(error);
    }
  });
// can log in only if you have gitHub and only if you have cohort
