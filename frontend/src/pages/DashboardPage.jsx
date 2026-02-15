import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box, Typography, Paper, TextField, InputAdornment,
    IconButton, Avatar, Stack, Divider,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { Mail, Phone, Building, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { leadService } from '../services/leadService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import { Table, Pagination } from '../components/ui/Table';

const schema = yup.object({
    nama: yup.string().max(255).required('Nama wajib diisi'),
    nomor_whatsapp: yup
        .string()
        .matches(/^(\+62|62|0)[0-9]{9,12}$/, 'Format nomor WhatsApp tidak valid (contoh: 081234567890)')
        .required('Nomor WhatsApp wajib diisi'),
    email: yup.string().email('Format email tidak valid').max(255).required('Email wajib diisi'),
    nama_lembaga: yup.string().max(255).required('Nama lembaga wajib diisi'),
});

const DashboardPage = () => {
    const [leads, setLeads] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const [deletingLead, setDeletingLead] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [searchParams] = useSearchParams();
    const navbarSearch = searchParams.get('search') || '';

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        try {
            const response = await leadService.getLeads({
                page: currentPage,
                per_page: 10,
                search: navbarSearch || search || undefined,
            });
            if (response.success) {
                setLeads(response.data?.data || []);
                setMeta(response.data?.meta || {});
            }
        } catch {
            toast.error('Gagal memuat data leads');
        } finally {
            setLoading(false);
        }
    }, [currentPage, search, navbarSearch]);

    useEffect(() => { fetchLeads(); }, [fetchLeads]);

    useEffect(() => {
        const timer = setTimeout(() => setCurrentPage(1), 300);
        return () => clearTimeout(timer);
    }, [search, navbarSearch]);

    const openAddModal = () => {
        setEditingLead(null);
        reset({ nama: '', nomor_whatsapp: '', email: '', nama_lembaga: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (lead) => {
        setEditingLead(lead);
        setValue('nama', lead.nama);
        setValue('nomor_whatsapp', lead.nomor_whatsapp);
        setValue('email', lead.email);
        setValue('nama_lembaga', lead.nama_lembaga);
        setIsModalOpen(true);
    };

    const openDeleteModal = (lead) => {
        setDeletingLead(lead);
        setIsDeleteModalOpen(true);
    };

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            if (editingLead) {
                await leadService.updateLead(editingLead.id, data);
                toast.success('Lead berhasil diperbarui');
            } else {
                await leadService.createLead(data);
                toast.success('Lead berhasil ditambahkan');
            }
            setIsModalOpen(false);
            reset();
            fetchLeads();
        } catch (error) {
            const message = error.response?.data?.message || 'Gagal menyimpan data lead';
            const fieldErrors = error.response?.data?.errors;
            if (fieldErrors) {
                Object.values(fieldErrors).flat().forEach((err) => toast.error(err));
            } else {
                toast.error(message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingLead) return;
        setSubmitting(true);
        try {
            await leadService.deleteLead(deletingLead.id);
            toast.success('Lead berhasil dihapus');
            setIsDeleteModalOpen(false);
            setDeletingLead(null);
            fetchLeads();
        } catch {
            toast.error('Gagal menghapus lead');
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric',
        });
    };

    const columns = [
        {
            key: 'nama',
            label: 'Nama',
            render: (row) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#d1fae5', color: '#047857', fontSize: '0.75rem', fontWeight: 700 }}>
                        {row.nama?.[0]?.toUpperCase() || '?'}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.nama}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{formatDate(row.created_at)}</Typography>
                    </Box>
                </Box>
            ),
        },
        {
            key: 'nomor_whatsapp',
            label: 'WhatsApp',
            render: (row) => <Typography variant="body2">{row.nomor_whatsapp}</Typography>,
        },
        {
            key: 'email',
            label: 'Email',
            render: (row) => <Typography variant="body2">{row.email}</Typography>,
        },
        {
            key: 'nama_lembaga',
            label: 'Lembaga',
            render: (row) => <Badge variant="default">{row.nama_lembaga}</Badge>,
        },
        {
            key: 'actions',
            label: 'Aksi',
            render: (row) => (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton size="small" onClick={() => openEditModal(row)} sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            color: '#2563eb',
                            bgcolor: '#eff6ff',
                            borderRadius: '8px'
                        }
                    }}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => openDeleteModal(row)} sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            color: '#dc2626',
                            bgcolor: '#fef2f2',
                            borderRadius: '8px'
                        }
                    }}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const renderMobileCard = (row) => (
        <Paper key={row.id} variant="outlined" sx={{
            p: 2,
            borderColor: 'divider',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            mb: 1.5,
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#d1fae5', color: '#047857', fontWeight: 700 }}>
                        {row.nama?.[0]?.toUpperCase() || '?'}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.nama}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{row.nama_lembaga}</Typography>
                    </Box>
                </Box>
                <Box>
                    <IconButton size="small" onClick={() => openEditModal(row)} sx={{
                        '&:hover': {
                            bgcolor: '#eff6ff',
                            borderRadius: '8px'
                        }
                    }}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => openDeleteModal(row)} sx={{
                        '&:hover': {
                            bgcolor: '#fef2f2',
                            borderRadius: '8px'
                        }
                    }}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
            <Stack direction="row" spacing={2}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{row.nomor_whatsapp}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{row.email}</Typography>
            </Stack>
        </Paper>
    );

    return (
        <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 1, sm: 3 } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h5">Dashboard</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Lihat, cari, edit, dan hapus data leads
                    </Typography>
                </Box>
                <Button icon={AddIcon} onClick={openAddModal} sx={{
                    borderRadius: '8px',
                    py: 1.2,
                    px: 2,
                    fontWeight: 600,
                    boxShadow: '0 4px 6px -1px rgba(16,185,129,0.3)',
                    '&:hover': {
                        boxShadow: '0 10px 15px -3px rgba(16,185,129,0.3)',
                        bgcolor: '#047857',
                    }
                }}>
                    Tambah Lead
                </Button>
            </Stack>

            <Paper
                variant="outlined"
                sx={{
                    borderColor: 'divider',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                }}
            >

                <Box sx={{ p: 2 }}>
                    <Table
                        columns={columns}
                        data={leads}
                        loading={loading}
                        emptyMessage="Belum ada data leads"
                        renderMobileCard={renderMobileCard}
                    />
                </Box>
                {meta.last_page > 1 && (
                    <>
                        <Divider />
                        <Pagination
                            currentPage={meta.current_page || 1}
                            totalPages={meta.last_page || 1}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </Paper>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingLead ? 'Edit Lead' : 'Tambah Lead Baru'} size="lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2.5}>
                        <Input label="Nama Lengkap" placeholder="Masukkan nama lengkap" icon={User} error={errors.nama?.message} {...register('nama')} />
                        <Input label="Nomor WhatsApp" placeholder="081234567890" icon={Phone} error={errors.nomor_whatsapp?.message} {...register('nomor_whatsapp')} />
                        <Input label="Email" type="email" placeholder="email@contoh.com" icon={Mail} error={errors.email?.message} {...register('email')} />
                        <Input label="Nama Lembaga" placeholder="Masukkan nama lembaga" icon={Building} error={errors.nama_lembaga?.message} {...register('nama_lembaga')} />
                        <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                            <Button type="submit" loading={submitting} className="flex-1" sx={{
                                borderRadius: '8px',
                                py: 1.2,
                                fontWeight: 600,
                                boxShadow: '0 4px 6px -1px rgba(16,185,129,0.3)',
                                '&:hover': {
                                    boxShadow: '0 10px 15px -3px rgba(16,185,129,0.3)',
                                    bgcolor: '#047857',
                                }
                            }}>
                                {editingLead ? 'Simpan Perubahan' : 'Tambah Lead'}
                            </Button>
                            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1" sx={{
                                borderRadius: '8px',
                                py: 1.2,
                                fontWeight: 600,
                                border: '1px solid #cbd5e1',
                                '&:hover': {
                                    border: '1px solid #94a3b8',
                                    bgcolor: '#f8fafc',
                                }
                            }}>
                                Batal
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Konfirmasi Hapus" size="sm">
                <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Box sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        bgcolor: '#fef2f2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2.5,
                    }}>
                        <DeleteIcon sx={{ color: '#ef4444', fontSize: 28 }} />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                        Apakah Anda yakin ingin menghapus lead ini?
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                        {deletingLead?.nama}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 3 }}>
                        Tindakan ini tidak dapat dibatalkan.
                    </Typography>
                    <Stack spacing={1.5}>
                        <Button variant="danger" onClick={handleDelete} loading={submitting} sx={{
                            borderRadius: '8px',
                            py: 1.3,
                            fontWeight: 600,
                            width: '100%',
                            bgcolor: '#ef4444',
                            '&:hover': {
                                bgcolor: '#dc2626',
                            }
                        }}>Hapus Lead</Button>
                        <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)} sx={{
                            borderRadius: '8px',
                            py: 1.3,
                            fontWeight: 600,
                            width: '100%',
                            border: '1px solid #e2e8f0',
                            '&:hover': {
                                border: '1px solid #94a3b8',
                                bgcolor: '#f8fafc',
                            }
                        }}>Batal</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default DashboardPage;