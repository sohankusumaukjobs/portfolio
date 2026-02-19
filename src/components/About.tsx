"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, User } from "lucide-react";
import { professionalSummary, experiences } from "@/data/resume";

export default function About() {
    const [tab, setTab] = useState<"summary" | "journey">("summary");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="section-padding">
            <div className="max-w-5xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="section-label">{"// about"}</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        About <span className="gradient-text">The Analyst</span>
                    </h2>
                    <p className="text-[#9fb3c9] max-w-2xl mx-auto">
                        Built with Passion
                    </p>
                    <div className="section-underline mx-auto" />
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.995 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex justify-center mb-12"
                >
                    <div className="tab-strip glass">
                        {[
                            { key: "summary" as const, label: "Professional Summary", icon: User },
                            { key: "journey" as const, label: "Work Journey", icon: Briefcase },
                        ].map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setTab(key)}
                                className={`tab-item flex items-center justify-center gap-2 text-sm font-medium
                                    ${tab === key ? "tab-item--active" : ""}`}
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Tab content */}
                {tab === "summary" ? (
                    <motion.div
                        key="summary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="glass p-8 md:p-10"
                    >
                        <p className="text-[#e6f0ff] leading-relaxed text-base md:text-lg">
                            {professionalSummary}
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="journey"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative"
                    >
                        {/* Vertical timeline line */}
                        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[rgba(0,170,255,0.2)] to-transparent" />

                        <div className="space-y-8">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={exp.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="relative pl-14 md:pl-16"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-[10px] md:left-[18px] top-7 w-3 h-3 rounded-full bg-[#00aaff] border-2 border-[#031022] shadow-[0_0_12px_rgba(0,170,255,0.6)]" />

                                    <div className="glass p-6 md:p-8">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                                            <h3 className="text-lg font-semibold text-white">
                                                {exp.title}
                                            </h3>
                                            {exp.date && (
                                                <span className="text-xs text-[#9fb3c9] border border-white/[0.06] rounded-full px-3 py-1 self-start whitespace-nowrap bg-white/[0.03]">
                                                    {exp.date}
                                                </span>
                                            )}
                                        </div>
                                        <ul className="space-y-2.5 mb-5">
                                            {exp.bullets.map((bullet, j) => (
                                                <li
                                                    key={j}
                                                    className="text-[#9fb3c9] text-sm leading-relaxed flex gap-3"
                                                >
                                                    <span className="text-[#00aaff] shrink-0">
                                                        ▹
                                                    </span>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                        <span className="inline-block text-xs font-medium px-3.5 py-1.5 rounded-full border border-[rgba(0,170,255,0.2)] text-[#00aaff] bg-[rgba(0,170,255,0.06)]">
                                            {exp.role}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
