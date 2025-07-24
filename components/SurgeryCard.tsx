"use client";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

/**
 * 추천 시술 카드 컴포넌트
 * - 시술명, 설명, 가격 표시
 * - 클릭 시 /surgery/[id]로 이동
 * - liked, onLike props로 좋아요 상태/토글 지원
 */
interface ISurgeryCardProps {
  id: number;
  name: string;
  desc: string;
  price: string;
  liked?: boolean;
  onLike?: () => void;
}

function LikeButton({ liked, onClick }: { liked: boolean; onClick: () => void }) {
  // LikeButton 컴포넌트에서 시술 상세페이지로 이동하는 기능 추가
  // (카드 클릭 시 상세페이지 이동, 하트 버튼 클릭 시 이동 방지)
  // LikeButton 컴포넌트: 하트 버튼 클릭 시 상세페이지로 이동하지 않음(이벤트 버블링 방지)
  return (
    <button
      type="button"
      aria-label={liked ? "좋아요 취소" : "좋아요"}
      onClick={e => {
        e.stopPropagation(); // 하트 클릭 시 카드의 onClick(검색결과 이동) 방지
        onClick();
      }}
      className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow hover:bg-pink-100 transition"
      tabIndex={0}
    >
      {liked ? (
        <FaHeart className="text-pink-500 text-xl" />
      ) : (
        <FaRegHeart className="text-gray-400 text-xl" />
      )}
    </button>
  );
}

/**
 * SurgeryCard 컴포넌트
 * - 시술명, 병원명, 위치, 별점, 후기수, 원래가격, 할인율, 실제가격, 좋아요 버튼 표시
 * - 클릭 시 상세페이지 이동
 * - ShadCN 스타일 및 가독성 고려
 */
interface ISurgeryCardProps {
  id: number;
  name: string;
  desc: string;
  price: string; // 실제가격
  liked?: boolean;
  onLike?: () => void;
  // 추가 필드
  hospitalName?: string;
  hospitalLocation?: string;
  rating?: number; // 0~10
  reviewCount?: number;
  originalPrice?: string;
  discountRate?: number; // 0~100
}

export default function SurgeryCard({
  id,
  name,
  desc,
  price,
  liked = false,
  onLike,
  hospitalName = "샘플병원",
  hospitalLocation = "서울 강남구",
  rating = 9.2,
  reviewCount = 128,
  originalPrice = "₩120,000",
  discountRate = 25,
}: ISurgeryCardProps) {
  const router = useRouter();

  // 별점 10점 만점 표시 (소수점 1자리)
  const renderStars = (score: number) => {
    const fullStars = Math.floor(score / 2);
    const halfStar = score % 2 >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      <span className="flex items-center gap-0.5 text-yellow-400 text-sm">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <span key={`full-${i}`}>★</span>
          ))}
        {halfStar === 1 && <span>☆</span>}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <span key={`empty-${i}`}>☆</span>
          ))}
      </span>
    );
  };

  return (
    <div
      className="min-w-[220px] p-4 rounded-xl shadow cursor-pointer hover:shadow-lg transition bg-white relative"
      onClick={() => router.push(`/surgery/${id}`)}
    >
      {/* 시술명 */}
      <div className="font-bold text-base mb-1">{name}</div>
      {/* 병원명, 위치 */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
        <span>{hospitalName}</span>
        <span className="text-gray-300">|</span>
        <span>{hospitalLocation}</span>
      </div>
      {/* 별점, 후기수 */}
      <div className="flex items-center gap-2 mb-2">
        <span className="flex items-center gap-1">
          {renderStars(rating)}
          <span className="ml-1 text-xs text-gray-700 font-semibold">{rating.toFixed(1)}/10</span>
        </span>
        <span className="text-xs text-gray-400">({reviewCount}건)</span>
      </div>
      {/* 설명 */}
      <div className="text-xs text-gray-500 mb-2">{desc}</div>
      {/* 가격 정보 */}
      <div className="flex items-end gap-2 mb-1">
        <span className="line-through text-xs text-gray-400">{originalPrice}</span>
        <span className="text-xs text-pink-500 font-bold">{discountRate}%↓</span>
      </div>
      <div className="text-primary font-semibold text-lg">{price}</div>
      {/* 좋아요 버튼 */}
      {onLike && <LikeButton liked={liked} onClick={onLike} />}
    </div>
  );
}