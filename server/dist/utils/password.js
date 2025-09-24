"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const crypto_1 = __importDefault(require("crypto"));
function hashPassword(password) {
    const salt = crypto_1.default.randomBytes(16).toString('hex');
    const hash = crypto_1.default.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return { salt, hash };
}
function verifyPassword(password, salt, expectedHash) {
    const derived = crypto_1.default.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    try {
        return crypto_1.default.timingSafeEqual(Buffer.from(expectedHash, 'hex'), Buffer.from(derived, 'hex'));
    }
    catch {
        return false;
    }
}
