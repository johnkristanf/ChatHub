"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryCode = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const RecoveryCode = async (user) => {
    try {
        const RecoveryCode = (0, jsonwebtoken_1.sign)({
            userId: user._id,
            username: user.username,
            email: user.email
        }, '38d26ca1d2', { expiresIn: '5m' });
        return RecoveryCode;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.RecoveryCode = RecoveryCode;
//# sourceMappingURL=RecoverCode.js.map