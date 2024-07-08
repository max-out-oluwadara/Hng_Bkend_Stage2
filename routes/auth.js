const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { registerUser, loginUsers } = authController;

const { registerValidation, loginValidation, validate } = require('../validators/validators');

// @route POST /auth/register
// @desc Register a user and create a default organisation
// @public
router.post('/register', registerValidation, validate, registerUser);

// @route POST /auth/login
// @desc Login a user. You can select an organisation to interact with
// @public
router.post('/login', loginValidation, validate, loginUsers);

module.exports = router;
