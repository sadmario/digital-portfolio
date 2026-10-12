"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Network, 
  Shield, 
  Binary, 
  Layers, 
  Brain, 
  ArrowUpRight, 
  Copy, 
  Download, 
  Mail, 
  Phone, 
  ExternalLink, 
  Award, 
  FileText, 
  Calendar, 
  GraduationCap, 
  Check, 
  Briefcase, 
  Zap,
  ChevronUp
} from "lucide-react";

// Dynamically import client-only heavy WebGL components to prevent SSR errors
const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const BackgroundCanvas = dynamic(() => import("@/components/BackgroundCanvas"), { ssr: false });
const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });
const ProfilePicture = dynamic(() => import("@/components/ProfilePicture"), { ssr: false });
const TiltCard = dynamic(() => import("@/components/TiltCard"), { ssr: false });
const CountUp = dynamic(() => import("@/components/CountUp"), { ssr: false });
const TypingText = dynamic(() => import("@/components/TypingText"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

// Scroll Reveal wrapper for clean cinematic entrances
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // References for Timeline scroll bar
  const [timelineElement, setTimelineElement] = useState<HTMLDivElement | null>(null);
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineElement ? { current: timelineElement } : undefined,
    offset: ["start center", "end center"],
  });
  const timelineLineScaleY = useSpring(timelineScrollProgress, { stiffness: 100, damping: 30 });

  // References for Experience Timeline scroll bar
  const [expElement, setExpElement] = useState<HTMLDivElement | null>(null);
  const { scrollYProgress: expScrollProgress } = useScroll({
    target: expElement ? { current: expElement } : undefined,
    offset: ["start center", "end center"],
  });
  const expLineScaleY = useSpring(expScrollProgress, { stiffness: 100, damping: 30 });

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("aravinthg543@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formSubject || !formMessage) return;

    // Trigger local client success response and fire confetti if imported
    setFormSuccess(true);
    import("canvas-confetti").then((module) => {
      module.default({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2563EB", "#38BDF8", "#7C3AED"],
      });
    });

    // Formulate structured mailto payload
    const emailBody = `Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`;
    const mailtoUrl = `mailto:aravinthg543@gmail.com?subject=${encodeURIComponent(formSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open in user default client
    window.location.href = mailtoUrl;

    // Clear inputs after brief delay
    setTimeout(() => {
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
      setFormSuccess(false);
    }, 3000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      <SmoothScroll>
        <div className="relative min-h-screen">
          <BackgroundCanvas />
          <CustomCursor />
          
          <Navbar />

          {/* 1. HERO SECTION */}
          <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12 relative px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
              
              {/* Left Column: Greeting & Info */}
              <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/8 text-xs font-semibold tracking-wider text-brand-secondary uppercase mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-secondary animate-ping" />
                  Engineering Portfoliio
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-none text-white uppercase"
                >
                  Hello, I'm <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brand-primary glow-text">G. Aravinth</span>
                </motion.h1>

                {/* Subtitle with typing text loop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-4 text-lg md:text-xl font-medium tracking-wide flex flex-wrap gap-2 text-text-sec"
                >
                  <span>Specializing in:</span>
                  <TypingText
                    texts={[
                      "Embedded Systems Engineering",
                      "Hardware-Software Integration",
                      "Computer Network Architectures",
                      "Innovative Problem Solving",
                      "IoT Research & Development"
                    ]}
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 text-sm md:text-base leading-relaxed text-text-sec max-w-lg font-light"
                >
                  An innovative systems engineer focused on bridging hardware boundaries with code. 
                  Leveraging expertise in microcontrollers, sensory integration, and networking protocols 
                  to design tomorrow's smart infrastructure.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto"
                >
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="magnetic-item group px-7 py-3.5 rounded-full bg-brand-primary font-display font-bold text-xs tracking-wider uppercase text-white shadow-xl shadow-brand-primary/20 hover:bg-brand-highlight hover:shadow-brand-highlight/25 transition-all duration-300 flex items-center gap-2"
                  >
                    View Projects
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <a
                    href="/resume.png"
                    download="G_Aravinth_Resume.png"
                    className="magnetic-item px-7 py-3.5 rounded-full bg-white/5 border border-white/10 font-display font-bold text-xs tracking-wider uppercase text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    Download Resume
                    <Download size={14} />
                  </a>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="magnetic-item px-7 py-3.5 rounded-full border border-brand-primary/30 text-brand-secondary bg-brand-primary/5 hover:bg-brand-primary/10 font-display font-bold text-xs tracking-wider uppercase transition-colors"
                  >
                    Contact Me
                  </button>
                </motion.div>
              </div>

              {/* Right Column: 3D Interactive Core or Photo Float */}
              <div className="lg:col-span-5 h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center relative w-full">
                
                {/* 3D WebGL Mesh Canvas */}
                <div className="absolute inset-0 z-0">
                  <ThreeCanvas />
                </div>

                {/* Overlaid Float avatar */}
                <div className="relative z-10">
                  <ProfilePicture />
                </div>
              </div>
            </div>
          </section>

          {/* 2. ABOUT SECTION */}
          <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative">
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Visual Glass Portrait */}
                <div className="lg:col-span-5 flex justify-center">
                  <TiltCard className="p-2 aspect-[4/5] max-w-sm w-full bg-gradient-to-tr from-white/3 to-white/1">
                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5 bg-slate-950">
                      <Image
                        src="/profile-v4.png"
                        alt="G. Aravinth Professional Profile"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 384px"
                        className="object-cover object-top opacity-90"
                      />
                      {/* Dark gradient mapping overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060B16] via-transparent to-transparent" />
                      
                      {/* Interactive visual badge */}
                      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/10">
                        <h4 className="text-xs font-display font-black tracking-widest text-white uppercase">G. ARAVINTH</h4>
                        <p className="text-[10px] text-brand-secondary tracking-widest uppercase mt-1">Embedded Systems Developer</p>
                      </div>
                    </div>
                  </TiltCard>
                </div>

                {/* Objective details */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">
                  <div className="flex items-center gap-2 text-xs font-display font-bold tracking-widest text-brand-primary uppercase mb-3">
                    <Zap size={12} />
                    Career Objective
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight leading-none mb-6">
                    Engineering Smart Solutions At The <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-highlight glow-text-primary">Hardware-Software Intersection</span>
                  </h2>
                  <p className="text-base text-text-sec font-light leading-relaxed mb-6">
                    To build a progressive career in the technology sector where I can leverage my expertise in 
                    embedded systems, microcontrollers, and hardware-software integration. I aim to design and 
                    implement highly efficient, innovative engineering solutions while continuously expanding my 
                    technical knowledge and contributing to impactful, real-world development initiatives.
                  </p>
                  
                  {/* Key values */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
                    <div className="p-4 rounded-xl bg-white/3 border border-white/5 flex gap-3 items-start">
                      <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary mt-0.5">
                        <Cpu size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Hardware Integration</h4>
                        <p className="text-xs text-text-sec mt-1">Proficient in microcontrollers, sensor nodes, and real-time processing loop logic.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/3 border border-white/5 flex gap-3 items-start">
                      <div className="p-2 rounded-lg bg-brand-highlight/10 text-brand-highlight mt-0.5">
                        <Network size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Cyber & Networking</h4>
                        <p className="text-xs text-text-sec mt-1">Strong foundation in network architectures, routing protocols, and cyber security.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* 3. EDUCATION SECTION */}
          <section id="education" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center gap-2 text-xs font-display font-bold tracking-widest text-brand-primary uppercase mb-3">
                  <GraduationCap size={14} />
                  Academic Pathway
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">Education Timeline</h2>
                <p className="text-xs text-text-sec mt-2 uppercase tracking-widest">A foundation of academic rigor and hardware engineering</p>
              </div>
            </ScrollReveal>

            {/* Vertical Scroll Timeline */}
            <div ref={setTimelineElement} className="relative w-full flex flex-col items-center pl-4 md:pl-0">
              
              {/* Central glowing timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 pointer-events-none" />
              
              {/* Dynamic filled line tracking scroll */}
              <motion.div
                style={{ scaleY: timelineLineScaleY }}
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-highlight origin-top -translate-x-1/2 pointer-events-none shadow-[0_0_15px_rgba(56,189,248,0.5)]"
              />

              {/* Timeline Entry 1: B.E. */}
              <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
                <div className="md:col-span-5 md:text-right hidden md:block mt-2">
                  <span className="text-sm font-display font-black text-brand-secondary tracking-widest">2024 — 2027</span>
                  <p className="text-xs text-text-sec mt-1">In Progress</p>
                </div>
                
                {/* Node indicator */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-bg-main border-2 border-brand-secondary -translate-x-1/2 mt-3 z-10 shadow-[0_0_8px_rgba(56,189,248,0.4)]" />

                <div className="col-span-1 md:col-span-7 pl-8 md:pl-10">
                  <ScrollReveal>
                    <TiltCard className="p-6 bg-slate-900/50" glowColor="rgba(56,189,248,0.15)">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-xs font-display font-bold text-brand-secondary uppercase md:hidden tracking-wider block mb-1">2024 — 2027</span>
                          <h3 className="text-lg font-bold text-white uppercase tracking-tight">Bachelor of Engineering (B.E.)</h3>
                          <p className="text-sm text-brand-secondary font-semibold mt-1">Computer Science Engineering</p>
                          <p className="text-xs text-text-sec mt-1">Knowledge Institute of Technology, Salem</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black tracking-wider uppercase shrink-0">
                          CGPA 6.04
                        </div>
                      </div>
                      <p className="text-xs text-text-sec mt-4 leading-relaxed font-light">
                        Focused on computer hardware design architectures, network topologies, cyber frameworks, and software programming. 
                        Actively developing IoT models and participating in intercollegiate technical symposiums and hackathons.
                      </p>
                    </TiltCard>
                  </ScrollReveal>
                </div>
              </div>

              {/* Timeline Entry 2: Diploma */}
              <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5 md:text-right hidden md:block mt-2">
                  <span className="text-sm font-display font-black text-brand-highlight tracking-widest">2021 — 2023</span>
                  <p className="text-xs text-text-sec mt-1">Completed</p>
                </div>
                
                {/* Node indicator */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-bg-main border-2 border-brand-highlight -translate-x-1/2 mt-3 z-10 shadow-[0_0_8px_rgba(124,58,237,0.4)]" />

                <div className="col-span-1 md:col-span-7 pl-8 md:pl-10">
                  <ScrollReveal>
                    <TiltCard className="p-6 bg-slate-900/50" glowColor="rgba(124,58,237,0.15)">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-xs font-display font-bold text-brand-highlight uppercase md:hidden tracking-wider block mb-1">2021 — 2023</span>
                          <h3 className="text-lg font-bold text-white uppercase tracking-tight">Diploma in Engineering</h3>
                          <p className="text-sm text-brand-highlight font-semibold mt-1">Technical & Hardware Foundations</p>
                          <p className="text-xs text-text-sec mt-1">Thiagarajar Polytechnic College, Salem</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-brand-highlight/10 border border-brand-highlight/20 text-brand-highlight text-xs font-black tracking-wider uppercase shrink-0">
                          CGPA 9.4
                        </div>
                      </div>
                      <p className="text-xs text-text-sec mt-4 leading-relaxed font-light">
                        Acquired strong fundamentals in electronics, microprocessors, digital circuitry design, and low-level hardware interfaces. 
                        Graduated at the top of class with a high CGPA of 9.4.
                      </p>
                    </TiltCard>
                  </ScrollReveal>
                </div>
              </div>

            </div>
          </section>

          {/* 4. TECHNICAL SKILLS */}
          <section id="skills" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center gap-2 text-xs font-display font-bold tracking-widest text-brand-primary uppercase mb-3">
                  <Cpu size={14} />
                  Tech Stack Core
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">Technical Skills</h2>
                <p className="text-xs text-text-sec mt-2 uppercase tracking-widest">Expertise spanning hardware architectures and data logic</p>
              </div>
            </ScrollReveal>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Programming */}
              <ScrollReveal>
                <TiltCard className="p-6 h-full flex flex-col bg-slate-900/40 border-white/5" glowColor="rgba(37,99,235,0.12)">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                      <Binary size={20} />
                    </div>
                    <h3 className="font-display font-bold text-sm tracking-widest uppercase text-white">Programming</h3>
                  </div>
                  <p className="text-xs text-text-sec font-light mb-6 flex-grow">
                    Strong capabilities writing structured, compile-efficient code for software and system control logic.
                  </p>
                  <div className="space-y-4">
                    {[
                      { name: "C & C++", percent: 85, color: "bg-brand-primary" },
                      { name: "Python", percent: 75, color: "bg-brand-secondary" },
                      { name: "Java (Basic)", percent: 50, color: "bg-brand-highlight" }
                    ].map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-white">{s.name}</span>
                          <span className="text-text-sec">{s.percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${s.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </ScrollReveal>

              {/* Embedded Systems */}
              <ScrollReveal>
                <TiltCard className="p-6 h-full flex flex-col bg-slate-900/40 border-white/5" glowColor="rgba(56,189,248,0.12)">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary">
                      <Cpu size={20} />
                    </div>
                    <h3 className="font-display font-bold text-sm tracking-widest uppercase text-white">Embedded Systems</h3>
                  </div>
                  <p className="text-xs text-text-sec font-light mb-6 flex-grow">
                    Design and programming of physical firmware controllers, and electrical circuit integrations.
                  </p>
                  <div className="space-y-4">
                    {[
                      { name: "Firmware Programming", percent: 80, color: "bg-brand-secondary" },
                      { name: "Hardware Prototyping", percent: 75, color: "bg-brand-primary" },
                      { name: "Sensor Calibration", percent: 85, color: "bg-brand-highlight" }
                    ].map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-white">{s.name}</span>
                          <span className="text-text-sec">{s.percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${s.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </ScrollReveal>

              {/* Microcontrollers */}
              <ScrollReveal>
                <TiltCard className="p-6 h-full flex flex-col bg-slate-900/40 border-white/5" glowColor="rgba(124,58,237,0.12)">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-brand-highlight/10 border border-brand-highlight/20 text-brand-highlight">
                      <Layers size={20} />
                    </div>
                    <h3 className="font-display font-bold text-sm tracking-widest uppercase text-white">Microcontrollers</h3>
                  </div>
                  <p className="text-xs text-text-sec font-light mb-6 flex-grow">
                    Extensive experience flashing and writing code for diverse integrated hardware controller systems.
                  </p>
                  <div className="space-y-4">
                    {[
                      { name: "ESP32 & NodeMCU", percent: 80, color: "bg-brand-highlight" },
                      { name: "Arduino Systems", percent: 85, color: "bg-brand-primary" },
                      { name: "Intel 8085 / 8086", percent: 65, color: "bg-brand-secondary" }
                    ].map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-white">{s.name}</span>
                          <span className="text-text-sec">{s.percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${s.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </ScrollReveal>

              {/* Networking */}
              <ScrollReveal>
                <TiltCard className="p-6 h-full flex flex-col bg-slate-900/40 border-white/5" glowColor="rgba(37,99,235,0.12)">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                      <Network size={20} />
                    </div>
                    <h3 className="font-display font-bold text-sm tracking-widest uppercase text-white">Networking</h3>
                  </div>
                  <p className="text-xs text-text-sec font-light mb-6 flex-grow">
                    Understanding of packet configurations, structural layers, routing pathways, and network setups.
                  </p>
                  <div className="space-y-4">
                    {[
                      { name: "TCP/IP & OSI Architecture", percent: 85, color: "bg-brand-primary" },
                      { name: "Router & Switch Configs", percent: 70, color: "bg-brand-secondary" },
                      { name: "IoT Gateway Protocols", percent: 80, color: "bg-brand-highlight" }
                    ].map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-white">{s.name}</span>
                          <span className="text-text-sec">{s.percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${s.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </ScrollReveal>

              {/* Cybersecurity */}
              <ScrollReveal>
                <TiltCard className="p-6 h-full flex flex-col bg-slate-900/40 border-white/5" glowColor="rgba(56,189,248,0.12)">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary">
                      <Shield size={20} />
                    </div>
                    <h3 className="font-display font-bold text-sm tracking-widest uppercase text-white">Cybersecurity</h3>
                  </div>
                  <p className="text-xs text-text-sec font-light mb-6 flex-grow">
                    Comprehensive understanding of vulnerability identification and digital environment protection.
                  </p>
                  <div className="space-y-4">
                    {[
                      { name: "Network Auditing", percent: 70, color: "bg-brand-secondary" },
                      { name: "Fundamentals & Standards", percent: 80, color: "bg-brand-primary" },
                      { name: "Device Access Control", percent: 75, color: "bg-brand-highlight" }
                    ].map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-white">{s.name}</span>
                          <span className="text-text-sec">{s.percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${s.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </ScrollReveal>

              {/* Machine Learning */}
              <ScrollReveal>
                <TiltCard className="p-6 h-full flex flex-col bg-slate-900/40 border-white/5" glowColor="rgba(124,58,237,0.12)">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-brand-highlight/10 border border-brand-highlight/20 text-brand-highlight">
                      <Brain size={20} />
                    </div>
                    <h3 className="font-display font-bold text-sm tracking-widest uppercase text-white">Machine Learning</h3>
                  </div>
                  <p className="text-xs text-text-sec font-light mb-6 flex-grow">
                    Core skills in data preprocessing, classification architectures, and algorithm optimization.
                  </p>
                  <div className="space-y-4">
                    {[
                      { name: "Data Preprocessing", percent: 75, color: "bg-brand-highlight" },
                      { name: "Data Science concepts", percent: 70, color: "bg-brand-primary" },
                      { name: "Pattern Classification", percent: 65, color: "bg-brand-secondary" }
                    ].map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-white">{s.name}</span>
                          <span className="text-text-sec">{s.percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${s.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </ScrollReveal>

            </div>
          </section>

          {/* 5. PROJECTS SECTION */}
          <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center gap-2 text-xs font-display font-bold tracking-widest text-brand-primary uppercase mb-3">
                  <Award size={14} />
                  Engineered Hardware
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">Key Projects</h2>
                <p className="text-xs text-text-sec mt-2 uppercase tracking-widest">Real-time automation and IoT systems developed from the ground up</p>
              </div>
            </ScrollReveal>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Project 1: Pet Detection */}
              <ScrollReveal>
                <TiltCard className="p-8 bg-slate-900/30 flex flex-col h-full border-white/5" glowColor="rgba(56,189,248,0.15)">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-display font-black tracking-widest text-brand-secondary bg-brand-secondary/10 px-3 py-1 rounded-full uppercase">
                      Sensor Automation
                    </span>
                    <Cpu size={20} className="text-brand-secondary" />
                  </div>

                  <h3 className="text-2xl font-bold uppercase text-white mb-3">Smart Pet Detection System</h3>
                  <p className="text-xs text-text-sec font-light leading-relaxed mb-6 flex-grow">
                    Designed and engineered an automated sensor-based device for home automation. 
                    The system monitors domestic pet movements and issues real-time alerts. It uses sensor nodes connected to microcontrollers 
                    to log activity signatures, automating notifications to keep caretakers continuously updated.
                  </p>

                  <div className="mb-6">
                    <h4 className="text-[10px] font-display font-bold text-white uppercase tracking-widest mb-3">Key Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Microcontrollers", "Ultrasonic & PIR Sensors", "Embedded C++", "Signal Trigger Alerts", "Automation Logic"].map((t) => (
                        <span key={t} className="text-[10px] bg-white/5 border border-white/8 text-slate-300 px-3 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-brand-secondary font-semibold uppercase tracking-widest flex items-center gap-1.5">
                      <Zap size={10} className="animate-pulse" />
                      Status: Fully Functional Prototype
                    </span>
                  </div>
                </TiltCard>
              </ScrollReveal>

              {/* Project 2: Sleep Monitoring */}
              <ScrollReveal>
                <TiltCard className="p-8 bg-slate-900/30 flex flex-col h-full border-white/5" glowColor="rgba(124,58,237,0.15)">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-display font-black tracking-widest text-brand-highlight bg-brand-highlight/10 px-3 py-1 rounded-full uppercase">
                      IoT Bio-Telemetry
                    </span>
                    <Layers size={20} className="text-brand-highlight" />
                  </div>

                  <h3 className="text-2xl font-bold uppercase text-white mb-3">IoT Sleep Monitoring Device</h3>
                  <p className="text-xs text-text-sec font-light leading-relaxed mb-6 flex-grow">
                    Developed a wearable hardware setup coupled with cloud telemetry to capture, process, and analyze human sleep cycles. 
                    Integrating accelerometers and biosensors, the microcontroller parses movement patterns, piping diagnostics to a visual web 
                    dashboard. This research-validated project maps directly to my published research paper on sleep disorder warnings.
                  </p>

                  <div className="mb-6">
                    <h4 className="text-[10px] font-display font-bold text-white uppercase tracking-widest mb-3">Key Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {["ESP32 Controller", "IMU Sensors", "IoT Web Dashboard", "Telemetry Calibration", "Power Optimization"].map((t) => (
                        <span key={t} className="text-[10px] bg-white/5 border border-white/8 text-slate-300 px-3 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-brand-highlight font-semibold uppercase tracking-widest flex items-center gap-1.5">
                      <Zap size={10} className="animate-pulse" />
                      Status: Validated & Published
                    </span>
                  </div>
                </TiltCard>
              </ScrollReveal>

            </div>
          </section>

          {/* 6. RESEARCH SECTION */}
          <section id="research" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center gap-2 text-xs font-display font-bold tracking-widest text-brand-primary uppercase mb-3">
                  <FileText size={14} />
                  Scientific Contributions
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">Research & Publications</h2>
                <p className="text-xs text-text-sec mt-2 uppercase tracking-widest">Translating engineering prototypes into scientific breakthroughs</p>
              </div>
            </ScrollReveal>

            {/* Publication spotlight card */}
            <ScrollReveal>
              <TiltCard className="p-8 md:p-10 bg-[#0F172A]/40 border-brand-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]" glowColor="rgba(37,99,235,0.25)">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  
                  {/* Left Side: Document Icon / Art */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 relative">
                    <FileText size={32} />
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-secondary animate-ping opacity-60" />
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-secondary flex items-center justify-center text-[8px] font-black text-white font-display">1</div>
                  </div>

                  {/* Right Side: Paper contents */}
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-[10px] font-display font-bold tracking-widest bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3 py-1 rounded-full uppercase">
                        Published Research Paper
                      </span>
                      <span className="text-xs text-text-sec flex items-center gap-1.5">
                        <Calendar size={12} />
                        2025
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-4 hover:text-brand-secondary transition-colors leading-tight">
                      Sleep Sentrix: An IoT-Based Smart Ankle Band for Sleepwalking Detection
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-text-sec font-light leading-relaxed mb-6">
                      Co-designed and co-authored a peer-reviewed research paper introducing a smart medical-alert IoT ankle band. 
                      The wearable captures nocturnal physical tremors and movement anomalies, employing sensor aggregation algorithms to differentiate 
                      typical sleep shifts from sleepwalking episodes. Telemetry data is dispatched to trigger instant warnings on caretaker devices, 
                      providing active home security and minimizing injury risks for patients.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-3.5 rounded-lg bg-white/3 border border-white/5">
                        <h4 className="text-[10px] font-display font-bold text-white uppercase tracking-widest">Research Focus</h4>
                        <p className="text-xs text-text-sec mt-1">Gait anomaly analysis, micro-sensor telemetry, and real-time medical alert routing.</p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-white/3 border border-white/5">
                        <h4 className="text-[10px] font-display font-bold text-white uppercase tracking-widest">Impact</h4>
                        <p className="text-xs text-text-sec mt-1">Engineered a low-cost diagnostic aid and tracking model for neurological care units.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleCopyEmail}
                        className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/8 text-xs font-semibold text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                      >
                        Request Copy
                        <Mail size={12} />
                      </button>
                      <span className="text-xs text-text-sec">
                        Published in collaboration with KIT researchers.
                      </span>
                    </div>

                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </section>

          {/* 7. EXPERIENCE SECTION */}
          <section id="experience" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center gap-2 text-xs font-display font-bold tracking-widest text-brand-primary uppercase mb-3">
                  <Briefcase size={14} />
                  Professional History
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">Work Experience</h2>
                <p className="text-xs text-text-sec mt-2 uppercase tracking-widest">Practical internships combining code development and data intelligence</p>
              </div>
            </ScrollReveal>

            {/* Work timeline container */}
            <div ref={setExpElement} className="relative w-full flex flex-col items-center pl-4 md:pl-0">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 pointer-events-none" />
              
              <motion.div
                style={{ scaleY: expLineScaleY }}
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-secondary via-brand-primary to-brand-highlight origin-top -translate-x-1/2 pointer-events-none shadow-[0_0_12px_rgba(56,189,248,0.3)]"
              />

              {/* Experience 1: TechSonix */}
              <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
                <div className="md:col-span-5 md:text-right hidden md:block mt-2">
                  <span className="text-sm font-display font-black text-brand-secondary tracking-widest">MID 2024</span>
                  <p className="text-xs text-text-sec mt-1">Web Development Intern</p>
                </div>
                
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-bg-main border-2 border-brand-secondary -translate-x-1/2 mt-3 z-10 shadow-[0_0_8px_rgba(56,189,248,0.4)]" />

                <div className="col-span-1 md:col-span-7 pl-8 md:pl-10">
                  <ScrollReveal>
                    <TiltCard className="p-6 bg-slate-900/50" glowColor="rgba(56,189,248,0.15)">
                      <span className="text-xs font-display font-bold text-brand-secondary uppercase md:hidden tracking-wider block mb-1">MID 2024</span>
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight">Web Development Intern</h3>
                      <p className="text-sm text-brand-secondary font-semibold mt-1">TechSonix Solutions</p>
                      
                      <ul className="text-xs text-text-sec mt-4 space-y-2.5 leading-relaxed font-light">
                        <li className="flex gap-2">
                          <Check size={12} className="text-brand-secondary shrink-0 mt-0.5" />
                          <span>Engineered responsive web layout infrastructures using modern frameworks, maximizing responsiveness.</span>
                        </li>
                        <li className="flex gap-2">
                          <Check size={12} className="text-brand-secondary shrink-0 mt-0.5" />
                          <span>Collaborated with developers to wire and debug client-side interfaces and optimize rendering speed.</span>
                        </li>
                        <li className="flex gap-2">
                          <Check size={12} className="text-brand-secondary shrink-0 mt-0.5" />
                          <span>Enhanced accessibility scores and maintained UI styling alignment across multiple screen breakpoints.</span>
                        </li>
                      </ul>
                    </TiltCard>
                  </ScrollReveal>
                </div>
              </div>

              {/* Experience 2: AI/ML */}
              <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5 md:text-right hidden md:block mt-2">
                  <span className="text-sm font-display font-black text-brand-highlight tracking-widest">LATE 2023</span>
                  <p className="text-xs text-text-sec mt-1">Data Science Intern</p>
                </div>
                
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-bg-main border-2 border-brand-highlight -translate-x-1/2 mt-3 z-10 shadow-[0_0_8px_rgba(124,58,237,0.4)]" />

                <div className="col-span-1 md:col-span-7 pl-8 md:pl-10">
                  <ScrollReveal>
                    <TiltCard className="p-6 bg-slate-900/50" glowColor="rgba(124,58,237,0.15)">
                      <span className="text-xs font-display font-bold text-brand-highlight uppercase md:hidden tracking-wider block mb-1">LATE 2023</span>
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight">AI/ML & Data Science Intern</h3>
                      <p className="text-sm text-brand-highlight font-semibold mt-1">Research & Analytics Division</p>
                      
                      <ul className="text-xs text-text-sec mt-4 space-y-2.5 leading-relaxed font-light">
                        <li className="flex gap-2">
                          <Check size={12} className="text-brand-highlight shrink-0 mt-0.5" />
                          <span>Developed data structures for cleaning, prepping, and categorizing large dataset tables.</span>
                        </li>
                        <li className="flex gap-2">
                          <Check size={12} className="text-brand-highlight shrink-0 mt-0.5" />
                          <span>Configured basic predictive classification networks to identify patterns inside sensor values.</span>
                        </li>
                        <li className="flex gap-2">
                          <Check size={12} className="text-brand-highlight shrink-0 mt-0.5" />
                          <span>Strengthened data processing paradigms, setting core workflows that supported my later IoT research projects.</span>
                        </li>
                      </ul>
                    </TiltCard>
                  </ScrollReveal>
                </div>
              </div>

            </div>
          </section>

          {/* 8. HACKATHONS */}
          <section id="hackathons" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center gap-2 text-xs font-display font-bold tracking-widest text-brand-primary uppercase mb-3">
                  <Zap size={14} />
                  Rapid Prototyping
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">Hackathons</h2>
                <p className="text-xs text-text-sec mt-2 uppercase tracking-widest">Designing real-world, functional hardware devices under tight deadlines</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Highlight Hackathon: VCET HackElite */}
              <div className="lg:col-span-8">
                <ScrollReveal>
                  <TiltCard className="p-8 bg-slate-900/40 h-full flex flex-col justify-between border-brand-primary/20" glowColor="rgba(37,99,235,0.15)">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <span className="text-[10px] font-display font-black tracking-widest bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3 py-1 rounded-full uppercase">
                          VCET HackElite 2k25
                        </span>
                        <span className="text-xs text-text-sec font-mono font-medium">Velammal College of Engineering</span>
                      </div>

                      <h3 className="text-2xl font-bold uppercase text-white mb-4">Real-Time IoT Prototype Build</h3>
                      <p className="text-xs sm:text-sm text-text-sec leading-relaxed font-light mb-6">
                        Designed, coded, and demonstrated a real-time hardware prototype system during the 24-hour sprint. 
                        Wired sensor arrays, configured microcontroller loop states, and set up basic serial communication paths 
                        to display live telemetry diagnostics to a review panel of industry judges.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/5">
                      <div className="p-3 rounded-lg bg-white/3 border border-white/5">
                        <span className="text-[9px] font-display font-bold text-text-sec uppercase tracking-widest">Duration</span>
                        <p className="text-sm font-semibold text-white mt-1">24 Hours Sprint</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/3 border border-white/5">
                        <span className="text-[9px] font-display font-bold text-text-sec uppercase tracking-widest">Category</span>
                        <p className="text-sm font-semibold text-white mt-1">IoT & Embedded Systems</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/3 border border-white/5">
                        <span className="text-[9px] font-display font-bold text-text-sec uppercase tracking-widest">Prototype Scope</span>
                        <p className="text-sm font-semibold text-white mt-1">Active IoT Alert Node</p>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              </div>

              {/* Hackathon Stats Panel */}
              <div className="lg:col-span-4">
                <ScrollReveal>
                  <TiltCard className="p-8 bg-slate-900/40 h-full flex flex-col justify-between border-white/5" glowColor="rgba(124,58,237,0.15)">
                    <div>
                      <h3 className="font-display font-bold text-xs tracking-widest uppercase text-white mb-6">Hackathon Statistics</h3>
                      
                      <div className="space-y-6">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-display font-black text-xl shrink-0">
                            3+
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-white">Hackathons Participated</h4>
                            <p className="text-[10px] text-text-sec mt-0.5">Creating IoT and automation systems under tight timeframes.</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary font-display font-black text-xl shrink-0">
                            100%
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-white">Working Prototypes</h4>
                            <p className="text-[10px] text-text-sec mt-0.5">All sprint deadlines met with fully functional hardware demonstrations.</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-brand-highlight/10 border border-brand-highlight/20 flex items-center justify-center text-brand-highlight font-display font-black text-xl shrink-0">
                            3
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-white">Review Panels</h4>
                            <p className="text-[10px] text-text-sec mt-0.5">Successfully pitched and demonstrated embedded logic to industry expert panels.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 text-[10px] text-text-sec font-mono">
                      * Actively participating in national hackathons to test system concepts.
                    </div>
                  </TiltCard>
                </ScrollReveal>
              </div>

            </div>
          </section>

          {/* 9. ACHIEVEMENTS & METRICS COUNTERS */}
          <section className="py-16 px-6 bg-[#0F172A]/30 border-y border-white/5 relative">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
              
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-primary tracking-tight glow-text-primary">
                  <CountUp end={3} suffix="+" />
                </div>
                <p className="text-[10px] sm:text-xs text-text-sec font-display font-bold uppercase tracking-widest mt-2">
                  Hackathons Competed
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-secondary tracking-tight">
                  <CountUp end={4} suffix="+" />
                </div>
                <p className="text-[10px] sm:text-xs text-text-sec font-display font-bold uppercase tracking-widest mt-2">
                  Engineered Systems
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-highlight tracking-tight">
                  <CountUp end={2} />
                </div>
                <p className="text-[10px] sm:text-xs text-text-sec font-display font-bold uppercase tracking-widest mt-2">
                  Completed Internships
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
                  <CountUp end={1} />
                </div>
                <p className="text-[10px] sm:text-xs text-text-sec font-display font-bold uppercase tracking-widest mt-2">
                  Published Paper
                </p>
              </div>

            </div>
          </section>

          {/* 10. CONTACT SECTION */}
          <section id="contact" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center gap-2 text-xs font-display font-bold tracking-widest text-brand-primary uppercase mb-3">
                  <Mail size={14} />
                  Connect With Me
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">Get In Touch</h2>
                <p className="text-xs text-text-sec mt-2 uppercase tracking-widest">Send a direct message or copy email credentials</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Column: Direct contact info */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <ScrollReveal>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-white mb-2">Let's build something epic</h3>
                    <p className="text-xs text-text-sec font-light leading-relaxed">
                      I am always open to discussing new engineering projects, internships, research collaboration opportunities, 
                      or hardware integrations. Reach out directly using my contacts.
                    </p>

                    <div className="space-y-4 pt-4">
                      
                      {/* Phone */}
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/5">
                        <div className="w-10 h-10 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary flex items-center justify-center shrink-0">
                          <Phone size={18} />
                        </div>
                        <div>
                          <span className="text-[9px] font-display font-bold text-text-sec uppercase tracking-widest block">Phone</span>
                          <a href="tel:+919500607705" className="text-sm font-semibold text-white hover:text-brand-secondary transition-colors">
                            +91 9500607705
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/5 relative group">
                        <div className="w-10 h-10 rounded-lg bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary flex items-center justify-center shrink-0">
                          <Mail size={18} />
                        </div>
                        <div className="flex-grow">
                          <span className="text-[9px] font-display font-bold text-text-sec uppercase tracking-widest block">Email</span>
                          <a href="mailto:aravinthg543@gmail.com" className="text-sm font-semibold text-white hover:text-brand-secondary transition-colors">
                            aravinthg543@gmail.com
                          </a>
                        </div>
                        <button
                          onClick={handleCopyEmail}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors shrink-0 flex items-center gap-1.5"
                          title="Copy Email"
                        >
                          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                          <span className="text-[9px] font-display font-bold uppercase tracking-wider">{copied ? "Copied" : "Copy"}</span>
                        </button>
                      </div>

                      {/* LinkedIn */}
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/5">
                        <div className="w-10 h-10 rounded-lg bg-brand-highlight/10 border border-brand-highlight/20 text-brand-highlight flex items-center justify-center shrink-0">
                          <ExternalLink size={18} />
                        </div>
                        <div className="flex-grow">
                          <span className="text-[9px] font-display font-bold text-text-sec uppercase tracking-widest block">LinkedIn</span>
                          <a
                            href="https://linkedin.com/in/aravinth-g-b0354132b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-white hover:text-brand-secondary transition-colors flex items-center gap-1 w-fit"
                          >
                            aravinth-g-b0354132b
                            <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Resume download helper */}
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a
                      href="/resume.png"
                      download="G_Aravinth_Resume.png"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand-primary text-xs font-semibold text-white hover:bg-brand-highlight shadow-lg hover:shadow-brand-highlight/20 transition-all uppercase tracking-wider font-display"
                    >
                      Download Resume File
                      <Download size={14} />
                    </a>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Contact form */}
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <TiltCard className="p-6 sm:p-8 bg-slate-900/40 border-white/5" glowColor="rgba(37,99,235,0.12)">
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      
                      <div>
                        <label htmlFor="name" className="text-[9px] font-display font-bold text-text-sec uppercase tracking-widest block mb-1.5">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/8 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary focus:bg-white/5 transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="text-[9px] font-display font-bold text-text-sec uppercase tracking-widest block mb-1.5">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/8 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary focus:bg-white/5 transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="text-[9px] font-display font-bold text-text-sec uppercase tracking-widest block mb-1.5">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          required
                          value={formSubject}
                          onChange={(e) => setFormSubject(e.target.value)}
                          placeholder="Project Inquiry / Job Opportunity"
                          className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/8 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary focus:bg-white/5 transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="text-[9px] font-display font-bold text-text-sec uppercase tracking-widest block mb-1.5">
                          Message Body
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="Describe your project requirements or position..."
                          className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/8 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary focus:bg-white/5 transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formSuccess}
                        className={`w-full py-4 rounded-lg font-display font-bold text-xs tracking-wider uppercase text-white shadow-lg transition-all duration-300 ${
                          formSuccess
                            ? "bg-green-600 shadow-green-600/10 cursor-default"
                            : "bg-brand-primary hover:bg-brand-highlight shadow-brand-primary/10 hover:shadow-brand-highlight/20 cursor-pointer"
                        }`}
                      >
                        {formSuccess ? "Opening Email Client..." : "Send Email"}
                      </button>
                    </form>
                  </TiltCard>
                </ScrollReveal>
              </div>

            </div>
          </section>

          {/* 11. FOOTER */}
          <footer className="pt-16 pb-12 px-6 border-t border-white/5 relative">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Branding and Copy */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-brand-primary to-brand-highlight flex items-center justify-center font-display font-black text-xs text-white">
                    GA
                  </div>
                  <span className="font-display font-bold tracking-widest text-xs text-white uppercase">
                    ARAVINTH
                  </span>
                </div>
                <p className="text-[10px] text-text-sec tracking-widest uppercase mt-3">
                  © 2026 G. Aravinth. All Rights Reserved.
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap justify-center gap-6 text-xs text-text-sec">
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }} className="hover:text-white transition-colors uppercase tracking-wider">About</a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }} className="hover:text-white transition-colors uppercase tracking-wider">Projects</a>
                <a href="#research" onClick={(e) => { e.preventDefault(); scrollToSection("research"); }} className="hover:text-white transition-colors uppercase tracking-wider">Publications</a>
                <a
                  href="https://linkedin.com/in/aravinth-g-b0354132b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1"
                >
                  LinkedIn
                  <ArrowUpRight size={10} />
                </a>
              </div>
            </div>
          </footer>

          {/* Floating Back To Top button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-6 right-6 p-3 rounded-full bg-brand-primary/80 hover:bg-brand-primary border border-white/10 text-white z-40 transition-colors shadow-lg cursor-pointer"
                title="Scroll To Top"
              >
                <ChevronUp size={20} />
              </motion.button>
            )}
          </AnimatePresence>

        </div>
      </SmoothScroll>
    </>
  );
}
