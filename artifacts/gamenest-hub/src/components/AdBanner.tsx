import { useEffect, useRef } from "react";

interface AdBannerProps {
  size?: "leaderboard" | "rectangle" | "sidebar";
  className?: string;
}

export default function AdBanner({ size = "leaderboard", className = "" }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous ad element
    containerRef.current.innerHTML = "";

    const adKey = "e182a098f918e710e7402c3c2d1107eb";

    // 1. Create the container div required by Adsterra
    const adContainer = document.createElement("div");
    adContainer.id = `container-${adKey}`;
    containerRef.current.appendChild(adContainer);

    // 2. Create the script element
    const adScript = document.createElement("script");
    adScript.type = "text/javascript";
    adScript.async = true;
    adScript.setAttribute("data-cfasync", "false");
    adScript.src = `https://pl29828399.effectivecpmnetwork.com/${adKey}/invoke.js`;

    containerRef.current.appendChild(adScript);
  }, [size]);

  // Size styling classes for the container
  const sizes = {
    leaderboard: "w-full min-h-[90px] py-2 mx-auto",
    rectangle: "w-full min-h-[250px] py-2 mx-auto",
    sidebar: "w-full min-h-[300px] py-2 mx-auto",
  };

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center overflow-hidden ${sizes[size]} ${className}`}
    />
  );
}
