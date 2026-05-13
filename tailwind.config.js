/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cotton: "#F2EBDA",
        bone: "#E5DBC4",
        khadi: "#D8CFBC",
        indigo: "#2E2820",
        graphite: "#3D3B36",
        ash: "#7A7669",
        vermilion: "#B5352A",
        marigold: "#C68A2E",
        neem: "#5F7060",
        dusk: "#1D1A17",
        "dusk-mid": "#252118",
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      letterSpacing: {
        masthead: "-0.055em",
        heading: "-0.045em",
        wideMono: "0.22em",
        widerMono: "0.24em",
      },
      fontSize: {
        "hero": ["clamp(72px, 8.5vw, 148px)", { lineHeight: "0.86", letterSpacing: "-0.055em" }],
        "h2": ["clamp(56px, 6vw, 96px)", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "h2-work": ["clamp(72px, 7vw, 120px)", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "pillar": ["clamp(36px, 3vw, 54px)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "subhead": ["clamp(26px, 2.1vw, 38px)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
      },
      transitionTimingFunction: {
        film: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        fadeUp: {
          from: { transform: "translateY(24px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        heroScale: {
          from: { transform: "scale(1.03)", opacity: "0.7" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        drawLine: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        heroScale: "heroScale 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        drawLine: "drawLine 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};
