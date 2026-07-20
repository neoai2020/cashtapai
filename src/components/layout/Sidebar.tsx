"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutGrid, Radar, LogOut, ChevronRight, GraduationCap, Target, Sparkles,
    Rocket, Scan, Search, MessageSquare, Brain, TrendingUp, ExternalLink,
    PanelLeftClose, PanelLeftOpen
} from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { clsx } from "clsx";
import { motion } from "framer-motion";

const STEPS = [
    { path: "/dashboard", label: "Home", icon: LayoutGrid },
    { path: "/search", label: "Step 1: Enter Topic", icon: Search },
    { path: "/analysis", label: "Step 2: Check Demand", icon: Brain },
    { path: "/radar", label: "Step 3: Find Ads", icon: Radar },
    { path: "/replies", label: "Step 4: Create Replies", icon: MessageSquare },
    { path: "/training", label: "Training", icon: GraduationCap },
    { path: "/scale-training", label: "Scale to $1k–$5k/day", icon: TrendingUp },
];

const UPGRADES = [
    { path: "/dfy", label: "Done-For-You", icon: Scan },
    { path: "/instant", label: "Instant Income", icon: Sparkles },
    { path: "/autopilot", label: "Automated Profits", icon: Rocket },
];

const EXCLUSIVE_OFFERS = [
    { title: "Earn $400/Day Testing New Apps", url: "https://jvz4.com/c/3547097/442443/" },
    { title: "Get Paid To Copy & Paste", url: "https://jvz1.com/c/3547097/442055/" },
    { title: "Fast Cash Training", url: "https://www.breakoutai.net/5k-passive-9" },
];

export function Sidebar({
    collapsed = false,
    onToggleCollapse,
}: {
    collapsed?: boolean;
    onToggleCollapse?: () => void;
}) {
    const pathname = usePathname();
    const { resetSession } = useSearch();
    const currentIndex = STEPS.findIndex((s) => s.path === pathname);
    const progress = ((currentIndex + 1) / STEPS.length) * 100;

    return (
        <aside
            className={clsx(
                "hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 h-dvh overflow-hidden border-r border-border-dim bg-sidebar transition-[width] duration-300",
                collapsed ? "w-[var(--sidebar-w-collapsed)]" : "w-[var(--sidebar-w)]"
            )}
        >
            <div className="absolute left-0 top-0 w-0.5 h-full bg-border-dim z-0">
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${progress}%` }}
                    className="w-full bg-accent shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                    transition={{ duration: 1, ease: "circOut" }}
                />
            </div>

            <div className="flex flex-col p-4 gap-6 relative z-10 h-full min-w-0">
                <div className="flex items-center justify-between gap-2 px-1">
                    <Link
                        href="/dashboard"
                        className={clsx("flex items-center gap-3 group min-w-0", collapsed && "justify-center w-full")}
                        title="CashTap AI"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-muted flex items-center justify-center rounded-lg shadow-gold shrink-0">
                            <Target size={22} className="text-white" />
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col min-w-0">
                                <span className="brand-font text-[20px] text-text-primary tracking-tight leading-none whitespace-nowrap">
                                    CashTap&nbsp;AI
                                </span>
                                <span className="text-[10px] font-bold text-text-muted mt-1 whitespace-nowrap">
                                    Simple AI Ad Helper
                                </span>
                            </div>
                        )}
                    </Link>

                    {!collapsed && onToggleCollapse && (
                        <button
                            type="button"
                            onClick={onToggleCollapse}
                            aria-label="Collapse sidebar"
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 shrink-0"
                        >
                            <PanelLeftClose size={18} />
                        </button>
                    )}
                </div>

                {collapsed && onToggleCollapse && (
                    <button
                        type="button"
                        onClick={onToggleCollapse}
                        aria-label="Expand sidebar"
                        className="mx-auto w-10 h-10 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5"
                    >
                        <PanelLeftOpen size={18} />
                    </button>
                )}

                <nav className="flex flex-col gap-2 w-full flex-1 overflow-y-auto no-scrollbar pb-6 min-w-0">
                    {!collapsed && (
                        <span className="text-[10px] font-black tracking-[0.3em] text-text-muted uppercase px-3 mb-1">
                            Navigation
                        </span>
                    )}

                    {STEPS.map((step) => {
                        const isActive = pathname === step.path;
                        const Icon = step.icon;

                        return (
                            <Link
                                key={step.path}
                                href={step.path}
                                title={collapsed ? step.label : undefined}
                                className={clsx(
                                    "command-nav-link group py-3.5",
                                    collapsed ? "justify-center px-0" : "whitespace-nowrap",
                                    isActive && "active"
                                )}
                            >
                                <div className={clsx("flex items-center", collapsed ? "justify-center" : "gap-4")}>
                                    <Icon size={18} className={clsx(isActive ? "text-accent" : "text-text-muted group-hover:text-text-primary")} />
                                    {!collapsed && (
                                        <span className="brand-font tracking-wide text-sm font-medium">{step.label}</span>
                                    )}
                                </div>
                                {!collapsed && isActive && <ChevronRight size={14} className="text-accent ml-auto" />}
                            </Link>
                        );
                    })}

                    {!collapsed && (
                        <>
                            <div className="flex flex-col mx-1 mt-3 gap-2.5">
                                {EXCLUSIVE_OFFERS.map((promo) => (
                                    <a
                                        key={promo.url}
                                        href={promo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between gap-3 p-3 rounded-xl bg-page border border-accent/25 hover:border-accent/50 transition-all duration-300 group"
                                    >
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className="brand-font text-[12px] font-semibold text-accent leading-tight">{promo.title}</span>
                                            <span className="text-[10px] text-text-muted font-medium">Claim Now</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-lg border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                                            <ExternalLink size={14} className="text-accent" />
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="flex flex-col mx-1 mt-3">
                                <div className="bg-page border border-accent/20 rounded-[14px] p-4 flex flex-col gap-3">
                                    <div className="flex items-center gap-2 mb-1 px-1">
                                        <Sparkles className="text-accent" size={16} strokeWidth={2} />
                                        <span className="text-[11px] font-bold tracking-[0.15em] text-accent uppercase">Premium Features</span>
                                    </div>

                                    {UPGRADES.map((step) => {
                                        const isActive = pathname === step.path;
                                        const Icon = step.icon;

                                        return (
                                            <Link
                                                key={step.path}
                                                href={step.path}
                                                className={clsx(
                                                    "flex items-center justify-center gap-3 py-3 rounded-full transition-all duration-300 border",
                                                    isActive
                                                        ? "bg-accent/10 border-accent/40 text-accent"
                                                        : "bg-surface border-white/5 text-text-muted hover:border-white/10 hover:text-white"
                                                )}
                                            >
                                                <Icon size={16} strokeWidth={1.5} />
                                                <span className="text-[13px] font-medium tracking-wide">{step.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {collapsed && (
                        <div className="flex flex-col gap-2 mt-2">
                            {UPGRADES.map((step) => {
                                const isActive = pathname === step.path;
                                const Icon = step.icon;
                                return (
                                    <Link
                                        key={step.path}
                                        href={step.path}
                                        title={step.label}
                                        className={clsx(
                                            "flex items-center justify-center py-3 rounded-xl border transition-colors",
                                            isActive ? "bg-accent/10 border-accent/30 text-accent" : "border-white/5 text-text-muted hover:text-white"
                                        )}
                                    >
                                        <Icon size={18} />
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    <div className="flex flex-col gap-2 mt-auto pt-4">
                        <button
                            type="button"
                            onClick={resetSession}
                            title="Logout"
                            className={clsx(
                                "command-nav-link group py-3.5 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300",
                                collapsed ? "justify-center px-0" : "whitespace-nowrap"
                            )}
                        >
                            <div className={clsx("flex items-center", collapsed ? "justify-center" : "gap-4")}>
                                <LogOut size={18} />
                                {!collapsed && (
                                    <span className="brand-font tracking-wide text-sm font-medium">Logout</span>
                                )}
                            </div>
                        </button>
                    </div>
                </nav>
            </div>
        </aside>
    );
}
