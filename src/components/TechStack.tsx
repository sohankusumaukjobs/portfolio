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

    // Flatten all tech items for the grid
    const allTech = techStack.flatMap((c) =>
        c.items.map((item) => ({ item, category: c.category }))
    );

    return (
        <section id="stack" className="section-padding flex flex-col items-center justify-center w-full">
            <div className="max-w-6xl w-full mx-auto flex flex-col items-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-14 w-full"
                >
                    <p className="section-label">{"// tech-stack"}</p>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        The <span className="gradient-text">Arsenal</span>
                    </h2>
                    <p className="text-[#9fb3c9] max-w-2xl">
                        Technologies & tools I use to bring ideas to life
                    </p>
                    <div className="section-underline" />
                </motion.div>

                <div className="tech-card-grid w-full mt-8">
                    {allTech.map((tech, idx) => {
                        const Icon = iconMap[tech.item];
                        return (
                            <motion.div
                                key={tech.item}
                                initial={{ opacity: 0, y: 8 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.4,
                                    delay: idx * 0.06,
                                    ease: [0.2, 0.9, 0.3, 1],
                                }}
                                className="tech-card cursor-default"
                            >
                                <div className="icon shrink-0">
                                    {Icon && <Icon size={24} />}
                                </div>
                                <div className="flex flex-col truncate overflow-hidden">
                                    <span className="title truncate uppercase tracking-wide text-[15px]">
                                        {tech.item}
                                    </span>
                                    <span className="subtitle truncate uppercase tracking-wider font-[var(--font-jetbrains)] text-[11px]">
                                        {tech.category}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
