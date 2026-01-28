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
                '-deep -neutral': '#1F2937',
                '-soft -graphite': '#52525B',
                '-slate -indigo': '#1E40AF',
                '-stone -grey': '#71717A',
                '-borders': '#E5E7EB',
                '-subtle -highlight': '#1E40AF',
                background: '#FFFFFF',
                secondary: '#6B7280',
                foreground: '#1F2937',
                'secondary-foreground': '#FFFFFF',
                'primary-foreground': '#FFFFFF',
                primary: '#1E40AF'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
