import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell,
} from 'recharts';
import { useState } from 'react';
import { Paper, Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';

const sampleData = [
    { name: 'S', leads: 12 },
    { name: 'M', leads: 18 },
    { name: 'T', leads: 14 },
    { name: 'W', leads: 22 },
    { name: 'T', leads: 16 },
    { name: 'F', leads: 10 },
    { name: 'S', leads: 20 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Box sx={{
                bgcolor: '#1a3a2a',
                color: 'white',
                px: 1.5,
                py: 1,
                borderRadius: '8px',
                boxShadow: 3
            }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>{label}</Typography>
                <Typography variant="caption" sx={{ display: 'block', color: '#34d399' }}>{payload[0].value} leads</Typography>
            </Box>
        );
    }
    return null;
};

const CustomBar = (props) => {
    const { x, y, width, height, index } = props;
    const stripeCount = Math.floor(height / 6);
    const maxValue = Math.max(...sampleData.map(d => d.leads));
    const percentage = Math.round((sampleData[index]?.leads / maxValue) * 100);
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} rx={6} ry={6} fill="#1a3a2a" />
            {Array.from({ length: stripeCount }).map((_, i) => (
                <rect
                    key={i}
                    x={x + 3}
                    y={y + height - (i + 1) * 6 + 1}
                    width={width - 6}
                    height={3}
                    rx={1.5}
                    fill="rgba(255,255,255,0.08)"
                />
            ))}
            {percentage >= 90 && (
                <text x={x + width / 2} y={y - 8} textAnchor="middle" fill="#1a3a2a" fontSize={11} fontWeight={600}>
                    {percentage}%
                </text>
            )}
        </g>
    );
};

const LeadsChart = ({ data }) => {
    const [period, setPeriod] = useState('weekly');
    const chartData = data && data.length > 0 ? data : sampleData;

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2.5,
                height: '100%',
                borderColor: 'divider',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Leads Analytics</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        Weekly lead trend overview
                    </Typography>
                </Box>
                <ToggleButtonGroup
                    value={period}
                    exclusive
                    onChange={(_, v) => v && setPeriod(v)}
                    size="small"
                    sx={{
                        '& .MuiToggleButton-root': {
                            textTransform: 'capitalize',
                            fontSize: '0.75rem',
                            px: 1.5,
                            py: 0.5,
                            border: 'none',
                            borderRadius: '8px !important',
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                bgcolor: 'white',
                                color: 'text.primary',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                fontWeight: 600,
                            },
                        },
                        bgcolor: '#f1f5f9',
                        borderRadius: '10px',
                        p: 0.4,
                    }}
                >
                    <ToggleButton value="weekly">Weekly</ToggleButton>
                    <ToggleButton value="monthly">Monthly</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box sx={{ height: 256 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 500 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }} />
                        <Bar dataKey="leads" shape={<CustomBar />} maxBarSize={36}>
                            {chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

export default LeadsChart;