"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowDown, UserPlus, Twitter } from "lucide-react";
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
                maxWidth: "720px",
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Title bar */}
            <div
                style={{
                    padding: "18px 24px",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.04)"
                }}
            >
                <div style={{ display: "flex", gap: "12px" }}>
                    <div className="w-[18px] h-[18px] rounded-full bg-[#31b0ff]" />
                    <div className="w-[18px] h-[18px] rounded-full bg-[#5ad3ff]" />
                    <div className="w-[18px] h-[18px] rounded-full bg-[#8ee9ff]" />
                </div>
                <span
                    style={{
                        fontSize: "18px",
                        color: "#9fb3c9",
                        marginLeft: "18px",
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
                padding: "30px 30px 30px 0",
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
                                gap: "18px",
                            }}
                        >
                            <span
                                style={{
                                    color: "#38c1ff",
                                    opacity: 0.5,
                                    minWidth: "42px",
                                    textAlign: "right",
                                    flexShrink: 0,
                                    fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                                    fontSize: "19px",
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
                                    fontSize: "19px",
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
const ROLES = ["Software Developer", "Data Analyst", "AI/ML Engineer", "Business Analyst"];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="home"
            className="relative flex items-center section-padding pt-24"
            style={{ minHeight: "100vh", padding: "0 5%" }}
        >
            <div className="max-w-7xl mx-auto w-full flex flex-col xl:flex-row gap-12 xl:gap-8 items-center relative z-10">
                {/* Left — Text */}
                <div className="w-full xl:w-[45%] flex flex-col justify-center" style={{ paddingRight: "clamp(0px, 2vw, 40px)" }}>

                    {/* Welcome Pill */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="glass inline-flex items-center px-6 py-2.5 rounded-full border border-white/10 self-start mb-6"
                    >
                        <span className="text-[#00aaff] text-xs font-bold tracking-[0.2em] uppercase">
                            Welcome To My Universe
                        </span>
                    </motion.div>

                    {/* Headings */}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.05] mb-5 tracking-tight flex flex-col"
                    >
                        <span className="text-white">
                            Crafting <span className="text-[#00aaff]">Digital</span>
                        </span>
                        <span className="bg-gradient-to-r from-[#0055ff] to-[#00aaff] bg-clip-text text-transparent opacity-90 drop-shadow-[0_0_15px_rgba(0,170,255,0.2)]">
                            Masterpieces
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-[#9fb3c9] text-base md:text-lg leading-relaxed mb-10 max-w-xl"
                    >
                        <p className="mb-1">
                            I'm <span className="text-white font-bold">Sohan Kusuma</span>, a professional{" "}
                            <span className="relative inline-grid align-baseline">
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={ROLES[roleIndex]}
                                        initial={{ opacity: 0, filter: "blur(12px)", x: -20 }}
                                        animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                                        exit={{ opacity: 0, filter: "blur(12px)", x: 40, scale: 1.05 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="text-[#00aaff] font-bold col-start-1 row-start-1"
                                    >
                                        {ROLES[roleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                                <span className="opacity-0 font-bold pointer-events-none col-start-1 row-start-1">
                                    Software Developer
                                </span>
                            </span>.
                        </p>
                        <p>
                            dedicated to building high-performance, user-centric web applications.
                        </p>
                    </motion.div>

                    {/* Social Icons (Rounded Squares) */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        {[
                            { icon: Github, href: personalInfo.github, label: "GitHub" },
                            { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                            { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
                            { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                        ].map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex items-center justify-center w-[54px] h-[54px] rounded-[18px] border border-white/5 bg-[#0a1120] hover:bg-[#1a253a] hover:border-white/10 transition-all duration-300 shadow-lg"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-4px)";
                                    e.currentTarget.style.boxShadow = "var(--shadow-1), 0 10px 20px rgba(0,160,255,0.15)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "var(--shadow-1), 0 2px 8px rgba(0,0,0,0.5)";
                                }}
                            >
                                <Icon size={24} className="text-white" strokeWidth={2} />
                            </a>
                        ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row w-full sm:w-auto mt-[18px] gap-[12px] sm:gap-[18px]"
                    >
                        <a
                            href="#contact"
                            className="flex items-center justify-center gap-4 text-[15px] font-bold text-white tracking-wide w-full sm:w-auto text-center focus:outline-none focus:ring-[4px] focus:ring-[rgba(0,170,255,0.18)]"
                            style={{
                                padding: "14px 22px",
                                borderRadius: "14px",
                                background: "linear-gradient(135deg, #008cff, #00aaff)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 10px 35px rgba(0, 140, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
                                transition: "all 0.28s cubic-bezier(.2,.9,.3,1)"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,160,255,0.18), inset 0 1px 0 rgba(255,255,255,0.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 10px 35px rgba(0, 140, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)";
                            }}
                        >
                            LET'S COLLABORATE <UserPlus size={22} className="ml-1" strokeWidth={2.5} />
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 text-[15px] font-bold text-white tracking-wide w-full sm:w-auto text-center focus:outline-none focus:ring-[4px] focus:ring-[rgba(0,170,255,0.18)]"
                            style={{
                                padding: "14px 22px",
                                borderRadius: "14px",
                                background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))",
                                backdropFilter: "blur(14px) saturate(140%)",
                                WebkitBackdropFilter: "blur(14px) saturate(140%)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 10px 35px rgba(0, 140, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
                                transition: "all 0.28s cubic-bezier(.2,.9,.3,1)"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,160,255,0.18), inset 0 1px 0 rgba(255,255,255,0.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 10px 35px rgba(0, 140, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)";
                            }}
                        >
                            GET RESUME <Download size={20} className="ml-1" strokeWidth={2.5} />
                        </a>
                    </motion.div>
                </div>

                {/* Right — Code editor */}
                <div
                    className="w-full xl:w-[55%] flex items-center justify-center xl:justify-end mt-12 xl:mt-0"
                    style={{ perspective: "1000px" }}
                >
                    <CodeEditor />
                </div>
            </div>
        </section>
    );
}
