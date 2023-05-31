export interface LoginSessionKcomwelResponse {
    errCode: string;
    errMsg: string;
    result: string;
    data: LoginSessionKcomwelResponseData;
}
export interface LoginSessionKcomwelResponseData {
    RESULT: string;
    ERRMSG: string;
    ECODE: string;
    ERRDOC: string;
    ETRACK: string;
    LOGINHEADERS: string;
    BIRTHDAY: string;
    USERNAME: string;
    INPUTUSERID: string;
}
