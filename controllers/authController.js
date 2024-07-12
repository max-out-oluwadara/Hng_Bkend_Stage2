const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Organisation = require ('../models/Organisation')
const sequelize = require('../src/database');

require('dotenv').config();

//Controller to Register and create Organisation by default for user
//Organation take users firstname
exports.registerUser = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { firstName, lastName, email, password, phone } = req.body;

        // Generate a unique userId
        const userId = uuidv4();

        // Add userId to the request body
        const userData = 
            {
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
            await t.rollback();
            return res.status(422).json({
                msg: 'Email already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(password, salt);

        // Create the user with the updated data
        const user = await User.create(userData, { transaction: t });

        // Create a default organisation for the user
        const organisation = await Organisation.create({
            orgId: uuidv4(),
            name: `${firstName}'s organisation`,
            description: 'Welcome to our organisation',
            userId: user.userId
        }, { transaction: t });

        await t.commit();

        // Generate jwt token
        const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            status: "success",
            message: "Registration successful",
            accessToken,
            user: 
                {
                    "userId": userId,
                    "firstName": firstName,
                    "lastName":lastName,
                    "email": email,
                    "password": password,
                    "phone": phone
                }
        });
    } catch (err) {
        await t.rollback();
        console.error('Error registering user and creating organisation', err);
        res.status(400).json({
            status: "Bad request",
            message: "Registration unsuccessful",
            statusCode: 400
        });
    }
};


//Controller to login Registered User using email and password
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
        const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                accessToken: accessToken
            },
            user,
        });
    } catch (err) {
        console.error('Error logging in User', err);
        res.status(401).json({
            status: "Bad request",
            message: "Authentication failed",
            statusCode: 401
        });
    }
};