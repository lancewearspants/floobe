다음은 \*\*루트 경로(`/`)에 생성되는 메인페이지(Home 화면)\*\*에 대한 전체 기능명세서입니다. 사용자의 UX 흐름, 디자인 가이드, ShadCN 컴포넌트 우선 사용 원칙에 따라 정리했습니다.

---

## ✅ 메인페이지 (홈 화면) 기능명세서

---

### ✅ 프론트엔드 기능명세서

1. **화면 레이아웃 및 디자인 명세**

* **페이지 경로**: `app/page.tsx`

* **사용 컴포넌트 구조**:

  * `app/HomeSearchSection.tsx`: 검색창 및 버튼
  * `app/PromoBannerSection.tsx`: 이벤트/특가 배너
  * `app/RecommendedClinics.tsx`: 추천 병원 리스트

* **레이아웃 상세**:

  ```
  [HomeSearchSection]
    - Input (ShadCN): placeholder = "시술명 또는 병원명 입력"
    - Button (ShadCN): "시술 검색"
    - Button (ShadCN): "병원 검색"

  [PromoBannerSection]
    - 슬라이드 또는 고정형 배너
    - 내용: 인기 시술 / 특가 이벤트

  [RecommendedClinics]
    - Card (ShadCN): 병원 썸네일 + 이름 + 위치 + 평점
    - 가로 스크롤 or 그리드 레이아웃
  ```

* **ShadCN 컴포넌트 사용 내역**:

  * `Input`: 검색창
  * `Button`: 검색 버튼
  * `Card`: 병원 리스트
  * `useToast`: 검색어 없을 때 경고
  * `Skeleton`: 병원 리스트 로딩 상태 처리

2. **사용자 흐름 및 상호작용**

* 검색창에 검색어 입력 → 시술 검색 클릭 → `/treatments/search?query=검색어`
* 검색창에 검색어 입력 → 병원 검색 클릭 → `/clinics/search?query=검색어`
* 검색어 미입력 시 Toast 알림 표시
* 추천 병원 클릭 시 `/clinics/[id]` 페이지로 이동

3. **API 연동**

* API 호출: `GET /api/clinics/recommended`
* 클라이언트 요청 시 `RecommendedClinics` 컴포넌트 내에서 호출
* 로딩 시 `Skeleton` 표시, 실패 시 기본 메시지 노출

4. **테스트 항목**

* [ ] 입력창에 일본어/한글 혼용 입력 시 정상 작동 여부
* [ ] 버튼 클릭 시 검색어 없이 `Toast` 노출 확인
* [ ] 추천 병원 리스트가 5개 이하일 경우 적절한 UI 처리
* [ ] 병원 클릭 시 상세 페이지로 이동
* [ ] 반응형 레이아웃 정상 작동 여부 확인

---

### ✅ 백엔드 기능명세서

1. **API 정의**

* **파일 경로**: `app/api/clinics/recommended/route.ts`
* **HTTP 메서드**: `GET`
* **요청 파라미터**: 없음
* **응답 구조**:

  ```ts
  type Clinic = {
    id: string;
    name: string;
    location: string;
    rating: number;
    thumbnailUrl: string;
  };

  type ApiResponse = {
    clinics: Clinic[];
  };
  ```

2. **데이터베이스 설계 및 연동**

* **DB 테이블**: `clinics`
* **조회 조건**:

  * `is_active = true`
  * 평점 기준 내림차순 정렬 (`rating DESC`)
  * 최대 5개 병원 반환
* **사용 컬럼**: `id`, `name`, `location`, `rating`, `thumbnail_url`

3. **테스트 항목**

* [ ] 병원 데이터가 정렬 순으로 반환되는지
* [ ] `is_active = false`인 병원이 포함되지 않는지
* [ ] 썸네일이 없을 경우 기본 이미지 처리되는지
* [ ] API 응답 속도 적절한지 (500ms 이하 권장)
* [ ] 오류 발생 시 `500` 응답과 메시지 포함 여부 확인

---

