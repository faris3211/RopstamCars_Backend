const User = require('../models/user');
const Car = require('../models/car');

//@desc    Add car
//@route   Post /car/addcar
//@access  Private

exports.addCar = (req, res) => {
  const {
    sellerId,
    category,
    make,
    model,
    variant,
    color,
    registrationNumber,
  } = req.body;

  User.findById(sellerId)
    .then((seller) => {
      if (!seller) {
        return res.json({
          status: 'FAILURE',
          message: 'Seller with this id does not exist',
        });
      } else {
        if (seller.carCategories.includes(category.toLowerCase())) {
          const newCar = new Car({
            sellerId,
            category: category.toLowerCase(),
            make: make.toLowerCase(),
            model: model.toLowerCase(),
            variant: variant.toLowerCase(),
            color: color.toLowerCase(),
            registrationNumber,
          });

          newCar
            .save()
            .then((newCar) => {
              return res.json({
                status: 'SUCCESS',
                message: 'Successfully added',
                car: newCar,
              });
            })
            .catch((error) => {
              return res.json({
                status: 'FAILURE',
                message: 'There is some error while processing your request',
                error: error.message,
              });
            });
        } else {
          return res.json({
            status: 'FAILURE',
            message: 'Provided car category is not available',
          });
        }
      }
    })
    .catch((error) => {
      return res.json({
        status: 'FAILURE',
        message: 'There is some error while processing your request',
        error: error.message,
      });
    });
};

//@desc    Fetch cars by user
//@route   Get /car/fetchcarsbyuser/:userId
//@access  Private

exports.fetchCarsByUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.json({
          status: 'FAILURE',
          message: 'User with this id does not exist',
        });
      } else {
        Car.find({ sellerId: req.params.userId })
          .then((cars) => {
            return res.json({
              status: 'SUCCESS',
              message: 'Successful request',
              cars,
            });
          })
          .catch((error) => {
            return res.json({
              status: 'FAILURE',
              message: 'There is some error while processing your request',
              error: error.message,
            });
          });
      }
    })
    .catch((error) => {
      return res.json({
        status: 'FAILURE',
        message: 'There is some error while processing your request',
        error: error.message,
      });
    });
};

//@desc    Edit car
//@route   Patch /car/editcar/:carId
//@access  Private

exports.editCar = (req, res) => {
  const { make, model, variant, color, registrationNumber } = req.body;

  Car.findByIdAndUpdate(
    req.params.carId,
    {
      make: make.toLowerCase(),
      model: model.toLowerCase(),
      variant: variant.toLowerCase(),
      color: color.toLowerCase(),
      registrationNumber,
    },
    { new: true }
  )
    .then((updatedCar) => {
      if (!updatedCar) {
        return res.json({
          status: 'FAILURE',
          message: 'Car with this id does not exist',
        });
      } else {
        return res.json({
          status: 'SUCCESS',
          message: 'Successfully edited',
          car: updatedCar,
        });
      }
    })
    .catch((error) => {
      return res.json({
        status: 'FAILURE',
        message: 'There is some error while processing your request',
        error: error.message,
      });
    });
};

//@desc    Remove car
//@route   Delete /car/removecar/:carId
//@access  Private

exports.removeCar = (req, res) => {
  Car.findByIdAndDelete(req.params.carId)
    .then((deletedCar) => {
      if (!deletedCar) {
        return res.json({
          status: 'FAILURE',
          message: 'Car with this id does not exist',
        });
      } else {
        return res.json({
          status: 'SUCCESS',
          message: 'Successfully removed',
          car: deletedCar,
        });
      }
    })
    .catch((error) => {
      return res.json({
        status: 'FAILURE',
        message: 'There is some error while processing your request',
        error: error.message,
      });
    });
};
