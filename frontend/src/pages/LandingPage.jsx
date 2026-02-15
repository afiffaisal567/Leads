import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    InputAdornment,
    CircularProgress,
    Container,
    Stack,
    Fade,
} from '@mui/material';
import {
    Person as PersonIcon,
    Phone as PhoneIcon,
    Mail as MailIcon,
    Business as BusinessIcon,
    Spa as LeafIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { leadService } from '../services/leadService';

const schema = yup.object({
    nama: yup.string().max(255).required('Nama wajib diisi'),
    nomor_whatsapp: yup
        .string()
        .matches(/^(\+62|62|0)[0-9]{9,12}$/, 'Format nomor WhatsApp tidak valid (contoh: 081234567890)')
        .required('Nomor WhatsApp wajib diisi'),
    email: yup.string().email('Format email tidak valid').max(255).required('Email wajib diisi'),
    nama_lembaga: yup.string().max(255).required('Nama lembaga wajib diisi'),
});

const LandingPage = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await leadService.submitPublic(data);
            if (response.success) {
                setSubmitted(true);
            } else {
                toast.error(response.message || 'Gagal mengirim data');
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.';
            const fieldErrors = error.response?.data?.errors;
            if (fieldErrors) {
                Object.values(fieldErrors).flat().forEach((err) => toast.error(err));
            } else {
                toast.error(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 40%, #d1fae5 70%, #f1f5f9 100%)',
                p: 2,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box sx={{
                position: 'absolute',
                top: -120,
                right: -80,
                width: 350,
                height: 350,
                borderRadius: '50%',
                bgcolor: 'rgba(16,185,129,0.08)',
                filter: 'blur(80px)',
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: -120,
                left: -80,
                width: 350,
                height: 350,
                borderRadius: '50%',
                bgcolor: 'rgba(16,185,129,0.05)',
                filter: 'blur(80px)',
            }} />
            <Box sx={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                width: 200,
                height: 200,
                borderRadius: '50%',
                bgcolor: 'rgba(5,150,105,0.04)',
                filter: 'blur(60px)',
                transform: 'translate(-50%, -50%)',
            }} />

            <Container maxWidth="sm" sx={{ position: 'relative' }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 72,
                            height: 72,
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                            boxShadow: '0 12px 32px rgba(16,185,129,0.3)',
                            mb: 2.5,
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'scale(1.05)' },
                        }}
                    >
                        <LeafIcon sx={{ fontSize: 36, color: 'white' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a3a2a', letterSpacing: '-0.02em' }}>
                        WAFA Indonesia
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
                        Form Pendaftaran
                    </Typography>
                </Box>

                <Card sx={{
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
                    overflow: 'hidden',
                    border: '1px solid rgba(226,232,240,0.8)',
                    backdropFilter: 'blur(10px)',
                    bgcolor: 'rgba(255,255,255,0.95)',
                }}>
                    <CardContent sx={{ p: { xs: 3, sm: 4.5 } }}>
                        {submitted ? (
                            <Fade in={submitted} timeout={600}>
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            bgcolor: '#d1fae5',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 3,
                                            animation: 'pulse 2s ease-in-out infinite',
                                            '@keyframes pulse': {
                                                '0%, 100%': { boxShadow: '0 0 0 0 rgba(16,185,129,0.2)' },
                                                '50%': { boxShadow: '0 0 0 16px rgba(16,185,129,0)' },
                                            },
                                        }}
                                    >
                                        <CheckCircleIcon sx={{ fontSize: 44, color: '#059669' }} />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a3a2a', mb: 1 }}>
                                        Terima Kasih!
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#64748b', mb: 1, lineHeight: 1.7 }}>
                                        Data Anda telah berhasil dikirim.
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6 }}>
                                        Tim kami akan segera menghubungi Anda melalui WhatsApp atau Email.
                                    </Typography>
                                </Box>
                            </Fade>
                        ) : (
                            <>
                                <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 700, color: '#1e293b' }}>
                                    Daftar Sekarang
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3.5 }}>
                                    Lengkapi data di bawah ini untuk mendaftar
                                </Typography>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Stack spacing={2.5}>
                                        <TextField
                                            label="Nama Lengkap"
                                            placeholder="Masukkan nama lengkap"
                                            error={!!errors.nama}
                                            helperText={errors.nama?.message}
                                            fullWidth
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px',
                                                    transition: 'box-shadow 0.2s ease',
                                                    '&.Mui-focused': {
                                                        boxShadow: '0 0 0 3px rgba(16,185,129,0.1)',
                                                    },
                                                },
                                            }}
                                            {...register('nama')}
                                        />
                                        <TextField
                                            label="Nomor WhatsApp"
                                            placeholder="081234567890"
                                            error={!!errors.nomor_whatsapp}
                                            helperText={errors.nomor_whatsapp?.message}
                                            fullWidth
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PhoneIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px',
                                                    transition: 'box-shadow 0.2s ease',
                                                    '&.Mui-focused': {
                                                        boxShadow: '0 0 0 3px rgba(16,185,129,0.1)',
                                                    },
                                                },
                                            }}
                                            {...register('nomor_whatsapp')}
                                        />
                                        <TextField
                                            label="Email"
                                            type="email"
                                            placeholder="email@contoh.com"
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            fullWidth
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <MailIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px',
                                                    transition: 'box-shadow 0.2s ease',
                                                    '&.Mui-focused': {
                                                        boxShadow: '0 0 0 3px rgba(16,185,129,0.1)',
                                                    },
                                                },
                                            }}
                                            {...register('email')}
                                        />
                                        <TextField
                                            label="Nama Lembaga"
                                            placeholder="Masukkan nama lembaga"
                                            error={!!errors.nama_lembaga}
                                            helperText={errors.nama_lembaga?.message}
                                            fullWidth
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <BusinessIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px',
                                                    transition: 'box-shadow 0.2s ease',
                                                    '&.Mui-focused': {
                                                        boxShadow: '0 0 0 3px rgba(16,185,129,0.1)',
                                                    },
                                                },
                                            }}
                                            {...register('nama_lembaga')}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            disabled={loading}
                                            sx={{
                                                py: 1.6,
                                                mt: 1,
                                                borderRadius: '10px',
                                                fontWeight: 700,
                                                fontSize: '0.95rem',
                                                textTransform: 'none',
                                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                boxShadow: '0 6px 20px rgba(16,185,129,0.3)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    boxShadow: '0 10px 28px rgba(16,185,129,0.4)',
                                                    transform: 'translateY(-1px)',
                                                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                                },
                                                '&:active': {
                                                    transform: 'translateY(0)',
                                                },
                                            }}
                                        >
                                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Daftar Sekarang'}
                                        </Button>
                                    </Stack>
                                </form>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="caption" sx={{
                        display: 'block',
                        color: '#cbd5e1',
                        mt: 1.5,
                        fontSize: '0.75rem',
                    }}>
                        © 2026 WAFA Indonesia. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default LandingPage;
