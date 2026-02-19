"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    radius: number;
    color: string;
    alpha: number;
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
    state: "charging" | "shooting";
    chargeTimer: number;
    maxChargeTime: number;
    originX: number;
    originY: number;
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

export default function StarBackground() {
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);
    const fgCanvasRef = useRef<HTMLCanvasElement>(null);

    // Seeded random for consistent galaxy generation across resizes
    let seed = 12345;
    const seededRandom = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    useEffect(() => {
        const bgCanvas = bgCanvasRef.current;
        const fgCanvas = fgCanvasRef.current;
        if (!bgCanvas || !fgCanvas) return;

        // bgCtx uses alpha: false for ultra-fast opaque rendering
        const bgCtx = bgCanvas.getContext("2d", { alpha: false });
        // fgCtx needs transparency to show the bgCanvas underneath
        const fgCtx = fgCanvas.getContext("2d");
        if (!bgCtx || !fgCtx) return;

        const USE_ANIMATION = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const STAR_COUNT = 3000;
        const GALAXY_BAND_ANGLE = Math.PI / 4;

        // Data shared between bg (static) and fg (dynamic comets)
        let stars: Star[] = [];
        let comets: Comet[] = [];
        let satellites: Satellite[] = [];
        let animationFrameId: number;
        let time = 0;
        let lastCometSpawnTime = 0;
        let lastSatSpawnTime = 0;

        const randomGauss = () => {
            let u = 0, v = 0;
            while (u === 0) u = seededRandom();
            while (v === 0) v = seededRandom();
            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        };

        const renderBackgroundOnce = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            bgCanvas.width = width;
            bgCanvas.height = height;
            seed = 12345; // Consistent galaxy
            stars = [];

            const cx = width / 2;
            const cy = height / 2;
            const diagMax = Math.max(width, height) * 1.5;
            const GALAXY_WIDTH = Math.max(width, height) * 0.4;

            // 1. Deep Space
            const bgGradient = bgCtx.createLinearGradient(0, 0, 0, height);
            bgGradient.addColorStop(0, "#01040a");
            bgGradient.addColorStop(1, "#030a16");
            bgCtx.fillStyle = bgGradient;
            bgCtx.fillRect(0, 0, width, height);

            // 2. Draw Galactic Clouds (Additive)
            bgCtx.globalCompositeOperation = "screen";
            for (let i = 0; i < 150; i++) {
                const lengthAlongBand = (seededRandom() - 0.5) * diagMax;
                const distFromCenter = randomGauss() * (GALAXY_WIDTH / 3);
                const x = cx + Math.cos(GALAXY_BAND_ANGLE) * lengthAlongBand - Math.sin(GALAXY_BAND_ANGLE) * distFromCenter;
                const y = cy + Math.sin(GALAXY_BAND_ANGLE) * lengthAlongBand + Math.cos(GALAXY_BAND_ANGLE) * distFromCenter;

                const isCore = Math.abs(distFromCenter) < GALAXY_WIDTH / 4;
                let r, g, b;
                if (isCore) {
                    r = Math.floor(seededRandom() * 50 + 200);
                    g = Math.floor(seededRandom() * 50 + 150);
                    b = Math.floor(seededRandom() * 50 + 100);
                } else {
                    r = Math.floor(seededRandom() * 50 + 40);
                    g = Math.floor(seededRandom() * 40 + 30);
                    b = Math.floor(seededRandom() * 80 + 100);
                }

                const radius = seededRandom() * 200 + 150;
                const opacity = seededRandom() * 0.03 + 0.01;

                const grad = bgCtx.createRadialGradient(x, y, 0, x, y, radius);
                grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
                grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                bgCtx.fillStyle = grad;
                bgCtx.beginPath();
                bgCtx.arc(x, y, radius, 0, Math.PI * 2);
                bgCtx.fill();
            }

            // 3. Draw Dark Dust Lanes (Normal)
            bgCtx.globalCompositeOperation = "source-over";
            for (let i = 0; i < 80; i++) {
                const lengthAlongBand = (seededRandom() - 0.5) * diagMax;
                const distFromCenter = randomGauss() * (GALAXY_WIDTH / 8);
                const x = cx + Math.cos(GALAXY_BAND_ANGLE) * lengthAlongBand - Math.sin(GALAXY_BAND_ANGLE) * distFromCenter;
                const y = cy + Math.sin(GALAXY_BAND_ANGLE) * lengthAlongBand + Math.cos(GALAXY_BAND_ANGLE) * distFromCenter;

                const radius = seededRandom() * 150 + 50;
                const opacity = seededRandom() * 0.2 + 0.1;

                const grad = bgCtx.createRadialGradient(x, y, 0, x, y, radius);
                grad.addColorStop(0, `rgba(2, 5, 10, ${opacity})`);
                grad.addColorStop(1, `rgba(2, 5, 10, 0)`);
                bgCtx.fillStyle = grad;
                bgCtx.beginPath();
                bgCtx.arc(x, y, radius, 0, Math.PI * 2);
                bgCtx.fill();
            }

            // 4. Generate & Draw Stars
            bgCtx.globalCompositeOperation = "screen";
            for (let i = 0; i < STAR_COUNT; i++) {
                let x, y;
                let isBand = false;

                if (seededRandom() < 0.6) {
                    const lengthAlongBand = (seededRandom() - 0.5) * diagMax;
                    const distFromCenter = randomGauss() * (GALAXY_WIDTH / 2);
                    x = cx + Math.cos(GALAXY_BAND_ANGLE) * lengthAlongBand - Math.sin(GALAXY_BAND_ANGLE) * distFromCenter;
                    y = cy + Math.sin(GALAXY_BAND_ANGLE) * lengthAlongBand + Math.cos(GALAXY_BAND_ANGLE) * distFromCenter;
                    isBand = true;
                } else {
                    x = seededRandom() * width;
                    y = seededRandom() * height;
                }

                const sizeRand = seededRandom();
                let radius = 0.4;
                if (sizeRand > 0.8) radius = seededRandom() * 0.5 + 0.4;
                if (sizeRand > 0.98) radius = seededRandom() * 0.8 + 0.7;

                let color = "rgba(255, 255, 255, ";
                const colorRand = seededRandom();
                if (isBand && colorRand > 0.5) {
                    color = "rgba(255, 220, 180, ";
                } else if (!isBand && colorRand > 0.8) {
                    color = "rgba(180, 220, 255, ";
                }

                const alpha = seededRandom() > 0.7
                    ? seededRandom() * 0.5 + 0.3
                    : seededRandom() * 0.3 + 0.1;

                // Save star data for comets to pick from
                stars.push({ x, y, radius, color, alpha });

                // Draw to screen
                bgCtx.beginPath();
                bgCtx.arc(x, y, radius, 0, Math.PI * 2);
                bgCtx.fillStyle = `${color}${alpha})`;
                if (radius > 0.8) {
                    bgCtx.shadowBlur = Math.random() * 4 + 2;
                    bgCtx.shadowColor = `${color}${alpha})`;
                } else {
                    bgCtx.shadowBlur = 0;
                }
                bgCtx.fill();
            }
            bgCtx.shadowBlur = 0;
        };

        const renderForegroundAnimation = () => {
            fgCtx.clearRect(0, 0, fgCanvas.width, fgCanvas.height);
            time++;

            // Handle Comets
            // Gap of ~2 seconds (120 frames at 60fps)
            if (stars.length > 0 && time - lastCometSpawnTime > 120 && Math.random() < 0.05) {
                lastCometSpawnTime = time;
                const randomStar = stars[Math.floor(Math.random() * stars.length)];

                comets.push({
                    x: randomStar.x,
                    y: randomStar.y,
                    originX: randomStar.x,
                    originY: randomStar.y,
                    length: Math.random() * 150 + 80,
                    speed: Math.random() * 1.5 + 0.5, // VERY SLOW: 0.5 to 2.0 for majestic smooth glide
                    // Angle radiating somewhat towards bottom/left or top/right 
                    angle: Math.PI / 4 + (Math.random() * 1.5 - 0.75),
                    opacity: 1,
                    thickness: Math.random() * 1.5 + 1.5,
                    active: true,
                    state: "charging",
                    chargeTimer: 0,
                    maxChargeTime: Math.random() * 40 + 20
                });
            }

            comets.forEach((comet) => {
                if (!comet.active) return;

                if (comet.state === "charging") {
                    comet.chargeTimer++;
                    const progress = comet.chargeTimer / comet.maxChargeTime;

                    // Draw a brightening glowing star
                    fgCtx.beginPath();
                    fgCtx.arc(comet.originX, comet.originY, 1.5 + (progress * 2), 0, Math.PI * 2);
                    fgCtx.fillStyle = `rgba(180, 230, 255, ${progress})`;
                    fgCtx.shadowBlur = progress * 15;
                    fgCtx.shadowColor = "rgba(100, 200, 255, 1)";
                    fgCtx.fill();
                    fgCtx.shadowBlur = 0;

                    if (comet.chargeTimer >= comet.maxChargeTime) {
                        comet.state = "shooting";
                    }
                } else {
                    // Shooting state
                    const tailEndX = comet.x - Math.cos(comet.angle) * comet.length;
                    const tailEndY = comet.y - Math.sin(comet.angle) * comet.length;

                    // Draw the comet tail
                    const grad = fgCtx.createLinearGradient(comet.x, comet.y, tailEndX, tailEndY);
                    grad.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
                    grad.addColorStop(0.1, `rgba(150, 220, 255, ${comet.opacity * 0.8})`);
                    grad.addColorStop(1, "rgba(0, 170, 255, 0)");

                    fgCtx.beginPath();
                    fgCtx.moveTo(comet.x, comet.y);
                    fgCtx.lineTo(tailEndX, tailEndY);
                    fgCtx.strokeStyle = grad;
                    fgCtx.lineWidth = comet.thickness;
                    fgCtx.lineCap = "round";
                    fgCtx.globalCompositeOperation = "screen";
                    fgCtx.stroke();
                    fgCtx.globalCompositeOperation = "source-over";

                    // Update position
                    comet.x += Math.cos(comet.angle) * comet.speed;
                    comet.y += Math.sin(comet.angle) * comet.speed;

                    // Fade out slightly fast after it leaves the origin
                    comet.opacity *= 0.95;

                    if (comet.opacity < 0.05 ||
                        comet.x < -200 || comet.x > fgCanvas.width + 200 ||
                        comet.y < -200 || comet.y > fgCanvas.height + 200) {
                        comet.active = false;
                    }
                }
            });
            comets = comets.filter((c) => c.active);

            // Frequent 3 spaceships passing every 5 seconds (~300 frames)
            if (time - lastSatSpawnTime > 300) {
                lastSatSpawnTime = time;
                const isLeftToRight = Math.random() > 0.5;
                const baseY = Math.random() * (fgCanvas.height * 0.8);
                const baseAngle = isLeftToRight ? (0 + Math.random() * 0.1) : (Math.PI - Math.random() * 0.1);

                // Spawn 3 in a loose formation
                for (let i = 0; i < 3; i++) {
                    satellites.push({
                        x: isLeftToRight ? -10 - (i * 80) : fgCanvas.width + 10 + (i * 80),
                        y: baseY + (Math.random() * 60 - 30),
                        speed: Math.random() * 0.5 + 0.8, // Faster so they clear the screen
                        angle: baseAngle,
                        size: Math.random() * 0.6 + 0.6,
                        active: true,
                        blinkTimer: i * 20, // staggered blinking
                        blinkState: true,
                    });
                }
            }

            satellites.forEach((sat) => {
                if (!sat.active) return;
                sat.x += Math.cos(sat.angle) * sat.speed;
                sat.y += Math.sin(sat.angle) * sat.speed;

                sat.blinkTimer++;
                if (sat.blinkTimer > 60) {
                    sat.blinkTimer = 0;
                    sat.blinkState = !sat.blinkState;
                }

                // Base grey body
                fgCtx.beginPath();
                fgCtx.arc(sat.x, sat.y, sat.size, 0, Math.PI * 2);
                fgCtx.fillStyle = "rgba(200, 200, 200, 0.6)";
                fgCtx.fill();

                if (sat.blinkState) {
                    fgCtx.beginPath();
                    fgCtx.arc(sat.x, sat.y, sat.size * 2, 0, Math.PI * 2);
                    fgCtx.fillStyle = "rgba(255, 30, 30, 0.8)";
                    fgCtx.fill();
                }

                if (sat.x < -50 || sat.x > fgCanvas.width + 50 || sat.y < -50 || sat.y > fgCanvas.height + 50) {
                    sat.active = false;
                }
            });
            satellites = satellites.filter(s => s.active);

            animationFrameId = requestAnimationFrame(renderForegroundAnimation);
        };

        const setupCanvases = () => {
            // bg canvas is static
            renderBackgroundOnce();

            // fg canvas runs the animation loop
            fgCanvas.width = window.innerWidth;
            fgCanvas.height = window.innerHeight;
            comets = [];
            satellites = [];
        };

        setupCanvases();

        if (USE_ANIMATION) {
            renderForegroundAnimation();
        }

        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(setupCanvases, 400);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <>
            {/* Background Canvas: Renders exactly once, guaranteed 0% CPU impact during scroll */}
            <canvas
                ref={bgCanvasRef}
                className="fixed inset-0 pointer-events-none z-[-3]"
                aria-hidden="true"
            />
            {/* Foreground Canvas: Transparent, absolutely separated layer, hardware accelerated for only ~5-20 small moving objects */}
            <canvas
                ref={fgCanvasRef}
                className="fixed inset-0 pointer-events-none z-[-2]"
                aria-hidden="true"
            />
        </>
    );
}
