"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    baseAlpha: number;
    twinkleSpeed: number;
    twinkleDirection: number;
}

interface Comet {
    x: number;
    y: number;
    length: number;
    speed: number;
    angle: number;
    opacity: number;
    thickness: number;
    active: boolean;
}

export default function StarBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Configuration
        const STAR_COUNT = 250;
        const COMET_CHANCE = 0.001; // Chance per frame to spawn a comet
        const USE_ANIMATION = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // State
        let stars: Star[] = [];
        let comets: Comet[] = [];
        let animationFrameId: number;

        // Initialize Canvas Size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                const baseAlpha = Math.random() * 0.5 + 0.1;
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    alpha: baseAlpha,
                    baseAlpha,
                    twinkleSpeed: Math.random() * 0.01 + 0.005,
                    twinkleDirection: Math.random() > 0.5 ? 1 : -1,
                });
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Stars
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

                // Add a subtle blue tint to some stars
                const isBlue = Math.random() > 0.8;
                ctx.fillStyle = isBlue
                    ? `rgba(154, 230, 255, ${star.alpha})` // Cyan tint
                    : `rgba(255, 255, 255, ${star.alpha})`; // White

                ctx.fill();

                if (USE_ANIMATION) {
                    // Update star twinkle
                    star.alpha += star.twinkleSpeed * star.twinkleDirection;

                    // Reverse twinkle direction if limits reached
                    if (star.alpha <= star.baseAlpha * 0.3) {
                        star.twinkleDirection = 1;
                        star.alpha = star.baseAlpha * 0.3;
                    } else if (star.alpha >= star.baseAlpha * 1.5) {
                        star.twinkleDirection = -1;
                        star.alpha = star.baseAlpha * 1.5;
                    }

                    // Very slow drift
                    star.x -= 0.05;
                    star.y -= 0.02;

                    // Wrap around
                    if (star.x < 0) star.x = canvas.width;
                    if (star.y < 0) star.y = canvas.height;
                }
            });

            // Draw Comets
            if (USE_ANIMATION) {
                // Spawn new comets randomly
                if (Math.random() < COMET_CHANCE) {
                    comets.push({
                        x: Math.random() * canvas.width + canvas.width * 0.2, // Start slightly off screen to the right
                        y: -50, // Start above screen
                        length: Math.random() * 100 + 150,
                        speed: Math.random() * 5 + 8, // Fast!
                        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1), // Angled down and left
                        opacity: 1,
                        thickness: Math.random() * 1.5 + 1,
                        active: true,
                    });
                }

                // Update and draw existing comets
                comets.forEach((comet) => {
                    if (!comet.active) return;

                    const endX = comet.x - Math.cos(comet.angle) * comet.length;
                    const endY = comet.y - Math.sin(comet.angle) * comet.length;

                    // Create gradient for the tail
                    const gradient = ctx.createLinearGradient(comet.x, comet.y, endX, endY);
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
                    gradient.addColorStop(0.1, `rgba(0, 170, 255, ${comet.opacity * 0.8})`);
                    gradient.addColorStop(1, "rgba(0, 170, 255, 0)");

                    ctx.beginPath();
                    ctx.moveTo(comet.x, comet.y);
                    ctx.lineTo(endX, endY);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = comet.thickness;
                    ctx.lineCap = "round";
                    ctx.stroke();

                    // Move comet
                    comet.x -= Math.cos(comet.angle) * comet.speed;
                    comet.y += Math.sin(comet.angle) * comet.speed;

                    // Fade out slightly if needed, or remove if off screen
                    if (comet.x < -comet.length || comet.y > canvas.height + comet.length) {
                        comet.active = false;
                    }
                });

                // Clean up inactive comets
                comets = comets.filter((c) => c.active);
            }
        };

        const render = () => {
            drawStars();
            if (USE_ANIMATION) {
                animationFrameId = requestAnimationFrame(render);
            }
        };

        // Initialize
        resizeCanvas();
        render();

        // Event Listeners
        window.addEventListener("resize", resizeCanvas);

        // Cleanup
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
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
