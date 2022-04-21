const { Router } = require('express');
const authenticate = require('../middleware/authenticate');

module.exports = Router().post(
  '/create',
  authenticate,
  async (req, res, next) => {
    try {
      res.send({
        id: expect.any(String),
        title: 'Advice title',
        advice: 'Advice body',
        alumniName: 'Alumni name',
        cohort: 'Alumin Cohort',
      });
    } catch (error) {
      next(error);
    }
  }
);
