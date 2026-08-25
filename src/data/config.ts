// ============================================================
//  PORTFOLIO CONFIG — Edit this file to update your content!
//  You should NOT need to touch any component files for
//  basic content changes (bio, projects, skills, links).
// ============================================================

export const siteConfig = {
  name: "Raj Aryan",
  title: "Full-Stack Developer & CS Student",
  tagline: "I build fast, thoughtful software and solve hard problems.",
  bio: [
    "I'm a Computer Science student with a passion for building elegant, performant web applications and tackling algorithmic challenges.",
    "I love working across the full stack — from crafting pixel-perfect UIs to designing robust backend systems. When I'm not coding, you'll find me grinding competitive programming contests or exploring new tech.",
  ],
  location: "India", // optional — set to "" to hide
  email: "rajanaryan25@gmail.com",
  resumeUrl: "/resume.pdf", // place your resume in /public/resume.pdf

  social: {
    github: "https://github.com/Rajaryan1228",
    linkedin: "https://linkedin.com/in/raj-aryan", // REPLACE with your real LinkedIn URL
    twitter: "", // Add your Twitter/X URL or leave empty
    leetcode: "https://leetcode.com/u/Logic_lord_108/",
    codechef: "https://www.codechef.com/users/anteambulo",
  },

  // Coding profile usernames — used for stats API calls
  codingProfiles: {
    github: "Rajaryan1228",
    leetcode: "Logic_lord_108",
    codechef: "anteambulo",
  },

  seo: {
    description:
      "Raj Aryan — Full-Stack Developer & CS Student. Building fast, elegant web apps and solving hard problems.",
    url: "https://rajaryane.dev", // REPLACE with your actual domain
    ogImage: "/og-image.png",
  },
};

// ============================================================
//  SKILLS  — Add/remove/reorder as you like
// ============================================================
export const skills = [
  {
    category: "Languages",
    items: [
      { name: "C++", icon: "cpp" },
      { name: "Python", icon: "python" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Java", icon: "java" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "HTML5", icon: "html" },
      { name: "CSS3", icon: "css" },
    ],
  },
  {
    category: "Backend & Tools",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Git", icon: "git" },
      { name: "Docker", icon: "docker" },
    ],
  },
];

// ============================================================
//  PROJECTS — Add your projects here!
//
//  To add a project, copy one of the objects below and fill
//  in your details. The `image` field should be a path to a
//  file in /public/projects/ (e.g. "/projects/myapp.png").
//  Set liveUrl to "" if there is no live demo.
// ============================================================
export const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A minimal, elegant 3D-accented personal portfolio built with Next.js, React Three Fiber, and Framer Motion. Features smooth scroll animations, dark/light mode, and coding stats.",
    tech: ["Next.js", "TypeScript", "Three.js", "Framer Motion", "Tailwind"],
    repoUrl: "https://github.com/Rajaryan1228", // REPLACE
    liveUrl: "", // REPLACE or leave ""
    image: "/projects/portfolio.png", // place image in /public/projects/
    featured: true,
  },
  {
    id: 2,
    title: "Local RAG Application",
    description:
      "A privacy-first Retrieval-Augmented Generation system using local LLMs and vector embeddings to query internal documents without external API calls.",
    tech: ["Python", "LangChain", "ChromaDB", "Ollama", "FastAPI"],
    repoUrl: "https://github.com/Rajaryan1228/local-rag-app",
    liveUrl: "",
    image: "/projects/rag.png",
    featured: true,
  },

  {
    id: 3,
    title: "Opportune — Full-Stack Job Portal",
    description:
      "A comprehensive MERN stack job portal serving Applicants and Recruiters. Features role-based dashboards, job posting & application tracking, profile management, JWT authentication, and Cloudinary media uploads.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Tailwind CSS", "Cloudinary", "JWT"],
    repoUrl: "https://github.com/Rajaryan1228/Opportune-fullstack",
    liveUrl: "",
    image: "/projects/opportune.png",
    featured: true,
  },
  {
    id: 4,
    title: "Bangalore House Price Predictor",
    description:
      "Machine learning regression model trained on housing datasets to predict real estate prices based on location, square footage, and amenities.",
    tech: ["Python", "Scikit-Learn", "Pandas", "Flask", "NumPy"],
    repoUrl: "https://github.com/Rajaryan1228/bangalore-price-predictor",
    liveUrl: "",
    image: "/projects/price-predictor.png",
    featured: false,
  },
];

