"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BRANCHES = [
    {
        "BRANCHNAME": "강릉지사",
        "BRANCHCODE": "2130"
    },
    {
        "BRANCHNAME": "강원지역본부",
        "BRANCHCODE": "2140"
    },
    {
        "BRANCHNAME": "경기요양병원",
        "BRANCHCODE": "8109"
    },
    {
        "BRANCHNAME": "경남업무상질병판정위원회",
        "BRANCHCODE": "3401"
    },
    {
        "BRANCHNAME": "경산지사",
        "BRANCHCODE": "4001"
    },
    {
        "BRANCHNAME": "경인업무상질병판정위원회",
        "BRANCHCODE": "5400"
    },
    {
        "BRANCHNAME": "경인지역본부",
        "BRANCHCODE": "5000"
    },
    {
        "BRANCHNAME": "경인특수형태근로종사자센터",
        "BRANCHCODE": "5300"
    },
    {
        "BRANCHNAME": "고양지사",
        "BRANCHCODE": "5180"
    },
    {
        "BRANCHNAME": "공단본부",
        "BRANCHCODE": "1000"
    },
    {
        "BRANCHNAME": "광산지사",
        "BRANCHCODE": "6001"
    },
    {
        "BRANCHNAME": "광주고객지원센터",
        "BRANCHCODE": "6500"
    },
    {
        "BRANCHNAME": "광주업무상질병판정위원회",
        "BRANCHCODE": "6400"
    },
    {
        "BRANCHNAME": "광주지역본부",
        "BRANCHCODE": "6000"
    },
    {
        "BRANCHNAME": "구미지사",
        "BRANCHCODE": "4120"
    },
    {
        "BRANCHNAME": "군산지사",
        "BRANCHCODE": "6130"
    },
    {
        "BRANCHNAME": "김해지사",
        "BRANCHCODE": "3160"
    },
    {
        "BRANCHNAME": "남양주지사",
        "BRANCHCODE": "2080"
    },
    {
        "BRANCHNAME": "대구병원",
        "BRANCHCODE": "8111"
    },
    {
        "BRANCHNAME": "대구북부지사",
        "BRANCHCODE": "4030"
    },
    {
        "BRANCHNAME": "대구서부지사",
        "BRANCHCODE": "4020"
    },
    {
        "BRANCHNAME": "대구업무상질병판정위원회",
        "BRANCHCODE": "4400"
    },
    {
        "BRANCHNAME": "대구지역본부",
        "BRANCHCODE": "4000"
    },
    {
        "BRANCHNAME": "대전동부지사",
        "BRANCHCODE": "7130"
    },
    {
        "BRANCHNAME": "대전병원",
        "BRANCHCODE": "8105"
    },
    {
        "BRANCHNAME": "대전서부지사",
        "BRANCHCODE": "7001"
    },
    {
        "BRANCHNAME": "대전업무상질병판정위원회",
        "BRANCHCODE": "7400"
    },
    {
        "BRANCHNAME": "대전지역본부",
        "BRANCHCODE": "7000"
    },
    {
        "BRANCHNAME": "대전특수형태근로종사자센터",
        "BRANCHCODE": "7300"
    },
    {
        "BRANCHNAME": "동해병원",
        "BRANCHCODE": "8107"
    },
    {
        "BRANCHNAME": "목포지사",
        "BRANCHCODE": "6210"
    },
    {
        "BRANCHNAME": "보령지사",
        "BRANCHCODE": "7220"
    },
    {
        "BRANCHNAME": "부산동부지사",
        "BRANCHCODE": "3010"
    },
    {
        "BRANCHNAME": "부산북부지사",
        "BRANCHCODE": "3020"
    },
    {
        "BRANCHNAME": "부산업무상질병판정위원회",
        "BRANCHCODE": "3400"
    },
    {
        "BRANCHNAME": "부산중부지사",
        "BRANCHCODE": "3001"
    },
    {
        "BRANCHNAME": "부산지역본부",
        "BRANCHCODE": "3000"
    },
    {
        "BRANCHNAME": "부산특수형태근로종사자센터",
        "BRANCHCODE": "3300"
    },
    {
        "BRANCHNAME": "부천지사",
        "BRANCHCODE": "5120"
    },
    {
        "BRANCHNAME": "서산지사",
        "BRANCHCODE": "7230"
    },
    {
        "BRANCHNAME": "서울강남지사",
        "BRANCHCODE": "2010"
    },
    {
        "BRANCHNAME": "서울관악지사",
        "BRANCHCODE": "2060"
    },
    {
        "BRANCHNAME": "서울남부업무상질병판정위원회",
        "BRANCHCODE": "2400"
    },
    {
        "BRANCHNAME": "서울남부지사",
        "BRANCHCODE": "2040"
    },
    {
        "BRANCHNAME": "서울동부지사",
        "BRANCHCODE": "2020"
    },
    {
        "BRANCHNAME": "서울북부업무상질병판정위원회",
        "BRANCHCODE": "2401"
    },
    {
        "BRANCHNAME": "서울북부지사",
        "BRANCHCODE": "2050"
    },
    {
        "BRANCHNAME": "서울서부지사",
        "BRANCHCODE": "2030"
    },
    {
        "BRANCHNAME": "서울서초지사",
        "BRANCHCODE": "2011"
    },
    {
        "BRANCHNAME": "서울성동지사",
        "BRANCHCODE": "2021"
    },
    {
        "BRANCHNAME": "서울지역본부",
        "BRANCHCODE": "2000"
    },
    {
        "BRANCHNAME": "서울특수형태근로종사자센터",
        "BRANCHCODE": "2300"
    },
    {
        "BRANCHNAME": "성남지사",
        "BRANCHCODE": "5160"
    },
    {
        "BRANCHNAME": "수원지사",
        "BRANCHCODE": "5110"
    },
    {
        "BRANCHNAME": "순천병원",
        "BRANCHCODE": "8104"
    },
    {
        "BRANCHNAME": "순천지사",
        "BRANCHCODE": "6230"
    },
    {
        "BRANCHNAME": "안동지사",
        "BRANCHCODE": "4140"
    },
    {
        "BRANCHNAME": "안산병원",
        "BRANCHCODE": "8102"
    },
    {
        "BRANCHNAME": "안산지사",
        "BRANCHCODE": "5140"
    },
    {
        "BRANCHNAME": "안양지사",
        "BRANCHCODE": "5130"
    },
    {
        "BRANCHNAME": "양산지사",
        "BRANCHCODE": "3130"
    },
    {
        "BRANCHNAME": "여수지사",
        "BRANCHCODE": "6220"
    },
    {
        "BRANCHNAME": "영월지사",
        "BRANCHCODE": "2150"
    },
    {
        "BRANCHNAME": "영주지사",
        "BRANCHCODE": "4130"
    },
    {
        "BRANCHNAME": "용인지사",
        "BRANCHCODE": "5210"
    },
    {
        "BRANCHNAME": "울산고객지원센터",
        "BRANCHCODE": "3200"
    },
    {
        "BRANCHNAME": "울산병원건립추진단",
        "BRANCHCODE": "9011"
    },
    {
        "BRANCHNAME": "울산지사",
        "BRANCHCODE": "3120"
    },
    {
        "BRANCHNAME": "의정부지사",
        "BRANCHCODE": "2070"
    },
    {
        "BRANCHNAME": "익산지사",
        "BRANCHCODE": "6120"
    },
    {
        "BRANCHNAME": "인재개발원",
        "BRANCHCODE": "8200"
    },
    {
        "BRANCHNAME": "인천고객지원센터",
        "BRANCHCODE": "5011"
    },
    {
        "BRANCHNAME": "인천병원",
        "BRANCHCODE": "8101"
    },
    {
        "BRANCHNAME": "인천북부지사",
        "BRANCHCODE": "5010"
    },
    {
        "BRANCHNAME": "재활공학연구소",
        "BRANCHCODE": "2500"
    },
    {
        "BRANCHNAME": "전주지사",
        "BRANCHCODE": "6110"
    },
    {
        "BRANCHNAME": "정선병원",
        "BRANCHCODE": "8108"
    },
    {
        "BRANCHNAME": "제주지사",
        "BRANCHCODE": "6310"
    },
    {
        "BRANCHNAME": "진주지사",
        "BRANCHCODE": "3140"
    },
    {
        "BRANCHNAME": "창원병원",
        "BRANCHCODE": "8103"
    },
    {
        "BRANCHNAME": "창원지사",
        "BRANCHCODE": "3110"
    },
    {
        "BRANCHNAME": "천안지사",
        "BRANCHCODE": "7210"
    },
    {
        "BRANCHNAME": "청주지사",
        "BRANCHCODE": "7110"
    },
    {
        "BRANCHNAME": "춘천지사",
        "BRANCHCODE": "2110"
    },
    {
        "BRANCHNAME": "충주지사",
        "BRANCHCODE": "7120"
    },
    {
        "BRANCHNAME": "콜센터",
        "BRANCHCODE": "8500"
    },
    {
        "BRANCHNAME": "태백병원",
        "BRANCHCODE": "8106"
    },
    {
        "BRANCHNAME": "태백지사",
        "BRANCHCODE": "2120"
    },
    {
        "BRANCHNAME": "통영지사",
        "BRANCHCODE": "3150"
    },
    {
        "BRANCHNAME": "파주지사",
        "BRANCHCODE": "5220"
    },
    {
        "BRANCHNAME": "평택지사",
        "BRANCHCODE": "5170"
    },
    {
        "BRANCHNAME": "포항지사",
        "BRANCHCODE": "4110"
    },
    {
        "BRANCHNAME": "화성지사",
        "BRANCHCODE": "5190"
    }
];
exports.default = BRANCHES;
