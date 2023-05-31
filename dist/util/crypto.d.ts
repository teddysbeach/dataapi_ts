export declare class DataAPICrypto {
    private key;
    private iv;
    constructor(key: string, iv: string);
    encrypt(data: string): string;
}
