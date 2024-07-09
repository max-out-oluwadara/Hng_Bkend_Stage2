const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const auth = require('../middleware/auth')


const {getUserDetails} = userController;


//@route Get /api/users/:id
//@desc a user get their own record or user record
//in organisations the belong or created
//@Protected
router.get('/:id', auth, getUserDetails)


module.exports = router