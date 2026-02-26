/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0f1115',
                foreground: '#f8fafc',
                primary: '#4f46e5',
                secondary: '#8b5cf6',
                accent: '#ec4899',
                muted: '#94a3b8',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            keyframes: {
                blob: {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '33%': { transform: 'translate(30px, -30px) scale(1.05)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(calc(-100% - var(--gap)))' },
                },
            },
            animation: {
                blob: 'blob 9s ease-in-out infinite',
                marquee: 'marquee var(--duration) linear infinite',
            },
            maxWidth: {
                container: '1280px',
            },
        },
    },
    plugins: [],
}
