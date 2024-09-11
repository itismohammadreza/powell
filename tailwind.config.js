/** @type {import('tailwindcss').Config} */

const addPaddingToGridChildren = (props) => {
  props.addComponents({
    '.grid > *': {
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
    }
  })
}

const defineTypography = (props) => {
  props.addComponents({
    'h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1': {
      marginTop: '0',
      marginBottom: '0.5rem',
      fontWeight: '500',
      lineHeight: '1.2',
    },
    'h1, .h1': {
      fontSize: 'calc(1.375rem + 1.5vw)'
    },
    '@media (min-width: 1200px)': {
      'h1, .h1': {
        fontSize: '2.5rem'
      }
    },
    'h2, .h2': {
      fontSize: 'calc(1.325rem + 0.9vw)'
    },
    '@media (min-width: 1200px)': {
      'h2, .h2': {
        fontSize: '2rem'
      }
    },
    'h3, .h3': {
      fontSize: 'calc(1.3rem + 0.6vw)'
    },
    '@media (min-width: 1200px)': {
      'h3, .h3': {
        fontSize: '1.75rem'
      }
    },
    'h4, .h4': {
      fontSize: 'calc(1.275rem + 0.3vw)'
    },
    '@media (min-width: 1200px)': {
      'h4, .h4': {
        fontSize: '1.5rem'
      }
    },
    'h5, .h5': {
      fontSize: '1.25rem'
    },
    'h6, .h6': {
      fontSize: '1rem'
    },
    '.display-1': {
      fontSize: 'calc(1.625rem + 4.5vw)',
      fontWeight: '300',
      lineHeight: '1.2'
    },
    '@media (min-width: 1200px)': {
      '.display-1': {
        fontSize: '5rem',
      }
    },
    '.display-2': {
      fontSize: 'calc(1.575rem + 3.9vw)',
      fontWeight: '300',
      lineHeight: '1.2'
    },
    '@media (min-width: 1200px)': {
      '.display-2': {
        fontSize: '4.5rem',
      }
    },
    '.display-3': {
      fontSize: 'calc(1.525rem + 3.3vw)',
      fontWeight: '300',
      lineHeight: '1.2'
    },
    '@media (min-width: 1200px)': {
      '.display-3': {
        fontSize: '4rem',
      }
    },
    '.display-4': {
      fontSize: 'calc(1.475rem + 2.7vw)',
      fontWeight: '300',
      lineHeight: '1.2'
    },
    '@media (min-width: 1200px)': {
      '.display-4': {
        fontSize: '3.5rem',
      }
    },
    '.display-5': {
      fontSize: 'calc(1.425rem + 2.1vw)',
      fontWeight: '300',
      lineHeight: '1.2'
    },
    '@media (min-width: 1200px)': {
      '.display-5': {
        fontSize: '3rem',
      }
    },
    '.display-6': {
      fontSize: 'calc(1.375rem + 1.5vw)',
      fontWeight: '300',
      lineHeight: '1.2'
    },
    '@media (min-width: 1200px)': {
      '.display-6': {
        fontSize: '2.5rem',
      }
    },
  })
}

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
    },
    extend: {
      container: {
        center: true
      },
    },
  },
  plugins: [
    addPaddingToGridChildren,
    defineTypography
  ],
}
