"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// 더미 이벤트(할인 시술) 데이터
const dummyEvents = [
  {
    id: 1,
    name: "턱 보톡스",
    desc: "V라인 턱 라인 개선",
    originalPrice: 120000,
    salePrice: 90000,
    period: "~ 2024-06-30",
  },
  {
    id: 2,
    name: "입술 필러",
    desc: "자연스러운 입술 볼륨",
    originalPrice: 150000,
    salePrice: 110000,
    period: "~ 2024-07-10",
  },
  {
    id: 3,
    name: "리프팅",
    desc: "탄력 개선 리프팅",
    originalPrice: 200000,
    salePrice: 150000,
    period: "~ 2024-06-25",
  },
];

function formatPrice(price: number) {
  return `₩${price.toLocaleString()}`;
}

export default function EventPage() {
  const router = useRouter();
  return (
    <main className="max-w-2xl mx-auto px-4 py-8 pb-20">
      <h1 className="text-2xl font-bold mb-6">이벤트 할인 시술</h1>
      <div className="space-y-4">
        {dummyEvents.map(e => (
          <div key={e.id} className="p-5 rounded-xl shadow bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold text-lg mb-1">{e.name}</div>
              <div className="text-gray-500 text-sm mb-1">{e.desc}</div>
              <div className="text-xs text-blue-600 font-semibold mb-1">이벤트 기간: {e.period}</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gray-400 line-through text-sm">{formatPrice(e.originalPrice)}</span>
                <span className="text-lg text-pink-600 font-bold">{formatPrice(e.salePrice)}</span>
                <span className="text-xs text-red-500 font-bold">-{Math.round((1 - e.salePrice / e.originalPrice) * 100)}%</span>
              </div>
            </div>
            <button
              className="mt-3 sm:mt-0 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
              onClick={() => router.push(`/surgery/${e.id}`)}
            >
              예약하기
            </button>
          </div>
        ))}
      </div>
    </main>
  );
} 