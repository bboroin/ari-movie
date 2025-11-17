<p align="center">
<img width="350" height="200" alt="logo" src="https://github.com/user-attachments/assets/e35f4eb3-15bf-43c2-a689-c62f7f731718" />
</p>

# Ari-Movie
### TMDB API 기반 React 토이 프로젝트

> 프로젝트 기간 : 2025.10.07 ~ 2025.11.13
> 
> URL : [https://youtube-ari.netlify.app/](https://ari-movie.vercel.app/)
>
> 목표 : TMDB 오픈 API를 기반으로 영화 정보·검색·추천 기능을 하나의 웹 페이지로 재구성하는 것

## 🎯 구현 기능
- **TMDB 오픈 API 연동**  
  인기·현재 상영작·장르·검색·추천·상세 등 다양한 엔드포인트 활용  
  TMDB API 상세 구조는 [Wiki](https://github.com/bboroin/ari-movie.wiki.git)에서 확인 가능

- **공통 API 유틸 모듈화**  
  `BASE_URL`, 언어/지역 설정, Bearer Token 인증 등을 공통화하여 일관된 요청 처리

- **로딩 스켈레톤 UI**  
  `react-content-loader`를 활용해 섹션별 데이터 로딩 상태를 시각적으로 표현

- **장르 필터링 기능**  
  다중 장르 선택을 지원하며, 선택된 장르에 맞는 영화 목록 조회

- **정렬 기능**  
  TMDB 서버 정렬 옵션 적용(인기순 / 평점순 / 최신순)

- **페이지네이션(Pagination)**  
  영화 목록을 페이지 단위로 나눠 탐색할 수 있도록 구현

- **즐겨찾기 기능**  
  로컬스토리지를 이용해 영화 즐겨찾기 추가·삭제 및 상태 유지

## ⚒️ 기술 스택
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">  

<img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/react--content--loader-61DAFB?style=for-the-badge&logo=React&logoColor=white" /> <img src="https://img.shields.io/badge/swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white">

<img src="https://img.shields.io/badge/themoviedatabase-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white">

## 📂 파일 구조
<img width="233" height="774" alt="image" src="https://github.com/user-attachments/assets/09956077-60c5-4541-a183-9c27da8d25f9" />


## 👀 구현 화면

<table>
  <tr>
    <th width="50%">메인(Home) 페이지</th>
    <th width="50%">검색(Search) 페이지</th>
  </tr>

  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/95b6a067-b1d0-407a-b67c-47117a08f392" width="100%" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/ff413f07-2725-45df-833f-748ed74d73c5" width="100%" />
    </td>
  </tr>

  <tr>
    <td valign="top">
      <ul>
        <li>트렌딩 / 현재 상영작 / 개봉 예정작 섹션</li>
        <li>히어로(대표 영화) 배너</li>
      </ul>
    </td>
    <td valign="top">
      <ul>
        <li>URL 쿼리 기반 상태 관리(q, page)</li>
        <li>정렬 및 페이지네이션 적용</li>
      </ul>
    </td>
  </tr>
</table>

<table>
  <tr>
    <th width="50%">상세(Detail) 페이지</th>
    <th width="50%">장르(Genre) 페이지</th>
  </tr>

  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/41b5d7a6-e7cb-4af0-b820-b86d38a68813" width="100%" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/d81fcb6c-7480-435f-9a13-102c0bb19820" width="100%" />
    </td>
  </tr>

  <tr>
    <td valign="top">
      <ul>
        <li>기본 정보(제목/개봉일/러닝타임/장르/태그라인 등)</li>
        <li>출연/제작진, 미디어, 시리즈/추천 영화 Swiper</li>
        <li>추가 정보(원제/원어/제작비/수익률/키워드/외부 링크 등)</li>
        <li>즐겨찾기 추가/삭제</li>
      </ul>
    </td>
    <td valign="top">
      <ul>
        <li>장르 필터 선택 기반 조회</li>
        <li>정렬 및 페이지네이션 적용</li>
        <li>URL 기반 상태 관리(genre, sort, page)</li>
      </ul>
    </td>
  </tr>
</table>

<table>
  <tr>
    <th width="50%">즐겨찾기(MyPage)</th>
    <th width="50%">반응형 UI</th>
  </tr>

  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/a33349e7-bc4e-4588-88f4-49650fbc5f7a" width="100%" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/8bc05eea-e634-4fc8-98d1-b49fda26f0ad" width="100%" />
    </td>
  </tr>

  <tr>
    <td valign="top">
      <ul>
        <li>즐겨찾기 선택한 영화 리스트 조회</li>
        <li>로컬스토리지 기반 상태 유지</li>
      </ul>
    </td>
    <td valign="top">
      <ul>
        <li>모바일(max-width: 767px) UI 최적화</li>
        <li>태블릿(max-width: 1023px) UI 최적화</li>
      </ul>
    </td>
  </tr>
</table>






