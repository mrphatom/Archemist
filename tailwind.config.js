/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))", input: "hsl(var(--input))", ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive) / <alpha-value>)", foreground: "hsl(var(--destructive-foreground) / <alpha-value>)" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        arc: { white: '#fafaf9', cream: '#f5f5f0', stone: '#e8e6e1', warmgray: '#a8a5a0', charcoal: '#2a2a28', ink: '#1a1a18', pitch: '#0a0a0a', copper: '#b87333', amber: '#c4943a', sage: '#7a8b6f' },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Times New Roman"', 'Times', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: { pill: '9999px', card: '20px', xl: "calc(var(--radius) + 4px)", lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)", xs: "calc(var(--radius) - 6px)" },
      boxShadow: { xs: "0 1px 2px 0 rgb(0 0 0 / 0.04)", soft: '0 2px 16px rgba(0,0,0,0.06)', elevated: '0 8px 40px rgba(0,0,0,0.08)', glow: '0 0 24px rgba(184, 115, 51, 0.15)' },
      keyframes: { "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } }, "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } }, fadeIn: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } } },
      animation: { "accordion-down": "accordion-down 0.2s ease-out", "accordion-up": "accordion-up 0.2s ease-out", fadeIn: 'fadeIn 0.6s ease-out forwards' },
    },
  },
  plugins: [require("tailwindcss-animate")],
}