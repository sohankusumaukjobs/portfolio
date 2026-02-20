"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Briefcase, User } from "lucide-react";
import { professionalSummary, experiences } from "@/data/resume";

const tabs = [
    { key: "summary" as const, label: "Professional Summary", icon: User },
    { key: "journey" as const, label: "Work Journey", icon: Briefcase },
];

export default function About() {
    const [tab, setTab] = useState<"summary" | "journey">("summary");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

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
                                {/* Sliding active indicator */}
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
                            className="w-full"
                        >
                            <div className="grid grid-cols-1 gap-5 w-full">
                                {experiences.map((exp, i) => (
                                    <motion.div
                                        key={exp.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.1, ease: [0.2, 0.9, 0.3, 1] }}
                                        className="glass"
                                        style={{ padding: '24px' }}
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
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
