import { useEffect } from "react";
import Hero from "../components/Hero";
import BriefSection from "../components/BriefSection";
import WorkSection from "../components/WorkSection";
import ClientStrip from "../components/ClientStrip";
import JournalPreview from "../components/JournalPreview";
import ContactSection from "../components/ContactSection";
import FounderSection from "../components/FounderSection";

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export default function HomePage() {
  useEffect(() => {
    document.title = "Bombay Blanc — Contained Heat.";
    setCanonical("https://www.bombayblanc.com/");
  }, []);

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
