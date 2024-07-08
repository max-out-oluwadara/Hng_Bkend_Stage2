const { check, validationResult } = require('express-validator');

const registerValidation = [
    check('firstName')
        .notEmpty()
        .withMessage('First name is required'),
    check('lastName')
        .notEmpty()
        .withMessage('Last name is required'),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('phone')
        .notEmpty()
        .withMessage('Please provide phone number'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min:6})
        .withMessage('password must be at least 6 character long')
];

const loginValidation = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min:6})
        .withMessage('Invalid Password')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }
    next()
}

module.exports = { registerValidation, loginValidation, validate }