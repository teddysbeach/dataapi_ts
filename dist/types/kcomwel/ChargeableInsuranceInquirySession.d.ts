export interface ChargeableInsuranceInquirySessionResponse {
    errCode: string;
    errMsg: string;
    result: string;
    data: ChargeableInsuranceInquirySessionData;
}
export interface ChargeableInsuranceInquirySessionData {
    RESULT: string;
    ERRMSG: string;
    ECODE: string;
    ERRDOC: string;
    ETRACK: string;
    NTCINSPRMLIST: ChargeableInsuranceInquirySessionNTCINSPRMLISTItem[];
}
export interface ChargeableInsuranceInquirySessionNTCINSPRMLISTItem {
    INSYEAR: string;
    REGNUM: string;
    SAEOPJANGINFO: ChargeableInsuranceInquirySessionSAEOPJANGINFO;
    GEUNROJAINFO: ChargeableInsuranceInquirySessionGEUNROJAINFO;
    GEUNROJANTCINSPRMINFO: ChargeableInsuranceInquirySessionGEUNROJANTCINSPRMINFO;
}
export interface ChargeableInsuranceInquirySessionSAEOPJANGINFO {
    ADMINNO: string;
    HOISAMYUNG: string;
    PRENAME: string;
    JUSO: string;
}
export interface ChargeableInsuranceInquirySessionGEUNROJAINFO {
    USERNAME: string;
    BIRTHDAY: string;
    GEUNROJAGUBUN: string;
    SJBJAGYEOKCHWIDEUKDT: string;
    SJBJAGYEOKSANGSILDT: string;
    SJBJEONGEUNDT: string;
    GYBJAGYEOKCHWIDEUKDT: string;
    GYBJAGYEOKSANGSILDT: string;
    GYBJEONGEUNDT: string;
}
export interface ChargeableInsuranceInquirySessionGEUNROJANTCINSPRMINFO {
    GYINFOLIST: ChargeableInsuranceInquirySessionGYINFOLISTItem[];
}
export interface ChargeableInsuranceInquirySessionGYINFOLISTItem {
    INSMNTHL: string;
    SANJENGSGBOSUAK: string;
    SANJENGGAJNBOSUAK: string;
    GYMMAVGBOSUPRC: string;
    GEUNMUILSU: string;
    SGGEUNROJABUDAMBHR: string;
    SGSAEOPJABUDAMBHR: string;
    GAJNBHR: string;
}
