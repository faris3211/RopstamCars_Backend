const User = require('../models/user');
const Car = require('../models/car');

//@desc    Add car category
//@route   Patch /carcategory/addcarcategory/:userId
//@access  Private

exports.addCarCategory = (req, res) => {
  const { carCategory } = req.body;

  User.findByIdAndUpdate(
    req.params.userId,
    {
      $addToSet: {
        carCategories: carCategory.toLowerCase(),
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.json({
          status: 'FAILURE',
          message: 'User with this id does not exist',
        });
      } else {
        return res.json({
          status: 'SUCCESS',
          message: 'Successfully added',
          carCategories: updatedUser.carCategories,
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

//@desc    Fetch car categories
//@route   Get /carcategory/fetchcarcategories/:userId
//@access  Private

exports.fetchCarCategories = (req, res) => {
  User.findById(req.params.userId)
    .select({
      _id: 0,
      carCategories: 1,
    })
    .then((user) => {
      if (!user) {
        return res.json({
          status: 'FAILURE',
          message: 'User with this id does not exist',
        });
      } else {
        return res.json({
          status: 'SUCCESS',
          message: 'Successful request',
          carCategories: user.carCategories,
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

//@desc    Edit car category
//@route   Patch /carcategory/editcarcategory/:userId
//@access  Private

exports.editCarCategory = (req, res) => {
  const { oldNameOfCarCategory, newNameOfCarCategory } = req.body;

  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.json({
          status: 'FAILURE',
          message: 'User with this id does not exist',
        });
      } else {
        User.findOneAndUpdate(
          {
            _id: req.params.userId,
            carCategories: oldNameOfCarCategory.toLowerCase(),
          },
          {
            $set: {
              'carCategories.$': newNameOfCarCategory.toLowerCase(),
            },
          },
          { new: true }
        )
          .then((updatedUser) => {
            if (!updatedUser) {
              return res.json({
                status: 'FAILURE',
                message: 'Car category to update does not exist',
              });
            } else {
              Car.updateMany(
                {
                  sellerId: req.params.userId,
                  category: oldNameOfCarCategory.toLowerCase(),
                },
                {
                  $set: {
                    category: newNameOfCarCategory.toLowerCase(),
                  },
                }
              )
                .then((updateCount) => {
                  return res.json({
                    status: 'SUCCESS',
                    message: 'Successfully edited',
                    carCategories: updatedUser.carCategories,
                  });
                })
                .catch((error) => {
                  return res.json({
                    status: 'FAILURE',
                    message:
                      'There is some error while processing your request',
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

//@desc    Remove car category
//@route   Patch /carcategory/removecarcategory/:userId/:carCategory
//@access  Private

exports.removeCarCategory = (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    {
      $pull: {
        carCategories: req.params.carCategory.toLowerCase(),
      },
    },
    {
      new: true,
    }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.json({
          status: 'FAILURE',
          message: 'User with this id does not exist',
        });
      } else {
        Car.deleteMany({
          sellerId: req.params.userId,
          category: req.params.carCategory.toLowerCase(),
        })
          .then((deleteCount) => {
            return res.json({
              status: 'SUCCESS',
              message: 'Successfully removed',
              carCategories: updatedUser.carCategories,
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
