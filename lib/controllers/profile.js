const { Router } = require('express');
const Profile = require('../models/Profile');
const authenticate = require('../middleware/authenticate');
const NoProfile = require('../models/NoProfile');
const { getOrgMembers, getSeptember } = require('../utils/user');
const YourCohort = require('../models/YourCohort');
const authorize = require('../middleware/authorize');
const GithubUser = require('../models/GithubUser');
const CohortMember = require('../models/CohortMember');
// yearbook alumni list is generated from profile
// getAllProfiles
module.exports = Router()
  .get('/', authenticate, authorize, async (req, res, next) => {
    try {
      const profile = await Profile.getProfiles();
      res.send(profile);
    } catch (error) {
      next(error);
    }
  })
  .get('/us', authenticate, async (req, res, next) => {
    try {
      const user = await CohortMember.getCohortMemberId(req.user.uuid);
      console.log('req.user.uuid', req.user.uuid);
      const us = await getSeptember(user.cohortId);
      console.log('us', us);
      const simpleUs = us.map((item) => ({
        login: item.login,
        avatar_url: item.avatar_url,
        githubUserId: item.id,
      }));

      const yourCohort = await YourCohort.getYourCohort();

      if (yourCohort.length === 0) {
        for (const item of simpleUs) {
          const i = simpleUs.indexOf(item);
          await YourCohort.createYourCohort({
            login: simpleUs[i].login,
            avatar_url: simpleUs[i].avatar_url,
            githubUserId: simpleUs[i].githubUserId,
          });
        }
      }
      res.send(yourCohort);
    } catch (error) {
      next(error);
    }
  })
  .get('/others', async (req, res, next) => {
    try {
      const orgMembers = await getOrgMembers();
      const simpleOrgMembers = orgMembers.map((item) => ({
        login: item.login,
        avatar_url: item.avatar_url,
        githubUserId: item.id,
      }));

      const noProfile = await NoProfile.getNonProfiles();

      if (noProfile.length === 0) {
        for (const item of simpleOrgMembers) {
          const i = simpleOrgMembers.indexOf(item);
          await NoProfile.createNoProfile({
            login: simpleOrgMembers[i].login,
            avatar_url: simpleOrgMembers[i].avatar_url,
            githubUserId: simpleOrgMembers[i].githubUserId,
          });
        }
      }
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
