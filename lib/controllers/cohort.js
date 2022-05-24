const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Cohort = require('../models/Cohort');
const GithubUser = require('../models/GithubUser');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const userData = await GithubUser.getUser(req.user.uuid);
    res.send(userData);
  } catch (error) {
    next(error);
  }
});
// .get('/teams', authenticate, async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// });

// 1. match what cohort you are in
// 2. return cohort members of that cohort