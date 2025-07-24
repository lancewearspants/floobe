'use client';
import Image from "next/image";
import SearchInput from "../components/SearchInput";
import CategorySelector from "../components/CategorySelector";
import RecommendedList from "../components/RecommendedList";
import LatestReviews from "../components/LatestReviews";

/**
 * TopBanner 컴포넌트 (이벤트 이미지 포함)
 * - 임시 이벤트 이미지 사용 (public/event-banner.png 등)
 */
export function TopBanner() {
  return (
    <div className="w-full rounded-xl overflow-hidden mb-4">
      <Image
        src="/event-banner.png"
        alt="이벤트 배너"
        width={1200}
        height={320}
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col gap-8 px-4 py-8 max-w-3xl mx-auto pb-20">
        <TopBanner />
        <SearchInput />
        <CategorySelector />
        <RecommendedList />
        <LatestReviews />
      </main>
      {/* 모바일 하단 메뉴 (ShadCN Button 활용) */}
      <nav
        className="fixed bottom-0 left-0 w-full bg-white border-t z-50 max-w-3xl mx-auto flex justify-between px-4 py-2"
        style={{ boxShadow: "0 -2px 8px rgba(0,0,0,0.04)" }}
      >
        {/* ShadCN Button 컴포넌트 사용 */}
        <button
          className="flex flex-col items-center flex-1 text-xs text-gray-700 hover:text-blue-600 focus:text-blue-600"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="material-icons text-2xl mb-1">home</span>
          홈
        </button>
        <button
          className="flex flex-col items-center flex-1 text-xs text-gray-700 hover:text-blue-600 focus:text-blue-600"
          onClick={() => alert("병원 메뉴는 추후 연결 예정입니다.")}
        >
          <span className="material-icons text-2xl mb-1">local_hospital</span>
          병원
        </button>
        <button
          className="flex flex-col items-center flex-1 text-xs text-gray-700 hover:text-blue-600 focus:text-blue-600"
          onClick={() => alert("이벤트 메뉴는 추후 연결 예정입니다.")}
        >
          <span className="material-icons text-2xl mb-1">star</span>
          이벤트
        </button>
        <button
          className="flex flex-col items-center flex-1 text-xs text-gray-700 hover:text-blue-600 focus:text-blue-600"
          onClick={() => alert("후기 메뉴는 추후 연결 예정입니다.")}
        >
          <span className="material-icons text-2xl mb-1">rate_review</span>
          후기
        </button>
      </nav>
    </>
  );
}