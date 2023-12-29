module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#D9F7F3',
        background: '#061E1A',
        primary: '#25A798',
        secondary: '#0D3B34',
        accent: '#3FD5C3',
      },
      rotate: {
        135: '135deg',
      },
    },
    fontFamily: {
      title: ['Rajdhani', 'sans-serif'],
    },
  },
  plugins: [],
};
