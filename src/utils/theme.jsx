import { createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

const secondary = blueGrey;

export const theme = createTheme({
  palette: {
    primary: {
      light: '#4278cf',
      main: '#2c508a',
      dark: '#101c30',
      contrastText: '#fff',
    },
    secondary: {
      light: secondary[200],
      main: secondary[700],
      dark: secondary[900],
      contrastText: '#000',
    },
  },
});
