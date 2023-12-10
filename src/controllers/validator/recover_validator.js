"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPasswordValidate = void 0;
const express_validator_1 = require("express-validator");
exports.NewPasswordValidate = [
    (0, express_validator_1.body)('newPassword')
        .trim()
        .isLength({ min: 8 }).withMessage('Password must have atleast 8 character')
        .notEmpty().withMessage('Password is required')
];
//# sourceMappingURL=recover_validator.js.map