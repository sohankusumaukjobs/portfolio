"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, User } from "lucide-react";
import { professionalSummary, experiences } from "@/data/resume";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1 },
    }),
};

export default function About() {
    const [tab, setTab] = useState<"summary" | "journey">("summary");

    return (
        <section id="about" className="section-padding">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        About <span className="gradient-text">The Analyst</span>
                    </h2>
                    <p className="text-[#888] text-sm">Built with Passion</p>
                </motion.div>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-10">
                    {[
                        { key: "summary" as const, label: "Professional Summary", icon: User },
                        { key: "journey" as const, label: "Work Journey", icon: Briefcase },
                    ].map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setTab(key)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                ${tab === key
                                    ? "bg-gradient-to-r from-[#00d4ff]/20 to-[#7b2ff7]/20 text-white border border-[#00d4ff]/30"
                                    : "text-[#888] border border-white/5 hover:border-white/15 hover:text-white/80"
                                }`}
                        >
                            <Icon size={16} />
                            {label}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                {tab === "summary" ? (
                    <motion.div
                        key="summary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="glass-card p-8 md:p-10"
                    >
                        <p className="text-[#ccc] leading-relaxed text-base md:text-lg">
                            {professionalSummary}
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="journey"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="glass-card glass-card-hover p-6 md:p-8 relative overflow-hidden"
                            >
                                {/* Accent line */}
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00d4ff] to-[#7b2ff7]" />

                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {exp.title}
                                        </h3>
                                        <p className="text-[#00d4ff] text-sm">{exp.role}</p>
                                    </div>
                                    {exp.date && (
                                        <span className="text-xs text-[#666] border border-white/10 rounded-full px-3 py-1 self-start whitespace-nowrap">
                                            {exp.date}
                                        </span>
                                    )}
                                </div>
                                <ul className="space-y-2">
                                    {exp.bullets.map((bullet, j) => (
                                        <li
                                            key={j}
                                            className="text-[#aaa] text-sm leading-relaxed flex gap-2"
                                        >
                                            <span className="text-[#00d4ff] mt-1 shrink-0">•</span>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
