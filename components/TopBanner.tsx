/**
 * 상단 배너 컴포넌트
 * - 주요 이벤트, 프로모션 표시
 * - ShadCN 스타일 div 사용
 */
export default function TopBanner() {
  return (
    <div className="w-full p-6 rounded-xl shadow bg-gradient-to-r from-blue-200 to-purple-200">
      <h2 className="text-xl font-bold">🎉 6월 한정 프로모션! 시술 최대 50% 할인</h2>
      <p className="mt-2 text-sm">지금 인기 시술을 특별가로 만나보세요.</p>
    </div>
  );
} 