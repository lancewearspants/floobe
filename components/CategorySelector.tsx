"use client";
import { useRouter } from "next/navigation";
import Button from "./ui/button";
// 아이콘은 임시로 텍스트 대체

/**
 * 카테고리 선택 컴포넌트
 * - ShadCN Button + 아이콘
 * - 클릭 시 /search?category=카테고리명 이동
 */
const categories = [
  { name: "보톡스", icon: "💉" },
  { name: "필러", icon: "🧴" },
  { name: "리프팅", icon: "✨" },
];

export default function CategorySelector() {
  const router = useRouter();
  return (
    <div className="flex gap-2 justify-center">
      {categories.map(cat => (
        <Button
          key={cat.name}
          onClick={() => router.push(`/search?category=${cat.name}`)}
        >
          <span>{cat.icon}</span>
          <span className="ml-1">{cat.name}</span>
        </Button>
      ))}
    </div>
  );
} 