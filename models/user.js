const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcrypt');
const slugify = require('slugify');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'User must have a name'], trim: true },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: [true, 'Email address already exists'],
  },
  photo: { type: String, default: 'default.jpg' },
  role: { type: String, enum: ['user', 'editor', 'admin'], default: 'user' },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    maxlength: [8, 'Password must be 8 characters long'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // eslint-disable-next-line func-names
      validator(el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});
userSchema.pre('save', async function (next) {
  this.confirmPassword = undefined;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
