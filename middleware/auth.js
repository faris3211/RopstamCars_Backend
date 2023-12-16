const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: '../config/.env' });

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token)
    return res.json({
      status: 'FAILURE',
      message: 'Authentication token is missing',
    });

  jwt.verify(token, process.env.JWT_SECRET_KEY, function (error, decoded) {
    if (error) {
      return res.json({
        status: 'FAILURE',
        message: 'Authentication token is invalid',
        error: error.message,
      });
    }

    // if everything good, save to request for use in other routes

    next();
  });
};

module.exports = verifyToken;
