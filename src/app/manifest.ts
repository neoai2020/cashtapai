import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "CashTap AI",
        short_name: "CashTap AI",
        description: "Find ads, create replies, and earn commissions with AI.",
        start_url: "/dashboard",
        display: "standalone",
        background_color: "#0A0A0B",
        theme_color: "#0A0A0B",
        icons: [
            {
                src: "/icons/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
