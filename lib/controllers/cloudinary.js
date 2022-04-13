const { Router } = require('express');
const Cloudinary = require('../models/Cloudinary');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const item = await Cloudinary.insert({
      ...req.body,
    });
    res.send(item);
  } catch (error) {
    next(error);
  }
});
