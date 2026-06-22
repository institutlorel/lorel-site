import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1B3A5C",
          "blue-light": "#2C5378",
          gold: "#C9A84C",
          "gold-light": "#E8D08A",
          "gold-dark": "#B8941F",
          cream: "#F8F6F1",
          "cream-dark": "#EFEBE2",
          dark: "#0D1F35",
          navy: "#0A1628",
        },
        text: {
          primary: "#1A1A2E",
          secondary: "#4A5568",
          muted: "#9CA3AF",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-tajawal)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #B8941F 0%, #C9A84C 50%, #E8D08A 100%)",
        "blue-gradient": "linear-gradient(135deg, #1B3A5C 0%, #0D1F35 100%)",
        "hero-gradient": "linear-gradient(160deg, #0A1628 0%, #0D1F35 40%, #1B3A5C 100%)",
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["clamp(2.2rem, 5vw, 4rem)", { lineHeight: "1.0", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["clamp(1.6rem, 3vw, 2.6rem)", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "600" }],
        "label-caps": ["0.7rem", { lineHeight: "1", letterSpacing: "0.15em", fontWeight: "700" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      boxShadow: {
        gold: "0 4px 24px rgba(201, 168, 76, 0.25)",
        "gold-lg": "0 8px 40px rgba(201, 168, 76, 0.35)",
        blue: "0 4px 24px rgba(27, 58, 92, 0.15)",
        card: "0 2px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 16px 48px rgba(27,58,92,0.18)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
