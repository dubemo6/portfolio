import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_mkgyzco";
const EMAILJS_TEMPLATE_ID = "template_8u4wy5d";
const EMAILJS_PUBLIC_KEY  = "ilQN0zNZYa1lDrMMq";

const NAV_ITEMS = ["About", "Experience", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "Chi Botanical",
    tag: "E-Commerce · Branding",
    year: "2024",
    description:
      "A minimal e-commerce and showcase platform built for a botanical brand. Features precise layout structures, custom interactions, and optimization for fast visual rendering.",
    tech: ["React", "Tailwind CSS", "JavaScript", "CSS Animations"],
  },
  {
    id: 2,
    title: "Application Tracker",
    tag: "Web Application · Productivity",
    year: "2024",
    description:
      "A dashboard-style system designed to track professional job pipelines. Formulated with status columns, persistent local storage, and instantaneous metrics breakdown.",
    tech: ["React", "JavaScript", "LocalStorage", "Tailwind CSS"],
  },
  {
    id: 3,
    title: "Expenses Tracker",
    tag: "Finance · Web App",
    year: "2024",
    description:
      "A clean personal finance workspace allowing logging, systematic categorization, and analytical spending breakdowns using Chart.js visualizations.",
    tech: ["React", "Chart.js", "JavaScript", "CSS"],
  },
  {
    id: 4,
    title: "ONECO Construction Portal",
    tag: "Corporate Website",
    year: "2023",
    description:
      "A responsive web platform developed for a construction enterprise highlighting custom image layouts, performance testing, and accessible layouts.",
    tech: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "SVG"],
  },
];

const SKILLS = [
  { name: "HTML & CSS", level: 92 },
  { name: "JavaScript (ES6+)", level: 85 },
  { name: "React / Next.js", level: 80 },
  { name: "Tailwind CSS", level: 88 },
  { name: "QA & UI/UX Testing", level: 85 },
  { name: "Java / C++", level: 65 },
  { name: "PHP / Web Servers", level: 60 },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref}
      style={{
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 12, padding: "2rem",
        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms`,
      }}
      className="project-card"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
        <span style={{
          fontSize: "0.75rem", fontWeight: 600, color: "#1f2937", 
          background: "#f3f4f6", padding: "4px 10px", borderRadius: 6,
          fontFamily: "var(--font-mono)"
        }}>{project.tag}</span>
        <span style={{ fontSize: "0.8rem", color: "#9ca3af", fontFamily: "var(--font-mono)" }}>{project.year}</span>
      </div>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", marginBottom: "0.6rem" }}>
        {project.title}
      </h3>
      <p style={{ fontSize: "0.9rem", color: "#4b5563", lineHeight: 1.6, marginBottom: "1.5rem" }}>{project.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tech.map((t) => (
          <span key={t} style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: 4, background: "#f9fafb", border: "1px solid #f3f4f6", color: "#6b7280", fontFamily: "var(--font-mono)" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 50);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const inputStyle = {
    padding: "12px 14px", borderRadius: 8, border: "1px solid #d1d5db",
    fontSize: "0.9rem", fontFamily: "inherit", outline: "none",
    width: "100%", background: "#ffffff", color: "#111827", boxSizing: "border-box",
    transition: "border-color 0.15s ease"
  };

  const labelStyle = { fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.05em" };

  const handleContactSubmit = async () => {
    setFormError("");
    const { name, email, service, message } = form;
    if (!name || !email || !service || !message) {
      setFormError("All required fields must be completed.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please state a valid email address.");
      return;
    }
    setFormLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          service: service,
          budget: form.budget || "Not specified",
          message: message,
          reply_to: email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setFormSubmitted(true);
    } catch (err) {
      console.error("EmailJS Error: ", err);
      setFormError("Delivery failed. Please contact me directly via oguamanamtony@gmail.com");
    }
    setFormLoading(false);
  };

  return (
    <div style={{ background: "#ffffff", color: "#111827", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        
        :root {
          --font-mono: 'DM Mono', monospace;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
        ::selection { background: #e5e7eb; }
        
        .nav-link { cursor: pointer; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: #6b7280; transition: color 0.15s; }
        .nav-link:hover, .nav-link.active { color: #111827; }
        
        .btn-flat { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 24px; border-radius: 6px; font-weight: 500; font-size: 0.85rem; cursor: pointer; transition: all 0.15s ease; border: none; font-family: inherit; }
        .btn-flat-dark { background: #111827; color: #ffffff; }
        .btn-flat-dark:hover { background: #1f2937; }
        .btn-flat-dark:disabled { background: #9ca3af; cursor: not-allowed; }
        .btn-flat-outline { background: transparent; color: #374151; border: 1px solid #d1d5db; }
        .btn-flat-outline:hover { background: #f9fafb; border-color: #111827; }
        
        .section-label { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; margin-bottom: 0.75rem; fontFamily: var(--font-mono); }
        .cf-input:focus { border-color: #111827 !important; }
        
        .project-card:hover { transform: translateY(-4px) !important; border-color: #9ca3af !important; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }

        @media (max-width: 700px) {
          .hero-name { font-size: 2.75rem !important; }
          .two-col { flex-direction: column !important; }
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 701px) { .hamburger { display: none !important; } .mobile-menu { display: none !important; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid #f3f4f6" : "none",
        transition: "all 0.2s", padding: "1.2rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.01em" }}>
          <span>Anthony Oguamanam</span>
          <span style={{ color: "#9ca3af", fontWeight: 400, fontFamily: "var(--font-mono)" }}> / dev</span>
        </div>
        <div className="nav-desktop" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_ITEMS.map((item) => (
            <span key={item} className={`nav-link ${active === item ? "active" : ""}`}
              onClick={() => { setActive(item); scrollTo(item.toLowerCase()); }}>{item}</span>
          ))}
        </div>
        <button className="btn-flat btn-flat-dark nav-desktop" style={{ padding: "6px 14px", fontSize: "0.75rem" }}
          onClick={() => scrollTo("contact")}>Contact</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: 20, height: 2, background: "#111827", borderRadius: 99, transition: "all 0.2s",
              transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none",
            }} />
          ))}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: "fixed", top: 58, left: 0, right: 0, zIndex: 99, background: "#ffffff",
          borderBottom: "1px solid #e5e7eb", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem",
        }}>
          {NAV_ITEMS.map((item) => (
            <span key={item} style={{ fontSize: "1rem", fontWeight: 500, cursor: "pointer", color: "#374151" }}
              onClick={() => { setActive(item); scrollTo(item.toLowerCase()); setMenuOpen(false); }}>{item}</span>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="about" style={{ minHeight: "90vh", display: "flex", alignItems: "center", padding: "6rem 2rem 4rem", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ width: "100%", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(15px)", transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f3f4f6", padding: "6px 12px", borderRadius: 6, marginBottom: "1.5rem" }}>
            <span style={{ width: 6, height: 6, background: "#10b981", borderRadius: "50%" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#374151" }}>Available for core engineering roles</span>
          </div>
          
          <h1 className="hero-name" style={{
            fontWeight: 700, fontSize: "4rem",
            lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem", color: "#111827"
          }}>
            Building clean interfaces. Testing performance integrity.
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <span style={{ border: "1px solid #e5e7eb", color: "#374151", padding: "4px 12px", borderRadius: 4, fontSize: "0.8rem", fontWeight: 500 }}>Frontend and QA Tester</span>
            <span style={{ border: "1px solid #e5e7eb", color: "#374151", padding: "4px 12px", borderRadius: 4, fontSize: "0.8rem", fontWeight: 500 }}>BSc Computer Science @ Babcock</span>
            <span style={{ color: "#6b7280", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>Lagos, Nigeria</span>
          </div>

          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#4b5563", maxWidth: 640, marginBottom: "2.5rem" }}>
            I specialize in structuring visually bulletproof web layouts and writing deterministic code. Currently executing rigorous production UI/UX testing routines at <strong>Konga</strong> while sustaining a <strong>3.91 CGPA</strong> engineering track record.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn-flat btn-flat-dark" onClick={() => scrollTo("projects")}>View Engineering Projects</button>
            <button className="btn-flat btn-flat-outline" onClick={() => scrollTo("contact")}>Get in Touch</button>
          </div>

          <div className="two-col" style={{ display: "flex", gap: "1rem", marginTop: "4rem", flexWrap: "wrap" }}>
            {[{ num: "4+", label: "Completed Deployments" }, { num: "3.91", label: "CGPA Track Record" }, { num: "1yr+", label: "QA Production Experience" }].map((s) => (
              <div key={s.label} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "1rem 1.5rem", flex: "1 1 180px" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>{s.num}</div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "6rem 2rem", maxWidth: 960, margin: "0 auto", borderTop: "1px solid #f3f4f6" }}>
        <p className="section-label">Professional Timeline</p>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "3rem", letterSpacing: "-0.01em" }}>Experience &amp; Education</h2>
        
        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 450px", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#111827" }}>Frontend and QA Tester</h3>
                <p style={{ fontSize: "0.9rem", color: "#4b5563", fontWeight: 500, marginTop: 2 }}>Konga Group</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "#6b7280", display: "block" }}>July 2024 – Present</span>
                <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Hybrid · Product Team</span>
              </div>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {[
                "Audit user-facing UI pipelines to guarantee cross-browser visual consistency and exact specification matching.",
                "Systematically track and log high-priority client-side styling regressions inside cross-functional deployment pipelines.",
                "Collaborate iteratively alongside engineers to resolve complex interface behaviors.",
                "Balance structured enterprise expectations concurrently with ongoing university studies."
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "0.6rem", fontSize: "0.88rem", color: "#4b5563", lineHeight: 1.5 }}>
                  <span style={{ color: "#111827", flexShrink: 0 }}>•</span>{item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.5rem" }}>
              <p className="section-label" style={{ marginBottom: "0.4rem" }}>Academic Track</p>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>BSc Computer Science</h3>
              <p style={{ fontWeight: 500, color: "#4b5563", fontSize: "0.9rem" }}>Babcock University</p>
              <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontFamily: "var(--font-mono)", marginBottom: "0.75rem" }}>2023 – Present</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827" }}>3.91</span>
                <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>/ 5.00 CGPA</span>
              </div>
            </div>
            
            <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>Core Languages</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {["English (Native)", "Spanish (Working)"].map((l) => (
                  <span key={l} style={{ background: "#ffffff", border: "1px solid #e5e7eb", padding: "4px 10px", borderRadius: 4, fontSize: "0.75rem", fontWeight: 500, color: "#374151" }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem 2rem", background: "#f9fafb", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p className="section-label">Selected Track Record</p>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "3rem", letterSpacing: "-0.01em", color: "#111827" }}>Projects</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {PROJECTS.map((project, i) => (<ProjectCard key={project.id} project={project} index={i} />))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "6rem 2rem", maxWidth: 960, margin: "0 auto" }}>
        <p className="section-label">Capabilities</p>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "3rem", letterSpacing: "-0.01em" }}>Technical Matrix</h2>
        
        <div className="two-col" style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {SKILLS.map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: 500, color: "#111827" }}>{skill.name}</span>
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "#9ca3af" }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: 4, background: "#f3f4f6", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${skill.level}%`, background: "#111827", transition: "width 1s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ flex: "1 1 300px" }}>
            <h3 style={{ fontWeight: 600, marginBottom: "1rem", color: "#374151", fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Operational Frameworks</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
              {["Agile Testing Scrums", "SDLC Methodologies", "UI/UX Regressions", "Git Version Control", "Attention to Detail", "Time Management"].map((s) => (
                <span key={s} style={{ background: "#f3f4f6", padding: "4px 10px", borderRadius: 4, fontSize: "0.8rem", fontWeight: 500, color: "#374151" }}>{s}</span>
              ))}
            </div>
            
            <h3 style={{ fontWeight: 600, marginBottom: "0.8rem", color: "#374151", fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Personal Focus</h3>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {["Competitive Swimming", "Financial Markets & Quantitative Trading"].map((interest) => (
                <span key={interest} style={{ border: "1px solid #e5e7eb", background: "#ffffff", padding: "6px 12px", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, color: "#4b5563" }}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "6rem 2rem", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p className="section-label" style={{ textAlign: "center" }}>Communication Channel</p>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "0.75rem", textAlign: "center" }}>
            Initiate a Project
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "2.5rem", textAlign: "center" }}>
            Complete the form metrics below. Critical inquiries receive priority feedback within 24 hours.
          </p>

          {!formSubmitted ? (
            <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "2rem" }}>
              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input className="cf-input" style={inputStyle} type="text" placeholder="Jane Smith"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input className="cf-input" style={inputStyle} type="email" placeholder="jane@company.com"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={labelStyle}>Service Scope *</label>
                  <select className="cf-input" style={inputStyle} value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select a service...</option>
                    <option>Website Design &amp; Build</option>
                    <option>Front-End Development</option>
                    <option>UI/UX Implementation</option>
                    <option>QA / Testing</option>
                    <option>Freelance Collaboration</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Estimated Allocation</label>
                  <select className="cf-input" style={inputStyle} value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                    <option value="">Select range...</option>
                    <option>Under $500</option>
                    <option>$500 – $1,000</option>
                    <option>$1,000 – $3,000</option>
                    <option>$3,000 – $5,000</option>
                    <option>$5,000+</option>
                    <option>Let's discuss</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={labelStyle}>Project Specifics *</label>
                <textarea className="cf-input" style={{ ...inputStyle, minHeight: 110, resize: "vertical", lineHeight: 1.6 }}
                  placeholder="Outline specifications, architecture preferences, timeline, and core goals..."
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>

              {formError && (
                <p style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "1rem", textAlign: "center", fontFamily: "var(--font-mono)" }}>{formError}</p>
              )}

              <button className="btn-flat btn-flat-dark" style={{ width: "100%" }}
                disabled={formLoading} onClick={handleContactSubmit}>
                {formLoading ? "Processing..." : "Send Message"}
              </button>
            </div>
          ) : (
            <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "3rem 2rem", textAlign: "center" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "0.5rem", color: "#111827" }}>Message Sent</h3>
              <p style={{ color: "#4b5563", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 380, margin: "0 auto 2rem" }}>
                Your message parsed successfully. A confirmation update has been routed to <strong>{form.email}</strong>.
              </p>
              <button className="btn-flat btn-flat-outline"
                onClick={() => { 
                  setForm({ name: "", email: "", service: "", budget: "", message: "" });
                  setFormSubmitted(false);
                }}>
                Open New Session
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#ffffff", borderTop: "1px solid #e5e7eb", color: "#9ca3af", padding: "2rem", textAlign: "center", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
        <span>© 2026 Oguamanam Anthony · Engineered with clean React</span>
      </footer>
    </div>
  );
}