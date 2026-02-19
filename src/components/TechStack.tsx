"use client";

import { motion } from "framer-motion";
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
    return (
        <section id="stack" className="section-padding">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        The <span className="gradient-text">Arsenal</span>
                    </h2>
                    <p className="text-[#888] text-sm">Tech Stack</p>
                </motion.div>

                <div className="space-y-12">
                    {techStack.map((category, ci) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: ci * 0.1 }}
                        >
                            <h3 className="text-sm font-medium text-[#00d4ff] mb-4 uppercase tracking-wider">
                                {category.category}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {category.items.map((item, ii) => {
                                    const Icon = iconMap[item];
                                    return (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: ii * 0.05 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className="glass-card glow-hover flex items-center gap-3 p-4 cursor-default"
                                        >
                                            {Icon && (
                                                <Icon
                                                    size={20}
                                                    className="text-[#00d4ff] shrink-0"
                                                />
                                            )}
                                            <span className="text-sm text-[#ccc]">{item}</span>
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
