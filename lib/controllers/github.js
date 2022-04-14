const { Router } = require('express');
const { exchangeTokenForProfile } = require('../utils/github');

module.exports = Router().get(
  '/alchemycodelab/teams/students/teams',
  async (req, res, next) => {
    try {
      const profile = await exchangeTokenForProfile();

      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
);
