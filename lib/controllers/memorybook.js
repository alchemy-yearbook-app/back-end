const { Router } = require('express');
const Memorybook = require('../models/Memorybook');

// getAllMemories
// create memory
// getMemory by Id
// update memory
// delete memory
module.exports = Router()
  .get('/', async (req, res, next) => {
    const item = {};
    res.send(item);
  })
  .post('/', async (req, res, next) => {
    try {
      const item = await Memorybook.insert({
        ...req.body,
      });
      res.send(item);
    } catch (error) {
      next(error);
    }
  });
