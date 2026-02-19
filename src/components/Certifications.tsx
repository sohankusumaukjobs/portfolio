"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "@/data/resume";

export default function Certifications() {
    return (
        <section id="certifications" className="section-padding">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        <span className="gradient-text">Credentials</span>
                    </h2>
                    <p className="text-[#888] text-sm">
                        Certifications & Professional Development
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="glass-card glow-hover p-5 group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-[#00d4ff]/10 to-[#7b2ff7]/10 border border-white/5 shrink-0">
                                    <Award size={18} className="text-[#00d4ff]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white mb-1 leading-tight">
                                        {cert.name}
                                    </h3>
                                    <p className="text-xs text-[#888]">{cert.issuer}</p>
                                    <p className="text-xs text-[#666] mt-1">{cert.date}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
