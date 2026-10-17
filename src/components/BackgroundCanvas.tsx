"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    // 1. Mouse Follower for Spotlight Effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // 2. Scroll Parallax Offset
    const handleScroll = () => {
      setScrollOffset(window.scrollY * 0.15); // Adjust multiplier for intensity
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      alphaSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        // Curated HSL colors matching secondary and highlight accents
        const colors = ["220, 90%, 60%", "195, 85%, 65%", "260, 80%, 70%"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.4 + 0.1;
        this.alphaSpeed = Math.random() * 0.005 + 0.002;
      }

      update(mX: number, mY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Loop boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Interactive mouse repulsion
        const dx = mX - this.x;
        const dy = mY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }

        // Pulse alpha
        this.alpha += this.alphaSpeed;
        if (this.alpha > 0.6 || this.alpha < 0.1) {
          this.alphaSpeed = -this.alphaSpeed;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `hsla(${this.color}, ${this.alpha})`;
        c.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(80, Math.floor((width * height) / 25000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update(mousePos.x, mousePos.y);
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mousePos]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-20 overflow-hidden bg-bg-main pointer-events-none select-none"
    >
      {/* 0. High-Tech Digital Mind Coding Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-40 filter brightness-95 contrast-110"
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
        {/* Soft cyber overlay to ensure content readability */}
        <div className="absolute inset-0 bg-[#060B16]/45" />
      </div>

      {/* 1. Slow drifting background Grid Mesh */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translateY(${scrollOffset * 0.3}px)`,
        }}
      />

      {/* 2. Interactive Spotlight Mouse Light */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-35 blur-[120px] transition-transform duration-200 ease-out"
        style={{
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(124,58,237,0.06) 50%, transparent 100%)",
        }}
      />

      {/* 3. Deep background Aurora mesh gradient - Slow rotations */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] opacity-[0.22] blur-[150px] animate-aurora"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 50% 40%, rgba(56, 189, 248, 0.35) 0%, transparent 50%)
          `,
          backgroundSize: "200% 200%",
          transform: `translateY(${scrollOffset * 0.5}px)`,
        }}
      />

      {/* 4. Canvas element for particle flow rendering */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 5. Radial darkening vignette */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060B16]/25 to-[#060B16]/85"
      />
    </div>
  );
}
