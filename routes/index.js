const express = require('express');
const routes = express.Router();

//routes
const userRouter = require('./user');
const carCategoryRouter = require('./carCategory');
const carRouter = require('./car');

//route middleware
routes.use('/user', userRouter);
routes.use('/carcategory', carCategoryRouter);
routes.use('/car', carRouter);

module.exports = routes;
