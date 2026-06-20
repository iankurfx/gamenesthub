import { Megaphone } from "lucide-react";

interface AdBannerProps {
  size?: "leaderboard" | "rectangle" | "sidebar";
  className?: string;
}

const sizes = {
  leaderboard: "w-full h-24 md:h-28",
  rectangle: "w-full h-60",
  sidebar: "w-full h-72",
};

export default function AdBanner({ size = "leaderboard", className = "" }: AdBannerProps) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] overflow-hidden ${sizes[size]} ${className}`}
      data-testid="ad-banner"
    >
      {/* subtle animated gradient shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-shimmer" />

      <div className="flex flex-col items-center gap-2 opacity-40 select-none pointer-events-none">
        <Megaphone className="w-6 h-6 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">Advertisement</span>
        <span className="text-[10px] text-muted-foreground/60">
          {size === "leaderboard" ? "728 × 90" : size === "rectangle" ? "300 × 250" : "300 × 600"}
        </span>
      </div>
    </div>
  );
}
