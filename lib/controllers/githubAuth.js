const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
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
      const { email } = await getGithubProfile(token);

      // if user, get it
      let user = await GithubUser.findByEmail(email);
      // if not, create one
      if (!user)
        user = await GithubUser.createUser({
          email,
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
        .redirect('/api/v1/profile');
    } catch (error) {
      next(error);
    }
  });
