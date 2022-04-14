const { Router } = require('express');
const Profile = require('../models/Profile');
const authenticate = require('../middleware/authenticate');
// yearbook alumni list is generated from profile
// getAllProfiles
module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const profile = await Profile.getProfiles();
      res.send(profile);
    } catch (error) {
      next(error);
    }
  })

  // post profile
  .post('/', authenticate, async (req, res, next) => {
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
      res.send({
        id: '1',
        avatar: 'Airbender',
        firstName: 'David Ortiz',
        lastName: 'Dh',
        linkedIn: 'yeetin',
        github: 'gitin',
        quote: 'I like it when they call me big papi',
        company: 'Red Sox',
      });
    } catch (error) {
      next(error);
    }
  });
