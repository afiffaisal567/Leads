import { Skeleton as MuiSkeleton, Box } from '@mui/material';

const SkeletonStatCards = () => (
    <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
        gap: 2,
        borderRadius: '12px',
        overflow: 'hidden',
    }}>
        {[...Array(4)].map((_, i) => (
            <MuiSkeleton
                key={i}
                variant="rounded"
                height={120}
                sx={{
                    borderRadius: 2,
                    bgcolor: '#f8fafc',
                }}
            />
        ))}
    </Box>
);

const SkeletonTable = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {[...Array(5)].map((_, i) => (
            <MuiSkeleton key={i} variant="rounded" height={48} sx={{ bgcolor: '#f8fafc' }} />
        ))}
    </Box>
);

export { SkeletonStatCards, SkeletonTable };