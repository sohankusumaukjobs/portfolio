"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo, navLinks } from "@/data/resume";

export default function Footer() {
    const handleClick = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="border-t border-white/5 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold gradient-text mb-3">SK.</h3>
                        <p className="text-[#888] text-sm leading-relaxed max-w-xs">
                            Data Analyst &amp; ML Engineer dedicated to transforming raw data
                            into powerful insights and intelligent systems.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">
                            Navigation
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleClick(link.href)}
                                    className="text-sm text-[#888] hover:text-[#00d4ff] transition-colors text-left"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
                        <div className="flex gap-3 mb-4">
                            {[
                                { icon: Github, href: personalInfo.github },
                                { icon: Linkedin, href: personalInfo.linkedin },
                                { icon: Mail, href: `mailto:${personalInfo.email}` },
                            ].map(({ icon: Icon, href }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg border border-white/10 text-[#888] hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="text-sm text-[#888] hover:text-[#00d4ff] transition-colors"
                        >
                            {personalInfo.email}
                        </a>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-[#666]">
                        © {new Date().getFullYear()} Sohan Kusuma. All rights reserved.
                    </p>
                    <p className="text-xs text-[#666]">
                        Made with ❤️ in England, UK
                    </p>
                </div>
            </div>
        </footer>
    );
}
