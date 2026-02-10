import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  const hoverStyles = hover
    ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    : "";

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
