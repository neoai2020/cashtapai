"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { EarningsBanner } from "./earnings-banner";
import { WelcomeOfferBanner } from "./welcome-offer-banner";

interface GenerationProgressProps {
    label: string;
    active: boolean;
    offer?: "earnings" | "welcome";
    showBanner?: boolean;
}

export function GenerationProgress({
    label,
    active,
    offer = "earnings",
    showBanner = true,
}: GenerationProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!active) {
            setProgress(0);
            return;
        }

        setProgress(8);
        const interval = window.setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) return prev;
                const step = prev < 60 ? 6 + Math.random() * 4 : 1 + Math.random() * 2;
                return Math.min(95, prev + step);
            });
        }, 280);

        return () => window.clearInterval(interval);
    }, [active]);

    if (!active && !showBanner) return null;

    const Banner = offer === "welcome" ? WelcomeOfferBanner : EarningsBanner;

    return (
        <div className="flex flex-col gap-4 w-full">
            {active && (
                <div className="rounded-2xl border border-border-dim/40 bg-surface/60 p-4 sm:p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <Loader2 size={18} className="animate-spin text-accent shrink-0" />
                        <span className="text-sm font-semibold text-text-primary">{label}</span>
                    </div>
                    <div className="h-2 rounded-full bg-page overflow-hidden border border-border-dim/30">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-muted transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}
            {showBanner && <Banner />}
        </div>
    );
}
