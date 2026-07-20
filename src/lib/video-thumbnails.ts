export const VIDEO_THUMBNAILS: Record<string, string> = {
    "1171466801": "/thumbnails/thumb-01-dashboard.webp",
    "1171473195": "/thumbnails/thumb-02-getting-started.webp",
    "1171474608": "/thumbnails/thumb-03-advanced.webp",
    "1171728175": "/thumbnails/thumb-04-dfy.webp",
    "1171734563": "/thumbnails/thumb-05-autopilot.webp",
    "1171721099": "/thumbnails/thumb-06-instant.webp",
};

const VIMEO_ID_REGEX = /vimeo\.com\/(?:video\/)?(\d+)/;

export function getVideoThumbnail(videoUrl: string): string | null {
    const match = videoUrl.match(VIMEO_ID_REGEX);
    if (!match) return null;
    return VIDEO_THUMBNAILS[match[1]] ?? null;
}

export function getVideoThumbnailById(id: string): string | null {
    return VIDEO_THUMBNAILS[id] ?? null;
}

export function toEmbedUrl(videoUrl: string, autoplay = true): string {
    const match = videoUrl.match(VIMEO_ID_REGEX);
    const id = match?.[1] ?? videoUrl.replace(/\D/g, "");
    const params = new URLSearchParams({
        badge: "0",
        autopause: "0",
        player_id: "0",
        app_id: "58479",
        ...(autoplay ? { autoplay: "1" } : {}),
    });
    return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}
