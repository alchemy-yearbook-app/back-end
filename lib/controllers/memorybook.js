const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Memorybook = require('../models/Memorybook');

// getAllMemories
// create memory
// getMemory by Id
// update memory
// delete memory
module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const item = await Memorybook.insert({
        ...req.body,
      });
      res.send(item);
    } catch (error) {
      next(error);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const memories = await Memorybook.getAllMems();
      res.send(memories);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const memory = await Memorybook.getMemoryById(req.params.id);
      res.send(memory);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const memory = await Memorybook.deleteMemory(req.params.id);
      res.send(memory);
    } catch (error) {
      next(error);
    }
  });
