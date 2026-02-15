import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#10b981',
            light: '#34d399',
            dark: '#047857',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#0f172a',
            light: '#334155',
            dark: '#020617',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a3a2a',
            secondary: '#64748b',
            disabled: '#94a3b8',
        },
        divider: '#e2e8f0',
        action: {
            active: '#64748b',
            hover: 'rgba(16, 185, 129, 0.08)',
            selected: 'rgba(16, 185, 129, 0.12)',
            disabled: '#cbd5e1',
            disabledBackground: '#f1f5f9',
        },
        success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#047857',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
            contrastText: '#ffffff',
        },
        error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626',
            contrastText: '#ffffff',
        },
        info: {
            main: '#0ea5e9',
            light: '#38bdf8',
            dark: '#0369a1',
            contrastText: '#ffffff',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
            fontSize: '2.25rem',
        },
        h2: {
            fontWeight: 700,
            fontSize: '1.875rem',
        },
        h3: {
            fontWeight: 700,
            fontSize: '1.5rem',
        },
        h4: {
            fontWeight: 700,
            fontSize: '1.25rem',
        },
        h5: {
            fontWeight: 700,
            fontSize: '1.125rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
        },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 500,
        },
        subtitle2: {
            fontSize: '0.75rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '0.875rem',
        },
        body2: {
            fontSize: '0.875rem',
        },
        caption: {
            fontSize: '0.75rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 16px',
                },
                containedPrimary: {
                    boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)',
                    '&:hover': {
                        boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)',
                        backgroundColor: '#047857',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e2e8f0',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '&:hover fieldset': {
                            borderColor: '#94a3b8',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#10b981',
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    fontWeight: 700,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        color: 'white',
                        fontWeight: 600,
                    },
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f8fafc',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#f8fafc',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #f1f5f9',
                },
                head: {
                    fontWeight: 600,
                    color: '#64748b',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRadius: 0,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 16,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

export default theme;