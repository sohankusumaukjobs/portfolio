"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github,
    Clock,
    Send,
    CheckCircle,
    Loader2,
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
    const [error, setError] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
            setError("Please fill in all required fields.");
            return;
        }
        if (!validateEmail(formState.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setSending(true);
        try {
            const res = await fetch("https://formspree.io/f/xdkozzrg", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    subject: formState.subject,
                    message: formState.message,
                }),
            });
            if (res.ok) {
                setSubmitted(true);
                setFormState({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                setError("Failed to send. Please try again.");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" className="section-padding flex flex-col items-center justify-center w-full">
            <div className="max-w-6xl w-full mx-auto flex flex-col items-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-16 w-full"
                >
                    <p className="section-label">{"// contact"}</p>
                    <h2 className="text-5xl md:text-6xl text-white mb-4" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-[#9fb3c9] max-w-xl">
                        Have a project in mind or just want to say hi? I&apos;m always open
                        to discussing new opportunities and creative ideas.
                    </p>
                    <div className="section-underline" />
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8 w-full text-left">
                    {/* Left — Form (wider) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        <div className="glass p-7 md:p-9">
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00aaff] to-[#38c1ff] z-10" />
                            <h3 className="text-xl font-semibold text-white mb-2 relative z-10">
                                Send a Message
                            </h3>
                            <p className="text-xs text-[#9fb3c9] mb-8 relative z-10">
                                I&apos;ll get back to you within 24 hours.
                            </p>

                            {error && (
                                <div className="relative z-10 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 mb-5">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate className="space-y-5 relative z-10">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    {[
                                        { name: "name" as const, label: "Name", type: "text", required: true },
                                        { name: "email" as const, label: "Email", type: "email", required: true },
                                    ].map(({ name, label, type, required }) => (
                                        <div key={name}>
                                            <label
                                                htmlFor={`contact-${name}`}
                                                className="block text-xs text-[#9fb3c9] mb-2 uppercase tracking-wider font-[var(--font-jetbrains)]"
                                            >
                                                {label}
                                                {required && <span className="text-[#00aaff] ml-1">*</span>}
                                            </label>
                                            <input
                                                id={`contact-${name}`}
                                                type={type}
                                                required={required}
                                                value={formState[name]}
                                                onChange={(e) =>
                                                    setFormState({ ...formState, [name]: e.target.value })
                                                }
                                                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] backdrop-blur-md rounded-xl px-4 py-3 text-sm text-white placeholder-[#70849c] focus:outline-none focus:border-[rgba(0,170,255,0.4)] focus:shadow-[0_0_0_4px_rgba(0,170,255,0.1)] transition-all duration-300"
                                                placeholder={`Your ${label.toLowerCase()}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <label
                                        htmlFor="contact-subject"
                                        className="block text-xs text-[#9fb3c9] mb-2 uppercase tracking-wider font-[var(--font-jetbrains)]"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        value={formState.subject}
                                        onChange={(e) =>
                                            setFormState({ ...formState, subject: e.target.value })
                                        }
                                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] backdrop-blur-md rounded-xl px-4 py-3 text-sm text-white placeholder-[#70849c] focus:outline-none focus:border-[rgba(0,170,255,0.4)] focus:shadow-[0_0_0_4px_rgba(0,170,255,0.1)] transition-all duration-300"
                                        placeholder="What's this about?"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="contact-message"
                                        className="block text-xs text-[#9fb3c9] mb-2 uppercase tracking-wider font-[var(--font-jetbrains)]"
                                    >
                                        Message <span className="text-[#00aaff] ml-1">*</span>
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={(e) =>
                                            setFormState({ ...formState, message: e.target.value })
                                        }
                                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] backdrop-blur-md rounded-xl px-4 py-3 text-sm text-white placeholder-[#70849c] focus:outline-none focus:border-[rgba(0,170,255,0.4)] focus:shadow-[0_0_0_4px_rgba(0,170,255,0.1)] transition-all duration-300 resize-none"
                                        placeholder="Tell me about your project or idea..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full title-pill title-pill--active flex items-center justify-center gap-2"
                                    style={{ padding: "14px", fontSize: "0.9rem", borderRadius: "12px", width: "100%" }}
                                >
                                    {submitted ? (
                                        <>
                                            <CheckCircle size={16} className="text-white" />
                                            <span>Sent successfully!</span>
                                        </>
                                    ) : sending ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right — Contact details + Social */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Direct Contact */}
                        <div className="glass p-6">
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00aaff] to-[#38c1ff] z-10" />
                            <h3 className="text-base font-semibold text-white mb-5 pl-3 relative z-10">
                                Direct Contact
                            </h3>
                            <div className="space-y-4 pl-3 relative z-10">
                                {[
                                    { icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                                    { icon: Phone, label: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                                    { icon: MapPin, label: personalInfo.location, href: undefined },
                                ].map(({ icon: Icon, label, href }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-[rgba(0,170,255,0.1)] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                                            <Icon size={16} className="text-[#00aaff]" aria-hidden="true" />
                                        </div>
                                        {href ? (
                                            <a
                                                href={href}
                                                className="text-sm text-[#e6f0ff] hover:text-[#00aaff] transition-colors break-all"
                                            >
                                                {label}
                                            </a>
                                        ) : (
                                            <span className="text-sm text-[#e6f0ff]">{label}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Presence */}
                        <div className="glass p-6">
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#38c1ff] to-[#00aaff] z-10" />
                            <h3 className="text-base font-semibold text-white mb-5 pl-3 relative z-10">
                                Social Presence
                            </h3>
                            <p className="text-[#9fb3c9] text-sm leading-relaxed mb-5 pl-3 relative z-10">
                                Data Analyst &amp; ML Engineer dedicated to transforming raw data into powerful insights and intelligent systems.
                            </p>
                            <div className="flex gap-3 pl-3 relative z-10">
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
                            </div>
                        </div>

                        {/* Response time */}
                        <div className="glass p-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[rgba(0,170,255,0.1)] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] relative z-10">
                                <Clock size={16} className="text-[#00aaff]" aria-hidden="true" />
                            </div>
                            <span className="text-sm text-[#9fb3c9] relative z-10">
                                {personalInfo.responseTime}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
