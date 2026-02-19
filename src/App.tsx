import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { CustomCursor } from "./components/CustomCursor";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <div className="dark min-h-screen bg-black text-white font-['Anonymous_Pro'] selection:bg-[#FF0000] selection:text-white">
        <CustomCursor />
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ServicesSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>
    </LanguageProvider>
  );
}