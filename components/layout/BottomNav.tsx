"use client";
import { useRouter, usePathname } from "next/navigation";

const navs = [
  { label: "홈", icon: "🏠", path: "/" },
  { label: "병원", icon: "🏥", path: "/hospital" },
  { label: "이벤트", icon: "⭐", path: "/event" },
  { label: "후기", icon: "📝", path: "/reviews" },
  { label: "나의 예약", icon: "📅", path: "/calendar" },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t z-50 max-w-3xl mx-auto flex justify-between px-4 py-2"
      style={{ boxShadow: "0 -2px 8px rgba(0,0,0,0.04)" }}>
      {navs.map(nav => (
        <button
          key={nav.path}
          className={`flex flex-col items-center flex-1 text-xs ${pathname === nav.path ? "text-blue-600" : "text-gray-700"} hover:text-blue-600 focus:text-blue-600`}
          onClick={() => router.push(nav.path)}
        >
          <span className="text-2xl mb-1">{nav.icon}</span>
          {nav.label}
        </button>
      ))}
    </nav>
  );
} 