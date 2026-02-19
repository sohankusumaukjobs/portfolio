"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/data/resume";

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="section-padding flex flex-col items-center justify-center w-full">
            <div className="max-w-6xl w-full mx-auto flex flex-col items-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-16 w-full"
                >
                    <p className="section-label">{"// projects"}</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Featured <span className="gradient-text">Creations</span>
                    </h2>
                    <p className="text-[#9fb3c9] max-w-2xl">
                        A selection of high-impact data and ML solutions, built with focus
                        on scalability, performance, and real-world impact.
                    </p>
                    <div className="section-underline" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 w-full text-left">
                    {projects.map((project, i) => (
                        <motion.article
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            className="group glass p-6 md:p-7 h-full flex flex-col"
                        >
                            {/* Top gradient line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00aaff] to-[#38c1ff] opacity-60 group-hover:opacity-100 transition-opacity z-10" />

                            {/* Badge */}
                            {project.badge && (
                                <div className="mb-4 relative z-10">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-[rgba(0,170,255,0.15)] to-[rgba(56,193,255,0.15)] text-[#00aaff] border border-[rgba(0,170,255,0.2)] shadow-[0_4px_12px_rgba(0,170,255,0.1)]">
                                        <Sparkles size={12} />
                                        {project.badge}
                                    </span>
                                </div>
                            )}

                            <div className="flex items-start gap-3 mb-4 relative z-10">
                                <div className="p-2 rounded-lg bg-[rgba(0,170,255,0.1)] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                                    <ExternalLink size={18} className="text-[#00aaff]" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mt-1 flex-1 group-hover:text-[#00aaff] transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <ArrowUpRight
                                    size={18}
                                    className="text-[#9fb3c9] opacity-0 group-hover:opacity-100 group-hover:text-[#00aaff] transition-all duration-300 shrink-0 mt-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </div>

                            <p className="text-[#9fb3c9] text-sm leading-relaxed mb-6 relative z-10">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="title-pill"
                                        style={{ padding: "4px 10px", fontSize: "0.75rem", background: "rgba(255,255,255,0.03)" }}
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
