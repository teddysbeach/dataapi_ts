"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAPICrypto = void 0;
const crypto_1 = __importDefault(require("crypto"));
class DataAPICrypto {
    constructor(key, iv) {
        this.key = key;
        this.iv = iv;
    }
    encrypt(data) {
        const cipher = crypto_1.default.createCipheriv('aes-256-cbc', this.key, this.iv);
        let encrypt = cipher.update(data, 'utf8', 'base64');
        encrypt += cipher.final('base64');
        return encrypt;
    }
}
exports.DataAPICrypto = DataAPICrypto;
