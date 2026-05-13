import Nav from "./components/Nav";
import Hero from "./components/Hero";
import BriefSection from "./components/BriefSection";
import WorkSection from "./components/WorkSection";
import FounderSection from "./components/FounderSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BriefSection />
        <WorkSection />
        <FounderSection />
        <ContactSection />
      </main>
    </>
  );
}
