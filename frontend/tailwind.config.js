module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        quiz: ['Fredoka One', 'cursive']
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({strategy: 'class'}),
    require('@tailwindcss/typography'),
  ],
}
