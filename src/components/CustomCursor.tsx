"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hoverType, setHoverType] = useState<"default" | "pointer" | "card" | "magnetic" | "text">("default");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on mobile/touch screens
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const closestLink = target.closest("a, button, [role='button']");
      const closestCard = target.closest(".glass-panel-hover, .interactive-card");
      const closestMagnetic = target.closest(".magnetic-item");
      const closestText = target.closest("h1, h2, .large-title");

      if (closestMagnetic) {
        setHoverType("magnetic");
      } else if (closestLink) {
        setHoverType("pointer");
      } else if (closestCard) {
        setHoverType("card");
      } else if (closestText) {
        setHoverType("text");
      } else {
        setHoverType("default");
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  const getCursorVariants = () => {
    switch (hoverType) {
      case "pointer":
        return {
          width: 50,
          height: 50,
          backgroundColor: "rgba(37, 99, 235, 0.15)",
          borderColor: "#38BDF8",
          borderWidth: "1.5px",
        };
      case "magnetic":
        return {
          width: 70,
          height: 70,
          backgroundColor: "rgba(124, 58, 237, 0.1)",
          borderColor: "#7C3AED",
          borderWidth: "2px",
        };
      case "card":
        return {
          width: 80,
          height: 80,
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          borderColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "1px",
        };
      case "text":
        return {
          width: 100,
          height: 100,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: "1px",
          mixBlendMode: "difference" as any,
        };
      default:
        return {
          width: 32,
          height: 32,
          backgroundColor: "rgba(37, 99, 235, 0.02)",
          borderColor: "rgba(255, 255, 255, 0.3)",
          borderWidth: "1.5px",
        };
    }
  };

  return (
    <>
      {/* Spring animated outer trail ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={getCursorVariants()}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      >
        {/* Soft center spotlight glow inside the cursor trail */}
        {hoverType === "magnetic" && (
          <span className="w-2 h-2 rounded-full bg-brand-highlight animate-ping" />
        )}
      </motion.div>

      {/* Immediate center core dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none w-1.5 h-1.5 bg-white rounded-full z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hoverType !== "default" ? 1.5 : 1,
          backgroundColor: hoverType === "magnetic" ? "#7C3AED" : hoverType === "pointer" ? "#38BDF8" : "#FFFFFF"
        }}
      />
    </>
  );
}
