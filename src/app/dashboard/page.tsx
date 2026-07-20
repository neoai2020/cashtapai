"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, TrendingUp, BarChart3, Hash, ArrowRight, Brain, Radar, MessageSquare, GraduationCap, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/page-header";
import { VideoThumbnail } from "@/components/ui/video-thumbnail";
import { VideoOverlay } from "@/components/ui/video-overlay";
import { HowItWorks } from "@/components/ui/how-it-works";

interface Stats {
    totalSearches: number;
    nichesAnalyzed: number;
    keywordVariations: number;
}

const DASHBOARD_VIDEO_ID = "1171466801";

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);
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

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const resp = await fetch("/api/stats");
                const data = await resp.json();
                setStats(data);
            } catch (e) {
                console.error("Failed to fetch stats:", e);
                setStats({ totalSearches: 0, nichesAnalyzed: 0, keywordVariations: 0 });
            } finally {
                setLoadingStats(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            label: "Your Searches",
            value: stats?.totalSearches ?? 0,
            icon: Search,
            color: "text-accent",
            bgColor: "bg-accent/10",
            borderColor: "border-accent/20",
        },
        {
            label: "Topics Checked",
            value: stats?.nichesAnalyzed ?? 0,
            icon: BarChart3,
            color: "text-green-400",
            bgColor: "bg-green-500/10",
            borderColor: "border-green-500/20",
        },
        {
            label: "Ads Found",
            value: stats?.keywordVariations ?? 0,
            icon: Hash,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
        },
    ];

    const tips = [
        "Start with one clear topic — weight loss, dog training, skincare, etc.",
        "Pick ads with high engagement so more people see your reply.",
        "Paste your affiliate link in Step 4 so replies include your tracking URL.",
        "Post consistently — a few replies daily beats one big burst.",
    ];

    const nextStep = (stats?.totalSearches ?? 0) === 0
        ? { label: "Enter your first topic", href: "/search", hint: "Step 1 takes about 2 minutes." }
        : (stats?.nichesAnalyzed ?? 0) === 0
            ? { label: "Check demand on your keywords", href: "/analysis", hint: "See which topics are most active." }
            : (stats?.keywordVariations ?? 0) === 0
                ? { label: "Find ads to reply to", href: "/radar", hint: "Select posts with real engagement." }
                : { label: "Create and copy replies", href: "/replies", hint: "Generate replies and paste them under ads." };

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
                        {statCards.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className={`card-base flex flex-col gap-4 p-6 border ${stat.borderColor}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="ds-h4">{stat.label}</span>
                                        <div className={`w-9 h-9 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                            <Icon size={18} className={stat.color} />
                                        </div>
                                    </div>
                                    {loadingStats ? (
                                        <div className="h-9 w-20 bg-border-dim/30 rounded-lg animate-pulse" />
                                    ) : (
                                        <span className={`text-3xl font-black ${stat.color}`}>
                                            {stat.value.toLocaleString()}
                                        </span>
                                    )}
                                </motion.div>
                            );
                        })}
                    </section>

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
                    <div className="card-base border-accent/20 bg-accent/5">
                        <span className="ds-h4 text-accent">Next step</span>
                        <h3 className="ds-h3 mt-2">{nextStep.label}</h3>
                        <p className="text-sm text-text-secondary mt-2">{nextStep.hint}</p>
                        <Link href={nextStep.href} className="btn-primary w-full min-h-[48px] mt-4">
                            Continue
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="card-base">
                        <div className="flex items-center gap-2 mb-3">
                            <Lightbulb size={16} className="text-accent" />
                            <h3 className="ds-h3">Your activity</h3>
                        </div>
                        {loadingStats ? (
                            <div className="space-y-2">
                                <div className="h-4 bg-border-dim/30 rounded animate-pulse" />
                                <div className="h-4 bg-border-dim/30 rounded animate-pulse w-4/5" />
                            </div>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                <li className="text-sm text-text-secondary">
                                    <strong className="text-text-primary">{stats?.totalSearches ?? 0}</strong> searches saved
                                </li>
                                <li className="text-sm text-text-secondary">
                                    <strong className="text-text-primary">{stats?.nichesAnalyzed ?? 0}</strong> topics analyzed
                                </li>
                                <li className="text-sm text-text-secondary">
                                    <strong className="text-text-primary">{stats?.keywordVariations ?? 0}</strong> ad ideas tracked
                                </li>
                            </ul>
                        )}
                        <div className="mt-4 pt-4 border-t border-border-dim/30">
                            <p className="ds-h4 mb-2">Tips</p>
                            <ul className="flex flex-col gap-2">
                                {tips.map((tip) => (
                                    <li key={tip} className="text-xs text-text-muted leading-relaxed flex gap-2">
                                        <span className="text-accent shrink-0">•</span>
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="card-base border-border-dim/40">
                        <div className="flex items-center gap-2 mb-2">
                            <GraduationCap size={16} className="text-accent" />
                            <h3 className="ds-h3">Need a refresher?</h3>
                        </div>
                        <p className="text-sm text-text-secondary mb-4">
                            Watch training videos and browse the full FAQ anytime.
                        </p>
                        <Link href="/training" className="btn-secondary w-full min-h-[44px]">
                            Open Training
                        </Link>
                    </div>
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
