const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

// GET Request
//User get their own record in organisation dey belong to
//PROTECTED
//Succesful 200
//unsuccesful 
router.get('/:id', userController.getUserRecords);


module.exports = router