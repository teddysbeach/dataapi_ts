"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints = {
    Captcha: '/scrap/captcha',
    // HomeTax
    LoginSessionSimpleHomeTax: '/scrap/common/hometax/LoginSessionSimple',
    LoginSessionHomeTax: '/scrap/common/hometax/LoginSession',
    TaxReturnResultTotalSession: '/scrap/common/hometax/TaxReturnResultTotalSession',
    TaxAccountantRetrieveRegSession: '/scrap/common/hometax/TaxAccountantRetrieveRegSession',
    AcceptOfAppoinmtSoleSession: '/scrap/common/hometax/AcceptOfAppoinmtSoleSession',
    BusinessLicensePDFSession: '/scrap/common/hometax/BusinessLicensePDFSession',
    // Kcomwel
    EmploymentInfoSession: '/scrap/corpTax/kcomwel/EmploymentInfoSession',
    LoginSessionSimpleKcomwel: '/scrap/corpTax/kcomwel/LoginSessionSimple',
    ReportedCompensationSession: '/scrap/corpTax/kcomwel/ReportedCompensationSession',
    ChargeableInsuranceInquirySession: '/scrap/corpTax/kcomwel/ChargeableInsuranceInquirySession',
    SearchAdminno: '/scrap/corpTax/kcomwel/SearchAdminno',
    SearchAdminnoBranch: '/scrap/corpTax/kcomwel/SearchAdminnoBranch', // 고용정보 사업장관리번호 지사 목록 조회 
};
exports.default = endpoints;
