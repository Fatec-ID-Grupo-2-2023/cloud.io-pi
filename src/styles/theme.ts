import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#13F24B',
        },
        secondary: {
            main: '#737373',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

export default theme;