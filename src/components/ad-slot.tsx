"use client";

import { useEffect } from "react";
import { Megaphone } from "lucide-react";

type AdPlacement = "content" | "list" | "sidebar";

type AdSlotProps = {
  label?: string;
  compact?: boolean;
  className?: string;
  placement?: AdPlacement;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function getAdSlotId(placement: AdPlacement) {
  if (placement === "list") {
    return process.env.NEXT_PUBLIC_ADSENSE_SLOT_LIST;
  }

  if (placement === "sidebar") {
    return process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR;
  }

  return process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT;
}

export function AdSlot({
  label = "精選工具版位",
  compact = false,
  className,
  placement = "content",
}: AdSlotProps) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adSlotId = getAdSlotId(placement);
  const isLiveAd = Boolean(adsenseClient && adSlotId);
  const slotClassName = ["ad-slot", compact ? "ad-slot-compact" : "", className]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    if (!isLiveAd) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or delayed script loading should not break page rendering.
    }
  }, [isLiveAd]);

  if (isLiveAd) {
    return (
      <aside className={slotClassName} aria-label={label}>
        <ins
          className="adsbygoogle"
          data-ad-client={adsenseClient}
          data-ad-slot={adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  const helperText = adsenseClient
    ? "已設定 AdSense publisher id，等待對應廣告單元 slot id 後即可投放。"
    : "保留給工具推薦、合作揭露或自家產品 CTA，不顯示未核准廣告。";

  return (
    <aside className={slotClassName}>
      <div className="ad-icon" aria-hidden="true">
        <Megaphone size={18} />
      </div>
      <div>
        <span>{label}</span>
        <p>{helperText}</p>
      </div>
    </aside>
  );
}
