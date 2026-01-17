/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        // Dynamic color classes used in components
        'bg-emerald-500/10',
        'bg-purple-500/10',
        'bg-sky-500/10',
        'border-emerald-500/20',
        'border-purple-500/20',
        'border-sky-500/20',
        'text-emerald-400',
        'text-purple-400',
        'text-sky-400',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}
