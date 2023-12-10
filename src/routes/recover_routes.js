"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RecoverController_1 = require("../controllers/RecoverController");
const recover_validator_1 = require("../controllers/validator/recover_validator");
const JWT_1 = __importDefault(require("../middleware/JWT"));
const router = express_1.default.Router();
router.get('/account/indentify', RecoverController_1.AccountIndentifyUIController);
router.post('/searchRecover/username', RecoverController_1.SearchUsernameRecoverController);
router.get('/recover/code', JWT_1.default.ValidateRecoveryToken, RecoverController_1.RecoverCodeUIController);
router.post('/input/code', RecoverController_1.RecoveryCodeInputController);
router.get('/password/reset', RecoverController_1.PasswordRestUIController);
router.post('/password/reset', recover_validator_1.NewPasswordValidate, RecoverController_1.PasswordResetController);
exports.default = router;
//# sourceMappingURL=recover_routes.js.map