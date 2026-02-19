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

interface GalacticCloud {
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

    // Seeded random for consistent galaxy generation across resizes
    let seed = 12345;
    const seededRandom = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const USE_ANIMATION = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Visual Configuration
        const STAR_COUNT = 3000; // High density for the Milky Way
        const GALAXY_BAND_ANGLE = Math.PI / 4; // Diagonal top-left to bottom-right
        const GALAXY_WIDTH = Math.max(window.innerWidth, window.innerHeight) * 0.4;

        let stars: Star[] = [];
        let clouds: GalacticCloud[] = [];
        let dustLanes: GalacticCloud[] = [];
        let comets: Comet[] = [];
        let satellites: Satellite[] = [];
        let animationFrameId: number;
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            seed = 12345; // Reset seed on resize so galaxy looks consistent
            initSimulation();
        };

        const randomGauss = () => {
            let u = 0, v = 0;
            while (u === 0) u = seededRandom();
            while (v === 0) v = seededRandom();
            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        };

        const initSimulation = () => {
            stars = [];
            clouds = [];
            dustLanes = [];
            comets = [];
            satellites = [];

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const diagMax = Math.max(canvas.width, canvas.height) * 1.5;

            // 1. Generate Galactic Glowing Clouds (The Milky Way Band)
            const CLOUD_COUNT = 150;
            for (let i = 0; i < CLOUD_COUNT; i++) {
                // Distribute heavily along the diagonal band
                const lengthAlongBand = (seededRandom() - 0.5) * diagMax;
                const distFromCenter = randomGauss() * (GALAXY_WIDTH / 3);

                const x = cx + Math.cos(GALAXY_BAND_ANGLE) * lengthAlongBand - Math.sin(GALAXY_BAND_ANGLE) * distFromCenter;
                const y = cy + Math.sin(GALAXY_BAND_ANGLE) * lengthAlongBand + Math.cos(GALAXY_BAND_ANGLE) * distFromCenter;

                // Color palette: Warm core (brown/orange/pink) + Outer cool (blue/purple)
                const isCore = Math.abs(distFromCenter) < GALAXY_WIDTH / 4;
                let r, g, b;

                if (isCore) {
                    // Core: Warm, bright
                    r = Math.floor(seededRandom() * 50 + 200); // 200-250 (orange/red/white)
                    g = Math.floor(seededRandom() * 50 + 150); // 150-200
                    b = Math.floor(seededRandom() * 50 + 100); // 100-150
                } else {
                    // Edges: Cool, deep
                    r = Math.floor(seededRandom() * 50 + 40);   // 40-90 (purple/blue)
                    g = Math.floor(seededRandom() * 40 + 30);  // 30-70
                    b = Math.floor(seededRandom() * 80 + 100); // 100-180
                }

                clouds.push({
                    x, y,
                    radius: seededRandom() * 200 + 150, // Large soft clouds
                    r, g, b,
                    opacity: seededRandom() * 0.03 + 0.01 // Very faint, overlapping builds intensity
                });
            }

            // 2. Generate Dark Dust Lanes (Occluding clouds)
            const DUST_COUNT = 80;
            for (let i = 0; i < DUST_COUNT; i++) {
                const lengthAlongBand = (seededRandom() - 0.5) * diagMax;
                // Dust is tightly clustered near the exact center line
                const distFromCenter = randomGauss() * (GALAXY_WIDTH / 8);

                const x = cx + Math.cos(GALAXY_BAND_ANGLE) * lengthAlongBand - Math.sin(GALAXY_BAND_ANGLE) * distFromCenter;
                const y = cy + Math.sin(GALAXY_BAND_ANGLE) * lengthAlongBand + Math.cos(GALAXY_BAND_ANGLE) * distFromCenter;

                dustLanes.push({
                    x, y,
                    radius: seededRandom() * 150 + 50,
                    r: 2, g: 5, b: 10, // Very dark, near black/deep blue space color
                    opacity: seededRandom() * 0.2 + 0.1
                });
            }

            // 3. Generate Stars
            for (let i = 0; i < STAR_COUNT; i++) {
                let x, y;
                let isBand = false;

                // 60% of stars cluster tightly in the Milky Way band
                if (seededRandom() < 0.6) {
                    const lengthAlongBand = (seededRandom() - 0.5) * diagMax;
                    const distFromCenter = randomGauss() * (GALAXY_WIDTH / 2);
                    x = cx + Math.cos(GALAXY_BAND_ANGLE) * lengthAlongBand - Math.sin(GALAXY_BAND_ANGLE) * distFromCenter;
                    y = cy + Math.sin(GALAXY_BAND_ANGLE) * lengthAlongBand + Math.cos(GALAXY_BAND_ANGLE) * distFromCenter;
                    isBand = true;
                } else {
                    // 40% uniform background stars
                    x = seededRandom() * canvas.width;
                    y = seededRandom() * canvas.height;
                }

                // Size bias: lots of tiny faint stars, rare bright ones
                const sizeRand = seededRandom();
                let radius = 0.4;
                if (sizeRand > 0.8) radius = seededRandom() * 0.5 + 0.4;
                if (sizeRand > 0.98) radius = seededRandom() * 0.8 + 0.7;

                // Color bias: Warm in the band, varied outside
                let color = "rgba(255, 255, 255, ";
                const colorRand = seededRandom();
                if (isBand && colorRand > 0.5) {
                    color = "rgba(255, 220, 180, "; // Warm/yellow
                } else if (!isBand && colorRand > 0.8) {
                    color = "rgba(180, 220, 255, "; // Blue
                }

                const baseAlpha = seededRandom() > 0.7
                    ? seededRandom() * 0.5 + 0.3 // bright
                    : seededRandom() * 0.3 + 0.1; // faint

                stars.push({
                    x, y, radius, alpha: baseAlpha, baseAlpha, color,
                    twinkleSpeed: seededRandom() * 0.005 + 0.001,
                    twinkleDir: seededRandom() > 0.5 ? 1 : -1,
                });
            }
        };

        const drawSimulation = () => {
            // 1. Deep Space Background
            const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGradient.addColorStop(0, "#01040a"); // Incredibly dark blue/black
            bgGradient.addColorStop(1, "#030a16");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 2. Draw Galactic Clouds (Additive)
            ctx.globalCompositeOperation = "screen"; // Additive blending for glows
            clouds.forEach((n) => {
                const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
                grad.addColorStop(0, `rgba(${n.r}, ${n.g}, ${n.b}, ${n.opacity})`);
                grad.addColorStop(1, `rgba(${n.r}, ${n.g}, ${n.b}, 0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx.fill();

                if (USE_ANIMATION) { // Slow majestic drift
                    n.x -= Math.cos(GALAXY_BAND_ANGLE) * 0.05;
                    n.y -= Math.sin(GALAXY_BAND_ANGLE) * 0.05;
                }
            });

            // 3. Draw Dark Dust Lanes (Subtractive/Normal)
            ctx.globalCompositeOperation = "source-over"; // Normal blending to occlude light
            dustLanes.forEach((d) => {
                const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.radius);
                grad.addColorStop(0, `rgba(${d.r}, ${d.g}, ${d.b}, ${d.opacity})`);
                grad.addColorStop(1, `rgba(${d.r}, ${d.g}, ${d.b}, 0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
                ctx.fill();

                if (USE_ANIMATION) {
                    d.x -= Math.cos(GALAXY_BAND_ANGLE) * 0.05;
                    d.y -= Math.sin(GALAXY_BAND_ANGLE) * 0.05;
                }
            });

            // 4. Draw Stars
            ctx.globalCompositeOperation = "screen";
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${star.color}${star.alpha})`;

                if (star.radius > 0.8) {
                    ctx.shadowBlur = Math.random() * 4 + 2; // subtle shimmer
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

                    // Drift along the galaxy band
                    star.x -= Math.cos(GALAXY_BAND_ANGLE) * 0.05;
                    star.y -= Math.sin(GALAXY_BAND_ANGLE) * 0.05;
                }
            });
            ctx.shadowBlur = 0;

            // 5. Draw Dynamic Entities (Comets / Satellites)
            ctx.globalCompositeOperation = "source-over";
            if (USE_ANIMATION) {
                time++;

                // Comets
                if (Math.random() < 0.0005) {
                    comets.push({
                        x: Math.random() * canvas.width * 1.5,
                        y: -50,
                        length: Math.random() * 200 + 100,
                        speed: Math.random() * 10 + 12,
                        angle: Math.PI / 3 + (Math.random() * 0.2 - 0.1),
                        opacity: Math.random() * 0.5 + 0.5,
                        thickness: Math.random() * 2 + 1,
                        active: true,
                    });
                }

                // Satellites
                if (Math.random() < 0.001 && satellites.length < 2) {
                    const isLeftToRight = Math.random() > 0.5;
                    satellites.push({
                        x: isLeftToRight ? -10 : canvas.width + 10,
                        y: Math.random() * (canvas.height * 0.8),
                        speed: Math.random() * 0.4 + 0.1, // Very slow, realistic satellite speed
                        angle: isLeftToRight ? (0 + Math.random() * 0.1) : (Math.PI - Math.random() * 0.1),
                        size: Math.random() * 0.6 + 0.4,
                        active: true,
                        blinkTimer: 0,
                        blinkState: true,
                    });
                }

                // Render Comets
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

                    // Fade tail over time slightly
                    comet.opacity *= 0.99;

                    if (comet.x < -comet.length || comet.y > canvas.height + comet.length || comet.opacity < 0.05) {
                        comet.active = false;
                    }
                });
                comets = comets.filter((c) => c.active);

                // Render Satellites
                satellites.forEach((sat) => {
                    if (!sat.active) return;

                    sat.x += Math.cos(sat.angle) * sat.speed;
                    sat.y += Math.sin(sat.angle) * sat.speed;

                    sat.blinkTimer++;
                    if (sat.blinkTimer > 60) {
                        sat.blinkTimer = 0;
                        sat.blinkState = !sat.blinkState;
                    }

                    ctx.beginPath();
                    ctx.arc(sat.x, sat.y, sat.size, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(200, 200, 200, 0.6)";
                    ctx.fill();

                    if (sat.blinkState) {
                        ctx.beginPath();
                        ctx.arc(sat.x, sat.y, sat.size * 2, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(255, 30, 30, 0.8)"; // Red strobe typical of LEO sats/planes
                        ctx.fill();
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
            drawSimulation();
        }

        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 400); // Wait longer so resize doesn't trigger heavy redraw constantly
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
