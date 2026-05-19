// ============================================
// data/constants.js — All static portfolio data
// Anthony Oguamanam Portfolio
// ============================================

export const NAV_ITEMS = ["About", "Experience", "Projects", "Skills", "Contact"];

export const PROJECTS = [
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

export const SKILLS = [
  { name: "HTML & CSS",    level: 92 },
  { name: "JavaScript",    level: 85 },
  { name: "React",         level: 80 },
  { name: "Next.js",       level: 72 },
  { name: "Tailwind CSS",  level: 88 },
  { name: "Java / C++",    level: 65 },
  { name: "PHP",           level: 60 },
];

export const SOFT_SKILLS = [
  "Teamwork",
  "Communication",
  "Attention to Detail",
  "Time Management",
  "Agile / Scrum",
  "SDLC",
];

export const INTERESTS = [
  { icon: "🏊", label: "Swimming" },
  { icon: "📈", label: "Trading"  },
];

export const SOCIAL_LINKS = [
  { label: "GitHub",     href: "#" },
  { label: "LinkedIn",   href: "#" },
  { label: "Twitter / X", href: "#" },
];

export const STAT_CARDS = [
  { num: "4+",  label: "Projects Built" },
  { num: "3.91", label: "GPA / 5.00"   },
  { num: "1yr+", label: "at Konga"     },
  { num: "2",    label: "Languages"    },
];

export const EXPERIENCE = {
  role: "Front-End Developer",
  company: "Konga",
  period: "July 2024 – Present",
  location: "Lagos, Nigeria · Hybrid",
  bullets: [
    "Builds and maintains front-end features for Konga's e-commerce platform, ensuring UI/UX integrity and visual consistency across the product.",
    "Contributes to agile sprints — writing clean, maintainable code and collaborating closely with designers and backend engineers.",
    "Conducts some front-end QA checks as part of the development workflow, catching UI regressions before they ship.",
    "Applies the SDLC in a live production environment, gaining hands-on experience with real-world engineering practices.",
    "Balances professional responsibilities at Konga with full-time Computer Science studies at Babcock University.",
  ],
};

export const EDUCATION = {
  degree: "BSc Computer Science",
  institution: "Babcock University",
  period: "2023 – Present",
  year: "Year 3",
  gpa: "3.91",
  gpaMax: "5.00",
  coursework: "C, Java, C++, PHP",
};