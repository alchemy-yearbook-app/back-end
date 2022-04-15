const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Cohort = require('../models/Cohort');
const { getUserData, getUserTeam } = require('../utils/user');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const userData = await getUserData();
      console.log('userData', userData);
      res.send(userData);
    } catch (error) {
      next(error);
    }
  })
  // ADD AUTHORIZE TO ROUTE
  .get('/teams', authenticate, async (req, res, next) => {
    try {
      const userTeam = await getUserTeam();
      const cohortId = userTeam[0].id;
      let existingCohort = await Cohort.findCohortById(cohortId);

      if (!existingCohort) {
        existingCohort = await Cohort.createCohort({
          githubTeamId: cohortId,
          name: 'september-2021',
        });
      }
      res.send(existingCohort);
    } catch (error) {
      next(error);
    }
  });
