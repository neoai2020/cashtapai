"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { clsx } from "clsx";
import { getVideoThumbnailById } from "@/lib/video-thumbnails";

interface VideoThumbnailProps {
    videoId: string;
    title: string;
    onPlay: () => void;
    className?: string;
    eager?: boolean;
}

export function VideoThumbnail({ videoId, title, onPlay, className, eager = false }: VideoThumbnailProps) {
    const [imgError, setImgError] = useState(false);
    const thumbPath = getVideoThumbnailById(videoId);

    return (
        <button
            type="button"
            onClick={onPlay}
            aria-label={`Play ${title}`}
            className={clsx(
                "group relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#161618] via-[#0f1014] to-indigo-950/40 border border-border-dim/40 text-left",
                className
            )}
        >
            <div className="relative w-full aspect-video">
                {thumbPath && !imgError ? (
                    <img
                        src={thumbPath}
                        alt=""
                        loading={eager ? "eager" : "lazy"}
                        decoding="async"
                        onError={() => setImgError(true)}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-[#161618] to-accent-muted/30" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-black/12" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 flex items-center justify-center group-hover:scale-105 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
                        <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                </div>
            </div>
        </button>
    );
}
