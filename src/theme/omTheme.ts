import { createTheme } from '@mui/material/styles'
import { PrimaryThemeColor, QuaternaryColor, SecondaryThemeColor, TernaryColor, WhiteTeamColor } from '../consts/common'

export default createTheme({
  palette: {
    primary: {
      main: PrimaryThemeColor,
      dark: TernaryColor,
    },
    secondary: {
      main: SecondaryThemeColor,
      light: QuaternaryColor,
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '6rem !important',
      fontWeight: 'bold',
    },
    h2: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '3.75rem !important',
      fontWeight: 'bold',
    },
    h3: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '3.75rem !important',
      fontWeight: 'bold',
    },
    h4: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '2.125rem !important',
      color: TernaryColor,
      fontWeight: 'bold',
    },
    h5: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '1.5rem !important',
      color: TernaryColor,
      fontWeight: 'bold',
    },
    h6: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '1.25rem !important',
      color: TernaryColor,
      fontWeight: 'bold',
    },
    subtitle1: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '1rem !important',
      fontWeight: 'bold',
    },
    subtitle2: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '0.875rem !important',
      fontWeight: 'bold',
    },
    body1: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '1rem !important',
      color: TernaryColor,
      fontWeight: 'bold',
    },
    body2: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '0.875rem !important',
      fontWeight: 'bold',
    },
    caption: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '0.75rem !important',
      fontWeight: 'bold',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: WhiteTeamColor,
          color: TernaryColor,
        },
        text: {
          boxShadow: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
      styleOverrides: {
        root: {
          '& label': {
            color: TernaryColor,
            fontWeight: 'bold',
            paddingLeft: '5%',
          },
          '& input': {
            color: TernaryColor,
            fontWeight: 'bold',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: TernaryColor,
          fontWeight: 'bold',
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'standard',
      },
      styleOverrides: {
        root: {
          '& label': {
            color: TernaryColor,
            fontWeight: 'bold',
          },
          '& select': {
            color: TernaryColor,
            fontWeight: 'bold',
          },
        },
      },
    },
  },
})
