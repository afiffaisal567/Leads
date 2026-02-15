import { NavLink, useNavigate } from 'react-router-dom';
import {
    Drawer,
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Timeline as TimelineIcon,
    Logout as LogoutIcon,
    Spa as LeafIcon,
} from '@mui/icons-material';
import useAuthStore from '../../stores/authStore';

const MENU_ITEMS = [
    { to: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
    { to: '/activity-logs', icon: TimelineIcon, label: 'Activity Logs' },
];

const Sidebar = ({ drawerWidth = 240, mobileOpen, onClose }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const drawerContent = (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#0a3a2b',
                color: 'white',
                pt: 3,
                pb: 2,
            }}
        >
            <Box sx={{ px: 2.5, pb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '10px',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <LeafIcon sx={{ fontSize: 20, color: '#34d399' }} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'white', lineHeight: 1.2 }}>
                            WAFA
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1.5, fontSize: '0.6rem' }}>
                            Leads Manager
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 2 }} />

            <Box sx={{ px: 2.5, flex: 1, overflowY: 'auto', mt: 2 }}>
                <List disablePadding>
                    {MENU_ITEMS.map((item) => (
                        <ListItemButton
                            key={item.to}
                            component={NavLink}
                            to={item.to}
                            onClick={onClose}
                            sx={{
                                borderRadius: '8px',
                                mb: 0.5,
                                py: 1.2,
                                color: 'rgba(255,255,255,0.7)',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                },
                                '&.active': {
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                    color: 'white',
                                    fontWeight: 600,
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                                <item.icon sx={{ fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 'inherit' }}
                            />
                        </ListItemButton>
                    ))}

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

                    <ListItemButton
                        onClick={handleLogout}
                        sx={{
                            borderRadius: '8px',
                            mb: 0.5,
                            py: 1.2,
                            color: 'rgba(255,255,255,0.7)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: 'white' },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                            <LogoutIcon sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.875rem' }} />
                    </ListItemButton>
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', lg: 'none' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        border: 'none',
                        bgcolor: '#0a3a2b',
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', lg: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        border: 'none',
                        bgcolor: '#0a3a2b',
                        position: 'relative',
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Sidebar;