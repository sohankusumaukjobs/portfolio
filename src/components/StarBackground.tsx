"use client";

import { useEffect, useRef } from "react";

export default function StarBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false }); // alpha: false optimizes the opaque background
        if (!ctx) return;

        // Configuration
        const STAR_COUNT = 1200; // Dense Milky Way look

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawRealisticSky();
        };

        const drawRealisticSky = () => {
            // Background deep space gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "#010510"); // Deep space black-blue
            gradient.addColorStop(1, "#031022"); // Matches the theme variable --color-bg-primary
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < STAR_COUNT; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;

                // Heavily bias towards very small, distant stars
                const sizeRand = Math.random();
                let radius = 0.3; // standard tiny dot
                if (sizeRand > 0.85) radius = Math.random() * 0.4 + 0.3;
                if (sizeRand > 0.98) radius = Math.random() * 0.7 + 0.5; // rare bright stars

                // Bias opacity towards faint
                const alpha = Math.random() > 0.7
                    ? Math.random() * 0.5 + 0.3 // Some bright
                    : Math.random() * 0.2 + 0.05; // Mostly faint

                // Subtle color variations (mostly white, some faint blue, rare orange/yellow)
                const colorRand = Math.random();
                let color = `rgba(255, 255, 255, ${alpha})`;
                if (colorRand > 0.8) {
                    color = `rgba(180, 220, 255, ${alpha})`; // Blue giant
                } else if (colorRand > 0.95) {
                    color = `rgba(255, 230, 180, ${alpha})`; // Red/yellow dwarf
                }

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = color;

                // Add a tiny glow effect only to the largest/brightest stars
                if (radius > 0.6) {
                    ctx.shadowBlur = Math.random() * 3 + 1;
                    ctx.shadowColor = color;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
            }
        };

        // Initialize
        resizeCanvas();

        // Handle resize with debouncing for performance
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 200);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-2]"
            aria-hidden="true"
        />
    );
}
