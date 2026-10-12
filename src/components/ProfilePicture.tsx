"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ProfilePicture() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics springs for smooth elastic reaction
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  // Map mouse coordinates to 3D rotation and translation
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Relative position normalized to range [-0.5, 0.5]
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center cursor-pointer select-none"
      style={{ perspective: 1000 }}
    >
      {/* Dynamic Glow Ring behind the image */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-highlight blur-xl opacity-40 animate-pulse-slow"
        style={{
          x: translateX,
          y: translateY,
          scale: isHovered ? 1.05 : 0.95,
          transition: "scale 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Floating orbital glow ring wrapper */}
      <motion.div
        className="absolute -inset-3 rounded-full border border-white/5 bg-white/2 backdrop-blur-md opacity-70"
        style={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1.0,
          boxShadow: isHovered 
            ? "0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(56,189,248,0.2)"
            : "0 10px 20px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.3s ease",
        }}
      />

      {/* Profile Image container */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 bg-bg-sec transform"
        style={{
          rotateX,
          rotateY,
          y: isHovered ? 0 : -8, // Default vertical float offset combined
        }}
        animate={isHovered ? {} : {
          // Floating idle loop
          y: [0, -12, 0],
        }}
        transition={isHovered ? {} : {
          y: {
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }
        }}
      >
        <Image
          src="/profile-v4.png"
          alt="G. Aravinth Profile Photo"
          fill
          priority
          sizes="(max-width: 768px) 256px, 320px"
          className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Soft radial reflection layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />
      </motion.div>
    </div>
  );
}
