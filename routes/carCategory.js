const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { validateCarCategoryAdd, validateCarCategoryEdit } = require('../middleware/validate');

const {
  addCarCategory,
  fetchCarCategories,
  editCarCategory,
  removeCarCategory,
} = require('../controllers/carCategory');

router
  .route('/addcarcategory/:userId')
  .patch(verifyToken, validateCarCategoryAdd, addCarCategory);

router
  .route('/fetchcarcategories/:userId')
  .get(verifyToken, fetchCarCategories);

router
  .route('/editcarcategory/:userId')
  .patch(verifyToken, validateCarCategoryEdit, editCarCategory);

router
  .route('/removecarcategory/:userId/:carCategory')
  .patch(verifyToken, removeCarCategory);

module.exports = router;
