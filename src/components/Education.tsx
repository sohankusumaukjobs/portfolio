"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/resume";

export default function Education() {
    return (
        <section id="education" className="section-padding">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        <span className="gradient-text">Education</span>
                    </h2>
                    <p className="text-[#888] text-sm">Academic Background</p>
                </motion.div>

                <div className="space-y-6">
                    {education.map((edu, i) => (
                        <motion.div
                            key={edu.degree}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="glass-card glass-card-hover p-6 md:p-8 relative overflow-hidden"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00d4ff] to-[#7b2ff7]" />

                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-[#00d4ff]/10 to-[#7b2ff7]/10 border border-white/5 self-start">
                                    <GraduationCap size={24} className="text-[#00d4ff]" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-1">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-[#999] text-sm">{edu.institution}</p>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        <span className="text-xs text-[#666] border border-white/10 rounded-full px-3 py-1">
                                            {edu.period}
                                        </span>
                                        <span className="text-xs text-[#00d4ff] border border-[#00d4ff]/20 rounded-full px-3 py-1 bg-[#00d4ff]/5">
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
