"use client";

import React, { useRef, useState, MouseEvent } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function TiltCard({ children, className = "", glowColor = "rgba(37, 99, 235, 0.15)" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Mouse coordinates relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y });

    // Tilt calculations
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation in degrees
    const maxRotate = 8; 
    
    const rotX = -((y - centerY) / centerY) * maxRotate;
    const rotY = ((x - centerX) / centerX) * maxRotate;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`relative rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl shadow-2xl overflow-hidden glass-panel-hover interactive-card ${className}`}
    >
      {/* Spotlight mouse light glow layer */}
      {isHovered && (
        <div
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-60 transition-opacity"
          style={{
            left: spotlightPos.x,
            top: spotlightPos.y,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      )}
      
      {/* Glow Border overlay */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-brand-primary/20" 
      />

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
