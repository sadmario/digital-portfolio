"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavLink {
  id: string;
  label: string;
}

const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "hackathons", label: "Hackathons" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 1. Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 2. Track active section using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Focus on viewport center
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // offset for navbar height
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-40 px-6 max-w-6xl mx-auto pointer-events-none"
      >
        <div className="w-full glass-panel h-16 rounded-full flex items-center justify-between px-6 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-auto relative">
          
          {/* Logo Brand Link */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-highlight flex items-center justify-center font-display font-black text-sm text-white shadow-lg shadow-brand-primary/20 transform group-hover:rotate-12 transition-transform duration-300">
              GA
            </div>
            <span className="font-display font-bold tracking-widest text-sm text-white group-hover:text-brand-secondary transition-colors uppercase">
              ARAVINTH
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="relative px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors duration-200"
              >
                {/* Active back pill */}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/5 shadow-inner"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                
                <span className={activeSection === link.id ? "text-white relative z-10 font-semibold" : "text-text-sec hover:text-white relative z-10"}>
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Contact CTA Button (Desktop) */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="px-5 py-2 rounded-full bg-brand-primary text-xs font-semibold tracking-wider text-white uppercase hover:bg-brand-highlight shadow-lg hover:shadow-brand-highlight/25 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Menu Toggle Burger Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(15px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 w-full h-full bg-[#060B16]/80 z-30 lg:hidden flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`text-2xl font-display font-semibold tracking-wider uppercase ${
                    activeSection === link.id
                      ? "text-brand-secondary border-l-4 border-brand-primary pl-4"
                      : "text-text-sec hover:text-white border-l-4 border-transparent pl-4"
                  } transition-all`}
                >
                  {link.label}
                </motion.a>
              ))}
              
              <motion.a
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-highlight text-center font-display font-bold text-sm tracking-wider uppercase text-white shadow-xl shadow-brand-primary/20"
              >
                Hire Me
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
