"use client";
import { useParams, useRouter } from "next/navigation";

// 더미 예약 내역 데이터 (실제 구현 시 전역/DB 연동 필요)
const dummyReservations = [
  {
    id: 1,
    date: "2024-06-20",
    time: "오전 8~10시",
    surgery: "턱 보톡스",
    status: "예약완료",
    createdAt: "2024-06-01 10:00",
    reservationNo: "R20240620001",
    memo: "첫 방문, 주차 필요",
    hospitalDirections: "지하철 2호선 강남역 3번 출구에서 도보 5분, 건물 1층에 스타벅스 있음"
  },
  {
    id: 2,
    date: "2024-06-22",
    time: "오후 1~3시",
    surgery: "입술 필러",
    status: "예약완료",
    createdAt: "2024-06-02 14:30",
    reservationNo: "R20240622002",
    memo: "재방문, 상담 요청",
    hospitalDirections: "버스 341번 이용, 신논현역 하차 후 도보 3분, 건물 옆에 약국 위치"
  },
];

export default function ReservationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const reservation = dummyReservations.find(r => r.id === id);

  if (!reservation) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-gray-400 text-lg">존재하지 않는 예약입니다.</div>
        <button className="mt-4 px-4 py-2 rounded bg-blue-600 text-white" onClick={() => router.push("/calendar")}>예약 목록으로 돌아가기</button>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-8 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <button className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-lg" onClick={() => router.back()}>←</button>
        <button className="px-3 py-2 rounded bg-gray-100 hover:bg-blue-100 text-lg" onClick={() => router.push("/calendar")}>나의 예약 목록</button>
      </div>
      <div className="p-6 rounded-xl shadow bg-white">
        <h1 className="text-2xl font-bold mb-2">예약 상세 정보</h1>
        <div className="mb-2"><span className="font-semibold">시술명:</span> {reservation.surgery}</div>
        <div className="mb-2"><span className="font-semibold">예약 날짜:</span> {reservation.date}</div>
        <div className="mb-2"><span className="font-semibold">예약 시간:</span> {reservation.time}</div>
        <div className="mb-2"><span className="font-semibold">상태:</span> <span className="text-blue-600 font-bold">{reservation.status}</span></div>
        <div className="mb-2"><span className="font-semibold">예약 번호:</span> {reservation.reservationNo}</div>
        <div className="mb-2"><span className="font-semibold">예약 생성일:</span> {reservation.createdAt}</div>
        <div className="mb-2"><span className="font-semibold">메모:</span> {reservation.memo}</div>
      </div>
    </main>
  );
} 