import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DRAWER_WIDTH = 240;

const DashboardLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Sidebar
                drawerWidth={DRAWER_WIDTH}
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    bgcolor: 'background.paper',
                    my: { xs: 0, lg: 1.5 },
                    mr: { xs: 0, lg: 1.5 },
                    borderRadius: { xs: 0, lg: '24px' },
                    overflow: 'hidden',
                    minHeight: { lg: 'calc(100vh - 24px)' },
                    boxShadow: { lg: '0 10px 30px rgba(0,0,0,0.05)' },
                }}
            >
                <Navbar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
                <Box sx={{ flexGrow: 1, overflow: 'auto', p: { xs: 2, sm: 3 } }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout;