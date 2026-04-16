/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00685a",
        "on-primary": "#c1fff1",
        "primary-container": "#8deedb",
        "on-primary-container": "#00594d",
        "primary-dim": "#005a4e",
        "primary-fixed": "#8deedb",
        "primary-fixed-dim": "#7fe0cd",
        "on-primary-fixed": "#00443b",
        "on-primary-fixed-variant": "#006457",
        
        "secondary": "#705900",
        "on-secondary": "#fff2d4",
        "secondary-container": "#fdd34d",
        "on-secondary-container": "#5c4900",
        "secondary-dim": "#624d00",
        "secondary-fixed": "#fdd34d",
        "secondary-fixed-dim": "#eec540",
        "on-secondary-fixed": "#463600",
        "on-secondary-fixed-variant": "#675200",
        
        "tertiary": "#8a4a35",
        "on-tertiary": "#ffefeb",
        "tertiary-container": "#f7a48b",
        "on-tertiary-container": "#5c2615",
        "tertiary-dim": "#7b3e2b",
        "tertiary-fixed": "#f7a48b",
        "tertiary-fixed-dim": "#e8977e",
        "on-tertiary-fixed": "#3f1103",
        "on-tertiary-fixed-variant": "#682f1c",
        
        "error": "#b31b25",
        "on-error": "#ffefee",
        "error-container": "#fb5151",
        "on-error-container": "#570008",
        "error-dim": "#9f0519",
        
        "surface": "#f5f7f7",
        "on-surface": "#2c2f30",
        "surface-dim": "#d0d5d6",
        "surface-bright": "#f5f7f7",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eef1f1",
        "surface-container": "#e5e9e9",
        "surface-container-high": "#dfe3e3",
        "surface-container-highest": "#d9dede",
        "on-surface-variant": "#595c5c",
        "surface-variant": "#d9dede",
        "surface-tint": "#00685a",
        
        "outline": "#747778",
        "outline-variant": "#abadae",
        
        "background": "#f5f7f7",
        "on-background": "#2c2f30",
        
        "inverse-surface": "#0b0f0f",
        "inverse-on-surface": "#9b9d9e",
        "inverse-primary": "#9bfde9",
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      fontFamily: {
        headline: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Be Vietnam Pro", "system-ui", "sans-serif"],
        label: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
    },
  },
}
