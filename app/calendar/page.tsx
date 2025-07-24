"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// 더미 예약 내역 데이터
const dummyReservations = [
  {
    id: 1,
    date: "2024-06-20",
    time: "오전 8~10시",
    surgery: "턱 보톡스",
    status: "예약완료",
  },
  {
    id: 2,
    date: "2024-06-22",
    time: "오후 1~3시",
    surgery: "입술 필러",
    status: "예약완료",
  },
];

export default function CalendarPage() {
  const [reservations, setReservations] = useState(dummyReservations);
  const router = useRouter();

  // 예약 취소 핸들러
  const handleCancel = (id: number) => {
    setReservations(reservations =>
      reservations.filter(r => r.id !== id)
    );
    alert("예약이 취소되었습니다.");
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 pb-20">
      <h1 className="text-2xl font-bold mb-6">나의 예약 내역</h1>
      {reservations.length === 0 ? (
        <div className="text-center text-gray-400 py-20">예약 내역이 없습니다.</div>
      ) : (
        <div className="space-y-4">
          {reservations.map(r => (
            <div
              key={r.id}
              className="p-5 rounded-xl shadow bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between cursor-pointer hover:bg-blue-50"
              onClick={() => router.push(`/calendar/${r.id}`)}
            >
              <div>
                <div className="font-semibold text-lg mb-1">{r.surgery}</div>
                <div className="text-gray-500 text-sm mb-1">{r.date} {r.time}</div>
                <div className="text-blue-600 text-xs font-bold">{r.status}</div>
              </div>
              <button
                className="mt-3 sm:mt-0 px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-red-200 hover:text-red-700"
                onClick={e => { e.stopPropagation(); handleCancel(r.id); }}
              >
                예약 취소
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 