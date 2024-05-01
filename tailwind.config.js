/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '  #654DC4',
                secondary: '#F9F9F9',
                accent: '#FFA500',
                neutral: '#333333',
            },
        },
    },
    plugins: [require('daisyui')],
}
