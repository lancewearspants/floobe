import * as React from "react";

interface ICalendarProps {
  mode: "single";
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function Calendar({ mode, selected, onSelect, className }: ICalendarProps) {
  // 간단한 달력: 이번 달 날짜만 표시
  const [today] = React.useState(new Date());
  const [month, setMonth] = React.useState(today.getMonth());
  const [year, setYear] = React.useState(today.getFullYear());

  // 이번 달 1일의 요일
  const firstDay = new Date(year, month, 1).getDay();
  // 이번 달 마지막 날짜
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: lastDate }, (_, i) => i + 1);

  function handleSelect(day: number) {
    if (!onSelect) return;
    onSelect(new Date(year, month, day));
  }

  return (
    <div className={`bg-white rounded-xl p-4 shadow w-full max-w-xs ${className ?? ""}`}>
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => setMonth(m => m - 1)}>&lt;</button>
        <span className="font-semibold">{year}년 {month + 1}월</span>
        <button onClick={() => setMonth(m => m + 1)}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1">
        {['일','월','화','수','목','금','토'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDay }).map((_, i) => <div key={i}></div>)}
        {days.map(day => {
          const date = new Date(year, month, day);
          const isSelected = selected && date.toDateString() === selected.toDateString();
          return (
            <button
              key={day}
              className={`rounded-full w-8 h-8 ${isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
              onClick={() => handleSelect(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
} 