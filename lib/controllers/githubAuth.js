const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const Cohort = require('../models/Cohort');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
const { getTeamData } = require('../utils/user');
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
      const { username, githubUserId } = await getGithubProfile(token);
      // getTeams for user -> with token we got from exchangeCodeForToken
      const teamToken = `${process.env.YEARBOOK_ACCESS_TOKEN}`;

      // create Cohort according to information in orgTeams
      const orgTeams = await getTeamData();

      const simpleOrg = orgTeams.map((item) => ({
        githubTeamId: item.id,
        name: item.name,
      }));

      if (simpleOrg.length === 0) {
        for (const item of simpleOrg) {
          const i = simpleOrg.indexOf(item);
          await Cohort.createCohort({
            githubTeamId: simpleOrg[i].githubTeamId,
            name: simpleOrg[i].name,
          });
        }
      }
      // check current user's team and see what cohort it matches with
      // populate no_profile table with orgTeamMembers - login, avatar_url to auto generate

      let user = await GithubUser.findByUsername(username);
      // if not, create one
      if (!user)
        user = await GithubUser.createUser({
          username,
          githubUserId,
        });
      // add row to cohort_members table with user_id and cohort_id

      // use created user to generate jwt to save into cookie
      const payload = jwt.sign(
        { ...user, token, teamToken },
        process.env.JWT_SECRET,
        {
          expiresIn: '1 day',
        }
      );
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
            : `${process.env.NETLIFY}/yearbook`
        );
      // .redirect('/api/v1/profile');
    } catch (error) {
      next(error);
    }
  })
  .get('/me', authenticate, async (req, res, next) => {
    try {
      res.status(200).send(req.user);
    } catch (error) {
      next(error);
    }
  })
  // can log in only if you have gitHub and only if you have cohort
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
        secure: IS_DEPLOYED,
        sameSite: IS_DEPLOYED ? 'none' : 'strict',
      })
      .json({ success: true, message: 'Signed out successfully' });
  });
