"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { certifications } from "@/data/resume";

export default function Certifications() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="certifications" className="section-padding flex flex-col items-center justify-center w-full">
            <div className="max-w-6xl w-full mx-auto flex flex-col items-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-14 w-full"
                >
                    <p className="section-label">{"// credentials"}</p>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        <span className="gradient-text">Credentials</span>
                    </h2>
                    <p className="text-[#9fb3c9] max-w-2xl">
                        Certifications & Professional Development
                    </p>
                    <div className="section-underline" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full text-left">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                            whileHover={{ y: -4 }}
                            className="glass p-5 group"
                        >
                            {/* Left gradient border */}
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00aaff] to-[#38c1ff] z-10" />

                            <div className="flex items-start gap-3 pl-2 relative z-10">
                                <div className="p-2 rounded-lg bg-[rgba(0,170,255,0.1)] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] shrink-0">
                                    <ShieldCheck
                                        size={18}
                                        className="text-[#00aaff]"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-white mb-1 leading-tight group-hover:text-[#00aaff] transition-colors">
                                        {cert.name}
                                    </h3>
                                    <p className="text-xs text-[#9fb3c9] mb-2">
                                        {cert.issuer}
                                    </p>
                                    <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] text-[#9fb3c9]">
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
