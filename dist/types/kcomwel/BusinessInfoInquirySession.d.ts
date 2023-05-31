export interface BusinessInfoInquirySessionResponse {
    errCode: string;
    errMsg: string;
    result: string;
    data: BusinessInfoInquirySessionResponseData;
}
export interface BusinessInfoInquirySessionResponseData {
    RESULT: string;
    ERRMSG: string;
    ECODE: string;
    ERRDOC: string;
    ETRACK: string;
    LIST: BusinessInfoInquirySessionResponseDataList[];
}
export interface BusinessInfoInquirySessionResponseDataList {
    ADMINNO: string;
    HOISAMYUNG: string;
    PRENAME: string;
    GYSAEOPSTS: string;
    SJSAEOPSTS: string;
    BRANCHNAME: string;
    GYGUBUN: string;
    SJGUBUN: string;
}
