"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = require("jsonwebtoken");
exports.default = {
    AccessToken: async (user) => {
        try {
            const AccessToken = (0, jsonwebtoken_1.sign)({
                userId: user._id,
                username: user.username,
                email: user.email,
                fullname: user.fullname
            }, '6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f');
            return AccessToken;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    ValidateToken: async (request, response, next) => {
        try {
            const AccessToken = request.cookies['AccessToken'];
            if (!AccessToken) {
                return response.status(403).send('User Not Authenticated');
            }
            const ValidToken = (0, jsonwebtoken_1.verify)(AccessToken, '6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f');
            if (typeof ValidToken === 'object' && 'userId' in ValidToken) {
                request.user = {
                    id: ValidToken.userId,
                    username: ValidToken.username,
                    email: ValidToken.email,
                    fullname: ValidToken.fullname,
                    Authenticated: () => { return true; }
                };
                return next();
            }
            else {
                return response.status(403).send('Invalid Token');
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send('Error Validating Token');
        }
    },
    ValidateVerificationToken: async (request, response, next) => {
        try {
            const VerificationToken = request.cookies['VerificationToken'];
            if (!VerificationToken) {
                return response.status(403).send('User Not Authenticated');
            }
            const ValidToken = (0, jsonwebtoken_1.verify)(VerificationToken, '6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f');
            if (typeof ValidToken === 'object' && 'userId' in ValidToken) {
                request.user = {
                    id: ValidToken.userId,
                    username: ValidToken.username,
                    email: ValidToken.email,
                    Authenticated: () => { return true; }
                };
                return next();
            }
            else {
                return response.status(403).send('Invalid Token');
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send('Error Validating Token');
        }
    },
    ValidateRecoveryToken: async (request, response, next) => {
        try {
            const RecoverCode = request.cookies['RecoverCode'];
            if (!RecoverCode) {
                return response.status(403).send('User Not Authenticated');
            }
            const ValidToken = (0, jsonwebtoken_1.verify)(RecoverCode, '38d26ca1d2');
            if (typeof ValidToken === 'object' && 'userId' in ValidToken) {
                request.user = {
                    id: ValidToken.userId,
                    username: ValidToken.username,
                    email: ValidToken.email,
                    Authenticated: () => { return true; }
                };
                return next();
            }
            else {
                return response.status(403).send('Invalid Token');
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send('Error Validating Token');
        }
    },
};
//# sourceMappingURL=JWT.js.map