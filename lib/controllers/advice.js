const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Advice = require('../models/Advice');

module.exports = Router()
  .post('/create', authenticate, async (req, res, next) => {
    try {
      const advice = await Advice.createAdvice(req.body);

      res.send(advice);
    } catch (error) {
      next(error);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const advice = await Advice.getAllAdvice();

      res.send(advice);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const advice = await Advice.getAdviceById(req.params.id);

      res.send(advice);
    } catch (error) {
      next(error);
    }
  });
