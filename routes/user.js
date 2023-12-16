const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const {
  validateUserSignUp,
  validateUserSignIn,
} = require('../middleware/validate');

const {
  signUpUser,
  signInUser,
  fetchDashboardDetails,
} = require('../controllers/user');

router.route('/signupuser').post(validateUserSignUp, signUpUser);

router.route('/signinuser').post(validateUserSignIn, signInUser);

router
  .route('/fetchdashboarddetails/:userId')
  .get(verifyToken, fetchDashboardDetails);

module.exports = router;
