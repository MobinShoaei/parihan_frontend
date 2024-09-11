import { faIR } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';

// Theme configuration
const theme = createTheme(
    {
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#F9F5F2',
                        height: '50px',
                        borderRadius: '8px',
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        textAlign: 'left',
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        justifyContent: 'flex-end',
                    },
                },
            },
            MuiBadge: {
                styleOverrides: {
                    badge: {
                        backgroundColor: '#E3BB2D',
                        color: 'black',
                    },
                },
            },
            MuiCollapse: {
                styleOverrides: {
                    wrapper: {
                        height: '100%',
                    },
                    wrapperInner: {
                        height: '100%',
                    },
                },
            },
            MuiLink: {
                styleOverrides: {
                    underlineNone: {
                        transition: 'all 0.3s ease-in-out',
                    },
                },
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'white',
                        padding: '0 25px',
                        border: '1px solid #C8C4CE',
                        borderBottom: 'none',
                        borderRadius: '4px 4px 0 0',
                        minHeight: '300px',
                    },
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    popper: {
                        direction: 'ltr',
                    },
                },
            },
            MuiToggleButtonGroup: {
                styleOverrides: {
                    root: {
                        height: '37px',
                    },
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            backgroundColor: '#6593d9',
                            color: 'white',
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: '#6fa2ef',
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        '&.Mui-disabled': {
                            color: '#b0b0b0',
                        },
                        borderRadius: '10px',
                    },
                },
            },
        },
        palette: {
            info: {
                main: '#fff',
            },
            primary: {
                main: '#751A29',
            },
            secondary: {
                main: '#E0B49F',
                light: '#E1D0C3',
            },
            warning: {
                main: '#5A72B7',
            },
            success: {
                main: '#00A693',
            },
            error: {
                main: '#A60013',
            },
        },

        typography: {
            fontFamily: 'Yekan',
            body2: {
                fontSize: '14px',
                color: '#8C8C8C',
            },
            h2: {
                fontFamily: 'Doran !important',
                fontSize: '22px',
                color: '#1A1A1A',
            },
        },
        direction: 'rtl',
    },
    faIR,
);

export default theme;
