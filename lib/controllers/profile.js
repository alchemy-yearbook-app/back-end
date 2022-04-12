const { Router } = require('express');
const Profile = require('../models/Profile');
// yearbook alumni list is generated from profile
module.exports = Router().get('/', async (req, res, next) => {
  try {
    const profile = await Profile.getProfiles();
    res.send(profile);
  } catch (error) {
    next(error);
  }
});
