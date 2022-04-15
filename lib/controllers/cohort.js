const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { getUserData, getUserTeam } = require('../utils/user');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const userData = await getUserData();
      res.send(userData);
    } catch (error) {
      next(error);
    }
  })
  // ADD AUTHORIZE TO ROUTE
  .get('/teams', authenticate, async (req, res, next) => {
    try {
      const userTeam = await getUserTeam();
      res.send(userTeam);
    } catch (error) {
      next(error);
    }
  });
