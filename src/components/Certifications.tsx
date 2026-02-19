"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { certifications } from "@/data/resume";

export default function Certifications() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="certifications" className="section-padding">
            <div className="max-w-6xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <p className="section-label">{"// credentials"}</p>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        <span className="gradient-text">Credentials</span>
                    </h2>
                    <p className="text-[#6b7280] max-w-2xl mx-auto">
                        Certifications & Professional Development
                    </p>
                    <div className="section-underline mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                            className="glass-card shimmer-hover p-5 group relative overflow-hidden"
                        >
                            {/* Left gradient border */}
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00d4ff] to-[#7b2ff7]" />

                            <div className="flex items-start gap-3 pl-2">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-[#00d4ff]/10 to-[#7b2ff7]/10 border border-white/5 shrink-0">
                                    <ShieldCheck
                                        size={18}
                                        className="text-[#00d4ff]"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-white mb-1 leading-tight">
                                        {cert.name}
                                    </h3>
                                    <p className="text-xs text-[#6b7280] mb-2">
                                        {cert.issuer}
                                    </p>
                                    <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-[#9ca3af]">
                                        {cert.date}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
