const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const parseErrors = require('../../utils/parseErrors');
const sendConfirmationEmail = require('../../mailer/sendConfirmationEmail');
const sendResetPasswordEmail = require('../../mailer/sendResetPasswordEmail');

const secretKey = require('../../config/keys').JWT_SECRET;

// Load Model
const User = require('../../models/User');

// @route   POST api/auth/login
// @desc    Login user route
// @access  Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user && user.isValidPassword(password)) {
        res.json({
          user: user.toAuthJSON()
        });
      } else {
        res.status(400).json({ errors: { global: "Invalid credentials" } })
      }
    })
});

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email });
  user.setPassword(password);
  user.setConfirmationToken();
  user.save()
    .then(user => {
      sendConfirmationEmail(user);
      res.json({ user: user.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

// @route   POST api/auth/confirmation
// @desc    Confirmation user
// @access  Public
router.post('/confirmation', (req, res) => {
  User.findOneAndUpdate(
    { confirmationToken: req.body.token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  )
    .then(user => {
      user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
    })
});

// @route   POST api/auth/reset_password_request
// @desc    Reset User Password
// @access  Public
router.post('/reset_password_request', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        sendResetPasswordEmail(user);
        res.json({ success: true })
      } else {
        res.status(400).json({ errors: { global: "There is no user with such email" } });
      }
    })
});

// @route   POST api/auth/validate_token
// @desc    Validate Token
// @access  Public
router.post('/validate_token', (req, res) => {
  jwt.verify(req.body.token, secretKey, err => {
    if (err) {
      res.status(401).json({ error: true });
    } else {
      res.json({ success: true });
    }
  })
})

// @route   POST api/auth/reset_password
// @desc    Reset the Password
// @access  Public
router.post('/reset_password', (req, res) => {
  const { password, token } = req.body.data;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ errors: { global: "Invalid token" } });
    } else {
      User.findOne({ _id: decoded._id })
        .then(user => {
          if (user) {
            user.setPassword(password);
            user
              .save()
              .then(() => res.json({ success: true }))
          } else {
            res.status(404).json({ errors: { global: "Invalid token" } });
          }
        })
    }
  })
})



module.exports = router;