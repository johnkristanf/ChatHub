"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JWT_1 = __importDefault(require("../middleware/JWT"));
const AuthControllers_1 = require("../controllers/AuthControllers");
const auth_validator_1 = require("../controllers/validator/auth_validator");
const router = express_1.default.Router();
router.post('/auth/signup', auth_validator_1.SignUpValidate, AuthControllers_1.SignUpController);
router.post('/auth/login', auth_validator_1.LoginValidate, AuthControllers_1.LoginController);
router.get('/auth/qrcode', JWT_1.default.ValidateVerificationToken, AuthControllers_1.QrCodeAuthController);
router.post('/account/verify', JWT_1.default.ValidateVerificationToken, AuthControllers_1.VerifyAccountController);
router.get('/ActiveUserData', JWT_1.default.ValidateToken, AuthControllers_1.ActiveUserDataController);
router.get('/logout', AuthControllers_1.LogoutController);
exports.default = router;
//# sourceMappingURL=auth_routes.js.map