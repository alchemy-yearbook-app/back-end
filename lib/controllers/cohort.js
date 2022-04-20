const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Cohort = require('../models/Cohort');
const GithubUser = require('../models/GithubUser');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const userData = await GithubUser.getUser();
    res.send(userData);
  } catch (error) {
    next(error);
  }
});
// ADD AUTHORIZE TO ROUTE
