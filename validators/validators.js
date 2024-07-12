const { check, validationResult } = require('express-validator');

// Function for Registration validation
const registerValidation = 
    [
        check('firstName')
            .trim()
            .matches(/^(?=.*[A-Za-z])[A-Za-z\s-]+$/)
            .withMessage(`First name should only contain alphabet and '-'`)
            .isLength({ max: 50 })
            .withMessage('First name should not exceed 50 characters'),
        check('lastName')
            .trim()
            .matches(/^(?=.*[A-Za-z])[A-Za-z\s-]+$/)
            .withMessage(`Last name should only contain alphabet and '-'`)
            .isLength({ max: 50 })
            .withMessage('last name should not exceed 50 characters'),
        check('email')
            .isEmail()
            .withMessage('Please provide a valid email'),
        check('phone')
            .trim(), // removes leading and trailing spaces
        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({min:6})
            .withMessage('password must be at least 6 character long')
    ];


// Function for Login validation
const loginValidation = 
    [
        check('email')
            .trim()
            .notEmpty()
            .withMessage('Email cannot is required')
            .isEmail()
            .withMessage('Please provide a valid email'),
        check('password')
            .notEmpty()
            .withMessage('Password is required')
    ];


// Function to Log our Error through Json
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).json({
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }
    next()
}

module.exports = 
    { 
        registerValidation, 
        loginValidation, validate 
    }