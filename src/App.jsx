import Nav from "./components/Nav";
import Hero from "./components/Hero";
import BriefSection from "./components/BriefSection";
import WorkSection from "./components/WorkSection";
import FounderSection from "./components/FounderSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <>
      {/* Nav overlays Hero so statue fills full viewport height */}
      <div className="relative">
        <Nav />
        <Hero />
      </div>
      <main>
        <BriefSection />
        <WorkSection />
        <FounderSection />
        <ContactSection />
      </main>
    </>
  );

}
