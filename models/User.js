const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const secretKey = require('../config/keys').JWT_SECRET;
const HOST = require('../config/keys').HOST;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    createIndexes: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  confirmationToken: {
    type: String,
    default: ''
  }
}, { timestamps: true });


UserSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

UserSchema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};

UserSchema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${HOST}/confirmation/${this.confirmationToken}`;
};

UserSchema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  return `${HOST}/reset_password/${this.generateResetPasswordToken()}`
}

UserSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    userId: this._id,
    email: this.email,
    confirmed: this.confirmed,
  }, secretKey)
};

UserSchema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id
    },
    secretKey,
    { expiresIn: "1h" }
  )
};


UserSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    userId: this._id,
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT()
  }
};

UserSchema.plugin(uniqueValidator, { message: 'This email is already taken' });

module.exports = mongoose.model('users', UserSchema);