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

        // Client-side validation
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

    const contactDetails = [
        {
            icon: Mail,
            label: personalInfo.email,
            href: `mailto:${personalInfo.email}`,
        },
        {
            icon: Phone,
            label: personalInfo.phone,
            href: `tel:${personalInfo.phone}`,
        },
        { icon: MapPin, label: personalInfo.location, href: undefined },
        { icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedin },
        { icon: Github, label: "GitHub", href: personalInfo.github },
        { icon: Clock, label: personalInfo.responseTime, href: undefined },
    ];

    return (
        <section id="contact" className="section-padding">
            <div className="max-w-6xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <p className="section-label">{"// contact"}</p>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-[#6b7280] max-w-xl mx-auto">
                        Have a project in mind or just want to say hi? I&apos;m
                        always open to discussing new opportunities and creative
                        ideas.
                    </p>
                    <div className="section-underline mx-auto" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left — Contact details */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-4"
                    >
                        {contactDetails.map(({ icon: Icon, label, href }) => (
                            <div
                                key={label}
                                className="glass-card glow-hover p-4 flex items-center gap-4"
                            >
                                <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#00d4ff]/10 to-[#7b2ff7]/10 border border-white/5">
                                    <Icon
                                        size={18}
                                        className="text-[#00d4ff]"
                                        aria-hidden="true"
                                    />
                                </div>
                                {href ? (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[#d1d5db] hover:text-[#00d4ff] transition-colors break-all"
                                    >
                                        {label}
                                    </a>
                                ) : (
                                    <span className="text-sm text-[#d1d5db]">
                                        {label}
                                    </span>
                                )}
                            </div>
                        ))}
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="glass-card p-6 md:p-8 space-y-5"
                            noValidate
                        >
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Send a Message
                            </h3>
                            <p className="text-xs text-[#6b7280] mb-4">
                                I&apos;ll get back to you within 24 hours.
                            </p>

                            {error && (
                                <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2">
                                    {error}
                                </div>
                            )}

                            {[
                                {
                                    name: "name" as const,
                                    label: "Name",
                                    type: "text",
                                    required: true,
                                },
                                {
                                    name: "email" as const,
                                    label: "Email",
                                    type: "email",
                                    required: true,
                                },
                                {
                                    name: "subject" as const,
                                    label: "Subject",
                                    type: "text",
                                    required: false,
                                },
                            ].map(({ name, label, type, required }) => (
                                <div key={name}>
                                    <label
                                        htmlFor={`contact-${name}`}
                                        className="block text-xs text-[#6b7280] mb-1.5 uppercase tracking-wider"
                                    >
                                        {label}
                                        {required && (
                                            <span className="text-[#00d4ff] ml-1">
                                                *
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        id={`contact-${name}`}
                                        type={type}
                                        required={required}
                                        value={formState[name]}
                                        onChange={(e) =>
                                            setFormState({
                                                ...formState,
                                                [name]: e.target.value,
                                            })
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
                                        placeholder={`Your ${label.toLowerCase()}`}
                                    />
                                </div>
                            ))}
                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="block text-xs text-[#6b7280] mb-1.5 uppercase tracking-wider"
                                >
                                    Message
                                    <span className="text-[#00d4ff] ml-1">*</span>
                                </label>
                                <textarea
                                    id="contact-message"
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            message: e.target.value,
                                        })
                                    }
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4ff]/40 transition-colors resize-none"
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
                                        <CheckCircle
                                            size={16}
                                            className="text-green-400"
                                        />
                                        <span className="text-green-300">
                                            Message sent successfully!
                                        </span>
                                    </>
                                ) : sending ? (
                                    <>
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
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
