import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Height of the fixed header. Anchor targets are offset by this so they
// land cleanly below the nav instead of underneath it.
const HEADER_OFFSET = 150;

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // No hash → ordinary page change, go to the top.
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let cancelled = false;

    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const top =
        el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "auto" });
    };

    // Stop re-correcting the moment the visitor takes over scrolling.
    const stop = () => {
      cancelled = true;
      cleanupListeners();
    };
    const cleanupListeners = () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });

    // Re-run a few times to absorb layout shift as images above the
    // target finish loading (otherwise the target lands clipped).
    const timers = [0, 120, 280, 500, 800].map((d) =>
      setTimeout(() => {
        if (!cancelled) scrollToTarget();
      }, d)
    );

    return () => {
      timers.forEach(clearTimeout);
      cleanupListeners();
    };
  }, [pathname, hash]);

  return null;
}
