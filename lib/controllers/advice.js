const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Advice = require('../models/Advice');

module.exports = Router().post(
  '/create',
  authenticate,
  async (req, res, next) => {
    try {
      const advice = await Advice.createAdvice(req.body);

      res.send(advice);
    } catch (error) {
      next(error);
    }
  }
);
