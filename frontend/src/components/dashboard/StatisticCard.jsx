import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';

const StatisticCard = ({ title, value, icon: Icon, gradient = false, trend, trendLabel }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) return;
        if (typeof value !== 'number' || value === 0) {
            setDisplayValue(value || 0);
            return;
        }
        hasAnimated.current = true;
        const duration = 1000;
        const steps = 40;
        const stepValue = value / steps;
        let current = 0;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            current = Math.min(Math.round(stepValue * step), value);
            setDisplayValue(current);
            if (step >= steps) {
                clearInterval(timer);
                setDisplayValue(value);
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [value]);

    if (gradient) {
        return (
            <Card
                sx={{
                    background: 'linear-gradient(135deg, #1a3a2a 0%, #0f2419 100%)',
                    color: 'white',
                    border: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(26,58,42,0.25)' },
                    borderRadius: '12px',
                }}
            >
                <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                            {title}
                        </Typography>
                        <Box sx={{ p: 0.75, borderRadius: '8px', bgcolor: 'rgba(255,255,255,0.1)' }}>
                            <TrendingUpIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }} />
                        </Box>
                    </Box>
                    <Typography variant="h4" sx={{ mt: 1.5, fontWeight: 700 }}>
                        {displayValue.toLocaleString('id-ID')}
                    </Typography>
                    {trend !== undefined && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1.5 }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#34d399' }} />
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                                {trendLabel || 'Increased from last month'}
                            </Typography>
                        </Box>
                    )}
                </CardContent>
                <Box sx={{ position: 'absolute', bottom: -20, right: -20, width: 80, height: 80, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Box sx={{ position: 'absolute', bottom: -8, right: -8, width: 56, height: 56, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Card>
        );
    }

    return (
        <Card
            sx={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' },
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
            }}
        >
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <Box sx={{ p: 0.75, borderRadius: '8px', bgcolor: '#f8fafc' }}>
                        <TrendingUpIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                    </Box>
                </Box>
                <Typography variant="h4" sx={{ mt: 1.5, fontWeight: 700, color: 'text.primary' }}>
                    {displayValue.toLocaleString('id-ID')}
                </Typography>
                {trend !== undefined && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1.5 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: trend >= 0 ? '#10b981' : '#ef4444' }} />
                        <Typography variant="caption" sx={{ color: trend >= 0 ? '#059669' : '#ef4444', fontWeight: 500 }}>
                            {trendLabel || (trend >= 0 ? 'Increased from last month' : 'Decreased from last month')}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default StatisticCard;