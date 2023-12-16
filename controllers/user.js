const User = require('../models/user');
const Car = require('../models/car');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

let transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

//@desc      SignUp user
//@route     Post /user/signupuser
//@access    Public

exports.signUpUser = (req, res) => {
  const { name, email } = req.body;

  const password = generator.generate({
    length: 10,
    numbers: true,
  });

  const newUser = new User({ name: name.toLowerCase(), email, password });

  newUser
    .save()
    .then((newUser) => {
      transporter.sendMail(
        {
          from: process.env.SMTP_MAIL,
          to: req.body.email,
          subject: 'Welcome to Ropstam Cars',
          text: `Hi ${req.body.name},\nThank you for registering at Ropstam Cars. You can find your credentials below:\nEmail: ${req.body.email}\nPassword: ${password}`,
        },
        (error, info) => {
          if (error) {
            return res.json({
              status: 'FAILURE',
              message: 'There is some error while processing your request',
              error: error.message,
            });
          } else {
            return res.json({
              status: 'SUCCESS',
              message: 'Signed up successfully',
            });
          }
        }
      );
    })
    .catch((error) => {
      return res.json({
        status: 'FAILURE',
        message: 'There is some error while processing your request',
        error: error.message,
      });
    });
};

//@desc      SignIn user
//@route     Post /user/signinuser
//@access    Public

exports.signInUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({
          status: 'FAILURE',
          message: 'User with this email does not exist',
        });
      } else if (user.password !== password) {
        return res.json({
          status: 'FAILURE',
          message: 'Incorrect password',
        });
      } else {
        jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '24h',
          },
          (error, token) => {
            if (error) {
              console.log(error);
              return res.json({
                status: 'FAILURE',
                message: 'There is some error while processing your request',
                error: error.message,
              });
            } else {
              return res.json({
                status: 'SUCCESS',
                message: 'Signed in successfully',
                user: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  token: token,
                },
              });
            }
          }
        );
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

//@desc    Fetch dashboard details
//@route   Get /user/fetchdashboarddetails/:userId
//@access  Private

exports.fetchDashboardDetails = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.json({
          status: 'FAILURE',
          message: 'User with this id does not exist',
        });
      } else {
        Car.aggregate([
          {
            $sortByCount: '$category',
          },
        ])
          .then((systemTotalCarsByCategory) => {
            Car.aggregate([
              { $match: { sellerId: req.params.userId } },
              {
                $sortByCount: '$category',
              },
            ])
              .then((myTotalCarsByCategory) => {
                return res.json({
                  status: 'SUCCESS',
                  message: 'Successful request',
                  systemTotalCarsByCategory,
                  myTotalCarsByCategory
                });
              })
              .catch((error) => {
                return res.json({
                  status: 'FAILURE',
                  message: 'There is some error while processing your request',
                  error: error.message,
                });
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
