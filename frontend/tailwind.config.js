/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0a", // Deep Black
                surface: "#111827", // Gray 900
                primary: "#22d3ee", // Cyan 400 (Neon Cyan)
                secondary: "#8b5cf6", // Violet 500 (Neon Violet)
                accent: "#f472b6", // Pink 400 (Subtle accents)
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'blob': 'blob 7s infinite',
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px #22d3ee, 0 0 10px #22d3ee' },
                    '100%': { boxShadow: '0 0 20px #22d3ee, 0 0 30px #22d3ee' },
                }
            },
            backdropBlur: {
                'xs': '2px',
            }
        },
    },
    plugins: [],
}
