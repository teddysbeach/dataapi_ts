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

export default class DatahubAgent {
    private _axiosInstance: AxiosInstance;  // axios 인스턴스
    private _token: string;                 // 토큰
    private _crypto: DataAPICrypto;         // 암호화 모듈

    private _sessionHometax?: SessionHometax;           // 홈택스 세션
    private _sessionKcomwel?: SessionKcomwel;           // 고용정보현황 세션

    get isSessionHometaxCreated(): boolean { return this._sessionHometax !== undefined; }
    get isSessionKcomwelCreated(): boolean { return this._sessionKcomwel !== undefined; }

    constructor(isTest: boolean, token: string, key: string, iv: string) {
        const baseURL = isTest ? 'https://datahub-dev.scraping.co.kr' : 'https://api.mydatahub.co.kr';
        this._token = token;
        this._crypto = new DataAPICrypto(key, iv);
        this._axiosInstance = axios.create({ baseURL: baseURL, headers: { 'Content-Type': 'application/json'}});
    }

    private encrypt = (data: string): string => this._crypto.encrypt(data);

    /** LOGIN API **/
    /* Hometax */
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

    public async hometaxLoginSessionSimpleCaptcha(data: CaptchaResponse): Promise<LoginSessionHomeTaxResponse> {
      const res = await this.post<LoginSessionHomeTaxResponse>(endpoints.Captcha, data.data);
      this._sessionHometax = res.data;
      console.log('[ * ] Hometax Login Session has been created. [간편로그인]');
      return res;
    }

    public async hometaxLoginSession(
      USERGUBUN: string, // 1: 개인, 2: 개인사업자
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
      this._sessionHometax = res.data;
      console.log('[ * ] Hometax Login Session has been created.');
      return res
    }

    /* Kcomwel */
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

    public async kcomwelLoginSessionSimpleCaptcha(data: CaptchaResponse): Promise<LoginSessionKcomwelResponse> {
      const res = await this.post<LoginSessionKcomwelResponse>(endpoints.Captcha, data.data);
      this._sessionKcomwel = res.data;
      console.log('[ * ] Kcomwel Login Session has been created. [간편로그인]');
      return res;
    }
    

    // Hometax API
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

    // Kcomwel API
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