export interface LoginSessionHomeTaxResponse {
    errCode: string;
    errMsg: string;
    result: string;
    data: LoginSessionHomeTaxResponseData;
}

export interface LoginSessionHomeTaxResponseData {
    RESULT: string;
    ERRMSG: string;
    ERRDOC: string;
    ETRACK: string;
    ECODE: string;
    INPUTUSERID: string;
    LOGINHEADERS: string;
}