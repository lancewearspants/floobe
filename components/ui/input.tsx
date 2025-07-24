import * as React from "react";

// Input 컴포넌트에 사용할 타입 인터페이스 (IInputProps)
export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * 모바일 전용 Input 컴포넌트 (ShadCN 스타일)
 * - 기본 border, padding, focus 스타일 적용
 * - forwardRef로 구현
 */
const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border rounded px-4 py-3 text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className ?? ""}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
