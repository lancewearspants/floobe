"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "../../components/SearchInput";
import CategorySelector from "../../components/CategorySelector";
import SurgeryCard from "../../components/SurgeryCard";

// 더미 시술 데이터
const dummySurgeries = [
  { id: 1, name: "턱 보톡스", desc: "V라인 효과", price: "₩90,000" },
  { id: 2, name: "입술 필러", desc: "자연스러운 볼륨", price: "₩120,000" },
  { id: 3, name: "리프팅", desc: "탄력 개선", price: "₩200,000" },
  { id: 4, name: "코 필러", desc: "콧대 개선", price: "₩110,000" },
  { id: 5, name: "이마 보톡스", desc: "주름 개선", price: "₩80,000" },
];

// 좋아요 상태 관리 훅 (홈과 동일)
function useLikes(initialIds: number[]) {
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const toggleLike = useCallback(
    (id: number) => {
      setLikedIds(prev =>
        prev.includes(id) ? prev.filter(lid => lid !== id) : [...prev, id]
      );
    },
    []
  );
  const isLiked = useCallback((id: number) => likedIds.includes(id), [likedIds]);
  return { likedIds, toggleLike, isLiked };
}

export default function SearchPage() {
  const router = useRouter();
  // 검색어, 카테고리, 로딩, 페이징 등 상태 관리
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toggleLike, isLiked } = useLikes(dummySurgeries.map(s => s.id));

  // 필터링된 시술 리스트
  const filtered = dummySurgeries.filter(s => {
    const matchSearch = !search || s.name.includes(search);
    const matchCategory = !category || s.name.includes(category);
    return matchSearch && matchCategory;
  });

  return (
    <main className="flex flex-col gap-6 px-4 py-8 max-w-3xl mx-auto pb-20">
      {/* 상단 네비게이션: 뒤로가기, 홈 버튼 */}
      <div className="flex items-center gap-2 mb-2">
        <button
          className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-lg"
          onClick={() => window.history.back()}
        >
          ←
        </button>
        <button
          className="px-3 py-2 rounded bg-gray-100 hover:bg-blue-100 text-lg"
          onClick={() => router.push("/")}
        >
          🏠 홈
        </button>
      </div>
      {/* 검색 입력창 */}
      <div>
        <SearchInput />
      </div>
      {/* 카테고리 선택 */}
      <div>
        <CategorySelector />
      </div>
      {/* 결과 리스트 */}
      <section>
        <h2 className="font-bold text-lg mb-3">🔍 검색 결과</h2>
        {loading ? (
          <div className="text-center text-gray-400 py-10">로딩 중...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-10">검색 결과가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(s => (
              <SurgeryCard
                key={s.id}
                {...s}
                liked={isLiked(s.id)}
                onLike={() => toggleLike(s.id)}
              />
            ))}
          </div>
        )}
      </section>
      {/* 페이징(샘플) */}
      <div className="flex justify-center gap-2 mt-6">
        <button className="px-3 py-1 rounded bg-gray-100 text-gray-500" disabled>이전</button>
        <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
        <button className="px-3 py-1 rounded bg-gray-100 text-gray-500" disabled>다음</button>
      </div>
    </main>
  );
} 