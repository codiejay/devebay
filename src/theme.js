import {extendTheme} from '@chakra-ui/react';


const colors = { 
  primary: {
    100: '#002AB3',
    200: '#264ABE',
  },
  secondary: { 
    100: '#082890',
    200: '#010B28'
  },
  neutral: { 
    100: '#A2A5AD',
    200: '#666666'
  },
  fancy: { 
    100: '#ED6292',
    200: '#ED5760'
  }
};


const Heading = {
  sizes: { 
    h1: {fontSize: ['85px'], lineHeight: '1'},
    h2: {
      fontSize: '25px', 
      fontFamily: `'Inter', sans-serif`,
      fontWeight: '600'
    }
  }
};

const Button = { 
  variants: { 
    hugeButton: { 
      padding: '26px',
      bg: 'primary.100',
      color: '#fff',
      boxShadow: '2px 4px 10px 1px rgba(0, 42, 179, 0.25)'
    },
  }
}


const Theme = extendTheme({ 
  colors,
  components: { 
    Heading,
    Button
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
});

export default Theme;