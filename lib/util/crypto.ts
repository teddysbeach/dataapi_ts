import crypto from 'crypto';

export class DataAPICrypto {
    private key: string;
    private iv: string;

    constructor(key: string, iv: string){
        this.key = key;
        this.iv = iv;
    }

    encrypt(data: string){
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
        let encrypt = cipher.update(data, 'utf8', 'base64');
        encrypt += cipher.final('base64');
        return encrypt
    }
}