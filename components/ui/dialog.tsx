import * as React from "react";

interface IDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: IDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px] max-w-full relative">
        {children}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={() => onOpenChange(false)}
          aria-label="닫기"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}
export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold mb-2">{children}</h2>;
}
export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-500 text-sm mb-2">{children}</div>;
}
export function DialogClose({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  // asChild 지원: 버튼에 직접 onClick 전달
  return children;
} 