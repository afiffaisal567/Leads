import { useEffect, useState } from 'react';
import {
    Box, Typography, Paper, Chip, Avatar, Stack,
    Divider, Skeleton, useMediaQuery, useTheme,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow,
} from '@mui/material';
import { AccessTime as ClockIcon, FilterList as FilterIcon } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { activityLogService } from '../services/activityLogService';
import Badge from '../components/ui/Badge';
import { Pagination } from '../components/ui/Table';

const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
        timeZone: 'Asia/Jakarta',
    });
};

const shortenDescription = (desc) => {
    if (!desc) return '-';
    let short = desc;
    if (short.length > 80) {
        short = short.substring(0, 77) + '...';
    }
    return short;
};

const actions = ['', 'login', 'logout'];

const actionLabels = {
    '': 'Semua',
    'login': 'Login',
    'logout': 'Logout',
};

const ActivityLogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [actionFilter, setActionFilter] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [searchParams] = useSearchParams();
    const navbarSearch = searchParams.get('search') || '';

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            try {
                const response = await activityLogService.getActivityLogs({
                    page: currentPage,
                    per_page: 8,
                    action: actionFilter || undefined,
                    search: navbarSearch || undefined,
                });
                if (response.success) {
                    setLogs(response.data?.data || []);
                    setMeta(response.data?.meta || {});
                }
            } catch (error) {
                console.error('Error fetching logs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, [currentPage, actionFilter, navbarSearch]);

    const handleFilterClick = (action) => {
        setActionFilter(action);
        setCurrentPage(1);
    };

    return (
        <Box sx={{ px: { xs: 1, sm: 3 } }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5">Activity Logs</Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>Riwayat semua aktivitas admin</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                        flexWrap: 'wrap',
                        gap: 1,
                        '& > *': { mb: { xs: 0.5, sm: 0 } },
                    }}
                >
                    <FilterIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    {actions.map((action) => (
                        <Chip
                            key={action || 'all'}
                            label={actionLabels[action]}
                            size="small"
                            variant={actionFilter === action ? 'filled' : 'outlined'}
                            color={actionFilter === action ? 'primary' : 'default'}
                            onClick={() => handleFilterClick(action)}
                            sx={{
                                cursor: 'pointer',
                                borderRadius: '8px',
                                fontWeight: actionFilter === action ? 600 : 400,
                                '&.MuiChip-outlined': {
                                    borderColor: '#cbd5e1',
                                    color: '#64748b',
                                    '&:hover': {
                                        borderColor: '#94a3b8',
                                        bgcolor: '#f8fafc',
                                    }
                                }
                            }}
                        />
                    ))}
                </Stack>
            </Box>

            <Paper
                variant="outlined"
                sx={{
                    borderColor: 'divider',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                }}
            >
                {loading ? (
                    <Box sx={{ p: 2.5 }}>
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={i} variant="rounded" height={44} sx={{ mb: 1 }} />
                        ))}
                    </Box>
                ) : logs.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <ClockIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 1.5 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Belum ada aktivitas</Typography>
                    </Box>
                ) : (
                    <>
                        {!isMobile ? (
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{
                                                fontWeight: 600, color: 'text.secondary',
                                                fontSize: '0.75rem', textTransform: 'uppercase', py: 1.5,
                                                width: 160,
                                            }}>Waktu</TableCell>
                                            <TableCell sx={{
                                                fontWeight: 600, color: 'text.secondary',
                                                fontSize: '0.75rem', textTransform: 'uppercase', py: 1.5,
                                                width: 140,
                                            }}>Admin</TableCell>
                                            <TableCell sx={{
                                                fontWeight: 600, color: 'text.secondary',
                                                fontSize: '0.75rem', textTransform: 'uppercase', py: 1.5,
                                                width: 100,
                                            }}>Aksi</TableCell>
                                            <TableCell sx={{
                                                fontWeight: 600, color: 'text.secondary',
                                                fontSize: '0.75rem', textTransform: 'uppercase', py: 1.5,
                                            }}>Deskripsi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {logs.map((log) => (
                                            <TableRow key={log.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                                                <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary', whiteSpace: 'nowrap', py: 1.5 }}>
                                                    {formatDateTime(log.created_at)}
                                                </TableCell>
                                                <TableCell sx={{ py: 1.5 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Avatar sx={{ width: 28, height: 28, bgcolor: '#d1fae5', color: '#047857', fontSize: '0.65rem', fontWeight: 700 }}>
                                                            {log.user?.name?.[0]?.toUpperCase() || '?'}
                                                        </Avatar>
                                                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>{log.user?.name || 'System'}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ py: 1.5 }}>
                                                    <Badge variant={log.action}>{log.action}</Badge>
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '0.8rem', py: 1.5, maxWidth: 300 }}>
                                                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }} title={log.description}>
                                                        {shortenDescription(log.description)}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {logs.map((log) => (
                                    <Paper key={log.id} variant="outlined" sx={{
                                        p: 2,
                                        bgcolor: '#f8fafc',
                                        borderColor: 'divider',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar sx={{ width: 28, height: 28, bgcolor: '#d1fae5', color: '#047857', fontSize: '0.65rem', fontWeight: 700 }}>
                                                    {log.user?.name?.[0]?.toUpperCase() || '?'}
                                                </Avatar>
                                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>{log.user?.name || 'System'}</Typography>
                                            </Box>
                                            <Badge variant={log.action}>{log.action}</Badge>
                                        </Stack>
                                        <Typography variant="body2" sx={{ mb: 0.5, fontSize: '0.8rem', color: 'text.primary' }}>
                                            {shortenDescription(log.description)}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                                            {formatDateTime(log.created_at)}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Box>
                        )}
                        {meta.last_page > 1 && (
                            <>
                                <Divider />
                                <Pagination
                                    currentPage={meta.current_page || 1}
                                    totalPages={meta.last_page || 1}
                                    onPageChange={setCurrentPage}
                                />
                            </>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default ActivityLogsPage;