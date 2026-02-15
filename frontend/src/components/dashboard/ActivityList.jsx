import {
    Paper, Typography, Box, Avatar, Chip, List, ListItem,
    ListItemAvatar, ListItemText, Skeleton,
} from '@mui/material';
import { AccessTime as ClockIcon } from '@mui/icons-material';

const statusConfig = {
    created: { label: 'Completed', color: 'success' },
    updated: { label: 'In Progress', color: 'warning' },
    deleted: { label: 'Deleted', color: 'error' },
    login: { label: 'Completed', color: 'success' },
};

const avatarColors = ['#1a3a2a', '#059669', '#d97706', '#2563eb', '#7c3aed'];

const formatTime = (dateString) => {
    if (!dateString) return '';
    const diff = Math.floor((Date.now() - new Date(dateString)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

const ActivityList = ({ activities = [], loading = false }) => {
    if (loading) {
        return (
            <Paper variant="outlined" sx={{
                p: 2.5,
                borderColor: 'divider',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Recent Activity</Typography>
                {[...Array(5)].map((_, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                        <Skeleton variant="circular" width={36} height={36} />
                        <Box sx={{ flex: 1 }}>
                            <Skeleton width="60%" height={16} />
                            <Skeleton width="80%" height={14} sx={{ mt: 0.5 }} />
                        </Box>
                    </Box>
                ))}
            </Paper>
        );
    }

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2.5,
                borderColor: 'divider',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                height: '100%',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Recent Activity</Typography>
                <Box sx={{ p: 0.75, borderRadius: '8px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <ClockIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                </Box>
            </Box>
            {activities.length === 0 ? (
                <Typography variant="body2" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    No activity yet
                </Typography>
            ) : (
                <List disablePadding>
                    {activities.slice(0, 6).map((activity, idx) => {
                        const status = statusConfig[activity.action] || statusConfig.created;
                        const initials = activity.user?.name
                            ? activity.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                            : 'SY';
                        return (
                            <ListItem key={activity.id} disablePadding sx={{ mb: 1.5 }}>
                                <ListItemAvatar sx={{ minWidth: 44 }}>
                                    <Avatar
                                        sx={{
                                            width: 34,
                                            height: 34,
                                            bgcolor: avatarColors[idx % avatarColors.length],
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {initials}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={activity.user?.name || 'System'}
                                    secondary={activity.description}
                                    primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500, noWrap: true }}
                                    secondaryTypographyProps={{ fontSize: '0.75rem', noWrap: true }}
                                />
                                <Chip
                                    label={status.label}
                                    color={status.color}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.65rem', height: 22, ml: 1, flexShrink: 0 }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </Paper>
    );
};

export default ActivityList;