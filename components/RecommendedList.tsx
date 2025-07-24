'use client';
import { useState, useCallback } from "react";
import SurgeryCard from "./SurgeryCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";

/**
 * 추천 시술 리스트 컴포넌트
 * - 인기 시술 카드 리스트 (수평 스크롤)
 * - 각 시술 카드에 하트(좋아요) 버튼(토글) 제공
 * - SurgeryCard 사용
 * - 하트 버튼 클릭 시 해당 id의 좋아요 상태 on/off (useState로 관리)
 */
const dummySurgeries = [
  { id: 1, name: "턱 보톡스", desc: "V라인 효과", price: "₩90,000" },
  { id: 2, name: "입술 필러", desc: "자연스러운 볼륨", price: "₩120,000" },
  { id: 3, name: "리프팅", desc: "탄력 개선", price: "₩200,000" },
];

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

export default function RecommendedList() {
  const { toggleLike, isLiked } = useLikes(dummySurgeries.map(s => s.id));
  return (
    <div>
      <h3 className="font-semibold mb-2">🔥 인기 시술</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {dummySurgeries.map(s => (
          <SurgeryCard
            key={s.id}
            {...s}
            liked={isLiked(s.id)}
            onLike={() => toggleLike(s.id)}
          />
        ))}
      </div>
    </div>
  );
} 