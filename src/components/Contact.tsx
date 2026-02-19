"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github,
    Clock,
    Send,
    CheckCircle,
} from "lucide-react";
import { personalInfo } from "@/data/resume";

export default function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        // Simulated form submission delay
        await new Promise((r) => setTimeout(r, 1500));
        setSending(false);
        setSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
    };

    const contactDetails = [
        { icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
        { icon: Phone, label: personalInfo.phone, href: `tel:${personalInfo.phone}` },
        { icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedin },
        { icon: Github, label: "GitHub", href: personalInfo.github },
        { icon: MapPin, label: personalInfo.location, href: undefined },
        { icon: Clock, label: personalInfo.responseTime, href: undefined },
    ];

    return (
        <section id="contact" className="section-padding">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-[#888] text-sm max-w-xl mx-auto">
                        Open to data analyst, ML engineer, and business analyst roles. Have
                        a project or opportunity? Let&apos;s talk.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left — Contact details */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        {contactDetails.map(({ icon: Icon, label, href }) => (
                            <div key={label} className="glass-card glow-hover p-4 flex items-center gap-4">
                                <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#00d4ff]/10 to-[#7b2ff7]/10 border border-white/5">
                                    <Icon size={18} className="text-[#00d4ff]" />
                                </div>
                                {href ? (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[#ccc] hover:text-[#00d4ff] transition-colors break-all"
                                    >
                                        {label}
                                    </a>
                                ) : (
                                    <span className="text-sm text-[#ccc]">{label}</span>
                                )}
                            </div>
                        ))}
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
                            {[
                                { name: "name" as const, label: "Name", type: "text" },
                                { name: "email" as const, label: "Email", type: "email" },
                                { name: "subject" as const, label: "Subject", type: "text" },
                            ].map(({ name, label, type }) => (
                                <div key={name}>
                                    <label
                                        htmlFor={name}
                                        className="block text-xs text-[#888] mb-1.5 uppercase tracking-wider"
                                    >
                                        {label}
                                    </label>
                                    <input
                                        id={name}
                                        type={type}
                                        required
                                        value={formState[name]}
                                        onChange={(e) =>
                                            setFormState({ ...formState, [name]: e.target.value })
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
                                        placeholder={`Your ${label.toLowerCase()}`}
                                    />
                                </div>
                            ))}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-xs text-[#888] mb-1.5 uppercase tracking-wider"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={(e) =>
                                        setFormState({ ...formState, message: e.target.value })
                                    }
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#00d4ff]/40 transition-colors resize-none"
                                    placeholder="Your message"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7b2ff7] text-white font-medium text-sm hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {submitted ? (
                                    <>
                                        <CheckCircle size={16} /> Message Sent!
                                    </>
                                ) : sending ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Send size={16} />
                                        </motion.div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} /> Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
