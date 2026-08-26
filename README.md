# Raj Aryan — Portfolio Website

A minimal, elegant personal portfolio with subtle 3D accents, built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **React Three Fiber**, and **Framer Motion**.

## ✨ Features

- 🌗 Dark / Light mode toggle
- 🎨 Moody indigo/violet color palette
- 🌀 3D floating torus knot with particle field (React Three Fiber)
- 🎞️ Smooth scroll-triggered animations (Framer Motion)
- 📊 Live coding stats: GitHub, LeetCode, CodeChef
- 📱 Fully responsive (mobile → desktop)
- ⚡ Lazy-loaded 3D assets for fast initial paint
- ♿ Respects `prefers-reduced-motion`
- 🔍 SEO + Open Graph meta tags

---

## 🚀 Getting Started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## ✏️ Customizing Your Content

**All personal content lives in one file:** `src/data/config.ts`

Update: name, title, tagline, bio, email, social URLs, coding usernames, skills, and projects.

---

## ➕ Adding a New Project

Open `src/data/config.ts` and add to the `projects` array:

```ts
{
  id: 5,
  title: "My New Project",
  description: "What it does.",
  tech: ["React", "Firebase"],
  repoUrl: "https://github.com/your-username/repo",
  liveUrl: "https://myproject.vercel.app",
  image: "/projects/portfolio.png",
  featured: false,
}
```

Place thumbnail at `public/projects/my-project.png`.

---

## 🔢 Updating Coding Stats

**GitHub & LeetCode:** Auto-pulled via public widgets — just keep usernames correct in `config.ts`.

**CodeChef:** Manually update the `stats` object in `CodingStatsSection.tsx`.

**LeetCode problem counts:** Update the Easy/Medium/Hard `value` fields in `CodingStatsSection.tsx`.

---

## 🖼️ Replacing the Avatar

Replace `public/avatar.jpg` with your real photo (square crop, min 400×400px).

---

## 📄 Resume

Place your resume at `public/resume.pdf`.

---

## 🌐 Deployment

**Vercel (recommended):**
```bash
npm i -g vercel && vercel
```

**Netlify:** Build command `npm run build`, publish directory `.next`.

---

## 🗂️ Project 

git add . && git commit -m "Update portfolio content" && git push origin main


```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, SEO
│   ├── page.tsx            # Main page
│   └── globals.css         # Design tokens
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, About, Skills, Projects, Stats, Contact
│   ├── three/              # HeroScene (3D canvas)
│   └── ui/                 # Reusable UI components
└── data/
    └── config.ts           # ← EDIT THIS for all content
```

---

Built with ❤️ by Raj Aryan
