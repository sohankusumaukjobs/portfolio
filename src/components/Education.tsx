"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/resume";

export default function Education() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="education" className="section-padding">
            <div className="max-w-4xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <p className="section-label">{"// education"}</p>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        <span className="gradient-text">Education</span>
                    </h2>
                    <p className="text-[#9fb3c9] max-w-2xl mx-auto">
                        Academic Background
                    </p>
                    <div className="section-underline mx-auto" />
                </motion.div>

                <div className="space-y-6">
                    {education.map((edu, i) => (
                        <motion.div
                            key={edu.degree}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
                            className="glass p-6 md:p-8 transition-transform duration-300 hover:translate-y-[-4px]"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00aaff] to-[#38c1ff] z-10" />

                            <div className="flex flex-col md:flex-row md:items-center gap-4 relative z-10">
                                <div className="p-3 rounded-xl bg-[rgba(0,170,255,0.1)] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] self-start">
                                    <GraduationCap
                                        size={24}
                                        className="text-[#00aaff]"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-1">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-[#9fb3c9] text-sm">
                                        {edu.institution}
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        <span className="text-xs text-[#9fb3c9] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] rounded-full px-3 py-1">
                                            {edu.period}
                                        </span>
                                        <span className="text-xs text-[#00aaff] border border-[rgba(0,170,255,0.2)] rounded-full px-3 py-1 bg-[rgba(0,170,255,0.05)] shadow-[0_4px_12px_rgba(0,170,255,0.1)]">
                                            {edu.grade}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
