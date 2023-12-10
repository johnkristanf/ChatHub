"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JWT_1 = __importDefault(require("../middleware/JWT"));
const MessagesController_1 = require("../controllers/MessagesController");
const router = express_1.default.Router();
router.get('/get/messages', JWT_1.default.ValidateToken, MessagesController_1.getMessagesController);
router.get('/get/senderName/:SenderID', JWT_1.default.ValidateToken, MessagesController_1.getSenderNameController);
exports.default = router;
//# sourceMappingURL=messages_routes.js.map