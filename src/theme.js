import {extendTheme} from '@chakra-ui/react';


const colors = { 
  primary: {
    100: '#002AB3',
    200: '#264ABE',
    300: '#B3C4F9',
    400: '#5168B4',
    500: '#F3F6FE'
  },
  secondary: { 
    100: '#082890',
    200: '#010B28',
    300: '#102151',
  },
  neutral: { 
    100: '#A2A5AD',
    200: '#666666'
  },
  fancy: { 
    100: '#ED6292',
    200: '#ED5760'
  },
  signals: { 
    error: '#ED5760',
    success: '#00E236'
  }
};


const Heading = {
  sizes: { 
    h1: {
      fontSize: ['55px', '35px', '85px'], 
      lineHeight: ['1.2', '3em', '1.2em'],
      textAlign: 'center'
    },
    h2: {
      fontSize: '25px', 
      fontFamily: `'Inter', sans-serif`,
      fontWeight: '600',
    },
    h3: {
      fontSize: '20px', 
      fontFamily: `'Inter', sans-serif`,
      fontWeight: '600',
    },
  }
};

const Button = { 
  variants: { 
    hugeButton: { 
      padding: '26px',
      bg: 'primary.100',
      color: '#fff',
      boxShadow: '2px 4px 10px 1px rgba(0, 42, 179, 0.25)',
      _focus: {
        boxShadow: 'none'
      }
    },
    dashedColored: { 
      bg: '#4B65BA',
      border: '2px dashed #fff',
      color: '#fff',
      _focus: {
        boxShadow: 'none'
      }
    },
    solid: {
      bg: '#010B28',
      border: '1px dashed transparent',
      color: '#fff',
      padding: '24px',
      _focus: {
        boxShadow: 'none'
      },
      _hover: { 
        border: '1px dashed #fff',
        bg: '#010B28',
      },
      _active: {
        boxShadow: 'none',
        bg: '#010B28',
      },
    } ,
    error: {
      bg: 'transparent',
      border: '1px dashed #ED5760',
      color: '#ED5760',
      padding: '24px',
      _focus: {
        boxShadow: 'none'
      },
      _hover: { 
        border: '1px dashed #fff',
        bg: '#ED5760',
        color: '#fff'
      },
      _active: {
        boxShadow: 'none',
        bg: '#ED5760',
        color: '#fff'
      },
    } 
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