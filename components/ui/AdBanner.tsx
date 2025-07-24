import Image from "next/image";

/**
 * 광고 배너 컴포넌트 (모바일 전용)
 * - 광고 이미지를 중앙에 크게 노출
 * - padding, margin 등 모바일에 최적화
 * - 추후 광고 이미지/링크 교체 가능
 */
export default function AdBanner() {
  return (
    <div
      className="w-full flex flex-col items-center justify-center my-6 p-4 bg-white rounded-xl shadow-md"
      style={{ maxWidth: 430, margin: '0 auto' }} // 모바일 최대폭 제한
    >
      {/* 광고 이미지 (임시: globe.svg) */}
      <Image
        src="/globe.svg"
        alt="광고 배너"
        width={320}
        height={120}
        className="object-contain mb-2"
        priority
      />
      {/* 광고 설명 (필요시 추가) */}
      {/* <span className="text-sm text-gray-600 mt-2">지금 바로 특별 혜택을 확인하세요!</span> */}
    </div>
  );
} 