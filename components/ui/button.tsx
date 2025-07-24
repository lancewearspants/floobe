import * as React from "react";

// Button 컴포넌트에 사용할 타입 인터페이스 (IButtonProps)
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * 모바일 전용 Button 컴포넌트 (ShadCN 스타일)
 * - 기본 색상, padding, rounded, hover/focus 스타일 적용
 * - forwardRef로 구현
 */
const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`bg-blue-600 text-white rounded-lg px-5 py-3 text-base font-semibold w-full active:bg-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${className ?? ""}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
