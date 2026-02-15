import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
} from '@mui/material';
import {
    Mail as MailIcon,
    Lock as LockIcon,
    Spa as LeafIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import useAuthStore from '../stores/authStore';

const schema = yup.object({
    email: yup.string().email('Format email tidak valid').required('Email wajib diisi'),
    password: yup.string().min(6, 'Password minimal 6 karakter').required('Password wajib diisi'),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        const result = await login(data.email, data.password);
        setLoading(false);
        if (result.success) {
            toast.success('Login berhasil!');
            navigate('/dashboard');
        } else {
            toast.error(result.message || 'Login gagal');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 50%, #f1f5f9 100%)',
                p: 2,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                bgcolor: 'rgba(16,185,129,0.05)',
                filter: 'blur(60px)'
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: -100,
                left: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                bgcolor: 'rgba(16,185,129,0.03)',
                filter: 'blur(60px)'
            }} />

            <Container maxWidth="sm" sx={{ position: 'relative' }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 64,
                            height: 64,
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                            boxShadow: '0 8px 24px rgba(16,185,129,0.25)',
                            mb: 2,
                        }}
                    >
                        <LeafIcon sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a3a2a' }}>WAFA Indonesia</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>Leads Management Dashboard</Typography>
                </Box>

                <Card sx={{
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>Selamat Datang</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                            Masuk ke akun admin Anda
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    placeholder="admin@wafa.co.id"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    {...register('email')}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    {...register('password')}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    disabled={loading}
                                    sx={{
                                        py: 1.5,
                                        mt: 1,
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        boxShadow: '0 4px 6px -1px rgba(16,185,129,0.3)',
                                        '&:hover': {
                                            boxShadow: '0 10px 15px -3px rgba(16,185,129,0.3)',
                                            bgcolor: '#047857',
                                        }
                                    }}
                                >
                                    {loading ? <CircularProgress size={22} color="inherit" /> : 'Masuk'}
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>

                <Typography variant="caption" sx={{
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                    mt: 3,
                    fontSize: '0.8rem'
                }}>
                    © 2024 WAFA Indonesia. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default LoginPage;