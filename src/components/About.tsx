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
                    className="text-center mb-12"
                >
                    <p className="section-label">{"// about"}</p>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        About <span className="gradient-text">The Analyst</span>
                    </h2>
                    <p className="text-[#6b7280] max-w-2xl mx-auto">
                        Built with Passion
                    </p>
                    <div className="section-underline mx-auto" />
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex justify-center gap-4 mb-10"
                >
                    {[
                        { key: "summary" as const, label: "Professional Summary", icon: User },
                        { key: "journey" as const, label: "Work Journey", icon: Briefcase },
                    ].map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setTab(key)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden
                                ${tab === key
                                    ? "text-white border border-[#00d4ff]/30 bg-white/[0.05]"
                                    : "text-[#6b7280] border border-white/5 hover:bg-white/[0.03] hover:text-white/80"
                                }`}
                        >
                            <Icon size={16} />
                            {label}
                            {tab === key && (
                                <motion.span
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00d4ff] to-[#7b2ff7]"
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Tab content */}
                {tab === "summary" ? (
                    <motion.div
                        key="summary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="glass-card p-8 md:p-10 relative overflow-hidden"
                    >
                        {/* Left accent border */}
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00d4ff] to-[#7b2ff7]" />
                        <p className="text-[#d1d5db] leading-relaxed text-base md:text-lg pl-4">
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
                        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00d4ff]/50 via-[#7b2ff7]/30 to-transparent" />

                        <div className="space-y-6">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={exp.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="relative pl-12 md:pl-16"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-[10px] md:left-[18px] top-6 w-3 h-3 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7b2ff7] border-2 border-[#080808]" />

                                    <div className="glass-card glass-card-hover p-6 md:p-8 relative overflow-hidden">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">
                                                    {exp.title}
                                                </h3>
                                            </div>
                                            {exp.date && (
                                                <span className="text-xs text-[#6b7280] border border-white/10 rounded-full px-3 py-1 self-start whitespace-nowrap">
                                                    {exp.date}
                                                </span>
                                            )}
                                        </div>
                                        <ul className="space-y-2 mb-4">
                                            {exp.bullets.map((bullet, j) => (
                                                <li
                                                    key={j}
                                                    className="text-[#9ca3af] text-sm leading-relaxed flex gap-2"
                                                >
                                                    <span className="text-[#00d4ff] mt-0.5 shrink-0">
                                                        ▹
                                                    </span>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full border border-[#00d4ff]/20 text-[#00d4ff] bg-[#00d4ff]/5">
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
