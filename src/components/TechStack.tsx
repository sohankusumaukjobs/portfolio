"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { techStack } from "@/data/resume";
import {
    SiPython,
    SiReact,
    SiNodedotjs,
    SiHtml5,
    SiPandas,
    SiNumpy,
    SiTensorflow,
    SiKeras,
    SiScikitlearn,
    SiGit,
    SiJupyter,
    SiTableau,
} from "react-icons/si";
import {
    BrainCircuit,
    Network,
    Cloud,
    Sparkles,
    Heart,
    Database,
    Code2,
    BarChart3,
    FileSpreadsheet,
    Terminal,
    Cpu,
    Snowflake,
    Bot,
    Eye,
    Package,
} from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

type AnyIcon = IconType | LucideIcon;

const iconMap: Record<string, AnyIcon> = {
    Python: SiPython,
    SQL: Database,
    Java: Code2,
    "C++": Terminal,
    React: SiReact,
    "Node.js": SiNodedotjs,
    HTML: SiHtml5,
    "Power BI": BarChart3,
    Tableau: SiTableau,
    Excel: FileSpreadsheet,
    Pandas: SiPandas,
    NumPy: SiNumpy,
    TensorFlow: SiTensorflow,
    Keras: SiKeras,
    "Scikit-learn": SiScikitlearn,
    CNN: BrainCircuit,
    DenseNet: Network,
    "AWS S3": Cloud,
    "Microsoft Azure": Cloud,
    Snowflake: Snowflake,
    "Cloud Storage": Cloud,
    "GPT Codex": Bot,
    Claude: Sparkles,
    Gemini: Sparkles,
    "Prompt Engineering": Cpu,
    Lovable: Heart,
    Git: SiGit,
    "Jupyter Notebook": SiJupyter,
    "VS Code": Eye,
    Anaconda: Package,
};

export default function TechStack() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="stack" className="section-padding">
            <div className="max-w-6xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <p className="section-label">{"// tech-stack"}</p>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        The <span className="gradient-text">Arsenal</span>
                    </h2>
                    <p className="text-[#9fb3c9] max-w-2xl mx-auto">
                        Technologies & tools I use to bring ideas to life
                    </p>
                    <div className="section-underline mx-auto" />
                </motion.div>

                <div className="space-y-12">
                    {techStack.map((category, ci) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + ci * 0.1 }}
                        >
                            <h3 className="text-sm font-medium text-[#00aaff] mb-4 uppercase tracking-wider font-[var(--font-jetbrains)]">
                                {category.category}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {category.items.map((item, ii) => {
                                    const Icon = iconMap[item];
                                    return (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={
                                                isInView
                                                    ? { opacity: 1, scale: 1 }
                                                    : {}
                                            }
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.2 + ii * 0.05,
                                            }}
                                            whileHover={{
                                                scale: 1.05,
                                                y: -2,
                                            }}
                                            className="glass flex flex-col items-center justify-center gap-3 p-5 cursor-default transition-all duration-300 hover:border-[rgba(0,170,255,0.3)] hover:shadow-[0_20px_50px_rgba(0,160,255,0.12)]"
                                        >
                                            {Icon && (
                                                <Icon
                                                    size={32}
                                                    className="text-[#00aaff] relative z-10"
                                                />
                                            )}
                                            <span className="text-xs text-[#9fb3c9] text-center relative z-10">
                                                {item}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
