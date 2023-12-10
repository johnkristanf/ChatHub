"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JWT_1 = __importDefault(require("../middleware/JWT"));
const CallControllers_1 = require("../controllers/CallControllers");
const router = express_1.default.Router();
router.get('/video', JWT_1.default.ValidateToken, CallControllers_1.StartVideoCallController);
router.get('/video/:room', JWT_1.default.ValidateToken, CallControllers_1.VideoCallUIController);
exports.default = router;
//# sourceMappingURL=call_routes.js.map