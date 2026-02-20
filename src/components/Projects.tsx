"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight, Sparkles, X, Github } from "lucide-react";
import { projects, Project } from "@/data/resume";
import Image from "next/image";

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedProject]);

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
                    <h2 className="text-5xl md:text-6xl text-white mb-4 drop-shadow-[0_0_15px_rgba(0,170,255,0.3)]" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#0080ff] drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]">Creations</span>
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
                            layoutId={`project-card-${project.title}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            onClick={() => setSelectedProject(project)}
                            className="cursor-pointer group relative rounded-2xl h-full min-h-[280px] flex overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] border border-[rgba(0,170,255,0.15)] hover:border-[#00ffff]/50 bg-transparent"
                        >
                            <motion.div layoutId={`project-logo-${project.title}`} className="absolute inset-0 w-full h-full mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity duration-500 origin-center">
                                {project.image && (
                                    <Image src={project.image} alt={project.title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                                )}
                            </motion.div>
                            {/* Tech UI Frames */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-t-[2px] border-l-[2px] border-[#00ffff]/0 group-hover:border-[#00ffff]/80 rounded-tl-2xl transition-all duration-500 z-20 pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[2px] border-r-[2px] border-[#00ffff]/0 group-hover:border-[#00ffff]/80 rounded-br-2xl transition-all duration-500 z-20 pointer-events-none" />
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Wildfire Modal */}
            <AnimatePresence>
                {selectedProject && selectedProject.title === "Wildfire Detection System" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-[0.7cm] md:p-[1.5cm] bg-[#030812]/90 backdrop-blur-md"
                    >
                        <motion.div
                            layoutId={`project-card-${selectedProject.title}`}
                            className="relative w-full max-w-[760px] m-auto max-h-[90vh] overflow-y-auto bg-[#060d1a] border border-[#00ffff]/30 rounded-2xl shadow-[0_0_50px_rgba(0,170,255,0.2)] scrollbar-hide flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-50 p-2 text-[#9fb3c9] hover:text-[#00ffff] hover:bg-[#00ffff]/10 rounded-full transition-colors bg-[#060d1a]"
                            >
                                <X size={24} />
                            </button>

                            {/* Modal Content - Dispersion Animation */}
                            <motion.div
                                className="p-[20px_16px] md:p-[32px_36px]"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.1, delayChildren: 0.15 }
                                    }
                                }}
                            >
                                {/* Hero Section */}
                                <div className="relative flex items-center gap-[16px] mb-[24px]">
                                    <motion.div layoutId={`project-logo-${selectedProject.title}`} className="relative w-[72px] h-[72px] shrink-0 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.3)] z-10">
                                        <div className="absolute inset-0 mix-blend-screen bg-black/50" />
                                        {selectedProject.image && <Image src={selectedProject.image} alt="Logo" fill className="object-cover" />}
                                    </motion.div>
                                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="text-left flex-1">
                                        <h2 className="text-[1.6rem] font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#0080ff] drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] leading-tight">
                                            {selectedProject.title}
                                        </h2>
                                        <p className="text-[#9fb3c9] text-[0.9rem] opacity-75 font-medium leading-snug">
                                            Deep learning-powered early wildfire detection using DenseNet121 — 98.84% accuracy
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Key Highlights */}
                                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="grid grid-cols-4 gap-[12px] mb-[24px]">
                                    {[
                                        { icon: "✅", title: "Test Accuracy", value: "98.84%" },
                                        { icon: "📊", title: "Training Images", value: "2,700+" },
                                        { icon: "🧠", title: "Architecture", value: "DenseNet121" },
                                        { icon: "⚡", title: "Accuracy Boost", value: "+8% via MSR" },
                                    ].map((stat, idx) => (
                                        <div key={idx} className="bg-[#030812]/50 border border-[rgba(0,170,255,0.1)] rounded-[10px] p-[12px_8px] flex flex-col items-center text-center hover:border-[#00ffff]/30 transition-colors">
                                            <span className="text-2xl mb-1">{stat.icon}</span>
                                            <span className="text-[#00ffff] font-bold text-[1.1rem] leading-none mb-1">{stat.value}</span>
                                            <span className="text-[0.7rem] text-[#9fb3c9] uppercase tracking-[0.05em] opacity-60">{stat.title}</span>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Overview */}
                                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="mb-[24px]">
                                    <h3 className="mt-[20px] mb-[10px] text-[1rem] font-semibold text-white border-l-[3px] border-[#00CFFF] pl-[10px]">
                                        Overview
                                    </h3>
                                    <p className="text-[#9fb3c9] leading-relaxed text-[0.95rem]">
                                        An end-to-end deep learning pipeline for early wildfire detection. Combines Multi-Scale Retinex (MSR) illumination correction and RGB-to-YCbCr color space transformation with a DenseNet121 classifier. Trained on the Wildfire Dataset (El-Madafri et al., 2023) with 2,700+ high-resolution images, achieving 98.84% test accuracy versus 82.89% for the CNN baseline.
                                    </p>
                                </motion.div>

                                {/* Tech Stack */}
                                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="mb-[24px]">
                                    <h3 className="mt-[20px] mb-[10px] text-[1rem] font-semibold text-white border-l-[3px] border-[#ff8c00] pl-[10px] drop-shadow-[0_0_5px_rgba(255,140,0,0.8)]">
                                        Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-[8px]">
                                        {["Python", "TensorFlow", "Keras", "DenseNet", "CNN", "Scikit-learn", "Matplotlib", "OpenCV"].map((tag) => (
                                            <span key={tag} className="px-[10px] py-[4px] text-[0.75rem] rounded-[20px] bg-[rgba(255,140,0,0.08)] text-[#ff8c00] border border-[rgba(255,140,0,0.3)] shadow-[0_0_10px_rgba(255,140,0,0.1)]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Results Table */}
                                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="mb-[20px] overflow-x-auto">
                                    <h3 className="mt-[20px] mb-[10px] text-[1rem] font-semibold text-white border-l-[3px] border-[#00CFFF] pl-[10px] drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]">
                                        Results Comparison
                                    </h3>
                                    <div className="border border-[rgba(0,170,255,0.2)] rounded-xl overflow-hidden min-w-[500px] w-full">
                                        <table className="w-full text-left border-collapse text-[0.82rem]">
                                            <thead>
                                                <tr className="bg-[#030812] border-b border-[rgba(0,170,255,0.2)]">
                                                    <th className="p-[8px_10px] w-[30%] text-[#00CFFF] font-bold text-[0.78rem] uppercase tracking-[0.04em]">Model</th>
                                                    <th className="p-[8px_10px] w-[40%] text-[#00CFFF] font-bold text-[0.78rem] uppercase tracking-[0.04em]">Preprocessing</th>
                                                    <th className="p-[8px_10px] w-[30%] text-[#00CFFF] font-bold text-[0.78rem] uppercase tracking-[0.04em]">Accuracy</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    { model: "CNN", pre: "None", acc: "82.89%" },
                                                    { model: "DenseNet", pre: "None", acc: "90.95%" },
                                                    { model: "CNN", pre: "MSR + YCbCr", acc: "92.11%" },
                                                    { model: "DenseNet", pre: "MSR + YCbCr", acc: "98.84%", highlight: true },
                                                ].map((row, idx) => (
                                                    <tr key={idx} className={`border-b border-[rgba(255,255,255,0.05)] transition-colors ${row.highlight ? 'bg-[rgba(0,170,255,0.08)]' : (idx % 2 === 0 ? 'bg-[rgba(255,255,255,0.03)]' : '')}`}>
                                                        <td className={`p-[8px_10px] ${row.highlight ? 'text-[#00CFFF] font-bold' : 'text-white font-medium'}`}>{row.model}</td>
                                                        <td className={`p-[8px_10px] ${row.highlight ? 'text-[#00CFFF] font-bold' : 'text-[#9fb3c9]'}`}>{row.pre}</td>
                                                        <td className={`p-[8px_10px] ${row.highlight ? 'text-[#00CFFF] font-bold drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]' : 'text-[#e6f0ff]'}`}>{row.acc}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>

                                {/* Visual Figures Section */}
                                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="mb-[24px]">
                                    <h3 className="mt-[20px] mb-[10px] text-[1rem] font-semibold text-white border-l-[3px] border-[#00CFFF] pl-[10px]">
                                        Technical Analysis
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-[16px]">
                                        {/* Image 1 */}
                                        <div className="bg-[#030812]/50 border border-[rgba(0,170,255,0.1)] rounded-xl p-4 flex flex-col items-center justify-center text-center group hover:border-[#00ffff]/30 transition-colors">
                                            <div className="relative w-full aspect-square md:aspect-video mb-4 rounded-lg overflow-hidden border border-[rgba(0,170,255,0.2)]">
                                                <Image src="/wildfire-dataset.jpeg" alt="Sample Dataset" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <p className="text-sm border-t border-[rgba(0,170,255,0.1)] w-full pt-3 text-[#9fb3c9]">
                                                Sample Dataset Class Distributions
                                            </p>
                                        </div>
                                        {/* Image 2 */}
                                        <div className="bg-[#030812]/50 border border-[rgba(0,170,255,0.1)] rounded-xl p-4 flex flex-col items-center justify-center text-center group hover:border-[#00ffff]/30 transition-colors">
                                            <div className="relative w-full aspect-square md:aspect-video mb-4 rounded-lg overflow-hidden border border-[rgba(0,170,255,0.2)]">
                                                <Image src="/wildfire-confusion.png" alt="Confusion Matrix" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <p className="text-sm border-t border-[rgba(0,170,255,0.1)] w-full pt-3 text-[#9fb3c9]">
                                                DenseNet121 Confusion Matrix
                                            </p>
                                        </div>
                                        {/* Image 3 */}
                                        <div className="bg-[#030812]/50 border border-[rgba(0,170,255,0.1)] rounded-xl p-4 flex flex-col items-center justify-center text-center md:col-span-2 group hover:border-[#00ffff]/30 transition-colors">
                                            <div className="relative w-full aspect-square md:aspect-[21/9] mb-4 rounded-lg overflow-hidden border border-[rgba(0,170,255,0.2)]">
                                                <Image src="/wildfire-preprocessing.png" alt="MSR Preprocessing" fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <p className="text-sm border-t border-[rgba(0,170,255,0.1)] w-full pt-3 text-[#9fb3c9]">
                                                Multi-Scale Retinex (MSR) & YCbCr Comparison
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Github Button */}
                                <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 20, stiffness: 150 } } }} className="mt-[24px] flex justify-center pb-[24px]">
                                    <a
                                        href="https://github.com/sohankusumaukjobs"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-[8px] px-[24px] py-[10px] bg-[#00CFFF] text-[#000] font-semibold text-[0.9rem] rounded-full shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-300"
                                    >
                                        <Github size={20} className="fill-current" />
                                        View Code on GitHub
                                    </a>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
