const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { getUserData } = require('../utils/user');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const userData = await getUserData();
    res.send(userData);
  } catch (error) {
    next(error);
  }
});
// ADD AUTHORIZE TO ROUTE
