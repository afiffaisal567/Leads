import { Paper } from '@mui/material';

const Card = ({ children, className = '', gradient = false, padding = true, ...props }) => {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: padding ? 2.5 : 0,
                borderColor: gradient ? 'transparent' : 'divider',
                ...(gradient && {
                    background: 'linear-gradient(135deg, #1a3a2a 0%, #0f2419 100%)',
                    color: 'white',
                    border: 'none',
                }),
                borderRadius: '12px',
                boxShadow: !gradient ? '0 4px 6px -1px rgba(0,0,0,0.05)' : undefined,
            }}
            className={className}
            {...props}
        >
            {children}
        </Paper>
    );
};

export default Card;