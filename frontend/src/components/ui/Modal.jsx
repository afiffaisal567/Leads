import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const sizeMap = {
    sm: 'xs',
    md: 'sm',
    lg: 'md',
};

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth={sizeMap[size] || 'sm'}
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                },
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>{title}</Typography>
                <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: '8px !important' }}>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;