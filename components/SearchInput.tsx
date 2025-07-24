"use client";
import { useRouter } from "next/navigation";
import Input from "./ui/input";

/**
 * 검색 입력창 컴포넌트
 * - 클릭 또는 엔터 시 /search로 이동
 * - ShadCN Input 사용
 */
export default function SearchInput() {
  const router = useRouter();
  return (
    <Input
      className="w-full max-w-md mx-auto"
      placeholder="시술명 또는 병원명을 검색해보세요"
      onFocus={() => router.push("/search")}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") router.push("/search");
      }}
      readOnly // 클릭 시 바로 이동
    />
  );
} 