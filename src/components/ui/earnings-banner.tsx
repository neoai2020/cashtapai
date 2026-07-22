"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { clsx } from "clsx";

const CTA_URL = "https://www.breakoutai.net/5k-passive-9";

interface EarningsBannerProps {
    onDismiss?: () => void;
    compact?: boolean;
}

export function EarningsBanner({ onDismiss, compact = false }: EarningsBannerProps) {
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
                    compact ? "mb-2 px-2 py-0.5 text-[9px]" : "mb-3 px-3 py-1 text-[10px]",
                )}
            >
                Free Training
            </span>

            <h3
                className={clsx(
                    "font-black uppercase text-white leading-tight",
                    compact
                        ? "text-sm sm:text-base mb-1.5"
                        : "text-xl sm:text-2xl mb-2",
                )}
            >
                Multiply Your Earnings To{" "}
                <span className="text-[#fbbf24]">$1,000 – $5,000</span> A Day
            </h3>

            {!compact && (
                <p className="text-sm sm:text-base font-semibold text-sky-300 mb-4 max-w-2xl mx-auto leading-relaxed">
                    CashTap AI is powerful — watch this free training to automate your entire workflow and unlock your full potential.
                </p>
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
                Click Here To Learn How
                <ArrowRight size={compact ? 14 : 16} />
            </a>

            {!compact && (
                <p className="mt-3 text-[11px] font-bold text-red-400 uppercase tracking-wide">
                    Warning: this will be taken down soon
                </p>
            )}
        </div>
    );
}
