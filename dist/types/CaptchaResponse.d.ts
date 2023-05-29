export interface CaptchaResponse {
    errCode: string;
    errMsg: string;
    result: string;
    data: CaptchaResponseData;
}
export interface CaptchaResponseData {
    callbackData: string;
    callbackId: string;
    callbackType: string;
}
