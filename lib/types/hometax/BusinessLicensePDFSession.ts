export interface BusinessLicenseSessionPDFResponse {
    errCode: string;
    errMsg: string;
    result: string;
    data: BusinessLicenseSessionPDFResponseData;
}

export interface BusinessLicenseSessionPDFResponseData {
    RESULT: string;
    ERRMSG: string;
    ERRDOC: string;
    ECODE: string;
    ETRACK: string;
    OUTFILE: BusinessLicenseSessionPDFResponseDataOutfile[];
}

export interface BusinessLicenseSessionPDFResponseDataOutfile {
    OUTTYPE: string;
    OUTDATA: string;
}