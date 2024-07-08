const { check, validationResult } = require('express-validator');

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
                field: error.param,
                message: error.msg
            }))
        });
    }
    next()
}

module.exports = { loginValidation, validate}