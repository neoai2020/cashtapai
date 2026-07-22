"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { clsx } from "clsx";

const CTA_URL = "https://www.breakoutai.net/5k-passive-9";

interface WelcomeOfferBannerProps {
    onDismiss?: () => void;
    compact?: boolean;
}

export function WelcomeOfferBanner({ onDismiss, compact = false }: WelcomeOfferBannerProps) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleDismiss = () => {
        setVisible(false);
        onDismiss?.();
    };

    return (
        <div
            className={clsx(
                "relative w-full rounded-2xl border-2 border-[#fbbf24]/50 bg-gradient-to-b from-[#101726] to-[#0b0f18] text-center shadow-[0_0_40px_rgba(251,191,36,0.08)] transition-all duration-300",
                compact ? "p-3 sm:p-3.5" : "p-5 sm:p-6",
            )}
        >
            <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss offer"
                className={clsx(
                    "absolute rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors",
                    compact ? "top-2 right-2 w-7 h-7" : "top-3 right-3 w-9 h-9",
                )}
            >
                <X size={compact ? 14 : 16} />
            </button>

            <span
                className={clsx(
                    "inline-block rounded-full bg-red-600 text-white font-black uppercase tracking-widest",
                    compact ? "mb-1.5 px-2 py-0.5 text-[9px]" : "mb-3 px-3 py-1 text-[10px]",
                )}
            >
                Free Training
            </span>

            {!compact && (
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-400 mb-2">
                    ✨ You&apos;ve Been Selected ✨
                </p>
            )}

            <h3
                className={clsx(
                    "font-black uppercase text-white leading-tight",
                    compact ? "text-sm sm:text-base mb-1" : "text-xl sm:text-2xl mb-2",
                )}
            >
                {compact ? "Free Training: " : "Limited Free Training"}
                {!compact ? null : (
                    <>
                        {" "}
                        <span className="text-emerald-400">$1k–$5k/Day</span>
                    </>
                )}
            </h3>

            {!compact && (
                <>
                    <p className="text-sm sm:text-base font-semibold text-white mb-1">
                        Learn How To Make <span className="text-emerald-400">$1,000</span> —{" "}
                        <span className="text-emerald-400">$5,000</span> Per Day
                    </p>
                    <p className="text-xs text-white/60 mb-4">With no extra work</p>
                </>
            )}

            {compact ? (
                <p className="text-[11px] font-semibold text-white/80 mb-2.5">
                    Learn how to make <span className="text-emerald-400">$1k–$5k/day</span> with no extra work
                </p>
            ) : (
                <div className="w-full max-w-md mx-auto mb-4">
                    <div className="flex items-center justify-between mb-2 text-[11px] font-bold uppercase tracking-wider text-[#fbbf24]">
                        <span>🔥 Spots Filling Fast</span>
                        <span className="text-white/70">
                            <span className="text-white font-black">8</span> / 10 Claimed
                        </span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden bg-[#1e211e]">
                        <div className="h-full w-[80%] rounded-full bg-red-500" />
                    </div>
                    <p className="text-[12px] font-semibold mt-1.5 text-emerald-400">
                        Only 2 FREE spots remaining!
                    </p>
                </div>
            )}

            {!compact && (
                <ul className="text-left max-w-md mx-auto flex flex-col gap-2 mb-5 text-sm text-white/80">
                    {[
                        "Fully automated income system revealed",
                        "No tech skills or experience needed",
                        "Works in just 20 minutes per day",
                    ].map((text) => (
                        <li key={text} className="flex items-center gap-2">
                            <span>⭐</span>
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            )}

            <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                    "inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl font-black uppercase tracking-wide text-white bg-gradient-to-r from-[#fbbf24] to-[#d97706] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_24px_rgba(251,191,36,0.35)]",
                    compact ? "min-h-[40px] px-5 py-2 text-[11px]" : "min-h-[48px] px-8 py-3 text-sm",
                )}
            >
                {!compact && <span>🎁</span>}
                Claim My Free Spot
                <ArrowRight size={compact ? 14 : 16} />
            </a>

            {!compact && (
                <>
                    <p className="mt-3 text-[11px] text-white/50">100% Free — No credit card required</p>
                    <p className="mt-2 text-[11px] font-bold text-red-400 uppercase tracking-wide">
                        Warning: this will be taken down soon
                    </p>
                </>
            )}
        </div>
    );
}
