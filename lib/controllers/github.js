const { Router } = require('express');
const { getTeamData } = require('../utils/github');

module.exports = Router().get(
  '/alchemycodelab/teams/students/teams',
  async (req, res, next) => {
    try {
      const profile = await getTeamData();
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
);
