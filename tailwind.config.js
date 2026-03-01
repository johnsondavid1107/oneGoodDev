/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0B0B09',
                'surface': '#151513',
                'surface-alt': '#1A1A16',
                foreground: '#E8E2D6',
                primary: '#C8956C',
                secondary: '#A07850',
                accent: '#D4A574',
                muted: '#847B6F',
                border: 'rgba(232, 226, 214, 0.08)',
            },
            fontFamily: {
                sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                serif: ['Cormorant Garamond', 'Georgia', 'serif'],
            },
            keyframes: {
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(calc(-100% - var(--gap)))' },
                },
            },
            animation: {
                marquee: 'marquee var(--duration) linear infinite',
            },
            maxWidth: {
                container: '1280px',
            },
        },
    },
    plugins: [],
}
