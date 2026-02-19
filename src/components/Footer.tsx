"use client";

import { Github, Linkedin, Mail, Phone, ArrowUp } from "lucide-react";
import Image from "next/image";
import { personalInfo, navLinks } from "@/data/resume";

export default function Footer() {
    const handleClick = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="border-t border-white/5 pt-16 pb-8 px-6 relative" role="contentinfo">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="mb-4">
                            <Image
                                src="/logo.png"
                                alt="Sohan Kusuma Logo"
                                width={440}
                                height={200}
                                className="object-contain"
                                style={{ filter: "brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.6))" }}
                            />
                        </div>
                        <p className="text-[#9fb3c9] text-sm leading-relaxed max-w-xs mb-6">
                            Data Analyst &amp; ML Engineer dedicated to
                            transforming raw data into powerful insights and
                            intelligent systems.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Github, href: personalInfo.github, label: "GitHub" },
                                { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                                { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={href}
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
                                    <Icon size={16} style={{ position: "relative", zIndex: 1 }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav aria-label="Footer navigation">
                        <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">
                            Navigation
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleClick(link.href)}
                                    className="text-sm text-[#9fb3c9] hover:text-[#00aaff] transition-colors text-left"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Connect */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">
                            Connect
                        </h4>
                        <div className="space-y-3">
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className="flex items-center gap-2 text-sm text-[#9fb3c9] hover:text-[#00aaff] transition-colors"
                            >
                                <Mail size={14} aria-hidden="true" />
                                {personalInfo.email}
                            </a>
                            <a
                                href={`tel:${personalInfo.phone}`}
                                className="flex items-center gap-2 text-sm text-[#9fb3c9] hover:text-[#00aaff] transition-colors"
                            >
                                <Phone size={14} aria-hidden="true" />
                                {personalInfo.phone}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[rgba(255,255,255,0.04)] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-[#9fb3c9]">
                        © {new Date().getFullYear()} Sohan Kusuma. All rights reserved.
                    </p>
                    <p className="text-xs text-[#9fb3c9]">
                        Made with ❤️ in London, UK
                    </p>
                </div>
            </div>

            {/* Back to top fallback for non-JS/older users, real reactive button is in BackToTop component */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="absolute right-8 top-8 glass hover:text-[#00aaff] transition-colors"
                style={{ padding: "10px", borderRadius: "50%", color: "#9fb3c9" }}
                aria-label="Back to top"
            >
                <ArrowUp size={16} />
            </button>
        </footer>
    );
}
