"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const dbConn_1 = __importDefault(require("../config/dbConn"));
const mongoose_1 = require("mongoose");
(0, dbConn_1.default)();
const MessageSchema = new mongoose_1.Schema({
    MessagesInfo: [{
            SenderID: String,
            ReciverID: String,
            Message: String,
            timeStamp: String
        }],
    MessageStatus: String,
});
MessageSchema.index({
    _id: 1,
    MessagesInfo: 1
}, { name: "User Messages Index" });
exports.MessageModel = (0, mongoose_1.model)('Messages', MessageSchema);
//# sourceMappingURL=Messages.js.map