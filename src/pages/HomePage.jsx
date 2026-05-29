import Hero from "../components/Hero";
import BriefSection from "../components/BriefSection";
import WorkSection from "../components/WorkSection";
import ClientStrip from "../components/ClientStrip";
import JournalPreview from "../components/JournalPreview";
import ContactSection from "../components/ContactSection";
import FounderSection from "../components/FounderSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <main>
        <BriefSection />
        <WorkSection />
        <ClientStrip />
        <JournalPreview />
        <ContactSection />
        <FounderSection />
      </main>
    </>
  );
}
