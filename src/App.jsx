import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["About", "Experience", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "Chi Botanical",
    tag: "Website · Branding",
    year: "2024",
    description:
      "A lush, nature-inspired e-commerce and showcase website for a botanical brand. Crafted with immersive plant imagery, earthy palettes, and smooth scroll interactions that bring the brand story to life.",
    tech: ["React", "Tailwind CSS", "JavaScript", "CSS Animations"],
    accent: "#5a8a5e",
    bg: "#e8f0e8",
  },
  {
    id: 2,
    title: "Application Tracker",
    tag: "Web App · Productivity",
    year: "2024",
    description:
      "A clean, dashboard-style tool for tracking job applications end-to-end — from submission to offer. Features status pipelines, notes per application, and at-a-glance stats to keep the job hunt organised.",
    tech: ["React", "JavaScript", "LocalStorage", "Tailwind CSS"],
    accent: "#3b6fa0",
    bg: "#e4ecf5",
  },
  {
    id: 3,
    title: "Expenses Tracker",
    tag: "Web App · Finance",
    year: "2024",
    description:
      "A personal finance tracker that helps users log, categorise, and visualise their spending. Includes monthly summaries, category breakdowns, and budget limit warnings to keep finances in check.",
    tech: ["React", "Chart.js", "JavaScript", "CSS"],
    accent: "#b5621e",
    bg: "#f5ece4",
  },
  {
    id: 4,
    title: "ONECO Construction Website",
    tag: "Website · Corporate",
    year: "2023",
    description:
      "A professional corporate site for ONECO Construction Enterprises, featuring a signature 3D image rotation effect, reveal-on-scroll animations, and a fully responsive layout built with Flexbox and Tailwind CSS.",
    tech: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "SVG"],
    accent: "#7a5c1e",
    bg: "#f2ece0",
  },
];

const SKILLS = [
  { name: "HTML & CSS", level: 92 },
  { name: "JavaScript", level: 85 },
  { name: "React", level: 80 },
  { name: "Next.js", level: 72 },
  { name: "Tailwind CSS", level: 88 },
  { name: "QA Testing", level: 85 },
  { name: "Java / C++", level: 65 },
  { name: "PHP", level: 60 },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimBar({ level, color, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ height: 6, background: "#e5e5e5", borderRadius: 99, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: inView ? `${level}%` : "0%",
          background: color,
          borderRadius: 99,
          transition: `width 1s cubic-bezier(.4,0,.2,1) ${delay}ms`,
        }}
      />
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
        background: hovered ? project.bg : "#fafafa",
        border: `1.5px solid ${hovered ? project.accent : "#e2e2e2"}`,
        borderRadius: 20,
        padding: "2rem",
        cursor: "default",
        transition: `all 0.4s ease ${index * 120}ms`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <span style={{
          fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: project.accent,
          background: `${project.accent}18`, padding: "3px 10px", borderRadius: 99
        }}>
          {project.tag}
        </span>
        <span style={{ fontSize: "0.8rem", color: "#aaa", fontFamily: "'DM Mono', monospace" }}>{project.year}</span>
      </div>
      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#111", marginBottom: "0.7rem", fontFamily: "'Fraunces', serif" }}>
        {project.title}
      </h3>
      <p style={{ fontSize: "0.92rem", color: "#555", lineHeight: 1.7, marginBottom: "1.2rem" }}>
        {project.description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tech.map(t => (
          <span key={t} style={{
            fontSize: "0.72rem", padding: "3px 10px", borderRadius: 99,
            background: "#f0f0f0", color: "#555", fontFamily: "'DM Mono', monospace"
          }}>{t}</span>
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

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#f7f6f3", color: "#111", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Outfit:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #b5e0b5; }
        .nav-link { cursor: pointer; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #555; transition: color 0.2s; padding: 4px 0; position: relative; }
        .nav-link:hover { color: #111; }
        .nav-link.active { color: #111; }
        .nav-link.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: #3a3a3a; border-radius: 99px; }
        .pill-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 99px; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.25s; border: none; }
        .pill-btn-dark { background: #111; color: #fff; }
        .pill-btn-dark:hover { background: #333; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
        .pill-btn-outline { background: transparent; color: #111; border: 1.5px solid #ccc; }
        .pill-btn-outline:hover { border-color: #111; transform: translateY(-2px); }
        .section-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #aaa; margin-bottom: 1rem; font-family: 'DM Mono', monospace; }
        .contact-link { color: #111; font-weight: 600; text-decoration: none; border-bottom: 1.5px solid #ccc; padding-bottom: 1px; transition: border-color 0.2s; }
        .contact-link:hover { border-color: #111; }
        @media (max-width: 700px) {
          .hero-name { font-size: 3rem !important; }
          .two-col { flex-direction: column !important; }
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 701px) { .hamburger { display: none !important; } .mobile-menu { display: none !important; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(247,246,243,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e5e5e5" : "none",
        transition: "all 0.3s", padding: "1.1rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
          <span style={{ color: "#111" }}>Anthony</span>
          <span style={{ color: "#aaa", fontWeight: 300 }}>.dev</span>
        </div>

        <div className="nav-desktop" style={{ display: "flex", gap: "2rem" }}>
          {NAV_ITEMS.map(item => (
            <span key={item} className={`nav-link ${active === item ? "active" : ""}`}
              onClick={() => { setActive(item); scrollTo(item.toLowerCase()); }}>
              {item}
            </span>
          ))}
        </div>

        <button className="pill-btn pill-btn-dark nav-desktop" style={{ padding: "8px 20px", fontSize: "0.8rem" }}
          onClick={() => scrollTo("contact")}>
          Hire Me
        </button>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: "block", width: 24, height: 2, background: "#111", borderRadius: 99, transition: "all 0.3s",
              transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none" }} />
          ))}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: "#f7f6f3", borderBottom: "1px solid #e5e5e5",
          padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem"
        }}>
          {NAV_ITEMS.map(item => (
            <span key={item} style={{ fontSize: "1.1rem", fontWeight: 600, cursor: "pointer" }}
              onClick={() => { setActive(item); scrollTo(item.toLowerCase()); setMenuOpen(false); }}>
              {item}
            </span>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "8rem 2rem 4rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ width: "100%" }}>
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(30px)", transition: "all 0.9s ease 0.1s" }}>
            <p className="section-label">Available for opportunities</p>
          </div>

          <h1 className="hero-name" style={{
            fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: "5.5rem",
            lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "1.5rem",
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(40px)",
            transition: "all 1s ease 0.2s"
          }}>
            Oguamanam<br />
            <span style={{ fontStyle: "italic", color: "#5a8a5e" }}>Anthony</span>
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap",
            opacity: heroVisible ? 1 : 0, transition: "all 0.9s ease 0.35s" }}>
            <span style={{ background: "#111", color: "#fff", padding: "6px 16px", borderRadius: 99, fontSize: "0.82rem", fontWeight: 700 }}>
              Front-End Developer
            </span>
            <span style={{ background: "#e8f0e8", color: "#5a8a5e", padding: "6px 16px", borderRadius: 99, fontSize: "0.82rem", fontWeight: 700 }}>
              QA Tester @ Konga
            </span>
            <span style={{ color: "#aaa", fontSize: "0.85rem", fontFamily: "'DM Mono', monospace" }}>📍 Lagos, Nigeria</span>
          </div>

          <p style={{
            fontSize: "1.15rem", lineHeight: 1.8, color: "#555", maxWidth: 600,
            marginBottom: "2.5rem", opacity: heroVisible ? 1 : 0, transition: "all 0.9s ease 0.45s"
          }}>
            Computer Science student at Babcock University with a{" "}
            <strong style={{ color: "#111" }}>3.91 GPA</strong>, building polished web interfaces by day and testing UI integrity at{" "}
            <strong style={{ color: "#111" }}>Konga</strong> by night. Passionate about clean code, great design, and making the web feel human.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap",
            opacity: heroVisible ? 1 : 0, transition: "all 0.9s ease 0.55s" }}>
            <button className="pill-btn pill-btn-dark" onClick={() => scrollTo("projects")}>
              View Projects <span>↓</span>
            </button>
            <button className="pill-btn pill-btn-outline" onClick={() => scrollTo("contact")}>
              Get in Touch
            </button>
          </div>

          {/* floating stat cards */}
          <div className="two-col" style={{ display: "flex", gap: "1rem", marginTop: "4rem", flexWrap: "wrap",
            opacity: heroVisible ? 1 : 0, transition: "all 0.9s ease 0.65s" }}>
            {[
              { num: "4+", label: "Projects Built" },
              { num: "3.91", label: "GPA / 5.00" },
              { num: "1yr+", label: "at Konga" },
              { num: "2", label: "Languages" },
            ].map(s => (
              <div key={s.label} style={{
                background: "#fff", border: "1px solid #e5e5e5", borderRadius: 16,
                padding: "1.2rem 1.8rem", flex: "1 1 120px", minWidth: 100
              }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "2rem", fontWeight: 800, color: "#111" }}>{s.num}</div>
                <div style={{ fontSize: "0.78rem", color: "#aaa", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <p className="section-label">Where I've Worked</p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "2.8rem", fontWeight: 800, marginBottom: "3rem", letterSpacing: "-0.02em" }}>
          Experience
        </h2>

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 20, padding: "2.5rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #e8433a, #f07c38)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#111", fontFamily: "'Fraunces', serif" }}>Front-End QA Tester</h3>
                <p style={{ fontSize: "1rem", color: "#e8433a", fontWeight: 700, marginTop: 2 }}>Konga</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.78rem", fontFamily: "'DM Mono', monospace", color: "#aaa", display: "block" }}>July 2024 – Present</span>
                <span style={{ fontSize: "0.78rem", color: "#aaa" }}>Lagos, Nigeria · Hybrid</span>
              </div>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {[
                "Executes QA testing within the Front-End department to ensure UI/UX integrity and visual consistency.",
                "Maintains hybrid schedule — on-site Mondays & Fridays, remote mid-week.",
                "Applies agile methodologies and SDLC in a real-world production environment.",
                "Collaborates with the development team to identify and resolve UI bugs iteratively.",
                "Juggles professional responsibilities while maintaining full-time academic studies.",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", fontSize: "0.92rem", color: "#555", lineHeight: 1.6 }}>
                  <span style={{ color: "#e8433a", marginTop: 3, flexShrink: 0 }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 20, padding: "2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #3b6fa0, #5da0d0)" }} />
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>Education</p>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.2rem", fontWeight: 800, marginBottom: 4 }}>BSc Computer Science</h3>
              <p style={{ fontWeight: 700, color: "#3b6fa0", marginBottom: 4 }}>Babcock University</p>
              <p style={{ fontSize: "0.82rem", color: "#aaa", fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>2023 – Present</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: "1.8rem", fontWeight: 900, color: "#111" }}>3.91</span>
                <span style={{ fontSize: "0.8rem", color: "#aaa" }}>/ 5.00 GPA</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#777", marginTop: "0.8rem" }}>
                Coursework: C, Java, C++, PHP
              </p>
            </div>

            <div style={{ background: "#f7f6f3", border: "1px solid #e5e5e5", borderRadius: 20, padding: "1.5rem" }}>
              <p className="section-label" style={{ marginBottom: "0.6rem" }}>Languages</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {["🇬🇧 English", "🇪🇸 Spanish"].map(l => (
                  <span key={l} style={{ background: "#fff", border: "1px solid #e5e5e5", padding: "5px 12px", borderRadius: 99, fontSize: "0.82rem", fontWeight: 600 }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem 2rem", background: "#111", color: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#666", marginBottom: "1rem", fontFamily: "'DM Mono', monospace" }}>What I've Built</p>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "2.8rem", fontWeight: 800, marginBottom: "3rem", letterSpacing: "-0.02em" }}>
            Projects
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.2rem" }}>
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <p className="section-label">What I Know</p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "2.8rem", fontWeight: 800, marginBottom: "3rem", letterSpacing: "-0.02em" }}>Skills</h2>

        <div className="two-col" style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 340px" }}>
            <h3 style={{ fontWeight: 700, marginBottom: "1.8rem", color: "#555", fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Technical Proficiency</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              {SKILLS.map((skill, i) => (
                <div key={skill.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#222" }}>{skill.name}</span>
                    <span style={{ fontSize: "0.78rem", fontFamily: "'DM Mono', monospace", color: "#aaa" }}>{skill.level}%</span>
                  </div>
                  <AnimBar level={skill.level} color="#111" delay={i * 80} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 260px" }}>
            <h3 style={{ fontWeight: 700, marginBottom: "1.8rem", color: "#555", fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Soft Skills & Interests</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2rem" }}>
              {["Teamwork", "Communication", "Attention to Detail", "Time Management", "Agile / Scrum", "SDLC"].map(s => (
                <span key={s} style={{ background: "#f0f0f0", padding: "8px 16px", borderRadius: 99, fontSize: "0.85rem", fontWeight: 600, color: "#333" }}>{s}</span>
              ))}
            </div>

            <h3 style={{ fontWeight: 700, marginBottom: "1.2rem", color: "#555", fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Beyond the Screen</h3>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {[{ icon: "🏊", label: "Swimming" }, { icon: "📈", label: "Trading" }].map(item => (
                <div key={item.label} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 16, padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.6rem", flex: "1 1 120px" }}>
                  <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                  <span style={{ fontWeight: 700, color: "#333" }}>{item.label}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2rem", background: "#f7f6f3", border: "1px dashed #d0d0d0", borderRadius: 16, padding: "1.5rem" }}>
              <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.7 }}>
                Currently in <strong style={{ color: "#111" }}>Year 2</strong> at Babcock University, balancing studies with a live QA role at one of Nigeria's largest e-commerce platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "6rem 2rem", background: "#f0ede6" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p className="section-label" style={{ textAlign: "center" }}>Let's Work Together</p>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "3rem", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1.2rem" }}>
            Get In <span style={{ fontStyle: "italic", color: "#5a8a5e" }}>Touch</span>
          </h2>
          <p style={{ color: "#777", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Whether you have a project, an opportunity, or just want to say hello — my inbox is always open. I'm especially interested in front-end roles, QA positions, and freelance web projects.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <a href="mailto:oguamanamtony@gmail.com" className="pill-btn pill-btn-dark">
              ✉️ oguamanamtony@gmail.com
            </a>
            <a href="tel:+2349133307596" className="pill-btn pill-btn-outline" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              📞 +234 913 330 7596
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "GitHub", href: "#" },
              { label: "LinkedIn", href: "#" },
              { label: "Twitter / X", href: "#" },
            ].map(link => (
              <a key={link.label} href={link.href} className="contact-link" style={{ fontSize: "0.9rem" }}>{link.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", color: "#555", padding: "1.5rem 2rem", textAlign: "center", fontSize: "0.8rem", fontFamily: "'DM Mono', monospace" }}>
        <span>© 2025 Oguamanam Anthony · Built with React</span>
      </footer>
    </div>
  );
}