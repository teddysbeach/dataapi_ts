"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const crypto_1 = require("./util/crypto");
const endpoints_1 = __importDefault(require("./util/endpoints"));
const branches_1 = __importDefault(require("./util/branches"));
class DatahubAgent {
    get isSessionHometaxCreated() { return this._sessionHometax !== undefined; }
    get isSessionKcomwelCreated() { return this._sessionKcomwel !== undefined; }
    get allBranches() { return branches_1.default; }
    constructor(isTest, token, key, iv) {
        this.encrypt = (data) => this._crypto.encrypt(data);
        const baseURL = isTest ? 'https://datahub-dev.scraping.co.kr' : 'https://api.mydatahub.co.kr';
        this._token = token;
        this._crypto = new crypto_1.DataAPICrypto(key, iv);
        this._axiosInstance = axios_1.default.create({ baseURL: baseURL, headers: { 'Content-Type': 'application/json' } });
    }
    /** LOGIN API **/
    /* Hometax */
    hometaxLoginSessionSimple(USERGUBUN, // 1: 개인, 2: 개인사업자
    LOGINOPTION, // 0: 카카오톡, 1: 삼성패스 ...
    JUMINNUM, USERNAME, HPNUMBER, TELECOMGUBUN, TXAGNTMGMTNO, TXAGNTMGMTPW) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                USERGUBUN,
                LOGINOPTION,
                TELECOMGUBUN,
                JUMINNUM,
                USERNAME,
                HPNUMBER,
                TXAGNTMGMTNO,
                TXAGNTMGMTPW,
            };
            data.JUMINNUM = this.encrypt(data.JUMINNUM);
            data.TXAGNTMGMTPW = data.TXAGNTMGMTPW !== undefined ? this.encrypt(data.TXAGNTMGMTPW) : undefined;
            return this.post(endpoints_1.default.LoginSessionSimpleHomeTax, data);
        });
    }
    hometaxLoginSessionSimpleCaptcha(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.post(endpoints_1.default.Captcha, data.data);
            this._sessionHometax = res.data;
            console.log('[ * ] Hometax Login Session has been created. [간편로그인]');
            return res;
        });
    }
    hometaxLoginSession(USERGUBUN, // 1: 개인, 2: 개인사업자,  3:법인, 4:세무사
    P_CERTNAME, P_CERTPWD, P_SIGNCERT_DER, P_SIGNPRI_KEY) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                USERGUBUN,
                P_CERTNAME,
                P_CERTPWD,
                P_SIGNCERT_DER,
                P_SIGNPRI_KEY,
            };
            data.P_CERTPWD = this.encrypt(data.P_CERTPWD);
            const res = yield this.post(endpoints_1.default.LoginSessionHomeTax, data);
            this._sessionHometax = res.data;
            console.log('[ * ] Hometax Login Session has been created. [인증서]');
            return res;
        });
    }
    /* Kcomwel */
    kcomwelLoginSessionSimple(USERGUBUN, // 3 : 사업장 | 4 : 사무대행
    SUBCUSKIND, // 0 : 대표자/소속직원 | 2 : 사업장명의인증서
    USERNAME, LOGINOPTION, // 0 : 카카오톡
    JUMINNUM, HPNUMBER) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                USERGUBUN,
                SUBCUSKIND,
                USERNAME,
                LOGINOPTION,
                JUMINNUM,
                HPNUMBER,
            };
            data.JUMINNUM = this.encrypt(data.JUMINNUM);
            return this.post(endpoints_1.default.LoginSessionSimpleKcomwel, data);
        });
    }
    kcomwelLoginSessionSimpleCaptcha(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.post(endpoints_1.default.Captcha, data.data);
            this._sessionKcomwel = res.data;
            console.log('[ * ] Kcomwel Login Session has been created. [간편로그인]');
            return res;
        });
    }
    // Hometax API
    hometaxTaxReturnResultTotalSession(REGNUMBER, USERGUBUN, STARTDATE, ENDDATE, TAXKIND, HIDDENINFO, SEARCHOPTION, TXAGNTMGMTNO, TXAGNTMGMTPW) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isSessionHometaxCreated)
                throw new Error('[ - ] Hometax Login Session is not created.');
            const data = Object.assign({ REGNUMBER,
                USERGUBUN,
                STARTDATE,
                ENDDATE,
                TAXKIND,
                HIDDENINFO,
                SEARCHOPTION,
                TXAGNTMGMTNO,
                TXAGNTMGMTPW }, this._sessionHometax);
            data.REGNUMBER = this.encrypt(data.REGNUMBER);
            data.TXAGNTMGMTPW = data.TXAGNTMGMTPW !== undefined ? this.encrypt(data.TXAGNTMGMTPW) : undefined;
            return this.post(endpoints_1.default.TaxReturnResultTotalSession, data);
        });
    }
    hometaxBusinessLicensePDFSession(REGNUMBER, USERGUBUN, // 2 : 개인사업자, 3 : 법인 사업자, 4 : 세무사
    JUMINYN = "1", TELNUMBER, HPNUMBER, EMAIL) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isSessionHometaxCreated)
                throw new Error('[ - ] Hometax Login Session is not created.');
            const data = Object.assign({ REGNUMBER,
                USERGUBUN,
                TELNUMBER,
                HPNUMBER,
                EMAIL,
                JUMINYN, OUTPUTDOCU: [{ OUTPUTDOCUTYPE: 'PDF' }] }, this._sessionHometax);
            data.REGNUMBER = this.encrypt(data.REGNUMBER);
            return this.post(endpoints_1.default.BusinessLicensePDFSession, data);
        });
    }
    hometaxAcceptOfAppoinmtSoleSession(USERGUBUN, REGNUMBER) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isSessionHometaxCreated)
                throw new Error('[ - ] Hometax Login Session is not created.');
            const data = Object.assign({ USERGUBUN,
                REGNUMBER }, this._sessionHometax);
            data.REGNUMBER = data.REGNUMBER !== undefined ? this.encrypt(data.REGNUMBER) : undefined;
            return this.post(endpoints_1.default.AcceptOfAppoinmtSoleSession, data);
        });
    }
    hometaxTaxAccountantRetrieveRegSession(USERGUBUN, SAUPJAGUBUN, CMJUMIN, TELNUMBER, HPNUMBER, // Y:동의 | 그외:동의하지않음
    APPODATE, // Y:동의 | 그외:동의하지않음
    INFOACCRO, // 1:타소득포함 | 2:해당사업장
    REGNUMBER, EMAIL, TAXINFOALWHP, TAXINFOALWEM) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = Object.assign({ USERGUBUN,
                SAUPJAGUBUN,
                CMJUMIN,
                TELNUMBER,
                HPNUMBER,
                APPODATE,
                INFOACCRO,
                REGNUMBER,
                EMAIL,
                TAXINFOALWHP,
                TAXINFOALWEM }, this._sessionHometax);
            data.REGNUMBER = data.REGNUMBER !== undefined ? this.encrypt(data.REGNUMBER) : undefined;
            data.CMJUMIN = this.encrypt(data.CMJUMIN);
            return this.post(endpoints_1.default.TaxAccountantRetrieveRegSession, data);
        });
    }
    // Kcomwel API
    kcomwelEmploymentInfoSession(USERNAME, ADMINNO, BIRTHDAY) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isSessionKcomwelCreated)
                throw new Error('[ - ] Kcomwel Login Session is not created.');
            const data = Object.assign({ USERNAME,
                ADMINNO,
                BIRTHDAY, OUTPUTDOCU: [{ OUTPUTDOCUTYPE: 'EXCEL' }] }, this._sessionKcomwel);
            data.BIRTHDAY = this.encrypt(data.BIRTHDAY);
            return this.post(endpoints_1.default.EmploymentInfoSession, data);
        });
    }
    kcomwelReportedCompensationSession(USERNAME, ADMINNO, SEARCHYEAR, BIRTHDAY) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isSessionKcomwelCreated)
                throw new Error('[ - ] Kcomwel Login Session is not created.');
            const data = Object.assign({ USERNAME,
                ADMINNO,
                SEARCHYEAR,
                BIRTHDAY, OUTPUTDOCU: [{ OUTPUTDOCUTYPE: 'EXCEL' }] }, this._sessionKcomwel);
            data.BIRTHDAY = this.encrypt(data.BIRTHDAY);
            return this.post(endpoints_1.default.ReportedCompensationSession, data);
        });
    }
    kcomwelChargeableInsuranceInquirySession(USERNAME, SUBCUSKIND, STARTDATE, ENDDATE, BIRTHDAY) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isSessionKcomwelCreated)
                throw new Error('[ - ] Kcomwel Login Session is not created.');
            const data = Object.assign({ USERNAME,
                SUBCUSKIND,
                STARTDATE,
                ENDDATE,
                BIRTHDAY }, this._sessionKcomwel);
            data.BIRTHDAY = this.encrypt(data.BIRTHDAY);
            return this.post(endpoints_1.default.ChargeableInsuranceInquirySession, data);
        });
    }
    // TypeScript syntax를 사용하는 방법
    /**
     * INSUGUBUN: 1: 개인, 2: 개인사업자, 3: 법인, 4: 세무사
     * REGNUMBER: 주민번호
     * BRANCHNAME: 사업장명
     * BRANCHCODE: 사업장코드
     */
    kcomwelSearchAdminno(INSUGUBUN, REGNUMBER, BRANCHNAME, BRANCHCODE) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                INSUGUBUN,
                REGNUMBER,
                BRANCHNAME,
                BRANCHCODE,
            };
            data.REGNUMBER = this.encrypt(data.REGNUMBER);
            return this.post(endpoints_1.default.SearchAdminno, data);
        });
    }
    // HTTP REQUEST
    get(endpoint, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sendRequest(endpoint, 'GET', undefined, config);
        });
    }
    post(endpoint, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sendRequest(endpoint, 'POST', data, config);
        });
    }
    sendRequest(endpoint, method, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = Object.assign({ Authorization: `Token ${this._token}` }, config === null || config === void 0 ? void 0 : config.headers);
            const response = yield this._axiosInstance.request(Object.assign({ url: endpoint, method: method, headers,
                data }, config));
            if (response.status >= 400) {
                throw new Error(`Request failed with status code ${response.status}`);
            }
            return response.data;
        });
    }
}
exports.default = DatahubAgent;
