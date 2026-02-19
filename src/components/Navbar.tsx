"use client";

import Image from "next/image";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/resume";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("#home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Track active section
            const sections = navLinks.map((l) => l.href.slice(1));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) {
                        setActiveSection(`#${sections[i]}`);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const handleClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-[#031022]/70 backdrop-blur-md border-b border-white/[0.04]"
                    : "bg-transparent"
                    }`}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="max-w-7xl w-full mx-auto h-20 flex items-center justify-between" style={{ padding: "0 5%" }}>
                    <button
                        onClick={() => handleClick("#home")}
                        aria-label="Go to homepage"
                        className="relative flex items-center justify-center transition-transform hover:scale-105"
                    >
                        <Image
                            src="/logo.png"
                            alt="Sohan Kusuma Logo"
                            width={360}
                            height={160}
                            className="w-[140px] sm:w-[180px] md:w-[260px] lg:w-[360px] h-auto object-contain"
                            style={{ filter: "brightness(0) invert(1)" }}
                        />
                    </button>

                    {/* Desktop nav */}
                    <div className="hidden md:flex ml-auto items-center gap-12 mr-2">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => handleClick(link.href)}
                                className={`text-sm font-semibold transition-colors duration-300 tracking-wide ${activeSection === link.href ? "text-white" : "text-[#9fb3c9] hover:text-white"}`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-white p-2"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-[#031022]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                onClick={() => handleClick(link.href)}
                                className={`text-2xl font-bold transition-colors ${activeSection === link.href ? "text-white" : "text-[#9fb3c9] hover:text-white"}`}
                                style={{ padding: "1rem 2rem" }}
                            >
                                {link.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
