const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { validateCarAdd, validateCarEdit } = require('../middleware/validate');

const {
  addCar,
  fetchCarsByUser,
  editCar,
  removeCar,
} = require('../controllers/car');

router
  .route('/addcar')
  .post(verifyToken, validateCarAdd, addCar);

router.route('/fetchcarsbyuser/:userId').get(verifyToken, fetchCarsByUser);

router.route('/editcar/:carId').patch(verifyToken, validateCarEdit, editCar);

router.route('/removecar/:carId').delete(verifyToken, removeCar);

module.exports = router;
