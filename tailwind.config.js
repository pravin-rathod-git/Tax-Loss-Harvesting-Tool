/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables dark mode based on the 'dark' class
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F3F4F6', // Lighter grey for light background
          dark: '#0F172A', // Design background color
        },
        card: {
          light: '#FFFFFF', // White card for light mode
          dark: '#1E293B', // Dark grey card for dark mode
        },
        primary: {
          DEFAULT: '#1D4ED8', // Standard blue for light mode CTA
          dark: '#1E3A8A', // Deep design blue for dark mode
        },
        text: {
          light: '#1F2937', // Dark grey text for light mode
          dark: '#F3F4F6', // Light text for dark mode
        },
        accent: '#10B981', // Accent Green for gains
        loss: '#EF4444',   // Red for loss
      },
    },
  },
  plugins: [require('@tailwindcss/forms')], // Enables custom form styling
}