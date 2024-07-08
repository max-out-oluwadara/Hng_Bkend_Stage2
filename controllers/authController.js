const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;

        // Generate a unique userId
        const userId = uuidv4();

        // Add userId to the request body
        const userData = {
            userId,
            firstName,
            lastName,
            email,
            password,
            phone
        };

        // Check if email already exists
        let checkEmail = await User.findOne({ where: { email } });

        if (checkEmail) {
            return res.status(400).json({
                msg: 'Email already exists'
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(password, salt);

            // Create the user with the updated data
            const user = await User.create(userData);

            //Generate jwt token 
            const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({
                "status": "success",
                "message": "Registrationn successful",
                "data":{
                    "accessToken": accessToken
                },
                user,
            });
        }
    } catch (err) {
        console.error('Error creating User', err);
        res.status(400).json({ 
            "status" : "Bad request",
            "message" : "Registration unsuccesfull",
            "statusCodr": 400

        });
    }
};

exports.loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                msg: 'Invalid email or password'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                msg: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' },);

        res.status(200).json({
            "status": "success",
            "message": "Login successful",
            "data": {
                "accessToken": accessToken
            },
            user,
        });
    } catch (err) {
        console.error('Error logging in User', err);
        res.status(401).json({ 
            "status": "Bad request",
            "message": "Authentication failed",
            "statusCode": 401
        });
    }
};
