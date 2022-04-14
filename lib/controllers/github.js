const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
// const GithubUser = require('../models/GithubUser');
const { exchangeTokenForProfile } = require('../utils/github');

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
