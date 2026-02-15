import { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    TextField,
    Avatar,
    Box,
    Typography,
    InputAdornment,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

const Navbar = ({ onMenuToggle }) => {
    const user = useAuthStore((state) => state.user);
    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : 'AD';

    const [searchParams, setSearchParams] = useSearchParams();
    const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearch) {
                setSearchParams({ search: localSearch }, { replace: true });
            } else {
                const newParams = new URLSearchParams(searchParams);
                newParams.delete('search');
                setSearchParams(newParams, { replace: true });
            }
        }, 400);
        return () => clearTimeout(timer);
    }, [localSearch]);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderBottom: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
        >
            <Toolbar sx={{ gap: 1, minHeight: { xs: 56 } }}>
                <IconButton
                    onClick={onMenuToggle}
                    sx={{ display: { lg: 'none' }, color: 'text.secondary' }}
                >
                    <MenuIcon />
                </IconButton>

                <TextField
                    placeholder="Cari data..."
                    size="small"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    sx={{
                        width: { xs: 160, sm: 280 },
                        '& .MuiOutlinedInput-root': {
                            bgcolor: '#f8fafc',
                            borderRadius: '8px',
                        },
                        '& .MuiInputBase-input': {
                            py: 0.5,
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1, cursor: 'pointer' }}>
                    <Avatar
                        sx={{
                            width: 34,
                            height: 34,
                            bgcolor: 'primary.main',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                        }}
                    >
                        {initials}
                    </Avatar>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.3 }}>
                            {user?.name || 'Admin'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                            {user?.email || 'admin@wafa.co.id'}
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;