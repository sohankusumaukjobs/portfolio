"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/resume";

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="section-padding">
            <div className="max-w-6xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <p className="section-label">{"// projects"}</p>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Featured <span className="gradient-text">Work</span>
                    </h2>
                    <p className="text-[#6b7280] max-w-2xl mx-auto">
                        A selection of high-impact data and ML solutions, built with focus
                        on accuracy, scalability, and real-world impact.
                    </p>
                    <div className="section-underline mx-auto" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <motion.article
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="group relative overflow-hidden rounded-2xl"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                backdropFilter: "blur(10px)",
                                padding: "24px",
                            }}
                        >
                            {/* Top gradient line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00d4ff] to-[#7b2ff7]" />

                            {/* Hover glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                                style={{ boxShadow: "inset 0 0 60px rgba(0,212,255,0.03)" }} />

                            {/* Badge */}
                            {project.badge && (
                                <div className="absolute top-4 right-4">
                                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-[#00d4ff]/20 to-[#7b2ff7]/20 text-[#00d4ff] border border-[#00d4ff]/20">
                                        {project.badge}
                                    </span>
                                </div>
                            )}

                            <div className="flex items-start gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-[#00d4ff]/10 to-[#7b2ff7]/10 border border-white/5">
                                    <ExternalLink
                                        size={18}
                                        className="text-[#00d4ff]"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-white mt-1 flex-1">
                                    {project.title}
                                </h3>
                                {/* Arrow on hover */}
                                <ArrowUpRight
                                    size={18}
                                    className="text-[#6b7280] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-[#00d4ff] shrink-0 mt-2"
                                />
                            </div>

                            <p className="text-[#9ca3af] text-sm leading-relaxed mb-6">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-[#9ca3af] border border-white/[0.08]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
