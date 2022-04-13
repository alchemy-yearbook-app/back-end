const { Router } = require('express');
const Profile = require('../models/Profile');
const authenticate = require('../middleware/authenticate');
// yearbook alumni list is generated from profile
// getAllProfiles
module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const profile = await Profile.getProfiles();
    res.send(profile);
  } catch (error) {
    next(error);
  }
});
// getByCohort
// insert profile
// update profile
// get profile by ID
