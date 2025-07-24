'use client';
/**
 * 실시간 후기 요약 컴포넌트
 * - 최근 작성된 시술 후기 3~5건 요약
 * - 병원명, 시술명, 평점, 한 줄 코멘트
 */
const dummyReviews = [
  { id: 1, clinic: "ABC의원", surgery: "턱 보톡스", rating: 4.5, comment: "효과 좋아요!" },
  { id: 2, clinic: "XYZ클리닉", surgery: "입술 필러", rating: 5, comment: "자연스러워서 만족!" },
  { id: 3, clinic: "뷰티라인", surgery: "리프팅", rating: 4, comment: "탄력 개선에 도움 됐어요." },
];

export default function LatestReviews() {
  return (
    <div>
      <h3 className="font-semibold mb-2">📝 실시간 후기</h3>
      <ul className="space-y-2">
        {dummyReviews.map(r => (
          <li key={r.id} className="border rounded p-3 flex flex-col">
            <span className="font-bold">{r.clinic}</span>
            <span className="text-sm">{r.surgery} | 평점: {r.rating}</span>
            <span className="text-xs text-gray-500 mt-1">"{r.comment}"</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 