import crypto from 'crypto';
export class DataAPICrypto {
    constructor(key, iv) {
        this.key = key;
        this.iv = iv;
    }
    encrypt(data) {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
        let encrypt = cipher.update(data, 'utf8', 'base64');
        encrypt += cipher.final('base64');
        return encrypt;
    }
}
