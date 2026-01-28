/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '500' }],
                '3xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '0.03em', fontWeight: '600' }],
                '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.03em', fontWeight: '600' }],
                '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '0.04em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.04em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '0.05em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1.05', letterSpacing: '0.05em', fontWeight: '800' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.06em', fontWeight: '800' }],
            },
            fontFamily: {
                heading: "madefor-display",
                paragraph: "nunito sans"
            },
            colors: {
                '-white -sand': '#FFFFFF',
                '-warm -light -grey': '#F6F6F4',
                '-deep -neutral': '#2A2E34',
                '-soft -graphite': '#52525B',
                '-slate -indigo': '#4F46E5',
                '-stone -grey': '#71717A',
                '-borders': '#E4E4E7',
                '-subtle -highlight': '#6366F1',
                background: '#FFFFFF',
                secondary: '#71717A',
                foreground: '#2A2E34',
                'secondary-foreground': '#FFFFFF',
                'primary-foreground': '#FFFFFF',
                primary: '#4F46E5'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
