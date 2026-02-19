"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/resume";

export default function Projects() {
    return (
        <section id="projects" className="section-padding">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Featured <span className="gradient-text">Work</span>
                    </h2>
                    <p className="text-[#888] text-sm max-w-2xl mx-auto">
                        A selection of high-impact data and ML solutions, built with focus
                        on accuracy, scalability, and real-world impact.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass-card glass-card-hover glow-top p-6 md:p-8 group relative overflow-hidden"
                        >
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
                                    <ExternalLink size={18} className="text-[#00d4ff]" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mt-1">
                                    {project.title}
                                </h3>
                            </div>

                            <p className="text-[#999] text-sm leading-relaxed mb-6">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-[#aaa] border border-white/5"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
