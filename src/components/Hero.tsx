"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import { personalInfo, codeSnippet } from "@/data/resume";

function CodeEditor() {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const codeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            setDisplayedLines(codeSnippet);
            return;
        }

        if (currentLine >= codeSnippet.length) return;

        const line = codeSnippet[currentLine];
        if (currentChar <= line.length) {
            const timer = setTimeout(() => {
                setDisplayedLines((prev) => {
                    const newLines = [...prev];
                    newLines[currentLine] = line.slice(0, currentChar);
                    return newLines;
                });
                setCurrentChar((c) => c + 1);
            }, 30);
            return () => clearTimeout(timer);
        } else {
            setCurrentLine((l) => l + 1);
            setCurrentChar(0);
        }
    }, [currentLine, currentChar]);

    const getLineColor = (line: string) => {
        if (line.includes("const ") || line.includes("true") || line.includes("false"))
            return "text-[#ff7b72]";
        if (line.includes("'") || line.includes('"')) return "text-[#a5d6ff]";
        if (line.includes("//")) return "text-[#8b949e]";
        if (line.includes(".")) return "text-[#d2a8ff]";
        return "text-[#e6edf3]";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="code-editor w-full max-w-lg"
        >
            <div className="code-editor-header">
                <div className="code-dot bg-[#ff5f57]" />
                <div className="code-dot bg-[#febc2e]" />
                <div className="code-dot bg-[#28c840]" />
                <span className="text-xs text-[#8b949e] ml-3 font-[var(--font-jetbrains)]">
                    analyst.ts
                </span>
            </div>
            <div ref={codeRef} className="p-4 text-sm leading-relaxed overflow-x-auto font-[var(--font-jetbrains)]">
                {displayedLines.map((line, i) => (
                    <div key={i} className="flex">
                        <span className="text-[#484f58] w-8 shrink-0 select-none text-right mr-4">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={getLineColor(line)}>{line}</span>
                        {i === currentLine && currentLine < codeSnippet.length && (
                            <span className="inline-block w-[2px] h-[1.2em] bg-[#00d4ff] animate-pulse ml-[1px]" />
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center section-padding pt-24"
        >
            {/* Ambient gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-[#00d4ff]/5 blur-[150px]" />
                <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-[#7b2ff7]/5 blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                {/* Left — Text */}
                <div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-[#888] text-lg md:text-xl mb-2 font-light"
                    >
                        {personalInfo.tagline}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text leading-tight mb-6"
                    >
                        {personalInfo.taglineHighlight}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-[#999] text-base md:text-lg max-w-xl leading-relaxed mb-8"
                    >
                        {personalInfo.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="flex flex-wrap gap-4 mb-8"
                    >
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7b2ff7] text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            <ArrowDown size={16} /> View My Work
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-xl border border-white/10 text-white/80 font-medium text-sm hover:border-[#00d4ff]/30 hover:text-white transition-all flex items-center gap-2"
                        >
                            <Download size={16} /> Download CV
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex items-center gap-4"
                    >
                        {[
                            { icon: Github, href: personalInfo.github, label: "GitHub" },
                            { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                            { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
                        ].map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2.5 rounded-lg border border-white/10 text-[#888] hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Right — Code editor */}
                <div className="flex justify-center lg:justify-end">
                    <CodeEditor />
                </div>
            </div>
        </section>
    );
}
