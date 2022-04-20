const { Router } = require('express');
const Profile = require('../models/Profile');
const authenticate = require('../middleware/authenticate');
const Cohort = require('../models/Cohort');
const { getTeamData } = require('../utils/user');
// yearbook alumni list is generated from profile
// getAllProfiles
module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const profile = await Profile.getProfiles();
      const orgTeams = await getTeamData();
      const cohorts = await Cohort.createCohort({
        githubTeamId: orgTeams[0].id,
        name: orgTeams[0].name,
      });
      console.log('cohorts', cohorts);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  })
  // post profile
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
  .delete('/:id', async (req, res, next) => {
    try {
      const profile = await Profile.deleteProfile(req.params.id);

      res.send(profile);
    } catch (error) {
      next(error);
    }
  });
