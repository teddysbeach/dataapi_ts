
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { DataAPICrypto } from './util/crypto';
import endpoints from './util/endpoints';
import { CaptchaResponse } from './types/CaptchaResponse';
import SessionHometax from './types/hometax/SessionHometax';
import SessionKcomwel from './types/kcomwel/SessionKcomwel';
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
import BRANCHES from './util/branches';
import { BusinessInfoInquirySessionResponse } from './types/kcomwel/BusinessInfoInquirySession';
import * as XLSX from 'xlsx';

export default class DatahubAgent {
    private _axiosInstance: AxiosInstance;  // axios 인스턴스
    private _token: string;                 // 토큰
    private _crypto: DataAPICrypto;         // 암호화 모듈

    private _sessionHometax?: SessionHometax;           // 홈택스 세션
    private _sessionKcomwel?: SessionKcomwel;           // 고용정보현황 세션

    get isSessionHometaxCreated(): boolean { return this._sessionHometax !== undefined; }
    get isSessionKcomwelCreated(): boolean { return this._sessionKcomwel !== undefined; }
    get allBranches(): any[] { return BRANCHES; }

    constructor(isTest: boolean, token: string, key: string, iv: string) {
        const baseURL = isTest ? 'https://datahub-dev.scraping.co.kr' : 'https://api.mydatahub.co.kr';
        this._token = token;
        this._crypto = new DataAPICrypto(key, iv);
        this._axiosInstance = axios.create({ baseURL: baseURL, headers: { 'Content-Type': 'application/json'}});
    }

    private encrypt = (data: string): string => this._crypto.encrypt(data);

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
    public async hometaxLoginSessionSimple(
      USERGUBUN: string, // 1: 개인, 2: 개인사업자
      LOGINOPTION: string, // 0: 카카오톡, 1: 삼성패스 ...
      JUMINNUM: string,
      USERNAME: string,
      HPNUMBER: string,

      TELECOMGUBUN?: string,
      TXAGNTMGMTNO?: string,
      TXAGNTMGMTPW?: string,
    ): Promise<CaptchaResponse> {
      const data = {
        USERGUBUN,
        LOGINOPTION,
        TELECOMGUBUN,
        JUMINNUM,
        USERNAME,
        HPNUMBER,
        TXAGNTMGMTNO,
        TXAGNTMGMTPW,
      }

      data.JUMINNUM = this.encrypt(data.JUMINNUM);
      data.TXAGNTMGMTPW = data.TXAGNTMGMTPW !== undefined ? this.encrypt(data.TXAGNTMGMTPW) : undefined;
      return this.post<CaptchaResponse>(endpoints.LoginSessionSimpleHomeTax, data);
    }


    /**
     * 홈택스 간편인증 캡차확인 [hometax/Captcha]
     * 순서 : homtaxLoginSessionSimple -> 사용자의 폰인증 완료후 -> homtaxLoginSessionSimpleCaptcha -> 에이전트에 세션등록성공
     * @param data homtaxLoginSessionSimple의 응답 데이터를 그대로 전달할 것
     */
    public async hometaxLoginSessionSimpleCaptcha(data: CaptchaResponse): Promise<LoginSessionHomeTaxResponse> {
      const res = await this.post<LoginSessionHomeTaxResponse>(endpoints.Captcha, data.data);
      this._sessionHometax = res.data;
      console.log('[ * ] Hometax Login Session has been created. [간편로그인]');
      return res;
    }

    /**
     * 공동인증서 홈택스 로그인 세션 [hometax/LoginSession]
     * @param USERGUBUN 사용자구분, 1: 개인, 2: 개인사업자, 3: 법인사업자, 4: 세무사
     * @param P_CERTNAME 인증서명
     * @param P_CERTPWD 인증서비밀번호
     * @param P_SIGNCERT_DER 인증서DER (BASE64)
     * @param P_SIGNPRI_KEY 인증서개인키 (BASE64)
     */
    public async hometaxLoginSession(
      USERGUBUN: string, // 1: 개인, 2: 개인사업자,  3:법인, 4:세무사
      P_CERTNAME: string,
      P_CERTPWD: string,
      P_SIGNCERT_DER: string,
      P_SIGNPRI_KEY: string,
    ): Promise<LoginSessionHomeTaxResponse> {
      const data = {
        USERGUBUN,
        P_CERTNAME,
        P_CERTPWD,
        P_SIGNCERT_DER,
        P_SIGNPRI_KEY,
      }

      data.P_CERTPWD = this.encrypt(data.P_CERTPWD);
      const res = await this.post<LoginSessionHomeTaxResponse>(endpoints.LoginSessionHomeTax, data);
      if(res.result === 'FAIL') throw new Error(res.errMsg)
      this._sessionHometax = res.data;
      console.log('[ * ] Hometax Login Session has been created. [인증서]');
      return res
    }

    /* Kcomwel */

    /**
     * 로그인세션추출 [kcomwel/LoginSessionSimple]
     * @param USERGUBUN 사용자구분, 3: 사업장, 4: 사무대행
     * @param SUBCUSKIND 세부고객유형, 0: 대표자/소속직원, 2: 사업장명의인증서
     * @param USERNAME 로그인용성명 (간편인증 로그인시 필수필드)
     * @param LOGINOPTION 로그인옵션, 0: 카카오톡
     * @param JUMINNUM 주민번호또는사업자번호, (-)제외 13자리
     * @param HPNUMBER 휴대폰번호
     */
    public async kcomwelLoginSessionSimple(
      USERGUBUN: string,      // 3 : 사업장 | 4 : 사무대행
      SUBCUSKIND: string,     // 0 : 대표자/소속직원 | 2 : 사업장명의인증서
      USERNAME: string,
      LOGINOPTION: string,    // 0 : 카카오톡
      JUMINNUM: string,
      HPNUMBER: string,
    ): Promise<CaptchaResponse> {
      const data = {
        USERGUBUN,
        SUBCUSKIND,
        USERNAME,
        LOGINOPTION,
        JUMINNUM,
        HPNUMBER,
      }

      data.JUMINNUM = this.encrypt(data.JUMINNUM);
      return this.post<CaptchaResponse>(endpoints.LoginSessionSimpleKcomwel, data);
    }
    /**
     * 근로복지공단 간편인증 캡차확인 [kcomwel/Captcha]
     * 순서 : kcomwelLoginSessionSimple -> 사용자의 폰인증 완료후 -> kcomwelLoginSessionSimpleCaptcha -> 에이전트에 세션등록성공
     * @param data kcomwelLoginSessionSimple의 응답 데이터를 그대로 전달할 것
     */
    public async kcomwelLoginSessionSimpleCaptcha(data: CaptchaResponse): Promise<LoginSessionKcomwelResponse> {
      const res = await this.post<LoginSessionKcomwelResponse>(endpoints.Captcha, data.data);
      this._sessionKcomwel = res.data;
      console.log('[ * ] Kcomwel Login Session has been created. [간편로그인]');
      return res;
    }
    /**
     * 공동인증서 근로고용복지공단 로그인 세션 [kcomwel/LoginSession] 
     * @param USERGUBUN 사용자구분, 3: 사업장, 4: 사무대행
     * @param SUBCUSKIND 세부고객유형, 0: 대표자/소속직원, 2: 사업장명의인증서
     * @param REGNUMBER 사업자등록번호
     * @param P_CERTNAME 인증서명
     * @param P_CERTPWD 인증서비밀번호
     * @param P_SIGNCERT_DER 인증서DER (BASE64)
     * @param P_SIGNPRI_KEY 인증서개인키 (BASE64)
     */
    public async kcomwelLoginSession(
      USERGUBUN: string, // 사용자구분, 3: 사업장, 4: 사무대행
      SUBCUSKIND: string, // 세부고객유형, 0: 대표자/소속직원, 2: 사업장명의인증서
      REGNUMBER: string,
      P_CERTNAME: string,
      P_CERTPWD: string,
      P_SIGNCERT_DER: string,
      P_SIGNPRI_KEY: string,
    ): Promise<LoginSessionKcomwelResponse> {
      const data = {
        USERGUBUN,
        SUBCUSKIND,
        REGNUMBER,
        P_CERTNAME,
        P_CERTPWD,
        P_SIGNCERT_DER,
        P_SIGNPRI_KEY,
      }

      // data.P_CERTPWD = this.encrypt(data.P_CERTPWD); // 활성화
      data.REGNUMBER = this.encrypt(data.REGNUMBER);
      const res = await this.post<LoginSessionKcomwelResponse>(endpoints.LoginSessionKcomwel, data);
      this._sessionKcomwel = res.data;
      console.log('[ * ] Kcomwel Login Session has been created. [인증서]');
      return res
    }
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
    public async hometaxTaxReturnResultTotalSession(
      REGNUMBER: string,
      USERGUBUN: string,
      STARTDATE: string,
      ENDDATE: string,
      TAXKIND: string,
      HIDDENINFO?: string,
      SEARCHOPTION?: string,
      TXAGNTMGMTNO?: string,
      TXAGNTMGMTPW?: string,
    ): Promise<TaxReturnResultTotalSessionResponse> {
      if(!this.isSessionHometaxCreated) throw new Error('[ - ] Hometax Login Session is not created.')

      const data = {
        REGNUMBER,
        USERGUBUN,
        STARTDATE,
        ENDDATE,
        TAXKIND,
        HIDDENINFO,
        SEARCHOPTION,
        TXAGNTMGMTNO,
        TXAGNTMGMTPW,
        ...this._sessionHometax,
      }
      
      data.REGNUMBER = this.encrypt(data.REGNUMBER);
      data.TXAGNTMGMTPW = data.TXAGNTMGMTPW !== undefined ? this.encrypt(data.TXAGNTMGMTPW) : undefined;
      return this.post<TaxReturnResultTotalSessionResponse>(endpoints.TaxReturnResultTotalSession, data);
    }
    /**
     * 사업자등록증명원PDF [BusinessLicensePDFSession]
     * @param REGNUMBER 사업자등록번호, (-)제외 10자리
     * @param USERGUBUN 사용자구분, 2: 개인사업자, 3: 법인 사업자, 4: 세무사
     * @param JUMINYN 주민번호공개여부, 1: 공개, 2: 비공개
     */
    public async hometaxBusinessLicensePDFSession(
      REGNUMBER: string,
      USERGUBUN: string,    // 2 : 개인사업자, 3 : 법인 사업자, 4 : 세무사
      JUMINYN: string = "1",

      TELNUMBER?: string,
      HPNUMBER?: string,
      EMAIL?: string,
    ): Promise<BusinessLicenseSessionPDFResponseData> {
      if(!this.isSessionHometaxCreated) throw new Error('[ - ] Hometax Login Session is not created.')
      const data = {
        REGNUMBER,
        USERGUBUN,
        TELNUMBER,
        HPNUMBER,
        EMAIL,
        JUMINYN,
        OUTPUTDOCU: [{ OUTPUTDOCUTYPE : 'PDF'}],
        ...this._sessionHometax,
      }

      data.REGNUMBER = this.encrypt(data.REGNUMBER);
      return this.post<BusinessLicenseSessionPDFResponseData>(endpoints.BusinessLicensePDFSession, data);
    }
    /**
     * 사업자 수임동의 [AcceptOfAppoinmtSoleSession]
     * @param USERGUBUN 사용자구분, 1: 개인, 2: 개인사업자, 3: 법인사업자
     * @param REGNUMBER 사업자등록번호, (-)제외 10자리 (개인일경우 주민등록번호)
     */
    public async hometaxAcceptOfAppoinmtSoleSession(
      USERGUBUN: string,
      REGNUMBER?: string,
    ): Promise<AcceptOfAppoinmtSoleSessionResponse> {
      if(!this.isSessionHometaxCreated) throw new Error('[ - ] Hometax Login Session is not created.')
      const data = {
        USERGUBUN,
        REGNUMBER,
        ...this._sessionHometax,
      }

      data.REGNUMBER = data.REGNUMBER !== undefined ? this.encrypt(data.REGNUMBER) : undefined;
      return this.post<AcceptOfAppoinmtSoleSessionResponse>(endpoints.AcceptOfAppoinmtSoleSession, data);
    }
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
    public async hometaxTaxAccountantRetrieveRegSession(
        USERGUBUN: string,
        SAUPJAGUBUN: string,    
        CMJUMIN: string,
        TELNUMBER: string,
        HPNUMBER: string,         // Y:동의 | 그외:동의하지않음
        APPODATE: string,         // Y:동의 | 그외:동의하지않음
        INFOACCRO: string,        // 1:타소득포함 | 2:해당사업장
        REGNUMBER?: string,
        EMAIL?: string,
        TAXINFOALWHP?: string,
        TAXINFOALWEM?: string,
    ): Promise<TaxAccountantRetrieveRegSessionResponse> {
      const data = {
        USERGUBUN,
        SAUPJAGUBUN,
        CMJUMIN,
        TELNUMBER,
        HPNUMBER,
        APPODATE,
        INFOACCRO,
        REGNUMBER,
        EMAIL,
        TAXINFOALWHP,
        TAXINFOALWEM,
        ...this._sessionHometax,
      }

      data.REGNUMBER = data.REGNUMBER !== undefined ? this.encrypt(data.REGNUMBER) : undefined;
      data.CMJUMIN = this.encrypt(data.CMJUMIN);
      return this.post<TaxAccountantRetrieveRegSessionResponse>(endpoints.TaxAccountantRetrieveRegSession, data);

    }
    /**
     * 근로자고용정보현황 [EmploymentInfoSession]
     * @param USERNAME 로그인용성명 (로그인세션 로그인 시 추출된 성명 또는 사업장명)
     * @param ADMINNO 사업장관리번호
     * @param BIRTHDAY 주민번호또는사업자번호
     */
    public async kcomwelEmploymentInfoSession(
      USERNAME: string,
      ADMINNO: string,
      BIRTHDAY: string,
    ): Promise<EmploymentInfoSessionResponseData> {
      if(!this.isSessionKcomwelCreated) throw new Error('[ - ] Kcomwel Login Session is not created.')
      const data = {
        USERNAME,
        ADMINNO,
        BIRTHDAY,
        OUTPUTDOCU: [{ OUTPUTDOCUTYPE: 'EXCEL' }],
        ...this._sessionKcomwel,
      }

      data.BIRTHDAY = this.encrypt(data.BIRTHDAY);
      return this.post<EmploymentInfoSessionResponseData>(endpoints.EmploymentInfoSession, data);
    }
    /**
     * 보수총액신고내역 [ReportedCompensationSession]
     * @param USERNAME 로그인용성명 (로그인세션 로그인 시 추출된 성명 또는 사업장명)
     * @param ADMINNO 사업장관리번호
     * @param SEARCHYEAR 조회년도 (YYYY)
     * @param BIRTHDAY 주민번호또는사업자번호
     */
    public async kcomwelReportedCompensationSession(
      USERNAME: string,
      ADMINNO: string,
      SEARCHYEAR: string,
      BIRTHDAY: string,
    ): Promise<ReportedCompensationSessionResponse> {
      if(!this.isSessionKcomwelCreated) throw new Error('[ - ] Kcomwel Login Session is not created.')
      const data = {
        USERNAME,
        ADMINNO,
        SEARCHYEAR,
        BIRTHDAY,
        OUTPUTDOCU: [{ OUTPUTDOCUTYPE: 'EXCEL' }],
        ...this._sessionKcomwel,
      }

      data.BIRTHDAY = this.encrypt(data.BIRTHDAY);
      return this.post<ReportedCompensationSessionResponse>(endpoints.ReportedCompensationSession, data);

    }
    /**
     * 사업장정보조회 [BusinessInfoInquirySession]
     * @param USERNAME 로그인용성명 (로그인세션 로그인 시 추출된 성명 또는 사업장명)
     * @param BIRTHDAY 주민번호 또는 사업자번호
     */
    public async kcomwelBusinessInfoInquirySession(
      USERNAME: string,
      BIRTHDAY: string,
    ): Promise<BusinessInfoInquirySessionResponse> {
      if(!this.isSessionKcomwelCreated) throw new Error('[ - ] Kcomwel Login Session is not created.')
      const data = {
        USERNAME,
        BIRTHDAY,
        ...this._sessionKcomwel,
      }

      data.BIRTHDAY = this.encrypt(data.BIRTHDAY);
      return this.post(endpoints.BusinessInfoInquirySession, data);
    }
    /**
     * 개인별 부과고지보험료 조회 [ChargeableInsuranceInquirySession]
     * @param USERNAME 성명
     * @param SUBCUSKIND 3: 일반근로자 (일반근로자만 조회 가능)
     * @param STARTDATE 조회시작년도 (YYYY)
     * @param ENDDATE 조회종료년도 (YYYY)
     * @param BIRTHDAY 주민번호또는사업자번호
     */
    public async kcomwelChargeableInsuranceInquirySession(
          USERNAME: string,
          SUBCUSKIND: string,
          STARTDATE: string,
          ENDDATE: string,
          BIRTHDAY: string,
    ): Promise<ChargeableInsuranceInquirySessionResponse> {
      if(!this.isSessionKcomwelCreated) throw new Error('[ - ] Kcomwel Login Session is not created.')
      const data = {
        USERNAME,
        SUBCUSKIND,
        STARTDATE,
        ENDDATE,
        BIRTHDAY,
        ...this._sessionKcomwel,
      }

      data.BIRTHDAY = this.encrypt(data.BIRTHDAY);
      return this.post<ChargeableInsuranceInquirySessionResponse>(endpoints.ChargeableInsuranceInquirySession, data);
    }
    /**
     * 개인별 부과고지보험료 조회 후 엑셀로 변환하여 전달 [ChargeableInsuranceInquirySession] :: Experimental
     * @param USERNAME 성명
     * @param SUBCUSKIND 3: 일반근로자 (일반근로자만 조회 가능)
     * @param STARTDATE 조회시작년도 (YYYY)
     * @param ENDDATE 조회종료년도 (YYYY)
     * @param BIRTHDAY 주민번호또는사업자번호
     */
    public async kcomwelChargeableInsuranceInquiryExcel(
      USERNAME: string,
      SUBCUSKIND: string,
      STARTDATE: string,
      ENDDATE: string,
      BIRTHDAY: string,
    ): Promise<any[]> {
      // if(!this.isSessionKcomwelCreated) throw new Error('[ - ] Kcomwel Login Session is not created.')
      const data = {
        USERNAME,
        SUBCUSKIND,
        STARTDATE,
        ENDDATE,
        BIRTHDAY,
        ...this._sessionKcomwel,
      }

      data.BIRTHDAY = this.encrypt(data.BIRTHDAY);
      // const res = await this.post<ChargeableInsuranceInquirySessionResponse>(endpoints.ChargeableInsuranceInquirySession, data);
      const res = {
        "errCode" : "0000",
        "errMsg" : "success",
        "result" : "SUCCESS",
        "data" : {
          "ETRACK" : "",
          "ERRMSG" : "",
          "NTCINSPRMLIST" : [ {
            "SAEOPJANGINFO" : {
              "HOISAMYUNG" : "기웅정보통신(주)",
              "JUSO" : "서울 금천구 가산디지털2로 982 (가산동)",
              "ADMINNO" : "21481593940",
              "PRENAME" : "홍길동"
            },
            "GEUNROJAINFO" : {
              "SJBJAGYEOKCHWIDEUKDT" : "20210101",
              "USERNAME" : "홍길동",
              "SJBJAGYEOKSANGSILDT" : "",
              "GEUNROJAGUBUN" : "일반",
              "SJBJEONGEUNDT" : "",
              "GYBJEONGEUNDT" : "",
              "GYBJAGYEOKSANGSILDT" : "",
              "BIRTHDAY" : "990101",
              "GYBJAGYEOKCHWIDEUKDT" : "20210101"
            },
            "INSYEAR" : "2022",
            "REGNUM" : "2148159394",
            "GEUNROJANTCINSPRMINFO" : {
              "GYINFOLIST" : [ {
                "GYMMAVGBOSUPRC" : "5000000",
                "GAJNBHR" : "50000",
                "SANJENGSGBOSUAK" : "5000000",
                "INSMNTHL" : "1",
                "SANJENGGAJNBOSUAK" : "5000000",
                "SGGEUNROJABUDAMBHR" : "50000",
                "GEUNMUILSU" : "31",
                "SGSAEOPJABUDAMBHR" : "50000"
              }, {
                "GYMMAVGBOSUPRC" : "5000000",
                "GAJNBHR" : "50000",
                "SANJENGSGBOSUAK" : "5000000",
                "INSMNTHL" : "2",
                "SANJENGGAJNBOSUAK" : "5000000",
                "SGGEUNROJABUDAMBHR" : "50000",
                "GEUNMUILSU" : "28",
                "SGSAEOPJABUDAMBHR" : "50000"
              } ]
            }
          } ],
          "ECODE" : "",
          "ERRDOC" : "",
          "RESULT" : "SUCCESS"
        }
      }
      if(res.result === 'SUCCESS' && res.data.RESULT === 'SUCCESS'){
        const items = res.data.NTCINSPRMLIST.map((item) => {
          let OUTTEMP: any = {};
          OUTTEMP['회사명'] = item.SAEOPJANGINFO.HOISAMYUNG;
          OUTTEMP['회사주소'] = item.SAEOPJANGINFO.JUSO;
          OUTTEMP['사업자등록번호'] = item.REGNUM;
          OUTTEMP['사업장관리번호'] = item.SAEOPJANGINFO.ADMINNO;
          OUTTEMP['대표자명'] = item.SAEOPJANGINFO.PRENAME;
          OUTTEMP['성명'] = item.GEUNROJAINFO.USERNAME;
          OUTTEMP['근로자생년월일'] = item.GEUNROJAINFO.BIRTHDAY;
          OUTTEMP['근로자구분'] = item.GEUNROJAINFO.GEUNROJAGUBUN;
          OUTTEMP['산재보험 고용일'] = item.GEUNROJAINFO.SJBJAGYEOKCHWIDEUKDT;
          OUTTEMP['산재보험 고용종료일'] = item.GEUNROJAINFO.SJBJAGYEOKSANGSILDT;
          OUTTEMP['산재보험 전근일'] = item.GEUNROJAINFO.SJBJEONGEUNDT;
          OUTTEMP['고용보험 취득일'] = item.GEUNROJAINFO.GYBJAGYEOKCHWIDEUKDT;
          OUTTEMP['고용보험 상실일'] = item.GEUNROJAINFO.GYBJAGYEOKSANGSILDT;
          OUTTEMP['고용보험 전근일'] = item.GEUNROJAINFO.GYBJEONGEUNDT;
          item.GEUNROJANTCINSPRMINFO.GYINFOLIST.map((item2, idx) => {
            OUTTEMP[`${idx+1}-보험월`] = item2.INSMNTHL;
            OUTTEMP[`${idx+1}-(실급)산정보수액`] = item2.SANJENGSGBOSUAK;
            OUTTEMP[`${idx+1}-(고직)산정보수액`] = item2.SANJENGGAJNBOSUAK;
            OUTTEMP[`${idx+1}-월평균보수 고용`] = item2.GYMMAVGBOSUPRC;
            OUTTEMP[`${idx+1}-근무일수`] = item2.GEUNMUILSU;
            OUTTEMP[`${idx+1}-(실급)근로자보험료`] = item2.SGGEUNROJABUDAMBHR;
            OUTTEMP[`${idx+1}-(실급)사업주보험료`] = item2.SGSAEOPJABUDAMBHR;
            OUTTEMP[`${idx+1}-(고직)사업주보험료`] = item2.GAJNBHR;
          })

          // OUTTEMP TO BASE64 EXCEL FILE
          let wb = XLSX.utils.book_new();
          let ws = XLSX.utils.json_to_sheet([OUTTEMP]);
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          let buf = XLSX.write(wb, {bookType: 'xlsx', type: 'buffer'});
          let base64Encoded = buf.toString('base64');

          return {
            OUTTYPE: 'EXCEL',
            OUTDATA: base64Encoded
          }
        })
        return {
          ...res,
          ...items
        }
      }
      return [];
    }

    public async kcomwelSearchAdminno(
      INSUGUBUN: string,
      REGNUMBER: string,
      BRANCHNAME: string,
      BRANCHCODE: string,
    ): Promise<SearchAdminnoResponse> {
      const data = {
        INSUGUBUN,
        REGNUMBER,
        BRANCHNAME,
        BRANCHCODE,
      }

      data.REGNUMBER = this.encrypt(data.REGNUMBER);
      return this.post<SearchAdminnoResponse>(endpoints.SearchAdminno, data);
    }


    // HTTP REQUEST
    private async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
      return this.sendRequest<T>(endpoint, 'GET', undefined, config);
    }
  
    private async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
      return this.sendRequest<T>(endpoint, 'POST', data, config);
    }
    
    private async sendRequest<T>(endpoint: string, method: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const headers = {
          Authorization: `Token ${this._token}`,
          ...config?.headers 
        }
        const response = await this._axiosInstance.request<T>({
          url: endpoint,
          method: method,
          headers,
          data,
          ...config,
        });
    
        if (response.status >= 400) {
          throw new Error(`Request failed with status code ${response.status}`);
        }
    
        return response.data;
    }
}