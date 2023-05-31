export interface TaxReturnResultTotalSessionResponse {
    errCode: string;
    errMsg: string;
    result: string;
    data: TaxReturnResultTotalSessionResponseData;
}
export interface TaxReturnResultTotalSessionResponseData {
    RESULT: string;
    ERRMSG: string;
    ERRDOC: string;
    ETRACK: string;
    ECODE: string;
    OUTFILE: TaxReturnResultTotalSessionResponseDataOutfile[];
}
export interface TaxReturnResultTotalSessionResponseDataOutfile {
    OUTTYPE: string;
    OUTDATA: string;
    TXNRMYM: string;
    STMNKNDNM: string;
    RTNCLNM: string;
    RTNCLDETAILNM: string;
    TXPRNM: string;
    TXPRNO: string;
    CVAAPLNDTM: string;
    RCATNO: string;
    USERID: string;
    ECABIDYN: string;
}
