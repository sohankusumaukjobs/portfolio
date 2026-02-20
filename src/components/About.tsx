"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useSpring } from "framer-motion";
import { Briefcase, User } from "lucide-react";
import { professionalSummary, experiences } from "@/data/resume";

const tabs = [
    { key: "summary" as const, label: "Professional Summary", icon: User },
    { key: "journey" as const, label: "Work Journey", icon: Briefcase },
];

/* ─── CSS-only Spaceship with animated exhaust ─────────────── */
function Spaceship({ style, className }: { style?: any; className?: string }) {
    return (
        <motion.div className={className} style={{ ...style, pointerEvents: "none", zIndex: 30 }}>
            <div style={{ position: "relative", width: 68, height: 68, transform: "rotate(-10deg)" }}>
                {/* 3D Vector Ship body */}
                <svg width="68" height="68" viewBox="0 0 100 100" fill="none" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>
                    <defs>
                        <clipPath id="bodyClip">
                            <path d="M 24 50 C 24 30, 50 25, 92 50 C 50 75, 24 70, 24 50 Z" />
                        </clipPath>
                    </defs>

                    {/* Top Fin */}
                    <polygon points="30,35 50,38 20,15 12,20" fill="#111827" />
                    <ellipse cx="18" cy="14" rx="14" ry="5" transform="rotate(-30 18 14)" fill="#e63946" />
                    <path d="M 0 10 Q 5 15, 8 18 Q 8 10, 0 10 Z" fill="#ffb703" />

                    {/* Bottom Fin */}
                    <polygon points="30,65 50,62 20,85 12,80" fill="#111827" />
                    <ellipse cx="18" cy="86" rx="14" ry="5" transform="rotate(30 18 86)" fill="#e63946" />
                    <path d="M 0 90 Q 5 85, 8 82 Q 8 90, 0 90 Z" fill="#ffb703" />

                    {/* Main Engine */}
                    <polygon points="12,38 28,42 28,58 12,62" fill="#1d3557" />
                    <rect x="22" y="41" width="4" height="18" fill="#e63946" />

                    {/* Body */}
                    <path d="M 24 50 C 24 30, 50 25, 92 50 Z" fill="#e0e1dd" />
                    <path d="M 24 50 C 24 70, 50 75, 92 50 Z" fill="#d3d4d0" />

                    {/* Nose Cone */}
                    <g clipPath="url(#bodyClip)">
                        <rect x="68" y="20" width="30" height="30" fill="#e63946" />
                        <rect x="68" y="50" width="30" height="30" fill="#d90429" />
                    </g>

                    {/* Windows */}
                    <circle cx="48" cy="50" r="10" fill="#1d3557" />
                    <circle cx="45" cy="47" r="4" fill="#457b9d" />
                    <circle cx="70" cy="48" r="5" fill="#1d3557" />
                    <circle cx="68" cy="46" r="2" fill="#457b9d" />
                </svg>
                {/* Exhaust flames — layered for realistic effect */}
                <div className="spaceship-exhaust" style={{ position: "absolute", left: -14, top: "50%", transform: "translateY(-50%)" }}>
                    <div className="flame flame-core" />
                    <div className="flame flame-mid" />
                    <div className="flame flame-outer" />
                </div>
            </div>
        </motion.div>
    );
}

export default function About() {
    const [tab, setTab] = useState<"summary" | "journey">("summary");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Card refs for scroll tracking
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState(0);
    const shipY = useSpring(0, { stiffness: 80, damping: 20, mass: 0.8 });
    const [shipPhase, setShipPhase] = useState<"entering" | "docked" | "exited">("entering");
    const phaseRef = useRef<"entering" | "docked" | "exited">("entering");
    const [journeyMounted, setJourneyMounted] = useState(false);

    // Track scroll to determine which card the ship docks at
    const handleScroll = useCallback(() => {
        if (!containerRef.current || cardRefs.current.length === 0) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const viewportCenter = window.innerHeight * 0.45;

        let closestIdx = 0;
        let closestDist = Infinity;

        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const dist = Math.abs(cardCenter - viewportCenter);

            if (dist < closestDist) {
                closestDist = dist;
                closestIdx = i;
            }
        });

        // Calculate ship Y position relative to the container
        const activeCardEl = cardRefs.current[closestIdx];
        if (activeCardEl) {
            const cardRect = activeCardEl.getBoundingClientRect();
            const cardCenterY = cardRect.top + cardRect.height / 2 - containerRect.top;
            shipY.set(cardCenterY);
        }

        let newPhase: "entering" | "docked" | "exited" = "docked";

        // Check if scrolled past all cards
        const lastCard = cardRefs.current[cardRefs.current.length - 1];
        if (lastCard) {
            const lastRect = lastCard.getBoundingClientRect();
            const lastCardCenter = lastRect.top + lastRect.height / 2;

            // Exit right when the last card reaches the viewport center
            if (lastCardCenter < viewportCenter - 50) {
                newPhase = "exited";
            }
            // Snap to left entering position if container is below viewport
            else if (containerRect.top > window.innerHeight - 100) {
                newPhase = "entering";
            }
        }

        if (newPhase !== phaseRef.current) {
            if (phaseRef.current === "exited" && newPhase === "docked") {
                // When scrolling back up from exited state, snap to left first
                setShipPhase("entering");
                phaseRef.current = "entering";
                setTimeout(() => {
                    setShipPhase("docked");
                    phaseRef.current = "docked";
                }, 50);
            } else {
                setShipPhase(newPhase);
                phaseRef.current = newPhase;
            }
        }

        // Only update active card state if it changes to avoid re-renders
        setActiveCard((prev) => (prev !== closestIdx ? closestIdx : prev));
    }, [shipY]);

    // Set up scroll listener when journey tab is active
    useEffect(() => {
        if (tab !== "journey") {
            setJourneyMounted(false);
            setShipPhase("entering");
            phaseRef.current = "entering";
            return;
        }

        // Small delay to allow summary to exit (350ms from AnimatePresence) + buffer
        const mountTimer = setTimeout(() => {
            setJourneyMounted(true);
            setShipPhase("entering"); // initially render far left off-screen

            // Allow DOM to apply "entering" position before triggering fly-in
            setTimeout(() => {
                handleScroll(); // measures docking coordinates and sets phase
            }, 50);
        }, 400);

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            clearTimeout(mountTimer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [tab, handleScroll]);

    const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
        cardRefs.current[i] = el;
    }, []);

    return (
        <section id="about" className="section-padding flex flex-col items-center justify-center w-full">
            <div className="max-w-5xl w-full mx-auto flex flex-col items-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-16 w-full"
                >
                    <p className="section-label">{"// about"}</p>
                    <h2 className="text-5xl md:text-6xl text-white mb-4" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                        About <span className="gradient-text">The Analyst</span>
                    </h2>
                    <p className="text-[#9fb3c9] max-w-2xl">
                        Built with Passion
                    </p>
                    <div className="section-underline" />
                </motion.div>

                {/* Enhanced Tab Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.995 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex justify-center mb-12"
                >
                    <div className="tab-strip glass relative">
                        {tabs.map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setTab(key)}
                                className={`tab-item relative flex items-center justify-center gap-2 text-sm font-medium z-10
                                    ${tab === key ? "tab-item--active" : ""}`}
                            >
                                <Icon size={16} />
                                {label}
                                {tab === key && (
                                    <motion.div
                                        layoutId="about-tab-indicator"
                                        className="absolute inset-0 rounded-[18px]"
                                        style={{
                                            background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                                            boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.02), 0 6px 22px rgba(0,160,255,0.06)',
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Tab Content with AnimatePresence */}
                <AnimatePresence mode="wait">
                    {tab === "summary" ? (
                        <motion.div
                            key="summary"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35, ease: [0.2, 0.9, 0.3, 1] }}
                            className="glass p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center w-full"
                        >
                            <p className="text-[#e6f0ff] leading-relaxed text-base md:text-lg text-center max-w-4xl">
                                {professionalSummary}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="journey"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35, ease: [0.2, 0.9, 0.3, 1] }}
                            className="w-full relative"
                            ref={containerRef}
                        >
                            {/* Spaceship — scroll-driven positioning */}
                            {journeyMounted && (
                                <Spaceship
                                    className="absolute hidden md:block"
                                    style={{
                                        // calc(50% - 50vw) aligns exactly with the viewport's edge.
                                        left: shipPhase === "entering" ? "calc(50% - 50vw - 120px)"
                                            : shipPhase === "exited" ? "calc(50% + 50vw + 120px)"
                                                : -64,
                                        top: 0,
                                        marginTop: -34,
                                        y: shipY,
                                        transition: shipPhase === "entering"
                                            ? "none" // start with no transition so it snaps to the left edge instantly
                                            : shipPhase === "exited"
                                                ? "left 0.7s cubic-bezier(0.5, 0, 0.8, 0.2)"
                                                : "left 1.2s cubic-bezier(0.0, 0.8, 0.2, 1)", // 1.2s smooth fly-in to dock
                                    }}
                                />
                            )}

                            <div className="grid grid-cols-1 gap-5 w-full">
                                {experiences.map((exp, i) => {
                                    const isDocked = journeyMounted && shipPhase === "docked";
                                    const isActive = isDocked && activeCard === i;
                                    const isInactive = isDocked && !isActive;

                                    return (
                                        <motion.div
                                            key={exp.title}
                                            ref={(el) => setCardRef(el, i)}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: i * 0.1, ease: [0.2, 0.9, 0.3, 1] }}
                                            className="journey-card glass"
                                            style={{
                                                padding: '24px',
                                                transform: isActive ? 'scale(1.05)' : isInactive ? 'scale(0.92)' : 'scale(1)',
                                                transformOrigin: "center center",
                                                zIndex: isActive ? 10 : 1,
                                                boxShadow: isActive
                                                    ? '0 0 50px rgba(0,170,255,0.15), 0 0 100px rgba(0,170,255,0.1), 0 16px 40px rgba(3,12,25,0.6)'
                                                    : isInactive ? '0 4px 15px rgba(3,12,25,0.3)' : '0 8px 30px rgba(3,12,25,0.45)',
                                                opacity: isInactive ? 0.35 : 1,
                                                filter: isInactive ? 'blur(2px)' : 'none',
                                                borderColor: isActive ? 'rgba(0,170,255,0.25)' : 'rgba(255,255,255,0.04)',
                                                transition: 'transform 0.5s cubic-bezier(0.2,0.9,0.3,1), box-shadow 0.5s ease, opacity 0.5s ease, filter 0.5s ease, border-color 0.5s ease',
                                            }}
                                        >
                                            {/* Header row: Title + Date */}
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="text-lg font-semibold text-[#e6f0ff]">
                                                    {exp.title}
                                                </h3>
                                                {exp.date && (
                                                    <span className="text-xs text-[#8fa8bd] border border-white/[0.06] rounded-full px-3 py-1 shrink-0 whitespace-nowrap bg-white/[0.03]">
                                                        {exp.date}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Role tag */}
                                            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full border border-[rgba(0,170,255,0.2)] text-[#00aaff] bg-[rgba(0,170,255,0.06)] mb-4">
                                                {exp.role}
                                            </span>

                                            {/* Bullet points */}
                                            <ul className="space-y-2 text-left">
                                                {exp.bullets.map((bullet, j) => (
                                                    <li
                                                        key={j}
                                                        className="flex gap-3 text-sm"
                                                        style={{ color: '#8fa8bd', lineHeight: '1.8' }}
                                                    >
                                                        <span className="text-[#00aaff] shrink-0 mt-[2px]">▹</span>
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
