"use client";

import { useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  // seconds for one full loop
  duration: number;
  label: string;
  pauseLabel: string;
  playLabel: string;
};

// Slow scrolling strip that stops when hovered, touched or focused, and has a pause button.
export default function TickerTrack({ children, duration, label, pauseLabel, playLabel }: Props) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="group relative flex items-stretch overflow-hidden border-b border-base-300 bg-base-100">
      <div
        // fades the items out at both edges instead of cutting them off
        className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_24px,#000_calc(100%-24px),transparent)]"
      >
        <div
          role="marquee"
          aria-label={label}
          tabIndex={0}
          style={{ animationDuration: `${duration}s`, animationPlayState: paused ? "paused" : undefined }}
          className="animate-ticker flex w-max group-hover:[animation-play-state:paused] focus-visible:[animation-play-state:paused] active:[animation-play-state:paused]"
        >
          {children}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? playLabel : pauseLabel}
        title={paused ? playLabel : pauseLabel}
        className="flex w-10 shrink-0 items-center justify-center border-l border-base-200 bg-base-100 text-xs hover:bg-base-200"
      >
        <span aria-hidden>{paused ? "▶" : "⏸"}</span>
      </button>
    </div>
  );
}
