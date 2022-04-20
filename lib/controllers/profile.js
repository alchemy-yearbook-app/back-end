const { Router } = require('express');
const Profile = require('../models/Profile');
const authenticate = require('../middleware/authenticate');
const NoProfile = require('../models/NoProfile');
// yearbook alumni list is generated from profile
// getAllProfiles
module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const profile = await Profile.getProfiles();
      res.send(profile);
    } catch (error) {
      next(error);
    }
  })
  .get('/others', async (req, res, next) => {
    try {
      const noProfile = await NoProfile.getNonProfiles();
      res.send(noProfile);
    } catch (error) {
      next(error);
    }
  })
  // post profile (add authenticate later)
  .post('/create', authenticate, async (req, res, next) => {
    try {
      const profile = await Profile.createProfile(req.body);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  })

  // getProfileById
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const profile = await Profile.getProfileById(req.params.id);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  })

  //update profile
  .patch('/:id', authenticate, async (req, res, next) => {
    try {
      const profile = await Profile.updateProfile(req.params.id, req.body);

      res.send(profile);
    } catch (error) {
      next(error);
    }
  })

  //delete profile
  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const profile = await Profile.deleteProfile(req.params.id);

      res.send(profile);
    } catch (error) {
      next(error);
    }
  });
