import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";

// --- DATA CONSTANTS ---
const projects = [
  {
    title: "🎬 CinePhile — Social Movie Platform",
    desc: "A full-stack social movie discovery platform featuring collaborative watchlists, real-time chat, comments, movie search, and social interaction system inspired by modern entertainment platforms.",
    tech: [
      "React",
      "Redux",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Tailwind CSS",
    ],
    color: "from-cyan-400 to-blue-500", // Brightened gradients
  },
  {
    title: "🧠 RoBERTa Depression Detection",
    desc: "AI-powered depression detection system using NLP, transformers, and ensemble learning achieving 95.69% accuracy and 95.68% F1-score.",
    tech: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "HuggingFace",
      "Scikit-learn",
      "NLP",
    ],
    color: "from-fuchsia-400 to-purple-600", // Swapped to a higher-contrast vibrant violet
  },
  {
    title: "🏥 MedAppoint",
    desc: "Healthcare management platform with secure appointment scheduling, JWT authentication, doctor dashboards, and patient management.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    color: "from-emerald-400 to-teal-500", // Brightened
  },
  {
    title: "✍️ BlogSphere",
    desc: "Responsive blogging platform with multimedia support, rich text editing, and scalable backend CRUD APIs.",
    tech: ["React", "MongoDB", "Express", "Node.js"],
    color: "from-pink-400 to-rose-500", // Brightened
  },
];

const skills = [
  {
    title: "Frontend",
    emoji: "🌐",
    items: ["React", "Tailwind", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Backend",
    emoji: "⚙️",
    items: ["Node.js", "Express", "REST APIs", "JWT Auth"],
  },
  {
    title: "AI / GenAI",
    emoji: "🧠",
    items: ["LangChain", "RAG", "FAISS", "OpenAI", "HuggingFace"],
  },
  { title: "Database", emoji: "🗄️", items: ["MongoDB", "JSON", "Excel/CSV"] },
];

const achievements = [
  {
    text: "Appointed as Publicis Sapient Campus Ambassador for MNNIT Allahabad",
    icon: "📣",
  },
  { text: "Knight on LeetCode", icon: "⚔️" },
  { text: "CodeChef 4★ (1816 max rating)", icon: "⭐" },
  { text: "Codeforces Specialist (1405 max rating)", icon: "📊" },
  {
    text: "Earned a perfect 10.0 SPI during the 7th Academic Semester",
    icon: "👑",
  },
  {
    text: "Top 10 in Softathalon , a coding event held at MNNIT Allahabad",
    icon: "🎯",
  },
];

// --- INTERACTIVE SUB-COMPONENTS ---

function ParticleBackground() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-cyan-400/20 rounded-full" // Increased particle opacity slightly
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0vh", "-100vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function Card3D({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      // Changed base bg to a cleaner slate mix and brightened border slightly for definition
      className={`group relative bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/[0.08] p-8 overflow-hidden shadow-2xl shadow-black/50 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 211, 238, 0.2),
              transparent 80%
            )
          `, // Increased spotlight opacity to 0.2
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// --- MAIN APPLICATION ---
function App() {
  const [activeTab, setActiveTab] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Profile", href: "#profile" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Honors", href: "#honors" },
    { name: "Contact", href: "#contact" },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    // Changed base background to a cleaner pitch black to make colored elements contrast beautifully
    <div className="bg-[#02040a] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden antialiased scroll-smooth">
      {/* --- STICKY NAVIGATION BAR --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#02040a]/75 backdrop-blur-md border-b border-white/[0.06] px-6 md:px-20 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-fuchsia-500"
        >
          AM
        </a>

        <div className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] p-1 rounded-full backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-cyan-400 transition relative rounded-full"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* --- NAV BUTTONS --- */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://drive.google.com/file/d/1CQRgSSDW7ohNlryf98Om8z5rRZn2ndsk/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl border border-white/[0.15] text-slate-300 text-xs font-mono tracking-wider hover:bg-white/[0.04] hover:border-white/[0.3] hover:text-white transition"
          >
            📃 RESUME
          </a>
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono tracking-wider hover:bg-cyan-400/20 hover:border-cyan-400/60 transition shadow-lg shadow-cyan-500/5"
          >
            HIRE ME
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 text-slate-100 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`h-0.5 w-6 bg-current transform transition duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-current transform transition duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-[#02040a]/95 backdrop-blur-xl border-b border-white/10 py-6 flex flex-col items-center gap-4 z-40"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-mono uppercase tracking-wider text-slate-200 hover:text-cyan-400 transition"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center px-6 text-center relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/30 via-[#02040a] to-[#02040a] pt-20"
      >
        <ParticleBackground />

        {/* Heightened glow outputs for a more vibrant background pop */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[160px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 tracking-wider uppercase text-xs font-semibold mb-8 shadow-inner shadow-cyan-400/5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Open to Roles • 2026 Grad
          </span>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none text-white">
            Aryan
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-fuchsia-400 block md:inline ml-0 md:ml-4">
              Maurya
            </span>
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-slate-300 text-lg md:text-xl leading-relaxed font-light">
            Computer Science Undergrad at{" "}
            <span className="text-cyan-300 font-medium">MNNIT Allahabad</span>.
            Building intelligent systems blending robust AI architectures with
            Highly interactive web interfaces.
          </p>

          <div className="flex gap-4 justify-center mt-12 flex-wrap">
            <a
              href="#projects"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-bold hover:opacity-95 transition transform active:scale-95 shadow-xl shadow-cyan-500/20"
            >
              Explore Production Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white font-semibold hover:bg-white/[0.08] hover:border-white/[0.15] transition backdrop-blur-sm shadow-lg"
            >
              Get In Touch
            </a>
          </div>

          <div className="flex justify-center gap-6 mt-16">
            {[
              {
                icon: "🐙",
                url: "https://github.com/aryan-37",
                label: "GitHub",
              },
              {
                icon: "💼",
                url: "https://linkedin.com/in/aryan-maurya027",
                label: "LinkedIn",
              },
              {
                icon: "📧",
                url: "mailto:aryanamih041@gmail.com",
                label: "Email",
              },
            ].map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-xl hover:border-cyan-400/50 hover:bg-cyan-400/10 transition cursor-pointer shadow-md"
                title={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- ABOUT & EDUCATION BENTO --- */}
      <section
        id="profile"
        className="py-32 px-6 md:px-20 max-w-7xl mx-auto scroll-mt-20"
      >
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300"
        >
          Core Profile
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-6">
          <Card3D className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4 tracking-wide">
                Who Am I?
              </h3>
              <p className="text-slate-200 leading-relaxed text-lg font-light">
                I'm a software engineer specialized in bridging the gap between
                advanced machine learning methodologies and dynamic, performant
                full-stack deployment frameworks.
              </p>
              <p className="text-slate-300 leading-relaxed text-base font-light mt-4">
                My problem-solving style stems from heavy competitive
                programming backgrounds mixed with an appetite for practical,
                production-ready system architecture design.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex gap-6 text-sm text-slate-300">
              <div>📍 Allahabad, IN</div>
              <div className="text-cyan-300 font-medium">
                ⚡ Continuous Learner
              </div>
            </div>
          </Card3D>

          <Card3D className="md:col-span-2">
            <h3 className="text-xl font-bold text-fuchsia-400 mb-4 tracking-wide">
              Academic Base
            </h3>
            <h4 className="text-lg font-bold text-white">MNNIT Allahabad</h4>
            <p className="text-slate-300 text-sm mt-1">
              B.Tech in Computer Science & Engineering
            </p>

            <div className="my-6 bg-fuchsia-500/10 border border-fuchsia-500/30 inline-block px-4 py-2 rounded-2xl shadow-inner shadow-fuchsia-500/10">
              <span className="text-fuchsia-300 text-sm font-mono">
                Current CPI:
              </span>
              <span className="text-white font-black ml-2 text-xl tracking-tight">
                8.79
              </span>
            </div>

            <h5 className="font-semibold text-xs text-slate-200 uppercase tracking-widest mb-2">
              Core Foundations
            </h5>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Distributed Systems, Neural Networks, Machine Learning, Operating
              Systems, Computer Networks.
            </p>
          </Card3D>

          <Card3D className="md:col-span-5">
            <h3 className="text-2xl font-bold text-cyan-400 mb-8">
              Academic Journey
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {/* BTECH */}
              <div className="relative bg-slate-950/60 border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
                <div className="text-xs text-cyan-400 font-bold tracking-widest mb-3">
                  CURRENT
                </div>
                <h4 className="text-xl font-bold text-white">B.Tech — CSE</h4>
                <p className="text-slate-300 mt-1 text-sm">MNNIT Allahabad</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-slate-400 text-sm">CPI</span>
                  <span className="text-2xl font-black text-cyan-400">
                    8.79
                  </span>
                </div>
              </div>

              {/* INTERMEDIATE */}
              <div className="relative bg-slate-950/60 border border-fuchsia-500/20 rounded-2xl p-6 shadow-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-400 to-pink-500" />
                <div className="text-xs text-fuchsia-400 font-bold tracking-widest mb-3">
                  INTERMEDIATE
                </div>
                <h4 className="text-xl font-bold text-white">Class XII</h4>
                <p className="text-slate-300 mt-1 text-sm">Science Stream</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Performance</span>
                  <span className="text-2xl font-black text-fuchsia-400">
                    9.72
                  </span>
                </div>
              </div>

              {/* HIGH SCHOOL */}
              <div className="relative bg-slate-950/60 border border-pink-500/20 rounded-2xl p-6 shadow-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-rose-500" />
                <div className="text-xs text-pink-400 font-bold tracking-widest mb-3">
                  HIGH SCHOOL
                </div>
                <h4 className="text-xl font-bold text-white">Class X</h4>
                <p className="text-slate-300 mt-1 text-sm">
                  Secondary Education
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Performance</span>
                  <span className="text-2xl font-black text-pink-400">
                    9.56
                  </span>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* --- TIMELINE EXPERIENCE --- */}
      <section
        id="experience"
        className="py-32 px-6 md:px-20 bg-slate-950/40 border-y border-white/[0.02] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            {...fadeInUp}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-white"
          >
            Work Experience
          </motion.h2>

          <motion.div
            {...fadeInUp}
            className="relative border-l-2 border-cyan-500/30 pl-8 ml-4 max-w-4xl"
          >
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-cyan-950 shadow-md shadow-cyan-400/50" />

            <div className="flex flex-wrap justify-between items-baseline gap-2 mb-6">
              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  Publicis Sapient
                </h3>
                <p className="text-cyan-400 font-bold text-sm tracking-wide mt-0.5">
                  Software Development Engineer Intern
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-400/5 border border-cyan-400/20 text-cyan-300 text-xs font-mono">
                May 2025 - Jul 2025
              </span>
            </div>

            <ul className="space-y-4 text-slate-200 font-light text-base leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-2 shrink-0 block w-2 h-2 rounded-full shadow-glow" />
                <span>
                  Engineered an enterprise GenAI-powered conversational
                  analytics engine deployed for{" "}
                  <strong className="text-white font-semibold">
                    1,400+ internal merchants
                  </strong>{" "}
                  and analytical colleagues.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-2 shrink-0 block w-2 h-2 rounded-full" />
                <span>
                  Architected an optimized, low-latency RAG orchestration engine
                  using{" "}
                  <strong className="text-cyan-300 font-semibold">
                    LangChain
                  </strong>{" "}
                  and{" "}
                  <strong className="text-cyan-300 font-semibold">
                    FAISS vector stores
                  </strong>{" "}
                  mapping over 10K+ granular commercial transactions.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-2 shrink-0 block w-2 h-2 rounded-full" />
                <span>
                  Directly{" "}
                  <strong className="text-emerald-400 font-semibold">
                    mitigated manual tracking workflows by ~80%
                  </strong>{" "}
                  via contextual automated metrics charting.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-2 shrink-0 block w-2 h-2 rounded-full" />
                <span>
                  Implemented complex security logic containing modular session
                  tracking replays alongside fine-grained role-based access
                  tokens.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* --- INTERACTIVE SKILLS DISPLAY --- */}
      <section
        id="skills"
        className="py-32 px-6 md:px-20 max-w-7xl mx-auto scroll-mt-20"
      >
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-white"
        >
          Technical Arsenal
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Card3D key={index}>
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-2xl mb-6 shadow-inner">
                {skill.emoji}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white tracking-wide">
                {skill.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, i) => (
                  <span
                    key={i}
                    className="bg-slate-950/60 hover:bg-cyan-500/15 border border-white/[0.06] hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 transition px-3 py-1 rounded-xl text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* --- FEATURED PRODUCTION WORK --- */}
      <section
        id="projects"
        className="py-32 px-6 md:px-20 bg-slate-950/20 border-t border-white/[0.02] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Featured Engineering
              </h2>
              <p className="text-slate-300 mt-2 font-light">
                Realized software structures processing logic, queries, and
                state patterns.
              </p>
            </div>

            {/* Redesigned Tab filters with a deep background and bright active indicators */}
            <div className="flex bg-slate-950 border border-white/[0.08] p-1.5 rounded-xl backdrop-blur-sm self-start md:self-auto shadow-inner">
              {["all", "AI", "MERN"].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg capitalize transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20 scale-100"
                        : "text-slate-400 hover:text-slate-100"
                    }`}
                  >
                    {tab === "all" ? "All Works" : tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects
              .filter((p) => {
                if (activeTab === "all") return true;
                if (activeTab === "AI")
                  return p.tech.some((t) =>
                    ["Python", "PyTorch", "NLP", "HuggingFace"].includes(t),
                  );
                if (activeTab === "MERN")
                  return p.tech.some((t) =>
                    ["MongoDB", "Express", "React", "Node.js"].includes(t),
                  );
                return true;
              })
              .map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={index}
                >
                  <Card3D className="h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition duration-300">
                          {project.title}
                        </h3>
                        <span
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color} block shrink-0 mt-2.5 shadow-md`}
                        />
                      </div>
                      <p className="text-slate-200 leading-relaxed font-light text-base mb-8">
                        {project.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-slate-950 border border-white/[0.06] px-2.5 py-1 rounded-lg text-xs font-mono text-cyan-300/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card3D>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* --- METRIC / ACHIEVEMENTS BENTO --- */}
      <section
        id="honors"
        className="py-32 px-6 md:px-20 max-w-7xl mx-auto scroll-mt-20"
      >
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-white"
        >
          Honors & Competitive Standing
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(34, 211, 238, 0.4)",
                backgroundColor: "rgba(13, 21, 39, 0.6)",
              }}
              className="bg-slate-900/40 border border-white/[0.06] rounded-2xl p-6 flex gap-4 items-start transition-all duration-300 shadow-lg"
            >
              <div className="text-2xl bg-white/[0.04] w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.06]">
                {item.icon}
              </div>
              <p className="text-slate-200 font-medium leading-relaxed text-sm pt-1">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- PREMIUM MINIMAL CONTACT --- */}
      <section
        id="contact"
        className="py-32 px-6 md:px-20 max-w-4xl mx-auto text-center relative scroll-mt-20"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          {...fadeInUp}
          className="relative z-10 bg-gradient-to-b from-slate-900/80 to-slate-950/40 border border-white/[0.1] rounded-3xl p-12 backdrop-blur-md shadow-2xl shadow-black/80"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white tracking-tight">
            Let's Synthesize Something
          </h2>
          <p className="text-slate-300 font-light max-w-lg mx-auto mb-8 text-base">
            Looking for an elite AI Engineer, backend systems designer, or
            full-stack generalist? Let's talk metrics.
          </p>

          <a
            href="mailto:aryanamih041@gmail.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold px-8 py-4 rounded-xl hover:opacity-90 transition transform active:scale-95 shadow-xl shadow-cyan-500/10"
          >
            <span>Initiate Conversation</span>
            <span className="text-lg">→</span>
          </a>
        </motion.div>
      </section>

      {/* --- CLEAN FOOTER --- */}
      <footer className="py-12 border-t border-white/[0.05] text-center text-xs text-slate-500 font-mono tracking-wider">
        &copy; {new Date().getFullYear()} Aryan Maurya • Constructed via React &
        Framer Motion
      </footer>
    </div>
  );
}

export default App;
