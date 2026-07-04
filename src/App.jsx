import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// --- DATA SCHEMA ---
const TRANSACTIONS_DATA = {
  profile: {
    name: "Aryan Maurya",
    tags: ["Software Engineer", "AI Systems", "LLM Engineering"],
    metrics: [
      { label: "Projects", value: 6 },
      { label: "AI Models", value: 4 },
      { label: "Enterprise Users", value: "1400+" },
      { label: "Transactions", value: "10K+" },
      { label: "Accuracy", value: "95.69%" },
    ],
  },
  skills: [
    { name: "AI/LLM", level: 85, techs: ["LangChain", "RAG Systems", "FAISS", "HuggingFace", "OpenRouter", "NLP"] },
    { name: "Backend", level: 88, techs: ["Node.js", "Express", "Python", "REST APIs"] },
    { name: "Frontend", level: 90, techs: ["React", "Redux", "Tailwind CSS", "Framer Motion"] },
    { name: "Machine Learning", level: 87, techs: ["Scikit-learn", "Pandas", "NumPy", "Data Preprocessing"] },
    { name: "Deep Learning", level: 82, techs: ["PyTorch", "TensorFlow", "Neural Networks", "Model Optimization"] },
  ],
  experience: [
    {
      company: "Publicis Sapient",
      role: "Software Development Engineer Intern",
      period: "May 2025 - Jul 2025",
      status: "Completed Successfully",
      features: ["RAG", "LangChain", "FAISS", "Analytics" , "Plotly"],
      impacts: [
        "Built an enterprise-grade GenAI analytics platform enabling 1,400+ internal merchants to query transaction data using natural language.",
        "Developed a Retrieval-Augmented Generation pipeline with LangChain, FAISS vector search and LLM orchestration for fast contextual financial insights.",
        "Implemented automated merchant analytics dashboards using Plotly, reducing manual reporting effort by nearly 80%.",
        "Integrated secure authentication, session management and role-based access controls while optimizing response latency for production deployment.",
      ],
    },
  ],
  projects: [
    {
      title: "Financial Advisory AI Copilot",
      category: "AI",
      problem: "Large transaction datasets were difficult to analyze and interpret for business insights.",
      solution: "Built RAG Pipeline → Retrieved Context → Generated Insights → Visualized KPIs",
      tech: ["Python", "LangChain", "FAISS", "OpenRouter", "Streamlit", "Plotly", "MongoDB", "JWT"],
      impact: { users: "1400+", transactions: "10K+", reduction: "80%" },
    },
    {
      title: "CinePhile — Social Movie Platform",
      category: "Systems",
      desc: "A full-stack social movie discovery platform featuring collaborative watchlists, real-time chat, comments, movie search, and social interaction system inspired by modern entertainment platforms.",
      tech: ["React", "Redux", "Node.js", "Express", "MongoDB", "Socket.IO", "Tailwind CSS"],
    },
    {
      title: "RoBERTa Depression Detection",
      category: "AI",
      desc: "AI-powered depression detection system using NLP, transformers, and ensemble learning achieving 95.69% accuracy and 95.68% F1-score.",
      tech: ["Python", "PyTorch", "TensorFlow", "HuggingFace", "Scikit-learn", "NLP"],
    },
    {
      title: "MedAppoint",
      category: "Systems",
      desc: "Healthcare management platform with secure appointment scheduling, JWT authentication, doctor dashboards, and patient management.",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    },
    {
      title: "BlogSphere",
      category: "Systems",
      desc: "Responsive blogging platform with multimedia support, rich text editing, and scalable backend CRUD APIs.",
      tech: ["React", "MongoDB", "Express", "Node.js"],
    },
  ],
  timeline: [
    { year: "2023", event: "Initial Commit (BlogSphere)" },
    { year: "2024", event: "Engineered MedAppoint - Healthcare Management Platform" },
    { year: "2024", event: "Added CinePhile - Social Movie Platform" },
    { year: "2025", event: "Published DSA Solutions Repository | 250+ Data Structure and Algorithm Implementations" },
    { year: "2025", event: "Interned at Publicis Sapient | Financial AI Assistant" },
    { year: "2026", event: "Depression Detection | Graduation" },
  ],
  education: [
    {
      level: "CURRENT",
      degree: "B.Tech — CSE",
      institution: "MNNIT Allahabad",
      performance: "8.79 CPI",
      details: ["DBMS", "OOPS", "Machine Learning", "Operating Systems","Data Structures"],
    },
    {
      level: "INTERMEDIATE",
      degree: "Class XII",
      institution: "Science Stream",
      performance: "9.72",
      details: [],
    },
    {
      level: "HIGH SCHOOL",
      degree: "Class X",
      institution: "Secondary Education",
      performance: "9.56",
      details: [],
    },
  ],
};

// --- THEME CONFIGURATIONS ---
const themes = {
  
  monokai: {
    bg: "#272822",
    card: "#3e3d32",
    text: "#f8f8f2",
    muted: "#75715e",
    primary: "#a6e22e",
    secondary: "#66d9ef",
    success: "#a6e22e",
    border: "rgba(166, 226, 46, 0.3)",
    grid: "rgba(166, 226, 46, 0.05)",
  },
  dark: {
    bg: "#020617",
    card: "#0f172a",
    text: "#ffffff",
    muted: "#94a3b8",
    primary: "#6366F1",
    secondary: "#22d3ee",
    success: "#10b981",
    border: "rgba(99, 102, 241, 0.3)",
    grid: "rgba(99, 102, 241, 0.05)",
  },
  light: {
    bg: "#ffffff",
    card: "#f8fafc",
    text: "#0f172a",
    muted: "#64748b",
    primary: "#6366F1",
    secondary: "#0891b2",
    success: "#059669",
    border: "rgba(99, 102, 241, 0.2)",
    grid: "rgba(99, 102, 241, 0.03)",
  },
};

// --- COMPONENTS ---

function ThemeToggle({ currentTheme, onThemeChange }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {Object.keys(themes).map((theme) => (
        <button
          key={theme}
          onClick={() => onThemeChange(theme)}
          className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 font-mono text-xs ${
            currentTheme === theme
              ? "scale-110 font-bold"
              : "opacity-70 hover:opacity-100 hover:scale-105"
          }`}
          style={{
            backgroundColor: themes[theme].card,
            borderColor: currentTheme === theme ? themes[theme].primary : themes[theme].border,
            color: themes[theme].text,
          }}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
}

function BootSequence({ onComplete, theme }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("initializing");

  useEffect(() => {
    const phases = ["initializing", "loading", "complete"];
    let currentPhase = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase(phases[2]);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center font-mono"
      style={{ backgroundColor: themes[theme].bg }}
    >
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm tracking-widest"
          style={{ color: themes[theme].secondary }}
        >
          INITIALIZING AI ENGINEER...
        </motion.div>
        <div className="w-80 h-2 rounded-full overflow-hidden" style={{ backgroundColor: themes[theme].card }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
            className="h-full"
            style={{
              background: `linear-gradient(to right, ${themes[theme].primary}, ${themes[theme].secondary})`,
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs"
          style={{ color: themes[theme].muted }}
        >
          {progress}% COMPLETE
        </motion.div>
      </div>
    </motion.div>
  );
}

function SystemDashboard({ theme }) {
  const [cpuLoad, setCpuLoad] = useState(92);
  const [animatedMetrics, setAnimatedMetrics] = useState({ projects: 0, aiModels: 0, users: 0, transactions: 0, accuracy: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 5) + 95);
    }, 2000);

    const targetMetrics = {
      projects: 6,
      aiModels: 4,
      users: 1400,
      transactions: 10000,
      accuracy: 95.69,
    };

    Object.keys(targetMetrics).forEach((key) => {
      let current = 0;
      const step = targetMetrics[key] / 50;
      const metricInterval = setInterval(() => {
        current += step;
        if (current >= targetMetrics[key]) {
          current = targetMetrics[key];
          clearInterval(metricInterval);
        }
        setAnimatedMetrics((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }, 30);
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 lg:px-24 py-16 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: themes[theme].success }} />
        <h2 className="font-mono text-xs tracking-widest uppercase" style={{ color: themes[theme].secondary }}>
          SYSTEM HEALTH
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CPU Load */}
        <div className="rounded-xl p-6 backdrop-blur-sm" style={{ backgroundColor: themes[theme].card, border: `1px solid ${themes[theme].border}` }}>
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-xs uppercase" style={{ color: themes[theme].muted }}>CPU Load</span>
            <span className="font-mono text-xl font-bold" style={{ color: themes[theme].primary }}>{cpuLoad}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: themes[theme].bg }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${cpuLoad}%` }}
              className="h-full"
              style={{
                background: `linear-gradient(to right, ${themes[theme].primary}, ${themes[theme].secondary})`,
              }}
            />
          </div>
        </div>

        {/* Metrics */}
        {TRANSACTIONS_DATA.profile.metrics.map((metric, idx) => (
          <div
            key={idx}
            className="rounded-xl p-6 backdrop-blur-sm"
            style={{ backgroundColor: themes[theme].card, border: `1px solid ${themes[theme].border}` }}
          >
            <div className="font-mono text-xs uppercase mb-2" style={{ color: themes[theme].muted }}>{metric.label}</div>
            <div className="text-2xl font-bold" style={{ color: themes[theme].text }}>
              {metric.label === "Enterprise Users" && animatedMetrics.users > 0
                ? `${animatedMetrics.users}+`
                : metric.label === "Transactions" && animatedMetrics.transactions > 0
                ? `${(animatedMetrics.transactions / 1000).toFixed(0)}K+`
                : metric.label === "Accuracy" && animatedMetrics.accuracy > 0
                ? `${animatedMetrics.accuracy.toFixed(2)}%`
                : metric.label === "Projects" && animatedMetrics.projects > 0
                ? animatedMetrics.projects
                : metric.label === "AI Models" && animatedMetrics.aiModels > 0
                ? animatedMetrics.aiModels
                : metric.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ArchitectureDiagram({ theme }) {
  const nodes = [
    "USER",
    "Natural Language",
    "LangChain",
    "Semantic Retrieval",
    "FAISS Vector DB",
    "Financial Dataset",
    "Groq API",
    "Merchant Insights",
    "Role-Based Access",
  ];

  return (
    <section className="px-6 lg:px-24 py-16 max-w-7xl mx-auto" style={{ borderTop: `1px solid ${themes[theme].border}` }}>
      <h2 className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: themes[theme].secondary }}>
        FLAGSHIP AI SYSTEM ARCHITECTURE
      </h2>

      <div className="rounded-xl p-8 backdrop-blur-sm overflow-x-auto" style={{ backgroundColor: themes[theme].card, border: `1px solid ${themes[theme].border}` }}>
        <div className="flex items-center gap-4 min-w-max">
          {nodes.map((node, idx) => (
            <div key={idx} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-lg px-4 py-3 font-mono text-xs whitespace-nowrap"
                style={{
                  backgroundColor: themes[theme].bg,
                  border: `1px solid ${themes[theme].border}`,
                  color: themes[theme].secondary,
                }}
              >
                {node}
              </motion.div>
              {idx < nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.1 }}
                  className="w-8 h-0.5"
                  style={{
                    background: `linear-gradient(to right, ${themes[theme].primary}, ${themes[theme].secondary})`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlagshipProject({ theme }) {
  const project = TRANSACTIONS_DATA.projects[0];

  return (
    <section className="px-6 lg:px-24 py-16 max-w-7xl mx-auto" style={{ borderTop: `1px solid ${themes[theme].border}` }}>
      <h2 className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: themes[theme].secondary }}>
        FEATURED PROJECT CASE STUDY
      </h2>

      <div className="rounded-xl p-8 backdrop-blur-sm" style={{ backgroundColor: themes[theme].card, border: `1px solid ${themes[theme].border}` }}>
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-2" style={{ color: themes[theme].text }}>{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="font-mono text-xs px-2 py-1 rounded"
                style={{
                  color: themes[theme].secondary,
                  backgroundColor: themes[theme].bg,
                  border: `1px solid ${themes[theme].border}`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-lg p-4" style={{ backgroundColor: themes[theme].bg, border: `1px solid ${themes[theme].border}` }}>
            <div className="font-mono text-xs uppercase mb-2" style={{ color: themes[theme].muted }}>Problem</div>
            <div className="text-sm" style={{ color: themes[theme].text }}>{project.problem}</div>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: themes[theme].bg, border: `1px solid ${themes[theme].border}` }}>
            <div className="font-mono text-xs uppercase mb-2" style={{ color: themes[theme].muted }}>Solution</div>
            <div className="text-sm" style={{ color: themes[theme].text }}>{project.solution}</div>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: themes[theme].bg, border: `1px solid ${themes[theme].success}` }}>
            <div className="font-mono text-xs uppercase mb-2" style={{ color: themes[theme].success }}>Impact</div>
            <div className="space-y-1 text-sm" style={{ color: themes[theme].text }}>
              <div>👥 {project.impact.users} Enterprise Users</div>
              <div>📊 {project.impact.transactions} Transactions</div>
              <div>⚡ {project.impact.reduction} Manual Work Reduced</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Terminal({ theme }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    { type: "system", text: "ARYAN OS v2.0 - AI Engineer Terminal" },
    { type: "system", text: "Type 'help' for available commands" },
  ]);
  const terminalRef = useRef(null);

  const commands = {
    help: "Available commands: about, projects, skills, contact, experience",
    about: "ARYAN MAURYA - Full-Stack Engineer & AI Specialist | MNNIT Allahabad | Building intelligent systems that bridge AI innovation with production-grade engineering.",
    projects: TRANSACTIONS_DATA.projects.map(p => `• ${p.title} [${p.category}]`).join('\n'),
    skills: TRANSACTIONS_DATA.skills.map(s => `• ${s.name}: ${s.level}% [${s.techs.join(', ')}]`).join('\n'),
    // resume: "Resume: https://drive.google.com/file/d/1CQRgSSDW7ohNlryf98Om8z5rRZn2ndsk/view?usp=sharing",
    contact: "Email: aryanamih041@gmail.com | GitHub: https://github.com/ExoticLure37 | Linkedin: https://www.linkedin.com/in/aryan-maurya027/",
    experience: TRANSACTIONS_DATA.experience.map(e => `• ${e.company} - ${e.role} (${e.period})`).join('\n'),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.toLowerCase().trim();
    const response = commands[command] || `Command not found: ${command}. Type 'help' for available commands.`;

    setOutput([...output, { type: "input", text: `aryan@portfolio:~$ ${input}` }, { type: "output", text: response }]);
    setInput("");

    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <section className="px-6 lg:px-24 py-16 max-w-7xl mx-auto" style={{ borderTop: `1px solid ${themes[theme].border}` }}>
      <h2 className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: themes[theme].secondary }}>
        INTERACTIVE TERMINAL
      </h2>

      <div className="rounded-xl overflow-hidden backdrop-blur-sm" style={{ backgroundColor: themes[theme].card, border: `1px solid ${themes[theme].border}` }}>
        <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: themes[theme].bg, borderBottom: `1px solid ${themes[theme].border}` }}>
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="font-mono text-xs ml-2" style={{ color: themes[theme].muted }}>aryan@portfolio:~</span>
        </div>
        <div
          ref={terminalRef}
          className="p-4 h-64 overflow-y-auto font-mono text-sm space-y-2"
        >
          {output.map((line, idx) => (
            <div
              key={idx}
              style={{
                color: line.type === "system"
                  ? themes[theme].secondary
                  : line.type === "input"
                  ? themes[theme].text
                  : themes[theme].muted,
              }}
              className={line.type === "output" ? "whitespace-pre-wrap" : ""}
            >
              {line.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-4" style={{ borderTop: `1px solid ${themes[theme].border}` }}>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm" style={{ color: themes[theme].secondary }}>aryan@portfolio:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-mono text-sm"
              style={{ color: themes[theme].text }}
              placeholder="Type a command..."
              autoComplete="off"
            />
          </div>
        </form>
      </div>
    </section>
  );
}

function SkillBars({ theme }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="px-6 lg:px-24 py-16 max-w-7xl mx-auto" style={{ borderTop: `1px solid ${themes[theme].border}` }} ref={ref}>
      <h2 className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: themes[theme].secondary }}>
        TECHNICAL CAPABILITIES
      </h2>

      <div className="space-y-6">
        {TRANSACTIONS_DATA.skills.map((skill, idx) => (
          <div key={idx} className="rounded-xl p-6 backdrop-blur-sm" style={{ backgroundColor: themes[theme].card, border: `1px solid ${themes[theme].border}` }}>
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-sm" style={{ color: themes[theme].text }}>{skill.name}</span>
              <span className="font-mono text-xs" style={{ color: themes[theme].secondary }}>{skill.level}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden mb-3" style={{ backgroundColor: themes[theme].bg }}>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                className="h-full"
                style={{
                  background: `linear-gradient(to right, ${themes[theme].primary}, ${themes[theme].secondary})`,
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.techs.map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="font-mono text-xs px-2 py-1 rounded"
                  style={{
                    color: themes[theme].muted,
                    backgroundColor: themes[theme].bg,
                    border: `1px solid ${themes[theme].border}`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GitTimeline({ theme }) {
  return (
    <section className="px-6 lg:px-24 py-16 max-w-7xl mx-auto" style={{ borderTop: `1px solid ${themes[theme].border}` }}>
      <h2 className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: themes[theme].secondary }}>
        CAREER TIMELINE
      </h2>

      <div className="rounded-xl p-8 backdrop-blur-sm font-mono" style={{ backgroundColor: themes[theme].card, border: `1px solid ${themes[theme].border}` }}>
        {TRANSACTIONS_DATA.timeline.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 mb-4 last:mb-0">
            <div className="text-sm whitespace-nowrap" style={{ color: themes[theme].secondary }}>{item.year}</div>
            <div className="flex-1 pl-4 pb-4" style={{ borderLeft: `2px solid ${themes[theme].border}` }}>
              <div className="text-sm" style={{ color: themes[theme].text }}>{item.event}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MissionLog({ theme }) {
  const exp = TRANSACTIONS_DATA.experience[0];

  return (
    <section className="px-6 lg:px-24 py-16 max-w-7xl mx-auto" style={{ borderTop: `1px solid ${themes[theme].border}` }}>
      <h2 className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: themes[theme].secondary }}>
        MISSION LOG
      </h2>

      <div className="rounded-xl p-8 backdrop-blur-sm" style={{ backgroundColor: themes[theme].card, border: `1px solid ${themes[theme].border}` }}>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themes[theme].success }} />
          <span className="font-mono text-xs" style={{ color: themes[theme].success }}>Deploying... [SUCCESS]</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <div className="font-mono text-xs" style={{ color: themes[theme].muted }}>Company:</div>
            <div style={{ color: themes[theme].text }}>{exp.company}</div>
          </div>
          <div className="space-y-2">
            <div className="font-mono text-xs" style={{ color: themes[theme].muted }}>Role:</div>
            <div style={{ color: themes[theme].text }}>{exp.role}</div>
          </div>
          <div className="space-y-2">
            <div className="font-mono text-xs" style={{ color: themes[theme].muted }}>Duration:</div>
            <div style={{ color: themes[theme].text }}>{exp.period}</div>
          </div>
          <div className="space-y-2">
            <div className="font-mono text-xs" style={{ color: themes[theme].muted }}>Status:</div>
            <div style={{ color: themes[theme].success }}>{exp.status}</div>
          </div>
        </div>

        <div className="pt-6" style={{ borderTop: `1px solid ${themes[theme].border}` }}>
          <div className="font-mono text-xs mb-3" style={{ color: themes[theme].muted }}>Production Features:</div>
          <div className="flex flex-wrap gap-2">
            {exp.features.map((feature, idx) => (
              <span
                key={idx}
                className="font-mono text-xs px-2 py-1 rounded"
                style={{
                  color: themes[theme].secondary,
                  backgroundColor: themes[theme].bg,
                  border: `1px solid ${themes[theme].border}`,
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionControl({ theme }) {
  return (
    <section className="px-6 lg:px-24 py-16 max-w-7xl mx-auto" style={{ borderTop: `1px solid ${themes[theme].border}` }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: themes[theme].success }} />
          <h2 className="font-mono text-xs tracking-widest uppercase" style={{ color: themes[theme].success }}>
            MISSION STATUS: AVAILABLE
          </h2>
        </div>
        <p className="text-lg" style={{ color: themes[theme].text }}>For Software/AI/Backend Engineer roles</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="mailto:aryanamih041@gmail.com"
          className="font-semibold text-sm px-6 py-3 rounded-lg font-mono tracking-tight transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: themes[theme].primary,
            color: themes[theme].bg,
          }}
        >
          LAUNCH EMAIL
        </a>
        {/* <a
          href="https://drive.google.com/file/d/1CQRgSSDW7ohNlryf98Om8z5rRZn2ndsk/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="text-sm px-6 py-3 rounded-lg font-mono tracking-tight transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: themes[theme].card,
            border: `1px solid ${themes[theme].border}`,
            color: themes[theme].text,
          }}
        >
          DOWNLOAD RESUME
        </a> */}
        <a
          href="https://github.com/ExoticLure37"
          target="_blank"
          rel="noreferrer"
          className="text-sm px-6 py-3 rounded-lg font-mono tracking-tight transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: themes[theme].card,
            border: `1px solid ${themes[theme].border}`,
            color: themes[theme].text,
          }}
        >
          GITHUB
        </a>
        <a
          href="https://www.linkedin.com/in/aryan-maurya027/"
          target="_blank"
          rel="noreferrer"
          className="text-sm px-6 py-3 rounded-lg font-mono tracking-tight transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: themes[theme].card,
            border: `1px solid ${themes[theme].border}`,
            color: themes[theme].text,
          }}
        >
          LINKEDIN
        </a>
      </div>
    </section>
  );
}

function Education({ theme }) {
  return (
    <section className="px-6 lg:px-24 py-16 max-w-7xl mx-auto" style={{ borderTop: `1px solid ${themes[theme].border}` }}>
      <h2 className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: themes[theme].secondary }}>
        ACADEMIC BASE
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {TRANSACTIONS_DATA.education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-xl p-6 backdrop-blur-sm"
            style={{
              backgroundColor: themes[theme].card,
              border: `1px solid ${themes[theme].border}`,
            }}
          >
            <div className="mb-4">
              <span className="font-mono text-xs px-2 py-1 rounded" style={{
                backgroundColor: themes[theme].primary,
                color: themes[theme].bg,
              }}>
                {edu.level}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: themes[theme].text }}>
              {edu.degree}
            </h3>
            <div className="text-sm mb-3" style={{ color: themes[theme].muted }}>
              {edu.institution}
            </div>
            <div className="mb-4">
              <div className="font-mono text-xs mb-1" style={{ color: themes[theme].muted }}>Performance</div>
              <div className="text-xl font-bold" style={{ color: themes[theme].secondary }}>
                {edu.performance}
              </div>
            </div>
            {edu.details.length > 0 && (
              <div>
                <div className="font-mono text-xs mb-2" style={{ color: themes[theme].muted }}>Core Foundations</div>
                <div className="flex flex-wrap gap-2">
                  {edu.details.map((detail, detailIdx) => (
                    <span
                      key={detailIdx}
                      className="font-mono text-xs px-2 py-1 rounded"
                      style={{
                        color: themes[theme].text,
                        backgroundColor: themes[theme].bg,
                        border: `1px solid ${themes[theme].border}`,
                      }}
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({ theme }) {
  const otherProjects = TRANSACTIONS_DATA.projects.slice(1); // Skip flagship project

  return (
    <section className="px-6 lg:px-24 py-16 max-w-7xl mx-auto" style={{ borderTop: `1px solid ${themes[theme].border}` }}>
      <h2 className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: themes[theme].secondary }}>
        ENGINEERING PROJECTS
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {otherProjects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-xl p-6 backdrop-blur-sm"
            style={{
              backgroundColor: themes[theme].card,
              border: `1px solid ${themes[theme].border}`,
            }}
          >
            <div className="mb-4">
              <span className="font-mono text-xs px-2 py-1 rounded" style={{
                backgroundColor: themes[theme].bg,
                border: `1px solid ${themes[theme].border}`,
                color: themes[theme].secondary,
              }}>
                {project.category}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: themes[theme].text }}>
              {project.title}
            </h3>
            <p className="text-sm mb-4" style={{ color: themes[theme].muted }}>
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="font-mono text-xs px-2 py-1 rounded"
                  style={{
                    color: themes[theme].secondary,
                    backgroundColor: themes[theme].bg,
                    border: `1px solid ${themes[theme].border}`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Footer({ theme }) {
  return (
    <footer className="py-12 text-center" style={{ borderTop: `1px solid ${themes[theme].border}` }}>
      <div className="font-mono text-xs mb-2" style={{ color: themes[theme].muted }}>
        SYSTEM SHUTDOWN. Thank you for visiting.
      </div>
      <div className="font-mono text-xs" style={{ color: themes[theme].secondary }}>
        See you in production. ARYAN OS v2.0
      </div>
    </footer>
  );
}

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [theme, setTheme] = useState("monokai");

  return (
    <div className="min-h-screen font-mono" style={{ backgroundColor: themes[theme].bg, color: themes[theme].text }}>
      {/* Grid Background Overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ opacity: 0.05 }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, ${themes[theme].primary} 1px, transparent 1px),
            linear-gradient(to bottom, ${themes[theme].primary} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />

      <AnimatePresence>
        {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} theme={theme} />}
      </AnimatePresence>

      {bootComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <section className="px-6 lg:px-24 pt-24 pb-16 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4" style={{ color: themes[theme].text }}>
                ARYAN MAURYA
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg sm:text-xl mb-6 font-light"
                style={{ color: themes[theme].muted }}
              >
                "Designing software where machine intelligence meets engineering excellence."
              </motion.p>
              <div className="flex flex-wrap gap-3 text-sm" style={{ color: themes[theme].secondary }}>
                {TRANSACTIONS_DATA.profile.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded" style={{ backgroundColor: themes[theme].card, border: `1px solid ${themes[theme].border}` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>

          <SystemDashboard theme={theme} />
          <ArchitectureDiagram theme={theme} />
          <FlagshipProject theme={theme} />
          <ProjectsSection theme={theme} />
          <Terminal theme={theme} />
          <SkillBars theme={theme} />
          <Education theme={theme} />
          <GitTimeline theme={theme} />
          <MissionLog theme={theme} />
          <MissionControl theme={theme} />
          <Footer theme={theme} />
        </motion.div>
      )}
    </div>
  );
}
