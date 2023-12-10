"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidate = exports.SignUpValidate = void 0;
const express_validator_1 = require("express-validator");
const Accounts_1 = require("../../model/Accounts");
exports.SignUpValidate = [
    (0, express_validator_1.body)('fullname')
        .trim()
        .notEmpty().withMessage('Full Name is required')
        .isLength({ min: 7 }).withMessage('Full Name must be atleast 7 character')
        .matches(/^[a-zA-Z0-9\s]*$/).withMessage('Full Name must only contain letters and numbers'),
    (0, express_validator_1.body)('username')
        .trim()
        .notEmpty().withMessage('User Name is required')
        .isLength({ min: 7 }).withMessage('User Name must be atleast 7 character')
        .matches(/^[a-zA-Z0-9\s]*$/).withMessage('User Name must only contain letters and numbers')
        .custom(async (value) => {
        try {
            const usernameTaken = await Accounts_1.AccountModel.find({ username: value });
            if (usernameTaken.length > 0) {
                throw new Error('User Name is Already taken');
            }
        }
        catch (error) {
            throw error;
        }
    }),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Invalid email')
        .notEmpty().withMessage('Email is required')
        .custom(async (value) => {
        try {
            const email_Existed = await Accounts_1.AccountModel.find({ email: value });
            if (email_Existed.length > 0) {
                throw new Error('E-mail address is Already taken');
            }
        }
        catch (error) {
            throw error;
        }
    }),
    (0, express_validator_1.body)('birthday')
        .notEmpty().withMessage('Birth Day is required'),
    (0, express_validator_1.body)('gender')
        .notEmpty().withMessage('Gender is required'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .notEmpty().withMessage('Password is required')
        .matches(/^[a-zA-Z0-9\s]*$/).withMessage('Password must only contain letters and numbers'),
];
exports.LoginValidate = [
    (0, express_validator_1.body)('username')
        .trim()
        .notEmpty().withMessage('User Name is required'),
    (0, express_validator_1.body)('password')
        .trim()
        .notEmpty().withMessage('Password is required')
];
//# sourceMappingURL=auth_validator.js.map