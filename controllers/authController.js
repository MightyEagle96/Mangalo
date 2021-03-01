/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// sign the token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// send the token
const sendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  user.password = undefined;
  return res.status(statusCode).json({ status: 'success', token, user });
};

exports.createAccount = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create(req.body);
    sendToken(user, 201, req, res);
  } catch (error) {
    console.log(error);
    res.redirect('/register');
  }
  res.send('registered');
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!(await bcrypt.compare(req.body.password, user.password)))
      return res.redirect('/login');

    sendToken(user, 200, req, res);
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.authenticateToken = async (req, res, next) => {
  const jwtToken = req.headers.cookie.split(' ')[1];

  const token = jwtToken.split('=')[1];

  if (!token) return res.sendStatus(401);

  // verify the token
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    req.user = await User.findById(user.id);
    console.log(req.user);
    next();
  });
};
