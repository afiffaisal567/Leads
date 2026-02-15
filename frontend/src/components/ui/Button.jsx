import { Button as MuiButton, CircularProgress } from '@mui/material';

const variantMap = {
    primary: { variant: 'contained', color: 'primary' },
    secondary: { variant: 'outlined', color: 'inherit' },
    danger: { variant: 'contained', color: 'error' },
    ghost: { variant: 'text', color: 'inherit' },
};

const sizeMap = {
    sm: 'small',
    md: 'medium',
    lg: 'large',
};

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className = '',
    icon: Icon,
    ...props
}) => {
    const mapped = variantMap[variant] || variantMap.primary;
    return (
        <MuiButton
            variant={mapped.variant}
            color={mapped.color}
            size={sizeMap[size] || 'medium'}
            disabled={disabled || loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : Icon ? <Icon style={{ width: 16, height: 16 }} /> : undefined}
            className={className}
            sx={{
                minWidth: 0,
                borderRadius: '8px',
                fontWeight: 600,
                ...props.sx,
            }}
            {...props}
        >
            {children}
        </MuiButton>
    );
};

export default Button;