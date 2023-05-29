export interface SearchAdminnoResponse {
    errCode: string;
    errMsg: string;
    result: string;
    data: SearchAdminnoData;
}
export interface SearchAdminnoData {
    RESULT: string;
    ERRMSG: string;
    ECODE: string;
    ERRDOC: string;
    ETRACK: string;
    LIST: SearchAdminnoListData[];
}
export interface SearchAdminnoListData {
    ADMINNO: string;
    HOISAMYUNG: string;
    JUSO: string;
}
