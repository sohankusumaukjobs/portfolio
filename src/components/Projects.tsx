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
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            onClick={() => setSelectedProject(project)}
                            className="cursor-pointer group relative rounded-2xl h-full min-h-[280px] flex overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] border border-[rgba(0,170,255,0.15)] hover:border-[#00ffff]/50 bg-transparent"
                        >
                            <motion.div className="absolute inset-0 w-full h-full mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity duration-500 origin-center">
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#030812]/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-[1040px] lg:max-w-[1120px] max-h-[90vh] overflow-y-auto bg-[#060d1a] border border-[#00ffff]/30 rounded-2xl shadow-[0_0_50px_rgba(0,170,255,0.2)] scrollbar-hide flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 text-[#9fb3c9] hover:text-[#00ffff] hover:bg-[#00ffff]/10 rounded-full transition-colors bg-[#060d1a]"
                            >
                                <X size={24} />
                            </button>

                            {/* Modal Content - Responsive Padding Applied Here */}
                            <motion.div
                                className="w-full relative"
                                style={{ padding: 'clamp(24px, 4.5vw, 64px)' }}
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
                                <div className="relative flex items-center gap-6 mb-10 pr-12 md:pr-0">
                                    <motion.div className="relative w-[110px] h-[110px] shrink-0 z-10 hidden sm:block mix-blend-screen opacity-90 overflow-hidden"
                                        style={{ WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 45%, transparent 55%)', maskImage: 'radial-gradient(circle at 50% 45%, black 45%, transparent 55%)' }}>
                                        {selectedProject.image && (
                                            <Image
                                                src={selectedProject.image}
                                                alt="Logo"
                                                fill
                                                className="object-cover scale-[1.7] translate-y-0"
                                                priority
                                            />
                                        )}
                                    </motion.div>
                                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="text-left flex-1 pl-2">
                                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#0080ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] tracking-wide">
                                            {selectedProject.title}
                                        </h2>
                                        <p className="text-[#b4cddb] text-lg font-light tracking-wide">
                                            Deep learning-powered early wildfire detection using <strong className="text-[#00CFFF]">DenseNet121</strong>
                                        </p>
                                    </motion.div>
                                </div>

                                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                    {[
                                        { icon: "🎯", title: "Test Accuracy", value: "98.84%" },
                                        { icon: "🛡️", title: "False Positives", value: "Near Zero" },
                                        { icon: "🧠", title: "CNN to DenseNet", value: "+15.9%" },
                                        { icon: "⚡", title: "Preprocessing", value: "+7.9%" },
                                    ].map((stat, idx) => (
                                        <div key={idx} className="bg-[#030812]/50 border border-[rgba(0,170,255,0.1)] rounded-xl p-5 flex flex-col items-center text-center hover:border-[#00ffff]/30 transition-colors">
                                            <span className="text-3xl mb-3 drop-shadow-[0_0_8px_rgba(0,170,255,0.8)]">{stat.icon}</span>
                                            <span className="text-[#00ffff] font-bold text-xl md:text-2xl leading-none mb-2">{stat.value}</span>
                                            <span className="text-xs text-[#9fb3c9] uppercase tracking-wider font-semibold">{stat.title}</span>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Executive Summary */}
                                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="mb-16 flex flex-col">
                                    <h3 className="text-3xl font-bold text-white tracking-wide mb-6">
                                        Executive Summary
                                    </h3>
                                    <p className="text-[#b4cddb] leading-[2] text-lg md:text-[19px] text-justify font-light tracking-wide">
                                        Wildfires cause massive economic and environmental devastation globally. Traditional satellite and watchtower detection methods often suffer from high costs, poor visibility, and slow response times. This project delivers a highly scalable, robust <strong className="text-white font-semibold">Deep Learning Pipeline for Early Wildfire Detection</strong> that mitigates these limitations. By integrating advanced image preprocessing, the system effectively cuts through smoke, haze, and poor lighting to rapidly structure and identify fire outbreaks with <strong className="text-[#00ffff] font-semibold">98.84% accuracy</strong>, minimizing expensive false alarms and providing stakeholders with a reliable early-warning surveillance engine.
                                    </p>
                                </motion.div>

                                {/* Methodology & Work Done */}
                                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="mb-16">
                                    <h3 className="mb-10 text-3xl font-bold text-white tracking-wide">
                                        Methodology & Implementation
                                    </h3>
                                    <div className="space-y-12">
                                        <div>
                                            <h4 className="text-[#00ffff] font-semibold text-[20px] mb-2 tracking-wide">1. Data Engineering & EDA</h4>
                                            <p className="text-[#b4cddb] text-base md:text-lg leading-[1.8] font-light">
                                                Processed a highly diverse dataset of <strong className="text-white font-medium">2,700+ high-resolution images</strong> encompassing various forest types, lighting conditions, class imbalances, and confounding visuals (sun glare, clouds).
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-[#00ffff] font-semibold text-[20px] mb-2 tracking-wide">2. Advanced Image Preprocessing</h4>
                                            <p className="text-[#b4cddb] text-base md:text-lg leading-[1.8] font-light">
                                                Engineered a hybrid pipeline using <strong className="text-white font-medium">Multi-Scale Retinex (MSR)</strong> for dynamic illumination correction and <strong className="text-white font-medium">RGB-to-YCbCr color space transformation</strong> to effectively decouple luminance from chrominance. This dramatically improved flame structure visibility while filtering out background environmental noise.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-[#00ffff] font-semibold text-[20px] mb-2 tracking-wide">3. Scalable Deep Learning Architecture</h4>
                                            <p className="text-[#b4cddb] text-base md:text-lg leading-[1.8] font-light">
                                                Designed and trained a classification model utilizing <strong className="text-white font-medium">DenseNet121</strong>. Its dense connectivity allowed for maximum feature reuse and superior gradient flow with fewer parameters, making the final system remarkably lightweight and suited for real-time edge deployment.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Business Impact Highlights */}
                                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="mb-16">
                                    <h3 className="mb-10 text-3xl font-bold text-white tracking-wide">
                                        Project Value & Key Results
                                    </h3>
                                    <ul className="list-disc pl-8 space-y-5 text-[#b4cddb] text-base md:text-lg leading-[1.8] font-light">
                                        <li className="pl-2"><strong className="text-white font-medium tracking-wide">Cost-saving Reliability:</strong> Drastically reduced false positives compared to standard models, ensuring expensive emergency response teams are only deployed when verification is high.</li>
                                        <li className="pl-2"><strong className="text-white font-medium tracking-wide">Robust Performance:</strong> MSR preprocessing yielded an immediate <strong className="text-[#00ffff] font-medium">7.9% growth in accuracy</strong> when facing highly complex, low-visibility aerial visual scenarios.</li>
                                        <li className="pl-2"><strong className="text-white font-medium tracking-wide">Deployment Readiness:</strong> The highly optimized pipeline requires significantly fewer computing resources, providing high feasibility for integration directly into cost-effective edge devices.</li>
                                    </ul>
                                </motion.div>

                                {/* Results Table */}
                                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="mb-20 overflow-x-auto pb-4">
                                    <h3 className="mb-10 text-3xl font-bold text-white tracking-wide">
                                        Results Comparison
                                    </h3>
                                    <div className="w-full flex justify-start lg:justify-center">
                                        <table className="w-full lg:w-[85%] min-w-[500px] text-center border-collapse border border-[rgba(255,255,255,0.15)] text-[17px] md:text-xl font-medium">
                                            <thead>
                                                <tr>
                                                    <th className="p-5 w-[65%] text-white font-semibold border border-[rgba(255,255,255,0.15)] bg-[#030812]/40 tracking-wide">Model</th>
                                                    <th className="p-5 w-[35%] text-white font-semibold border border-[rgba(255,255,255,0.15)] bg-[#030812]/40 tracking-wide">Accuracy</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    { model: "CNN (No Preprocessing)", acc: "82.89%" },
                                                    { model: "CNN (With Preprocessing)", acc: "92.11%" },
                                                    { model: "DenseNet (No Preprocessing)", acc: "90.95%" },
                                                    { model: "DenseNet + MSR + YCbCr", acc: "98.84%" },
                                                ].map((row, idx) => (
                                                    <tr key={idx} className="bg-transparent hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                                                        <td className="p-5 text-[#e6f0ff] border border-[rgba(255,255,255,0.15)]">{row.model}</td>
                                                        <td className="p-5 text-white border border-[rgba(255,255,255,0.15)]">{row.acc}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>

                                {/* Visual Figures Section */}
                                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } } }} className="mb-6">
                                    <h3 className="mb-10 text-3xl font-bold text-white tracking-wide">
                                        Architecture & Analysis Visuals
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Image 1 */}
                                        <div className="bg-[#030812]/50 border border-[rgba(0,170,255,0.1)] rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:border-[#00ffff]/30 transition-colors">
                                            <div className="relative w-full aspect-square md:aspect-video mb-5 rounded-xl overflow-hidden border border-[rgba(0,170,255,0.2)]">
                                                <Image src="/wildfire-dataset.jpeg" alt="Sample Dataset" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <p className="text-sm md:text-base border-t border-[rgba(0,170,255,0.1)] w-full pt-4 text-[#9fb3c9] leading-relaxed">
                                                High-variance training dataset (classes: fire/no-fire) depicting varied altitudes and environments.
                                            </p>
                                        </div>
                                        {/* Image 2 */}
                                        <div className="bg-[#030812]/50 border border-[rgba(0,170,255,0.1)] rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:border-[#00ffff]/30 transition-colors">
                                            <div className="relative w-full aspect-square md:aspect-video mb-5 rounded-xl overflow-hidden border border-[rgba(0,170,255,0.2)]">
                                                <Image src="/wildfire-confusion.png" alt="Confusion Matrix" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <p className="text-sm md:text-base border-t border-[rgba(0,170,255,0.1)] w-full pt-4 text-[#9fb3c9] leading-relaxed">
                                                Near-zero false positive identification through DenseNet121, ensuring highly reliable surveillance.
                                            </p>
                                        </div>
                                        {/* Image 3 */}
                                        <div className="bg-[#030812]/50 border border-[rgba(0,170,255,0.1)] rounded-2xl p-6 flex flex-col items-center justify-center text-center md:col-span-2 group hover:border-[#00ffff]/30 transition-colors">
                                            <div className="relative w-full aspect-square md:aspect-[21/9] mb-5 rounded-xl overflow-hidden border border-[rgba(0,170,255,0.2)]">
                                                <Image src="/wildfire-preprocessing.png" alt="MSR Preprocessing" fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <p className="text-sm md:text-base border-t border-[rgba(0,170,255,0.1)] w-full pt-4 text-[#9fb3c9] leading-relaxed">
                                                Successful isolation of structural fire patterns using YCbCr color spaces and MSR correction.
                                            </p>

                                            {/* Tech-Stack Style Button Injected Here */}
                                            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 20, stiffness: 150 } } }} className="mt-8 flex justify-center w-full">
                                                <a
                                                    href="https://github.com/sohankusumaukjobs"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group relative flex items-center justify-center gap-4 px-8 py-4 w-full md:w-auto min-w-[300px] bg-[#030812]/50 rounded-xl border border-[rgba(0,170,255,0.2)] shadow-[0_0_15px_rgba(0,170,255,0.05)] hover:shadow-[0_0_25px_rgba(0,170,255,0.2)] hover:border-[rgba(0,170,255,0.4)] transition-all duration-300 backdrop-blur-md overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,255,255,0.05)] to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                                                    <div className="bg-[rgba(0,170,255,0.1)] p-3 rounded-lg group-hover:bg-[rgba(0,170,255,0.2)] transition-colors z-10 hidden sm:block">
                                                        <Github size={24} className="text-[#00ffff]" />
                                                    </div>
                                                    <span className="z-10 text-white font-semibold text-lg tracking-wide group-hover:text-[#00ffff] transition-colors">View Code</span>
                                                    <svg className="w-5 h-5 text-[#9fb3c9] opacity-0 group-hover:opacity-100 group-hover:text-[#00ffff] transition-all transform translate-x-[-10px] group-hover:translate-x-0 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                </a>
                                            </motion.div>

                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
