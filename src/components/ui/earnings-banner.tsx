"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

const CTA_URL = "https://www.breakoutai.net/5k-passive-9";

interface EarningsBannerProps {
    onDismiss?: () => void;
}

export function EarningsBanner({ onDismiss }: EarningsBannerProps) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleDismiss = () => {
        setVisible(false);
        onDismiss?.();
    };

    return (
        <div className="relative w-full rounded-2xl border-2 border-[#fbbf24]/50 bg-gradient-to-b from-[#101726] to-[#0b0f18] p-5 sm:p-6 text-center shadow-[0_0_40px_rgba(251,191,36,0.08)]">
            <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss offer"
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
                <X size={16} />
            </button>

            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">
                Free Training
            </span>

            <h3 className="text-xl sm:text-2xl font-black uppercase text-white leading-tight mb-2">
                Multiply Your Earnings To{" "}
                <span className="text-[#fbbf24]">$1,000 – $5,000</span> A Day
            </h3>

            <p className="text-sm sm:text-base font-semibold text-sky-300 mb-4 max-w-2xl mx-auto leading-relaxed">
                CashTap AI is powerful — watch this free training to automate your entire workflow and unlock your full potential.
            </p>

            <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wide text-white bg-gradient-to-r from-[#fbbf24] to-[#d97706] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_24px_rgba(251,191,36,0.35)]"
            >
                Click Here To Learn How
                <ArrowRight size={16} />
            </a>

            <p className="mt-3 text-[11px] font-bold text-red-400 uppercase tracking-wide">
                Warning: this will be taken down soon
            </p>
        </div>
    );
}
