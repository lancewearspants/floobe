"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// 더미 병원 데이터
const dummyHospitals = [
  {
    id: 1,
    name: "강남미소의원",
    address: "서울 강남구 테헤란로 123",
    phone: "02-123-4567",
    surgeries: ["턱 보톡스", "입술 필러"],
  },
  {
    id: 2,
    name: "뷰티라인클리닉",
    address: "서울 서초구 서초대로 456",
    phone: "02-987-6543",
    surgeries: ["리프팅", "코 필러", "이마 보톡스"],
  },
  {
    id: 3,
    name: "스타의원",
    address: "서울 송파구 올림픽로 789",
    phone: "02-555-8888",
    surgeries: ["턱 보톡스", "리프팅"],
  },
];

export default function HospitalPage() {
  const router = useRouter();
  const [selectedSurgery, setSelectedSurgery] = useState<string | null>(null);

  // 시술명 목록 추출
  const allSurgeries = Array.from(
    new Set(dummyHospitals.flatMap(h => h.surgeries))
  );

  // 필터링
  const filtered = selectedSurgery
    ? dummyHospitals.filter(h => h.surgeries.includes(selectedSurgery))
    : dummyHospitals;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 pb-20">
      <h1 className="text-2xl font-bold mb-6">시술별 병원 리스트</h1>
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
      {/* 병원 리스트 */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-20">해당 시술을 하는 병원이 없습니다.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map(h => (
            <div key={h.id} className="p-5 rounded-xl shadow bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-semibold text-lg mb-1">{h.name}</div>
                <div className="text-gray-500 text-sm mb-1">{h.address}</div>
                <div className="text-xs text-gray-500 mb-1">{h.phone}</div>
                <div className="text-xs text-blue-600 font-semibold mb-1">{h.surgeries.join(", ")}</div>
              </div>
              <button
                className="mt-3 sm:mt-0 px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-600 hover:text-white"
                onClick={() => alert("상세 페이지는 추후 구현 예정입니다.")}
              >
                상세보기
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 