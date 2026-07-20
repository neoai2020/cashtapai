"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, DollarSign, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toEmbedUrl } from "@/lib/video-thumbnails";

const WITHDRAW_URL = "https://jvz4.com/c/3547097/442443/";
const WITHDRAW_AMOUNT = "$214.36";

interface VideoOverlayProps {
    open: boolean;
    onClose: () => void;
    videoUrl: string;
    title: string;
}

export function VideoOverlay({ open, onClose, videoUrl, title }: VideoOverlayProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, handleKeyDown]);

    if (!mounted || !open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-4">
            <button
                type="button"
                aria-label="Close video"
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
            />

            <div
                className="relative z-10 flex flex-col w-full max-w-5xl h-[100dvh] sm:h-[min(92dvh,56rem)] bg-[#0a0a0c] border border-white/10 sm:rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-5 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] border-b border-white/10 bg-[#0c0c0e]">
                    <h2 className="text-sm sm:text-base font-bold text-white truncate pr-2">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 min-h-0 bg-black">
                    <iframe
                        src={toEmbedUrl(videoUrl)}
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                        allowFullScreen
                        title={title}
                    />
                </div>

                <div className="shrink-0 relative overflow-hidden border-t border-green-500/30 bg-[#0c0e0c] px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                                </span>
                                <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">
                                    Account Verified
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-black text-white leading-tight">
                                        Congratulations! You&apos;re Eligible To Withdraw{" "}
                                        <span className="text-green-400">{WITHDRAW_AMOUNT}</span>
                                    </p>
                                    <p className="text-[11px] text-text-muted mt-0.5">
                                        Available balance from your activity
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1.5 text-[10px] text-text-muted">
                                <ShieldCheck size={10} className="text-green-400" />
                                <span>Verified Balance</span>
                                <span>·</span>
                                <span>Ref: HX-29459-9022</span>
                            </div>
                        </div>

                        <a
                            href={WITHDRAW_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(34,197,94,0.35)] hover:shadow-[0_6px_28px_rgba(34,197,94,0.45)] active:scale-[0.98]"
                        >
                            <DollarSign size={16} />
                            Withdraw Now
                            <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
