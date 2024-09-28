const customTheme = {
  colors: {
    primary: '#1C3D5A',
    secondary: '#E8E8E8',
    accent: '#FFD166',
    error: '#D9534F',
    background: '#FFFFFF',
    text: '#1C3D5A',
    textSecondary: '#5A5A5A',
    textAccent: '#FFD166',
  },
  fontFamily: {
    normal: 'Open Sans',
    bold: 'Merriweather',
  },
  fontSize: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
      },
      variants: {
        primary: {
          backgroundColor: '#1C3D5A',
          color: '#FFFFFF',
        },
        secondary: {
          backgroundColor: '#FFFFFF',
          borderColor: '#1C3D5A',
          borderWidth: 1,
          color: '#1C3D5A',
        },
      },
    },
    Input: {
      baseStyle: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        padding: 10,
        borderRadius: 8,
        color: '#1C3D5A',
        backgroundColor: '#FFFFFF',
      },
      variants: {
        error: {
          borderColor: '#D9534F',
          color: '#D9534F',
        },
      },
    },
  },
  breakpoints: {
    base: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1280,
  },
}

export default customTheme
