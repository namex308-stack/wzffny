import { CheckCircle } from "lucide-react";

interface TrustBadgesProps {
  items: string[];
  variant?: "light" | "dark";
}

export function TrustBadges({ items, variant = "dark" }: TrustBadgesProps) {
  const textColor = variant === "light" ? "text-indigo-200" : "text-gray-500";
  const iconColor = variant === "light" ? "text-indigo-200" : "text-green-500";

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-6 text-sm ${textColor}`}
    >
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2">
          <CheckCircle className={`w-5 h-5 ${iconColor}`} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
