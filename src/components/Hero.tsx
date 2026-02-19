"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import { personalInfo, codeSnippet } from "@/data/resume";

/* ─── syntax-highlighting helpers ──────────────────────── */
interface Token {
    text: string;
    color: string;
}

function tokenizeLine(line: string): Token[] {
    const tokens: Token[] = [];
    let remaining = line;

    while (remaining.length > 0) {
        /* keywords: const, true, false, etc. → accent-secondary */
        const kwMatch = remaining.match(/^(const|let|var|true|false|function|return|if|else)\b/);
        if (kwMatch) {
            tokens.push({ text: kwMatch[0], color: "#00aaff" });
            remaining = remaining.slice(kwMatch[0].length);
            continue;
        }
        /* single-quoted strings → softer cyan */
        const sqMatch = remaining.match(/^'([^']*)'/);
        if (sqMatch) {
            tokens.push({ text: sqMatch[0], color: "#9ae6ff" });
            remaining = remaining.slice(sqMatch[0].length);
            continue;
        }
        /* double-quoted strings → softer cyan */
        const dqMatch = remaining.match(/^"([^"]*)"/);
        if (dqMatch) {
            tokens.push({ text: dqMatch[0], color: "#9ae6ff" });
            remaining = remaining.slice(dqMatch[0].length);
            continue;
        }
        /* property names → accent primary */
        const propMatch = remaining.match(/^(\w+)(\s*:)/);
        if (propMatch) {
            tokens.push({ text: propMatch[1], color: "#00aaff" });
            tokens.push({ text: propMatch[2], color: "#4a5568" });
            remaining = remaining.slice(propMatch[0].length);
            continue;
        }
        /* method calls → accent primary */
        const methodMatch = remaining.match(/^(\w+)\.(\w+)\(\)/);
        if (methodMatch) {
            tokens.push({ text: methodMatch[1], color: "#38c1ff" });
            tokens.push({ text: ".", color: "#4a5568" });
            tokens.push({ text: methodMatch[2] + "()", color: "#00aaff" });
            remaining = remaining.slice(methodMatch[0].length);
            continue;
        }
        /* brackets, semicolons, commas → muted */
        if (/^[{}[\](),;:]/.test(remaining)) {
            tokens.push({ text: remaining[0], color: "#4a5568" });
            remaining = remaining.slice(1);
            continue;
        }
        const commentMatch = remaining.match(/^\/\/.*/);
        if (commentMatch) {
            tokens.push({ text: commentMatch[0], color: "#9fb3c9" });
            remaining = remaining.slice(commentMatch[0].length);
            continue;
        }
        /* variable names → accent-secondary, whitespace/other → muted */
        const otherMatch = remaining.match(/^(\s+|\w+)/);
        if (otherMatch) {
            const isWord = /^\w+$/.test(otherMatch[0]);
            tokens.push({ text: otherMatch[0], color: isWord ? "#38c1ff" : "#4a5568" });
            remaining = remaining.slice(otherMatch[0].length);
            continue;
        }
        tokens.push({ text: remaining[0], color: "#4a5568" });
        remaining = remaining.slice(1);
    }

    return tokens;
}

/* ─── CodeEditor ───────────────────────────────────────── */
function CodeEditor() {
    const cardRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion) return;
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        const mouseY = e.clientY - (rect.top + rect.height / 2);
        const rotateX = -(mouseY / (rect.height / 2)) * 6; // Max 6°
        const rotateY = (mouseX / (rect.width / 2)) * 6;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        card.style.transition = "transform 0.1s ease-out";
    }, [prefersReducedMotion]);

    const handleMouseLeave = useCallback(() => {
        if (prefersReducedMotion) return;
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        card.style.transition = "transform 0.5s var(--transition-spring)";
    }, [prefersReducedMotion]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glass"
            style={{
                width: "100%",
                maxWidth: "480px",
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Title bar */}
            <div
                style={{
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.04)"
                }}
            >
                <div style={{ display: "flex", gap: "8px" }}>
                    <div className="w-3 h-3 rounded-full bg-[#31b0ff]" />
                    <div className="w-3 h-3 rounded-full bg-[#5ad3ff]" />
                    <div className="w-3 h-3 rounded-full bg-[#8ee9ff]" />
                </div>
                <span
                    style={{
                        fontSize: "12px",
                        color: "#9fb3c9",
                        marginLeft: "12px",
                        fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                        fontWeight: 500,
                    }}
                >
                    analyst.ts
                </span>
            </div>

            {/* Darker inner glass fill for terminal content */}
            <div style={{
                background: "rgba(2, 6, 12, 0.4)",
                padding: "20px 20px 20px 0",
                position: "relative",
                zIndex: 1 // Above the glass rim/highlight pseudo elements if any
            }}>
                {codeSnippet.map((line, i) => {
                    const tokens = tokenizeLine(line);
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, filter: "blur(10px)", x: -10 }}
                            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                            style={{
                                display: "flex",
                                alignItems: "baseline",
                                gap: "12px",
                            }}
                        >
                            <span
                                style={{
                                    color: "#38c1ff",
                                    opacity: 0.5,
                                    minWidth: "28px",
                                    textAlign: "right",
                                    flexShrink: 0,
                                    fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                                    fontSize: "13px",
                                    lineHeight: "1.7",
                                    userSelect: "none",
                                }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                                style={{
                                    flex: 1,
                                    fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                                    fontSize: "13px",
                                    lineHeight: "1.7",
                                    whiteSpace: "pre",
                                }}
                            >
                                {tokens.map((token, ti) => (
                                    <span key={ti} style={{ color: token.color }}>
                                        {token.text}
                                    </span>
                                ))}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

/* ─── Hero Section ─────────────────────────────────────── */
export default function Hero() {
    return (
        <section
            id="home"
            className="relative flex items-center section-padding pt-24"
            style={{ minHeight: "100vh", padding: "0 5%" }}
        >
            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center relative z-10">
                {/* Left — Text */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center" style={{ paddingRight: "clamp(0px, 2vw, 40px)" }}>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-[#9fb3c9] text-lg md:text-xl mb-3 font-light tracking-wide"
                    >
                        {personalInfo.tagline}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-7xl md:text-[6.5rem] font-black leading-[0.95] mb-8 tracking-tight"
                    >
                        <span className="gradient-text">{personalInfo.taglineHighlight}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-[#9fb3c9] text-base md:text-lg max-w-xl leading-relaxed mb-10"
                    >
                        {personalInfo.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.995 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-4 mb-10"
                    >
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="title-pill title-pill--active"
                            style={{ padding: "0.8rem 1.4rem", fontSize: "0.95rem", fontWeight: 500 }}
                        >
                            <ArrowDown size={16} /> View My Work
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="title-pill"
                            style={{ padding: "0.8rem 1.4rem", fontSize: "0.95rem", fontWeight: 500 }}
                        >
                            <Download size={16} /> Get Resume
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center gap-3"
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
                                className="glass"
                                style={{
                                    padding: "10px",
                                    borderRadius: "50%",
                                    color: "#9fb3c9",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "#00aaff";
                                    e.currentTarget.style.transform = "translateY(-4px)";
                                    e.currentTarget.style.boxShadow = "var(--shadow-1), 0 10px 20px rgba(0,160,255,0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "#9fb3c9";
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "var(--shadow-1), 0 2px 8px rgba(0,160,255,0.03)";
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = "translateY(0) scale(0.95)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = "translateY(-4px) scale(1)";
                                }}
                            >
                                <Icon size={18} style={{ position: "relative", zIndex: 1 }} />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Right — Code editor */}
                <div
                    className="w-full lg:w-1/2 flex items-center justify-center"
                    style={{ perspective: "1000px" }}
                >
                    <CodeEditor />
                </div>
            </div>
        </section>
    );
}
