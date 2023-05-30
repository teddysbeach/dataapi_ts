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
import { BusinessInfoInquirySessionResponse } from './types/kcomwel/BusinessInfoInquirySession';
import { ChargeableInsuranceInquiryToExcelResponseDataOutfile } from './types/kcomwel/ChargeableInsuranceInquirytoExcel';
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
    /**
     * 간편인증 로그인 세션 [hometax/LoginSessionSimple]
     * @param USERGUBUN 사용자구분, 1: 개인, 2: 개인사업자
     * @param LOGINOPTION 로그인옵션, 0: 카카오톡, 1: 삼성패스, 2: 페이코, 3: 통신사, 4: KB모바일인증서, 5: 네이버인증서
     * @param JUMINNUM 주민번호또는사업자번호, 주민번호: (-)제외 13자리, 생년월일: yyyyMMdd
     * @param USERNAME 로그인용성명 (간편인증 로그인시 필수필드)
     * @param HPNUMBER 휴대폰번호
     * @param TELECOMGUBUN 통신사구분, 1: SKT, 2: KT, 3: LGT (LoginOption이 3일때)
     */
    hometaxLoginSessionSimple(USERGUBUN: string, // 1: 개인, 2: 개인사업자
    LOGINOPTION: string, // 0: 카카오톡, 1: 삼성패스 ...
    JUMINNUM: string, USERNAME: string, HPNUMBER: string, TELECOMGUBUN?: string, TXAGNTMGMTNO?: string, TXAGNTMGMTPW?: string): Promise<CaptchaResponse>;
    /**
     * 홈택스 간편인증 캡차확인 [hometax/Captcha]
     * 순서 : homtaxLoginSessionSimple -> 사용자의 폰인증 완료후 -> homtaxLoginSessionSimpleCaptcha -> 에이전트에 세션등록성공
     * @param data homtaxLoginSessionSimple의 응답 데이터를 그대로 전달할 것
     */
    hometaxLoginSessionSimpleCaptcha(data: CaptchaResponse): Promise<LoginSessionHomeTaxResponse>;
    /**
     * 공동인증서 홈택스 로그인 세션 [hometax/LoginSession]
     * @param USERGUBUN 사용자구분, 1: 개인, 2: 개인사업자, 3: 법인사업자, 4: 세무사
     * @param P_CERTNAME 인증서명
     * @param P_CERTPWD 인증서비밀번호
     * @param P_SIGNCERT_DER 인증서DER (BASE64)
     * @param P_SIGNPRI_KEY 인증서개인키 (BASE64)
     */
    hometaxLoginSession(USERGUBUN: string, // 1: 개인, 2: 개인사업자,  3:법인, 4:세무사
    P_CERTNAME: string, P_CERTPWD: string, P_SIGNCERT_DER: string, P_SIGNPRI_KEY: string): Promise<LoginSessionHomeTaxResponse>;
    /**
     * 로그인세션추출 [kcomwel/LoginSessionSimple]
     * @param USERGUBUN 사용자구분, 3: 사업장, 4: 사무대행
     * @param SUBCUSKIND 세부고객유형, 0: 대표자/소속직원, 2: 사업장명의인증서
     * @param USERNAME 로그인용성명 (간편인증 로그인시 필수필드)
     * @param LOGINOPTION 로그인옵션, 0: 카카오톡
     * @param JUMINNUM 주민번호또는사업자번호, (-)제외 13자리
     * @param HPNUMBER 휴대폰번호
     */
    kcomwelLoginSessionSimple(USERGUBUN: string, // 3 : 사업장 | 4 : 사무대행
    SUBCUSKIND: string, // 0 : 대표자/소속직원 | 2 : 사업장명의인증서
    USERNAME: string, LOGINOPTION: string, // 0 : 카카오톡
    JUMINNUM: string, HPNUMBER: string): Promise<CaptchaResponse>;
    /**
     * 근로복지공단 간편인증 캡차확인 [kcomwel/Captcha]
     * 순서 : kcomwelLoginSessionSimple -> 사용자의 폰인증 완료후 -> kcomwelLoginSessionSimpleCaptcha -> 에이전트에 세션등록성공
     * @param data kcomwelLoginSessionSimple의 응답 데이터를 그대로 전달할 것
     */
    kcomwelLoginSessionSimpleCaptcha(data: CaptchaResponse): Promise<LoginSessionKcomwelResponse>;
    /**
     * 공동인증서 근로고용복지공단 로그인 세션 [kcomwel/LoginSession]
     * 확실하지 않고 테스트가 필요함 데이터허브측에 문의해서 존재하는 API인지 확인 필요
     * [2023-05-30]
     * @param USERGUBUN 사용자구분, 1: 개인, 2: 개인사업자, 3: 법인사업자, 4: 세무사
     * @param P_CERTNAME 인증서명
     * @param P_CERTPWD 인증서비밀번호
     * @param P_SIGNCERT_DER 인증서DER (BASE64)
     * @param P_SIGNPRI_KEY 인증서개인키 (BASE64)
     */
    kcomwelLoginSession(USERGUBUN: string, // 1: 개인, 2: 개인사업자,  3:법인, 4:세무사
    P_CERTNAME: string, P_CERTPWD: string, P_SIGNCERT_DER: string, P_SIGNPRI_KEY: string): Promise<LoginSessionKcomwelResponse>;
    /**
     * 세금신고결과 전체조회 [TaxReturnResultTotalSession]
     * @param REGNUMBER 사업자등록번호, (-)제외 10자리
     * @param USERGUBUN 사용자구분, 1: 개인, 2: 개인사업자, 3: 법인 사업자, 4: 세무사
     * @param STARTDATE 조회시작일자 (yyyyMMdd)
     * @param ENDDATE 조회종료일자 (yyyyMMdd)
     * @param TAXKIND 1:종합소득세, 2:원천세, 3:법인세, 4:부가가치세
     * @param HIDDENINFO 개인정보숨김처리, (Y:전부보임 | N:개인정보숨김)
     * @param SEARCHOPTION 조회옵션, 00: 전체 (빈 값일 경우 종합소득세 : 신고유형은 정기신고, 신고구분은 정기(확정))
     */
    hometaxTaxReturnResultTotalSession(REGNUMBER: string, USERGUBUN: string, STARTDATE: string, ENDDATE: string, TAXKIND: string, HIDDENINFO?: string, SEARCHOPTION?: string, TXAGNTMGMTNO?: string, TXAGNTMGMTPW?: string): Promise<TaxReturnResultTotalSessionResponse>;
    /**
     * 사업자등록증명원PDF [BusinessLicensePDFSession]
     * @param REGNUMBER 사업자등록번호, (-)제외 10자리
     * @param USERGUBUN 사용자구분, 2: 개인사업자, 3: 법인 사업자, 4: 세무사
     * @param JUMINYN 주민번호공개여부, 1: 공개, 2: 비공개
     */
    hometaxBusinessLicensePDFSession(REGNUMBER: string, USERGUBUN: string, // 2 : 개인사업자, 3 : 법인 사업자, 4 : 세무사
    JUMINYN?: string, TELNUMBER?: string, HPNUMBER?: string, EMAIL?: string): Promise<BusinessLicenseSessionPDFResponseData>;
    /**
     * 사업자 수임동의 [AcceptOfAppoinmtSoleSession]
     * @param USERGUBUN 사용자구분, 1: 개인, 2: 개인사업자, 3: 법인사업자 (개인은신청불가능함.)
     * @param REGNUMBER 사업자등록번호, (-)제외 10자리
     */
    hometaxAcceptOfAppoinmtSoleSession(USERGUBUN: string, REGNUMBER?: string): Promise<AcceptOfAppoinmtSoleSessionResponse>;
    /**
     * 세무사 수임등록 [TaxAccountantRetrieveRegSession]
     * @param USERGUBUN 사용자구분, 4: 세무사
     * @param SAUPJAGUBUN 사업자구분, 1: 개인사업자, 2: 법인사업자, 3: 비사업자
     * @param CMJUMIN 대표자주민등록번호
     * @param TELNUMBER 신청자전화번호
     * @param HPNUMBER 대표자휴대폰번호
     * @param APPODATE 수임일자, (YYYYMMDD)
     * @param INFOACCRO 정보제공범위, 1: 타소득포함, 2: 해당사업장
     * @param REGNUMBER 사업자등록번호, (-)제외 10자리 (필수지만 SAUPJAGUBUN : 3, 비사업자인 경우 미입력)
     * @param EMAIL 이메일
     * @param TAXINFOALWHP 휴대폰번호정보제공동의, Y:동의 | 그외:동의하지않음
     * @param TAXINFOALWEM 이메일정보제공동의, Y:동의 | 그외:동의하지않음
     */
    hometaxTaxAccountantRetrieveRegSession(USERGUBUN: string, SAUPJAGUBUN: string, CMJUMIN: string, TELNUMBER: string, HPNUMBER: string, // Y:동의 | 그외:동의하지않음
    APPODATE: string, // Y:동의 | 그외:동의하지않음
    INFOACCRO: string, // 1:타소득포함 | 2:해당사업장
    REGNUMBER?: string, EMAIL?: string, TAXINFOALWHP?: string, TAXINFOALWEM?: string): Promise<TaxAccountantRetrieveRegSessionResponse>;
    /**
     * 근로자고용정보현황 [EmploymentInfoSession]
     * @param USERNAME 로그인용성명 (로그인세션 로그인 시 추출된 성명 또는 사업장명)
     * @param ADMINNO 사업장관리번호
     * @param BIRTHDAY 주민번호또는사업자번호
     */
    kcomwelEmploymentInfoSession(USERNAME: string, ADMINNO: string, BIRTHDAY: string): Promise<EmploymentInfoSessionResponseData>;
    /**
     * 보수총액신고내역 [ReportedCompensationSession]
     * @param USERNAME 로그인용성명 (로그인세션 로그인 시 추출된 성명 또는 사업장명)
     * @param ADMINNO 사업장관리번호
     * @param SEARCHYEAR 조회년도 (YYYY)
     * @param BIRTHDAY 주민번호또는사업자번호
     */
    kcomwelReportedCompensationSession(USERNAME: string, ADMINNO: string, SEARCHYEAR: string, BIRTHDAY: string): Promise<ReportedCompensationSessionResponse>;
    /**
     * 사업장정보조회 [BusinessInfoInquirySession]
     * @param USERNAME 로그인용성명 (로그인세션 로그인 시 추출된 성명 또는 사업장명)
     * @param BIRTHDAY 주민번호 또는 사업자번호
     */
    kcomwelBusinessInfoInquirySession(USERNAME: string, BIRTHDAY: string): Promise<BusinessInfoInquirySessionResponse>;
    /**
     * 개인별 부과고지보험료 조회 [ChargeableInsuranceInquirySession]
     * @param USERNAME 성명
     * @param SUBCUSKIND 3: 일반근로자 (일반근로자만 조회 가능)
     * @param STARTDATE 조회시작년도 (YYYY)
     * @param ENDDATE 조회종료년도 (YYYY)
     * @param BIRTHDAY 주민번호또는사업자번호
     */
    kcomwelChargeableInsuranceInquirySession(USERNAME: string, SUBCUSKIND: string, STARTDATE: string, ENDDATE: string, BIRTHDAY: string): Promise<ChargeableInsuranceInquirySessionResponse>;
    /**
     * 개인별 부과고지보험료 조회 후 엑셀로 변환하여 전달 [ChargeableInsuranceInquirySession] :: Experimental
     * @param USERNAME 성명
     * @param SUBCUSKIND 3: 일반근로자 (일반근로자만 조회 가능)
     * @param STARTDATE 조회시작년도 (YYYY)
     * @param ENDDATE 조회종료년도 (YYYY)
     * @param BIRTHDAY 주민번호또는사업자번호
     */
    kcomwelChargeableInsuranceInquiryToExcel(USERNAME: string, SUBCUSKIND: string, STARTDATE: string, ENDDATE: string, BIRTHDAY: string): Promise<ChargeableInsuranceInquiryToExcelResponseDataOutfile[]>;
    kcomwelSearchAdminno(INSUGUBUN: string, REGNUMBER: string, BRANCHNAME: string, BRANCHCODE: string): Promise<SearchAdminnoResponse>;
    private get;
    private post;
    private sendRequest;
}
