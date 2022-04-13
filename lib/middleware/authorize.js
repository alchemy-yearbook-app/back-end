const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // get the value from the jwt -> server side cookie
    const { session } = req.cookies;
    // verify the jwt compares the signature
    const payload = jwt.verify(session, process.env.YEARBOOK_ACCESS_TOKEN);
    // payload = req.user
    req.user = payload;
    next();
  } catch (error) {
    // set error message
    error.message = 'Token is required';
    error.status = 401;
    next(error);
  }
};
