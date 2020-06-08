const { body } = require('express-validator');
const User = require('../models/users');

exports.registerValidators = [
    body('email', 'Enter a valid email')
        .isEmail()
        .custom(async (value) => {
            try {
                const user = User.findAll({
                    where: {
                        email: value
                    }
                })
                
                if (user.length) {
                    return Promise.reject("This user already exists")
                }
            } catch (e) {
                console.log(e);
            }
        })
        .normalizeEmail(),
    body('password', 'Password must be 8 characters')
        .isLength({ min: 8, max: 56 })
        .isAlphanumeric()
        .trim(),
    body('repeatPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords must match')
            }
            return true;
        })
        .trim(),
    body('username', 'Name must be at least 3 characters')
        .isLength({ min: 3 })
        .trim()
];

exports.loginValidators = [
    body('email', 'Something went wrong')
        .isEmail()
        .normalizeEmail(),
    body('password', 'Something went wrong')
        .isLength({min: 8, max: 56})
        .trim()
]