const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const GithubUser = require('../models/GithubUser');
const {
  exchangeCodeForToken,
  getGithubProfile,
  exchangeTokenForProfile,
} = require('../utils/github');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router().get(
  '/alchemycodelab/teams',
  async (req, res, next) => {
    try {
      const profile = await exchangeTokenForProfile();

      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
);
