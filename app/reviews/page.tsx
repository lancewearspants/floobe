"use client";
import { useState } from "react";

// 더미 후기 데이터
const dummyReviews = [
  {
    id: 1,
    clinic: "강남미소의원",
    surgery: "턱 보톡스",
    user: "민지",
    rating: 4.5,
    comment: "효과 좋아요! 친절하게 설명해주셨어요.",
    date: "2024-06-10",
  },
  {
    id: 2,
    clinic: "뷰티라인클리닉",
    surgery: "입술 필러",
    user: "지훈",
    rating: 5,
    comment: "자연스러워서 만족! 재방문 의사 있음.",
    date: "2024-06-12",
  },
  {
    id: 3,
    clinic: "스타의원",
    surgery: "리프팅",
    user: "수빈",
    rating: 4,
    comment: "탄력 개선에 도움 됐어요. 대기시간 짧음.",
    date: "2024-06-15",
  },
  {
    id: 4,
    clinic: "강남미소의원",
    surgery: "턱 보톡스",
    user: "영수",
    rating: 4.8,
    comment: "시술 후 바로 효과가 느껴졌어요.",
    date: "2024-06-16",
  },
];

export default function ReviewsPage() {
  // 시술명 목록 추출
  const allSurgeries = Array.from(new Set(dummyReviews.map(r => r.surgery)));
  const [selectedSurgery, setSelectedSurgery] = useState<string | null>(null);

  // 필터링
  const filtered = selectedSurgery
    ? dummyReviews.filter(r => r.surgery === selectedSurgery)
    : dummyReviews;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 pb-20">
      <h1 className="text-2xl font-bold mb-6">환자 시술별 후기</h1>
      {/* 시술명 필터 버튼 */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-3 py-1 rounded ${!selectedSurgery ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => setSelectedSurgery(null)}
        >
          전체
        </button>
        {allSurgeries.map(s => (
          <button
            key={s}
            className={`px-3 py-1 rounded ${selectedSurgery === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setSelectedSurgery(s)}
          >
            {s}
          </button>
        ))}
      </div>
      {/* 후기 리스트 */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-20">해당 시술 후기가 없습니다.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map(r => (
            <div key={r.id} className="p-5 rounded-xl shadow bg-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-base">{r.clinic}</span>
                <span className="text-xs text-blue-600 font-semibold">{r.surgery}</span>
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-yellow-500 font-bold">★</span>
                <span className="text-sm font-semibold">{r.rating}</span>
                <span className="text-xs text-gray-500 ml-2">작성자: {r.user}</span>
              </div>
              <div className="text-gray-700 text-sm">{r.comment}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 