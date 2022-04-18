const { Router } = require('express');
const { getTeamData } = require('../utils/user');

module.exports = Router().get(
  '/alchemycodelab/teams/students/teams',
  async (req, res, next) => {
    try {
      const profile = await getTeamData();
      console.log('profile', profile);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
);
