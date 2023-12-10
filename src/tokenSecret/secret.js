"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
const secret = speakeasy_1.default.generateSecret();
exports.secretKey = secret.base32;
//# sourceMappingURL=secret.js.map