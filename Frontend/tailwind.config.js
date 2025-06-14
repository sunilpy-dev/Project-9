/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      screens: {
        // Height-based custom breakpoints (like Tailwind's sm, md, etc.)

        'h-sm': { raw: '(max-height: 480px)' },    // Small height devices
        'h-md': { raw: '(max-height: 640px)' },    // Medium height (phones in portrait)
        'h-lg': { raw: '(max-height: 768px)' },    // Tablets, small laptops
        'h-xl': { raw: '(max-height: 900px)' },    // Laptops
        'h-2xl': { raw: '(max-height: 1080px)' },  // Full HD & larger
        'short': { raw: '(max-height: 700px)' },   // Shorter screens (Nest Hub, etc.)
        'tall': { raw: '(max-height: 1200px)' },   // Very tall devices (portrait tablets, tall monitors)
        'below-sm': { raw: '(max-width: 640px)' },    // Small height devices
        'below-md': { raw: '(max-width: 768px)' },    // Medium height (phones in portrait)
        'below-lg': { raw: '(max-width: 1024px)' },    // Tablets, small laptops
        'below-xl': { raw: '(max-width: 1280px)' },    // Laptops
        'below-lgxl': { raw: '(max-width: 900px)' },    // large-tablets
        'below-2xl': { raw: '(max-width: 1536)' },  // Full HD & larger
        'below-short': { raw: '(max-width: 700px)' },   // Shorter screens (Nest Hub, etc.)
        'below-tall': { raw: '(max-width: 1200px)' },   // Very tall devices (portrait tablets, tall monitors)
        '3xl': { raw: '(min-width: 2100px)' },
      },
    },
  },
  plugins: [],
}

