"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    baseAlpha: number;
    color: string;
    twinkleSpeed: number;
    twinkleDir: number;
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

interface Satellite {
    x: number;
    y: number;
    speed: number;
    angle: number;
    size: number;
    active: boolean;
    blinkTimer: number;
    blinkState: boolean;
}

interface Nebula {
    x: number;
    y: number;
    radius: number;
    r: number;
    g: number;
    b: number;
    opacity: number;
}

export default function StarBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Use standard context for animation, alpha: false is fast but we'll manage clears manually
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const STAR_COUNT = 800;
        const NEBULA_COUNT = 6;
        const USE_ANIMATION = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let stars: Star[] = [];
        let nebulas: Nebula[] = [];
        let comets: Comet[] = [];
        let satellites: Satellite[] = [];
        let animationFrameId: number;
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initSimulation();
        };

        const initSimulation = () => {
            stars = [];
            nebulas = [];
            comets = [];
            satellites = [];

            // 1. Initialize Nebulas (Galaxies)
            for (let i = 0; i < NEBULA_COUNT; i++) {
                nebulas.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 400 + 200,
                    r: Math.floor(Math.random() * 60 + 20),   // deep blues/purples
                    g: Math.floor(Math.random() * 40 + 10),
                    b: Math.floor(Math.random() * 100 + 80),
                    opacity: Math.random() * 0.04 + 0.01,
                });
            }

            // 2. Initialize Stars
            for (let i = 0; i < STAR_COUNT; i++) {
                const sizeRand = Math.random();
                let radius = 0.3;
                if (sizeRand > 0.85) radius = Math.random() * 0.4 + 0.3;
                if (sizeRand > 0.98) radius = Math.random() * 0.7 + 0.5;

                const baseAlpha = Math.random() > 0.7
                    ? Math.random() * 0.5 + 0.3
                    : Math.random() * 0.3 + 0.05;

                const colorRand = Math.random();
                let color = `rgba(255, 255, 255, `;
                if (colorRand > 0.8) {
                    color = `rgba(180, 220, 255, `;
                } else if (colorRand > 0.95) {
                    color = `rgba(255, 230, 180, `;
                }

                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius,
                    alpha: baseAlpha,
                    baseAlpha,
                    color,
                    twinkleSpeed: Math.random() * 0.005 + 0.001,
                    twinkleDir: Math.random() > 0.5 ? 1 : -1,
                });
            }
        };

        const drawSimulation = () => {
            // Draw Deep Space Background
            const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGradient.addColorStop(0, "#01040a");
            bgGradient.addColorStop(1, "#031022");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Nebulas (Galaxies)
            nebulas.forEach((n) => {
                const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
                grad.addColorStop(0, `rgba(${n.r}, ${n.g}, ${n.b}, ${n.opacity})`);
                grad.addColorStop(1, `rgba(${n.r}, ${n.g}, ${n.b}, 0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx.fill();

                if (USE_ANIMATION) {
                    // Very slow drift for nebula to simulate deep space pan
                    n.x -= 0.02;
                    if (n.x < -n.radius) n.x = canvas.width + n.radius;
                }
            });

            // Draw Stars
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${star.color}${star.alpha})`;

                // Glow for bright stars
                if (star.radius > 0.6) {
                    ctx.shadowBlur = 3;
                    ctx.shadowColor = `${star.color}${star.alpha})`;
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fill();

                if (USE_ANIMATION) {
                    // Twinkle
                    star.alpha += star.twinkleSpeed * star.twinkleDir;
                    if (star.alpha <= star.baseAlpha * 0.2) {
                        star.twinkleDir = 1;
                        star.alpha = star.baseAlpha * 0.2;
                    } else if (star.alpha >= Math.min(star.baseAlpha * 1.5, 1)) {
                        star.twinkleDir = -1;
                        star.alpha = Math.min(star.baseAlpha * 1.5, 1);
                    }

                    // Earth rotation pan (very slow drift left)
                    star.x -= 0.05 * (star.radius + 0.5); // Slight parallax: larger drift faster
                    if (star.x < 0) {
                        star.x = canvas.width;
                        star.y = Math.random() * canvas.height;
                    }
                }
            });
            ctx.shadowBlur = 0; // reset shadow

            if (USE_ANIMATION) {
                time++;

                // Spawn Comets (rare)
                if (Math.random() < 0.0005) { // 1 in 2000 frames (~33s at 60fps)
                    comets.push({
                        x: Math.random() * canvas.width + canvas.width * 0.2,
                        y: -50,
                        length: Math.random() * 150 + 100,
                        speed: Math.random() * 8 + 10,
                        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
                        opacity: Math.random() * 0.5 + 0.5,
                        thickness: Math.random() * 1.5 + 1,
                        active: true,
                    });
                }

                // Spawn Satellites / Spaceships (sometimes)
                if (Math.random() < 0.001 && satellites.length < 2) {
                    const isLeftToRight = Math.random() > 0.5;
                    satellites.push({
                        x: isLeftToRight ? -10 : canvas.width + 10,
                        y: Math.random() * (canvas.height * 0.8),
                        speed: Math.random() * 0.5 + 0.2,
                        angle: isLeftToRight ? (Math.random() * 0.2 - 0.1) : Math.PI + (Math.random() * 0.2 - 0.1),
                        size: Math.random() * 0.8 + 0.6,
                        active: true,
                        blinkTimer: 0,
                        blinkState: true,
                    });
                }

                // Draw & Update Comets
                comets.forEach((comet) => {
                    if (!comet.active) return;
                    const endX = comet.x - Math.cos(comet.angle) * comet.length;
                    const endY = comet.y - Math.sin(comet.angle) * comet.length;

                    const grad = ctx.createLinearGradient(comet.x, comet.y, endX, endY);
                    grad.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
                    grad.addColorStop(0.1, `rgba(150, 220, 255, ${comet.opacity * 0.6})`);
                    grad.addColorStop(1, "rgba(0, 170, 255, 0)");

                    ctx.beginPath();
                    ctx.moveTo(comet.x, comet.y);
                    ctx.lineTo(endX, endY);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = comet.thickness;
                    ctx.lineCap = "round";
                    ctx.stroke();

                    comet.x -= Math.cos(comet.angle) * comet.speed;
                    comet.y += Math.sin(comet.angle) * comet.speed;

                    if (comet.x < -comet.length || comet.y > canvas.height + comet.length) {
                        comet.active = false;
                    }
                });
                comets = comets.filter((c) => c.active);

                // Draw & Update Satellites Focus (Spaceships)
                satellites.forEach((sat) => {
                    if (!sat.active) return;

                    // Move
                    sat.x += Math.cos(sat.angle) * sat.speed;
                    sat.y += Math.sin(sat.angle) * sat.speed;

                    // Blinking logic (blink every ~60 frames)
                    sat.blinkTimer++;
                    if (sat.blinkTimer > 80) {
                        sat.blinkTimer = 0;
                        sat.blinkState = !sat.blinkState;
                    }

                    // Main body
                    ctx.beginPath();
                    ctx.arc(sat.x, sat.y, sat.size, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(200, 200, 200, 0.8)";
                    ctx.fill();

                    // Blinking Light (Red or Cyan)
                    if (sat.blinkState) {
                        ctx.beginPath();
                        ctx.arc(sat.x, sat.y, sat.size * 1.5, 0, Math.PI * 2);
                        const isRed = Math.sin(time * 0.05) > 0;
                        ctx.fillStyle = isRed ? "rgba(255, 50, 50, 0.9)" : "rgba(50, 200, 255, 0.9)";
                        ctx.shadowBlur = 6;
                        ctx.shadowColor = ctx.fillStyle;
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }

                    if (sat.x < -50 || sat.x > canvas.width + 50 || sat.y < -50 || sat.y > canvas.height + 50) {
                        sat.active = false;
                    }
                });
                satellites = satellites.filter((s) => s.active);
            }
        };

        const renderLoop = () => {
            drawSimulation();
            if (USE_ANIMATION) {
                animationFrameId = requestAnimationFrame(renderLoop);
            }
        };

        resizeCanvas();
        if (USE_ANIMATION) {
            renderLoop();
        } else {
            drawSimulation(); // draw static once
        }

        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 200);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
