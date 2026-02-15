import { Chip } from '@mui/material';

const colorMap = {
    baru: 'info',
    diproses: 'warning',
    selesai: 'success',
    default: 'default',
    created: 'success',
    updated: 'info',
    deleted: 'error',
    login: 'warning',
    logout: 'default',
};

const Badge = ({ children, variant = 'default', className = '' }) => {
    const color = colorMap[variant] || 'default';
    return (
        <Chip
            label={children}
            color={color}
            variant="outlined"
            size="small"
            className={className}
            sx={{
                fontSize: '0.7rem',
                fontWeight: 500,
                borderRadius: '8px',
            }}
        />
    );
};

export default Badge;