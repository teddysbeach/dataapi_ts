const endpoints = {
    Captcha:                            '/scrap/captcha',                                                   // 캡차콜백
    
    // HomeTax
    LoginSessionSimpleHomeTax:          '/scrap/common/hometax/LoginSessionSimple',                         // 홈택스 로그인세션 추출(간편인증)
    LoginSessionHomeTax:                '/scrap/common/hometax/LoginSession',                               // 홈택스 로그인세션 추출(인증서로그인)
    TaxReturnResultTotalSession:        '/scrap/common/hometax/TaxReturnResultTotalSession',                // 홈택스 세금신고결과 전체조회(로그인세션)
    TaxAccountantRetrieveRegSession:    '/scrap/common/hometax/TaxAccountantRetrieveRegSession',            // 홈택스 세무사 수임등록 조회(로그인세션)
    AcceptOfAppoinmtSoleSession:        '/scrap/common/hometax/AcceptOfAppoinmtSoleSession',                // 홈택스 사업자 수임동의 (로그인세션)
    BusinessLicensePDFSession:          '/scrap/common/hometax/BusinessLicensePDFSession',                  // 홈택스 사업자등록증명원 조회(로그인세션)

    // Kcomwel
    EmploymentInfoSession:              '/scrap/corpTax/kcomwel/EmploymentInfoSession',                     // 고용정보 근로자고용정보현황(로그인세션)
    LoginSessionSimpleKcomwel:          '/scrap/corpTax/kcomwel/LoginSessionSimple',                        // 고용정보 로그인세션 추출(간편인증)
    LoginSessionKcomwel:                '/scrap/corpTax/kcomwel/LoginSession',                              // 고용정보 로그인세션 추출(인증서로그인)
    ReportedCompensationSession:        '/scrap/corpTax/kcomwel/ReportedCompensationSession',               // 고용정보 보수총액신고내역(로그인세션)
    ChargeableInsuranceInquirySession:  '/scrap/corpTax/kcomwel/ChargeableInsuranceInquirySession',         // 고용정보 개인별 부과고지보험료 조회(로그인세션)
    SearchAdminno:                      '/scrap/corpTax/kcomwel/SearchAdminno',                             // 고용정보 사업자등록번호조회
    SearchAdminnoBranch:                '/scrap/corpTax/kcomwel/SearchAdminnoBranch',                       // 고용정보 사업장관리번호 지사 목록 조회 
}

export default endpoints