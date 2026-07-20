"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid, Search, Radar, MessageSquare, MoreHorizontal,
    Brain, GraduationCap, TrendingUp, Scan, Sparkles, Rocket,
    LogOut, ExternalLink, X, Headphones, ChevronRight
} from "lucide-react";
import { clsx } from "clsx";
import { useSearch } from "@/context/SearchContext";

const MAIN_TABS = [
    { path: "/dashboard", label: "Home", icon: LayoutGrid },
    { path: "/search", label: "Search", icon: Search },
    { path: "/radar", label: "Find Ads", icon: Radar },
    { path: "/replies", label: "Replies", icon: MessageSquare },
];

const MORE_NAV = [
    { path: "/analysis", label: "Step 2: Check Demand", icon: Brain },
    { path: "/training", label: "Training", icon: GraduationCap },
    { path: "/scale-training", label: "Scale to $1k–$5k/day", icon: TrendingUp },
];

const PREMIUM = [
    { path: "/dfy", label: "Done-For-You", icon: Scan },
    { path: "/instant", label: "Instant Income", icon: Sparkles },
    { path: "/autopilot", label: "Automated Profits", icon: Rocket },
];

const EXCLUSIVE_OFFERS = [
    { title: "Earn $400/Day Testing New Apps", url: "https://jvz4.com/c/3547097/442443/" },
    { title: "Get Paid To Copy & Paste", url: "https://jvz1.com/c/3547097/442055/" },
    { title: "Fast Cash Training", url: "https://www.breakoutai.net/5k-passive-9" },
];

export function BottomNav() {
    const pathname = usePathname();
    const { resetSession } = useSearch();
    const [moreOpen, setMoreOpen] = useState(false);

    useEffect(() => {
        setMoreOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!moreOpen) return;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [moreOpen]);

    const isMoreActive = MORE_NAV.some((item) => pathname === item.path)
        || PREMIUM.some((item) => pathname === item.path);

    return (
        <>
            <nav
                className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border-dim/60 bg-[#0A0A0B]/95 backdrop-blur-md"
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
                <div className="grid grid-cols-5 h-16">
                    {MAIN_TABS.map((tab) => {
                        const Icon = tab.icon;
                        const active = pathname === tab.path;
                        return (
                            <Link
                                key={tab.path}
                                href={tab.path}
                                className={clsx(
                                    "relative flex flex-col items-center justify-center gap-1 transition-colors active:opacity-70",
                                    active ? "text-accent" : "text-text-muted"
                                )}
                            >
                                {active && (
                                    <span className="absolute top-0 inset-x-2 h-[3px] rounded-b-full bg-gradient-to-r from-accent to-accent-muted" />
                                )}
                                <Icon size={24} strokeWidth={active ? 2.2 : 1.8} />
                                <span className="text-[11px] font-semibold leading-none">{tab.label}</span>
                            </Link>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => setMoreOpen(true)}
                        className={clsx(
                            "relative flex flex-col items-center justify-center gap-1 transition-colors active:opacity-70",
                            isMoreActive || moreOpen ? "text-accent" : "text-text-muted"
                        )}
                    >
                        {(isMoreActive || moreOpen) && (
                            <span className="absolute top-0 inset-x-2 h-[3px] rounded-b-full bg-gradient-to-r from-accent to-accent-muted" />
                        )}
                        <MoreHorizontal size={24} strokeWidth={isMoreActive ? 2.2 : 1.8} />
                        <span className="text-[11px] font-semibold leading-none">More</span>
                    </button>
                </div>
            </nav>

            {moreOpen && (
                <div className="lg:hidden fixed inset-0 z-[70]">
                    <button
                        type="button"
                        aria-label="Close menu"
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setMoreOpen(false)}
                    />
                    <div className="absolute bottom-0 inset-x-0 max-h-[85dvh] rounded-t-2xl bg-[#0c0c0e] border-t border-border-dim overflow-hidden flex flex-col">
                        <div className="flex items-center justify-center py-3">
                            <div className="w-10 h-1 rounded-full bg-white/20" />
                        </div>
                        <div className="flex items-center justify-between px-5 pb-3">
                            <h2 className="text-base font-bold text-white">More</h2>
                            <button
                                type="button"
                                onClick={() => setMoreOpen(false)}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-white/5"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="overflow-y-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black tracking-[0.2em] text-text-muted uppercase px-2 mb-1">
                                    Navigation
                                </span>
                                {MORE_NAV.map((item) => {
                                    const Icon = item.icon;
                                    const active = pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            onClick={() => setMoreOpen(false)}
                                            className={clsx(
                                                "flex items-center gap-3 min-h-[52px] px-3 rounded-xl transition-colors",
                                                active ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-white/5"
                                            )}
                                        >
                                            <Icon size={18} />
                                            <span className="text-sm font-medium flex-1">{item.label}</span>
                                            <ChevronRight size={14} className="opacity-40" />
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-black tracking-[0.2em] text-accent uppercase px-2">
                                    Premium Features
                                </span>
                                {PREMIUM.map((item) => {
                                    const Icon = item.icon;
                                    const active = pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            onClick={() => setMoreOpen(false)}
                                            className={clsx(
                                                "flex items-center gap-3 min-h-[52px] px-3 rounded-xl border transition-colors",
                                                active
                                                    ? "bg-accent/10 border-accent/30 text-accent"
                                                    : "border-white/5 text-text-secondary hover:border-white/10"
                                            )}
                                        >
                                            <Icon size={18} />
                                            <span className="text-sm font-medium flex-1">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-black tracking-[0.2em] text-text-muted uppercase px-2">
                                    Exclusive Offers
                                </span>
                                {EXCLUSIVE_OFFERS.map((promo) => (
                                    <a
                                        key={promo.url}
                                        href={promo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between gap-3 min-h-[52px] px-3 py-2 rounded-xl bg-[#0A0A0B] border border-accent/25 hover:border-accent/50 transition-colors"
                                    >
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className="text-[13px] font-semibold text-accent leading-tight">{promo.title}</span>
                                            <span className="text-[10px] text-text-muted font-medium">Claim Now</span>
                                        </div>
                                        <ExternalLink size={14} className="text-accent shrink-0" />
                                    </a>
                                ))}
                            </div>

                            <div className="flex flex-col gap-1 border-t border-white/5 pt-4">
                                <a
                                    href="mailto:cashtapai@neoai.freshdesk.com"
                                    className="flex items-center gap-3 min-h-[52px] px-3 rounded-xl text-text-secondary hover:bg-white/5"
                                >
                                    <Headphones size={18} />
                                    <span className="text-sm font-medium">Contact Support</span>
                                </a>
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetSession();
                                        setMoreOpen(false);
                                    }}
                                    className="flex items-center gap-3 min-h-[52px] px-3 rounded-xl text-red-400/80 hover:bg-red-500/5"
                                >
                                    <LogOut size={18} />
                                    <span className="text-sm font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
