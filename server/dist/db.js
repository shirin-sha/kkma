"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false;
async function connectToDatabase() {
    if (isConnected) {
        return;
    }
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kkma';
    try {
        const redacted = uri.replace(/:\/\/[\w.-]+:(.*?)@/, '://<user>:<redacted>@');
        console.log(`[db] connecting to ${redacted}`);
        await mongoose_1.default.connect(uri, {
        // Keep options minimal; Mongoose 8 uses sensible defaults
        });
        isConnected = true;
        const dbName = mongoose_1.default.connection.db?.databaseName;
        console.log(`[db] connected to database: ${dbName}`);
    }
    catch (err) {
        console.error('[db] connection error:', err);
        throw err;
    }
}
