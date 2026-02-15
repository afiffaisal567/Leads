import { forwardRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';

const Input = forwardRef(({
    label,
    error,
    icon: Icon,
    className = '',
    id,
    ...props
}, ref) => {
    return (
        <TextField
            ref={ref}
            id={id || label?.toLowerCase().replace(/\s+/g, '-')}
            label={label}
            error={!!error}
            helperText={error || ''}
            fullWidth
            className={className}
            slotProps={{
                input: Icon ? {
                    startAdornment: (
                        <InputAdornment position="start">
                            <Icon style={{ width: 16, height: 16, color: '#94a3b8' }} />
                        </InputAdornment>
                    ),
                } : undefined,
            }}
            {...props}
        />
    );
});

Input.displayName = 'Input';
export default Input;