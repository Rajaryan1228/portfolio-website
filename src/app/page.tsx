import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CodingStatsSection from "@/components/sections/CodingStatsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

        <AboutSection />

        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

        <SkillsSection />

        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

        <ProjectsSection />

        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

        <CodingStatsSection />

        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
