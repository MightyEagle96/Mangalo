const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/register', authController.createAccount);
router.post('/login', authController.login);
// router.post('/:verifyToken', authController.verifyToken);
module.exports = router;
