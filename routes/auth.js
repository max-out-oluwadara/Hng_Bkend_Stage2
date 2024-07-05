const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')


// Register a user
//Success full response 201
//unSuccesful response 400
router.post('/register',authController.registerUser);


// Login a user
//Success full response 200
//unSuccesful response 401
router.post('/login',authController.loginUsers);

module.exports = router;