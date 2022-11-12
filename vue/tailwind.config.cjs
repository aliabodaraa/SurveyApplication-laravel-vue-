module.exports = {
    content: [
        "./src/**/*.{vue,html,js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}