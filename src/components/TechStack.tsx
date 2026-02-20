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

    // Flatten logic for continuous marquees
    const allTech = techStack.flatMap((c) =>
        c.items.map((item) => ({ item, category: c.category }))
    );

    // Split into 3 rows for the marquee
    const row1 = allTech.slice(0, Math.ceil(allTech.length / 3));
    const row2 = allTech.slice(Math.ceil(allTech.length / 3), Math.ceil((allTech.length * 2) / 3));
    const row3 = allTech.slice(Math.ceil((allTech.length * 2) / 3));

    return (
        <section id="stack" className="flex flex-col items-center justify-center w-full" style={{ paddingTop: '7rem', paddingBottom: '7rem' }} ref={ref}>
            {/* Heading stays centered */}
            <div className="max-w-6xl w-full mx-auto flex flex-col items-center px-6 md:px-8">
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
            </div>

            {/* Marquee rows break out to full viewport width */}
            <div className="w-full mt-8 flex flex-col gap-6" style={{ overflowX: 'clip', overflowY: 'visible' }}>
                {[row1, row2, row3].map((rowItems, rowIndex) => {
                    const direction = rowIndex % 2 === 0 ? "left" : "right";
                    const baseSpeed = 40;
                    const speed = rowIndex % 2 === 0 ? baseSpeed : baseSpeed + 8;

                    return (
                        <div key={rowIndex} className="flex relative w-full marquee-container" style={{ overflowX: 'clip', overflowY: 'visible', paddingTop: '10px', paddingBottom: '10px' }}>
                            <div
                                className={`flex gap-6 px-3 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
                                    }`}
                                style={{ animationDuration: `${speed}s` }}
                            >
                                {[...rowItems, ...rowItems].map((tech, idx) => {
                                    const Icon = iconMap[tech.item];
                                    return (
                                        <div
                                            key={`${tech.item}-${idx}`}
                                            className="tech-card min-w-[260px] max-w-[260px] cursor-default"
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
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
