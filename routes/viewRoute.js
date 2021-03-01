const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', authController.authenticateToken, (req, res) => {
  if (req.user == null) return res.redirect('/login');
  res.render('home.pug');
});

router.get('/login', (req, res) => {
  res.render('login.pug');
});
router.get('/register', (req, res) => {
  res.render('register.pug');
});
module.exports = router;
