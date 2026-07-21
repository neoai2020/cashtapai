"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, TrendingUp, ArrowRight, Brain, Radar, MessageSquare } from "lucide-react";
import { ContactSupportWidget } from "@/components/dashboard/ContactSupportWidget";
import { DashboardTipsWidget } from "@/components/dashboard/DashboardTipsWidget";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/page-header";
import { VideoThumbnail } from "@/components/ui/video-thumbnail";
import { VideoOverlay } from "@/components/ui/video-overlay";
import { HowItWorks } from "@/components/ui/how-it-works";

const DASHBOARD_VIDEO_ID = "1171466801";

export default function DashboardPage() {
    const [videoOpen, setVideoOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash && hash.includes("error=") && (hash.includes("otp_expired") || hash.includes("access_denied") || hash.includes("recovery"))) {
            const hashParams = new URLSearchParams(hash.substring(1));
            const errorDesc = hashParams.get("error_description") || "This password reset link has expired or is invalid.";
            router.replace(`/reset-password?error=${encodeURIComponent(errorDesc.replace(/\+/g, " "))}`);
            return;
        }
    }, [router]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8 w-full"
        >
            <PageHeader
                eyebrow="HOME"
                title="Welcome to CashTap AI"
                subtitle="Find conversations on Reddit and YouTube, generate natural replies with your affiliate link, and earn when people buy through you."
            />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3 flex flex-col gap-8">
                    <section className="card-base overflow-hidden p-0! border-border-dim/40">
                        <VideoThumbnail
                            videoId={DASHBOARD_VIDEO_ID}
                            title="Get Started in 3 Minutes"
                            onPlay={() => setVideoOpen(true)}
                            eager
                            className="rounded-none border-0"
                        />
                        <div className="p-5 border-t border-border-dim/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-sm text-text-primary font-bold">Get Started in 3 Minutes</p>
                                <p className="text-xs text-text-muted mt-1">Learn how to find ads and create replies</p>
                            </div>
                            <Link href="/training" className="btn-primary min-h-[48px] shrink-0">
                                Open Training Academy
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </section>

                    <HowItWorks
                        steps={[
                            {
                                number: 1,
                                title: "Enter a topic",
                                description: "Type one niche or product angle. CashTap finds related keywords and conversations.",
                                minutes: "~2 min",
                                href: "/search",
                                icon: Search,
                                cta: "Go to Step 1",
                            },
                            {
                                number: 2,
                                title: "Find high-demand ads",
                                description: "Check demand, pick active posts, and select the best places to reply.",
                                minutes: "~5 min",
                                href: "/radar",
                                icon: Radar,
                                cta: "Go to Step 3",
                            },
                            {
                                number: 3,
                                title: "Copy AI replies",
                                description: "Generate replies with your link baked in, copy them, and paste under the ad.",
                                minutes: "~3 min",
                                href: "/replies",
                                icon: MessageSquare,
                                cta: "Go to Step 4",
                            },
                        ]}
                    />

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { href: "/search", title: "Step 1: Enter Topic", desc: "Start with one topic", icon: Search },
                            { href: "/analysis", title: "Step 2: Check Demand", desc: "See which keywords win", icon: Brain },
                            { href: "/radar", title: "Step 3: Find Ads", desc: "Pick posts to reply to", icon: TrendingUp },
                        ].map((action) => {
                            const Icon = action.icon;
                            return (
                                <button
                                    key={action.href}
                                    type="button"
                                    onClick={() => router.push(action.href)}
                                    className="card-base p-6 flex items-center gap-4 hover:border-accent/40 transition-all group cursor-pointer text-left"
                                >
                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-all">
                                        <Icon size={22} className="text-accent" />
                                    </div>
                                    <div className="flex flex-col items-start gap-0.5 flex-1">
                                        <span className="text-text-primary font-bold text-sm">{action.title}</span>
                                        <span className="text-text-muted text-xs">{action.desc}</span>
                                    </div>
                                    <ArrowRight size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                                </button>
                            );
                        })}
                    </section>

                    <p className="text-xs text-text-muted italic text-center">
                        Individual results vary.
                    </p>
                </div>

                <aside className="flex flex-col gap-4">
                    <ContactSupportWidget />
                    <DashboardTipsWidget />
                </aside>
            </div>

            <VideoOverlay
                open={videoOpen}
                onClose={() => setVideoOpen(false)}
                videoUrl={`https://player.vimeo.com/video/${DASHBOARD_VIDEO_ID}`}
                title="Get Started in 3 Minutes"
            />
        </motion.div>
    );
}
