import Nav from "./components/Nav";
import Hero from "./components/Hero";
import BriefSection from "./components/BriefSection";
import WorkSection from "./components/WorkSection";
import ClientStrip from "./components/ClientStrip";
import FounderSection from "./components/FounderSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <>
      {/* Nav is fixed; Hero fills full viewport height beneath it */}
      <Nav />
      <Hero />
      <main>
        <BriefSection />
        <WorkSection />
        <ClientStrip />
        <ContactSection />
        <FounderSection />
      </main>
    </>
  );

}
