import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

const LeadStatusChart = ({ stats = {} }) => {
    const data = [
        { name: 'Completed', value: stats.selesai || 25, color: '#1a3a2a' },
        { name: 'In Progress', value: stats.diproses || 35, color: '#3d7a54' },
        { name: 'Pending', value: stats.baru || 40, color: '#b8ddc1' },
    ];

    const total = data.reduce((sum, d) => sum + d.value, 0);
    const completedPct = total > 0 ? Math.round((data[0].value / total) * 100) : 0;

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2.5,
                borderColor: 'divider',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            }}
        >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Lead Status</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', width: 180, height: 180 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={80}
                                startAngle={90}
                                endAngle={-270}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>{completedPct}%</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Completed</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5, mt: 2 }}>
                {data.map((item) => (
                    <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>{item.name}</Typography>
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};

export default LeadStatusChart;