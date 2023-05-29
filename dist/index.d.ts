import { CaptchaResponse } from './types/CaptchaResponse';
import { TaxReturnResultTotalSessionResponse } from './types/hometax/TaxReturnResultTotalSessionHometax';
import { BusinessLicenseSessionPDFResponseData } from './types/hometax/BusinessLicensePDFSession';
import { LoginSessionHomeTaxResponse } from './types/hometax/LoginSessionHometax';
import { AcceptOfAppoinmtSoleSessionResponse } from './types/hometax/AcceptOfAppoinmtSoleSession';
import { TaxAccountantRetrieveRegSessionResponse } from './types/hometax/TaxAccountantRetrieveRegSession';
import { LoginSessionKcomwelResponse } from './types/kcomwel/LoginSessionKcomwel';
import { EmploymentInfoSessionResponseData } from './types/kcomwel/EmploymentInfoSession';
import { ReportedCompensationSessionResponse } from './types/kcomwel/ReportedCompensationSession';
import { ChargeableInsuranceInquirySessionResponse } from './types/kcomwel/ChargeableInsuranceInquirySession';
import { SearchAdminnoResponse } from './types/kcomwel/SearchAdminno';
export default class DatahubAgent {
    private _axiosInstance;
    private _token;
    private _crypto;
    private _sessionHometax?;
    private _sessionKcomwel?;
    get isSessionHometaxCreated(): boolean;
    get isSessionKcomwelCreated(): boolean;
    get allBranches(): any[];
    constructor(isTest: boolean, token: string, key: string, iv: string);
    private encrypt;
    /** LOGIN API **/
    hometaxLoginSessionSimple(USERGUBUN: string, // 1: 개인, 2: 개인사업자
    LOGINOPTION: string, // 0: 카카오톡, 1: 삼성패스 ...
    JUMINNUM: string, USERNAME: string, HPNUMBER: string, TELECOMGUBUN?: string, TXAGNTMGMTNO?: string, TXAGNTMGMTPW?: string): Promise<CaptchaResponse>;
    hometaxLoginSessionSimpleCaptcha(data: CaptchaResponse): Promise<LoginSessionHomeTaxResponse>;
    hometaxLoginSession(USERGUBUN: string, // 1: 개인, 2: 개인사업자,  3:법인, 4:세무사
    P_CERTNAME: string, P_CERTPWD: string, P_SIGNCERT_DER: string, P_SIGNPRI_KEY: string): Promise<LoginSessionHomeTaxResponse>;
    kcomwelLoginSessionSimple(USERGUBUN: string, // 3 : 사업장 | 4 : 사무대행
    SUBCUSKIND: string, // 0 : 대표자/소속직원 | 2 : 사업장명의인증서
    USERNAME: string, LOGINOPTION: string, // 0 : 카카오톡
    JUMINNUM: string, HPNUMBER: string): Promise<CaptchaResponse>;
    kcomwelLoginSessionSimpleCaptcha(data: CaptchaResponse): Promise<LoginSessionKcomwelResponse>;
    hometaxTaxReturnResultTotalSession(REGNUMBER: string, USERGUBUN: string, STARTDATE: string, ENDDATE: string, TAXKIND: string, HIDDENINFO?: string, SEARCHOPTION?: string, TXAGNTMGMTNO?: string, TXAGNTMGMTPW?: string): Promise<TaxReturnResultTotalSessionResponse>;
    hometaxBusinessLicensePDFSession(REGNUMBER: string, USERGUBUN: string, // 2 : 개인사업자, 3 : 법인 사업자, 4 : 세무사
    JUMINYN?: string, TELNUMBER?: string, HPNUMBER?: string, EMAIL?: string): Promise<BusinessLicenseSessionPDFResponseData>;
    hometaxAcceptOfAppoinmtSoleSession(USERGUBUN: string, REGNUMBER?: string): Promise<AcceptOfAppoinmtSoleSessionResponse>;
    hometaxTaxAccountantRetrieveRegSession(USERGUBUN: string, SAUPJAGUBUN: string, CMJUMIN: string, TELNUMBER: string, HPNUMBER: string, // Y:동의 | 그외:동의하지않음
    APPODATE: string, // Y:동의 | 그외:동의하지않음
    INFOACCRO: string, // 1:타소득포함 | 2:해당사업장
    REGNUMBER?: string, EMAIL?: string, TAXINFOALWHP?: string, TAXINFOALWEM?: string): Promise<TaxAccountantRetrieveRegSessionResponse>;
    kcomwelEmploymentInfoSession(USERNAME: string, ADMINNO: string, BIRTHDAY: string): Promise<EmploymentInfoSessionResponseData>;
    kcomwelReportedCompensationSession(USERNAME: string, ADMINNO: string, SEARCHYEAR: string, BIRTHDAY: string): Promise<ReportedCompensationSessionResponse>;
    kcomwelChargeableInsuranceInquirySession(USERNAME: string, SUBCUSKIND: string, STARTDATE: string, ENDDATE: string, BIRTHDAY: string): Promise<ChargeableInsuranceInquirySessionResponse>;
    /**
     * INSUGUBUN: 1: 개인, 2: 개인사업자, 3: 법인, 4: 세무사
     * REGNUMBER: 주민번호
     * BRANCHNAME: 사업장명
     * BRANCHCODE: 사업장코드
     */
    kcomwelSearchAdminno(INSUGUBUN: string, REGNUMBER: string, BRANCHNAME: string, BRANCHCODE: string): Promise<SearchAdminnoResponse>;
    private get;
    private post;
    private sendRequest;
}
