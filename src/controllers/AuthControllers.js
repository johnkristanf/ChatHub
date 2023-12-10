"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutController = exports.ActiveUserDataController = exports.VerifyAccountController = exports.QrCodeAuthController = exports.LoginController = exports.SignUpController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
const validation_result_1 = require("express-validator/src/validation-result");
const Accounts_1 = __importDefault(require("../model/Accounts"));
const secret_1 = require("../tokenSecret/secret");
const JWT_1 = __importDefault(require("../middleware/JWT"));
const SignUpController = async (request, response) => {
    try {
        const { fullname, username, email, password, birthday, gender } = request.body;
        const errors = (0, validation_result_1.validationResult)(request);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return response.json({
                Errors: errorMessages,
            });
        }
        const birthdayDate = new Date(birthday);
        const formattedBirthDate = birthdayDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const HashedPassword = await bcrypt_1.default.hash(password, 10);
        const SignUpData = {
            fullname: fullname,
            username: username,
            email: email,
            password: HashedPassword,
            birthday: formattedBirthDate,
            gender: gender,
        };
        const SignUpSuccess = await Accounts_1.default.SignUp(SignUpData);
        if (SignUpSuccess) {
            response.status(200).send({
                Success: true,
                SuccessMessage: 'Account Created SuccessFully'
            });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Signing Up User');
    }
};
exports.SignUpController = SignUpController;
const LoginController = async (request, response) => {
    try {
        const { username, password } = request.body;
        const errors = (0, validation_result_1.validationResult)(request);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return response.json({
                Errors: errorMessages,
            });
        }
        const UserData = await Accounts_1.default.Find(username);
        if (UserData) {
            const match = await bcrypt_1.default.compare(password, UserData[0].password);
            if (match) {
                if (UserData[0].verified_token === "undefined") {
                    for (const data of UserData) {
                        const AccessToken = await JWT_1.default.AccessToken(data);
                        response.cookie('VerificationToken', AccessToken, {
                            maxAge: 30 * 60 * 1000,
                            httpOnly: true,
                        });
                    }
                    return response.status(200).send({
                        NeedVerification: true
                    });
                }
                for (const data of UserData) {
                    const AccessToken = await JWT_1.default.AccessToken(data);
                    response.cookie('AccessToken', AccessToken, {
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                    });
                }
                const VerifiedTokenMatch = await bcrypt_1.default.compare("6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f", UserData[0].verified_token);
                if (VerifiedTokenMatch) {
                    response.status(200).send({
                        LoginSuccess: true
                    });
                }
            }
            else {
                response.send({
                    InvalidLoginCredentials: 'Username or Password Incorrect'
                });
            }
        }
        else {
            response.send({
                InvalidLoginCredentials: 'Username or Password Incorrect'
            });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Login User');
    }
};
exports.LoginController = LoginController;
const QrCodeAuthController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const otpauth = `otpauth://totp/ChatHub:${request.user.email}?secret=${secret_1.secretKey}&issuer=ChatHub`;
            const GenerateQRCode = await qrcode_1.default.toDataURL(otpauth);
            if (GenerateQRCode) {
                response.status(200).send({
                    qrCode: GenerateQRCode
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Getting QrCode');
    }
};
exports.QrCodeAuthController = QrCodeAuthController;
const VerifyAccountController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { VerificationCode } = request.body;
            const ValidToken = speakeasy_1.default.totp.verify({
                secret: secret_1.secretKey,
                encoding: 'base32',
                token: VerificationCode
            });
            if (!ValidToken) {
                response.status(500).send('Invalid Token');
            }
            else {
                const VerifyAccount = await Accounts_1.default.VerifyAccount(request.user.id);
                if (VerifyAccount) {
                    const AccessToken = await JWT_1.default.AccessToken(VerifyAccount);
                    response.cookie('AccessToken', AccessToken, {
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                    });
                    response.clearCookie('VerificationToken');
                    response.status(200).send({
                        VerifiedSuccess: true
                    });
                }
            }
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Verifying User');
    }
};
exports.VerifyAccountController = VerifyAccountController;
const ActiveUserDataController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { id, username } = request.user;
            response.status(200).send({
                user_id: id,
                username: username
            });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Retreiving Active User Data');
    }
};
exports.ActiveUserDataController = ActiveUserDataController;
const LogoutController = (request, response) => {
    try {
        response.clearCookie('AccessToken');
        response.redirect('/');
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Logging Out the User');
    }
};
exports.LogoutController = LogoutController;
//# sourceMappingURL=AuthControllers.js.map