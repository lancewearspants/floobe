"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

// window.liff 타입 선언 (TS 에러 방지)
declare global {
  interface Window {
    liff?: {
      sendMessages: (msgs: any) => Promise<any>;
      getContext?: () => any;
      // 필요한 메서드 추가 가능
    };
  }
}

// 더미 시술 데이터
const dummySurgeries = [
  { id: 1, name: "턱 보톡스", desc: "V라인 효과", price: "₩90,000", detail: "턱 보톡스는 턱 근육을 이완시켜 갸름한 얼굴 라인을 만들어주는 시술입니다.", image: "/event-banner.png" },
  { id: 2, name: "입술 필러", desc: "자연스러운 볼륨", price: "₩120,000", detail: "입술 필러는 입술에 볼륨을 더해주고, 자연스러운 입술 라인을 만들어줍니다.", image: "/event-banner.png" },
  { id: 3, name: "리프팅", desc: "탄력 개선", price: "₩200,000", detail: "리프팅 시술은 피부 탄력을 높여주고, 처짐을 개선해줍니다.", image: "/event-banner.png" },
  { id: 4, name: "코 필러", desc: "콧대 개선", price: "₩110,000", detail: "코 필러는 콧대를 높이고, 코 라인을 개선해주는 시술입니다.", image: "/event-banner.png" },
  { id: 5, name: "이마 보톡스", desc: "주름 개선", price: "₩80,000", detail: "이마 보톡스는 이마 주름을 완화시켜주고, 매끈한 이마를 만들어줍니다.", image: "/event-banner.png" },
];

const TIME_SLOTS = [
  "오전 8~10시",
  "오전 10~12시",
  "오후 1~3시",
  "오후 3~5시",
];

// LIFF 모킹: 로컬/테스트 환경에서 window.liff가 없으면 임시로 추가
function useLiffMock() {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.liff) {
      window.liff = {
        sendMessages: (msgs: any) => {
          alert("로컬 테스트: 라인 메시지 전송 대신 alert로 대체\n" + JSON.stringify(msgs));
          return Promise.resolve();
        },
        getContext: () => ({}),
      };
    }
  }, []);
}

export default function SurgeryDetailPage() {
  useLiffMock();
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const surgery = dummySurgeries.find(s => s.id === id);
  const [liked, setLiked] = useState(false);
  const toggleLike = useCallback(() => setLiked(l => !l), []);

  // 모달 상태 관리
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openLine, setOpenLine] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // 달력 '확인' 클릭 시 시간 선택 모달 오픈
  const handleCalendarConfirm = () => {
    if (selectedDate) {
      setOpenCalendar(false);
      setShowTimeSelect(true);
    }
  };

  // 시간대 선택 시 예약 완료 처리
  const handleTimeSelect = (slot: string) => {
    setSelectedTime(slot);
    setShowTimeSelect(false);
    alert(
      `${selectedDate?.toLocaleDateString()} ${slot} 예약이 완료되었습니다!`
    );
  };

  // 라인 상담 연동 action
  const handleLineConsult = () => {
    if (typeof window !== "undefined" && window.liff && window.liff.sendMessages) {
      window.liff.sendMessages([
        { type: "text", text: `[상담요청] ${surgery?.name} 시술 상담을 요청합니다.` }
      ]).then(() => {
        alert("상담 메시지가 전송되었습니다!");
        setOpenLine(false);
      }).catch((err: any) => {
        alert("메시지 전송 실패: " + err.message);
      });
    } else {
      alert("로컬 테스트: 라인 메시지 전송 대신 alert로 대체");
      setOpenLine(false);
    }
  };

  if (!surgery) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-gray-400 text-lg">존재하지 않는 시술입니다.</div>
        <button className="mt-4 px-4 py-2 rounded bg-blue-600 text-white" onClick={() => router.push("/search")}>검색으로 돌아가기</button>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 pb-20">
      {/* 상단 네비게이션 */}
      <div className="flex items-center gap-2 mb-4">
        <button className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-lg" onClick={() => router.back()}>←</button>
        <button className="px-3 py-2 rounded bg-gray-100 hover:bg-blue-100 text-lg" onClick={() => router.push("/")}>🏠 홈</button>
      </div>
      {/* 세로로 긴 시술 홍보 이미지 영역 */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[3/5] bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center shadow relative">
          <img
            src={surgery.image}
            alt={`${surgery.name} 홍보 이미지`}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center top" }}
          />
          {!surgery.image && (
            <span className="text-gray-400 text-lg">상품 홍보 이미지 준비중</span>
          )}
        </div>
      </div>
      {/* 시술 정보 */}
      <div className="relative p-6 rounded-xl shadow bg-white mb-6">
        <h1 className="text-2xl font-bold mb-2">{surgery.name}</h1>
        <div className="text-gray-500 mb-2">{surgery.desc}</div>
        <div className="text-primary font-semibold text-lg mb-2">{surgery.price}</div>
        <button
          type="button"
          aria-label={liked ? "좋아요 취소" : "좋아요"}
          onClick={toggleLike}
          className="absolute top-6 right-6 bg-white/80 rounded-full p-2 shadow hover:bg-pink-100 transition"
        >
          {liked ? (
            <FaHeart className="text-pink-500 text-2xl" />
          ) : (
            <FaRegHeart className="text-gray-400 text-2xl" />
          )}
        </button>
      </div>
      {/* 상세 설명 */}
      <section className="bg-gray-50 rounded-xl p-6 mb-6">
        <h2 className="font-semibold mb-2">상세 설명</h2>
        <p className="text-gray-700 leading-relaxed">{surgery.detail}</p>
      </section>
      {/* 예약/상담 버튼 */}
      <div className="flex gap-2">
        <button
          className="flex-1 px-4 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
          onClick={() => setOpenCalendar(true)}
        >
          예약하기
        </button>
        <button
          className="flex-1 px-4 py-3 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
          onClick={() => setOpenLine(true)}
        >
          상담문의
        </button>
      </div>
      {/* 예약 달력 모달 */}
      <Dialog open={openCalendar} onOpenChange={setOpenCalendar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>예약 날짜 선택</DialogTitle>
            <DialogDescription>원하는 예약 날짜를 선택하세요.</DialogDescription>
          </DialogHeader>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
          <DialogClose asChild>
            <button
              className="mt-4 w-full px-4 py-2 rounded bg-blue-600 text-white"
              disabled={!selectedDate}
              onClick={handleCalendarConfirm}
            >
              확인
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      {/* 시간대 선택 모달 */}
      <Dialog open={showTimeSelect} onOpenChange={setShowTimeSelect}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>시간대 선택</DialogTitle>
            <DialogDescription>예약하실 시간을 선택하세요.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {TIME_SLOTS.map(slot => (
              <button
                key={slot}
                className="px-4 py-3 rounded bg-blue-100 hover:bg-blue-600 hover:text-white font-semibold"
                onClick={() => handleTimeSelect(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      {/* 라인 상담 모달 */}
      <Dialog open={openLine} onOpenChange={setOpenLine}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>라인 상담문의</DialogTitle>
            <DialogDescription>
              아래 버튼을 누르면 라인(LINE) 채팅으로 상담 메시지가 전송됩니다.<br />
              (로컬/테스트 환경에서는 alert로 대체)
            </DialogDescription>
          </DialogHeader>
          <button
            className="block w-full mt-4 px-4 py-2 rounded bg-green-500 text-white text-center font-semibold hover:bg-green-600"
            onClick={handleLineConsult}
          >
            라인으로 상담하기
          </button>
          <DialogClose asChild>
            <button className="mt-2 w-full px-4 py-2 rounded bg-gray-200 text-gray-700">닫기</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </main>
  );
} 