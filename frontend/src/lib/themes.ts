import { createTheme } from '@mui/material/styles';
// import { grey } from '@mui/material/colors';

// declare module '@mui/material/styles' {
//     // color: dark の追加
//     interface Palette {
//         dark: Palette['primary'];
//     }
//
//     interface PaletteOptions {
//         dark: PaletteOptions['primary'];
//     }
//
//     // interface PaletteColor {
//     //     darker?: string;
//     // }
//     // interface SimplePaletteColorOptions {
//     //     darker?: string;
//     // }
// }

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#3949ab',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: '#f44336',
    },
    background: {
      paper: '#f9f9f9',
    },
  },
});

