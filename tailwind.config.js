module.exports = {
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  }
};

// module.exports = {
//   purge: [],
//   // purge: ['./pages/**/*.{js}', './components/**/*.{js}'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {}
//   },
//   variants: {
//     extend: {}
//   },
//   plugins: []
// };
