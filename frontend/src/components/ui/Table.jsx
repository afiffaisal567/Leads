import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination as MuiPagination,
    Box,
    Typography,
    Skeleton,
    useMediaQuery,
    useTheme,
} from '@mui/material';

const Table = ({ columns, data, loading, emptyMessage = 'Tidak ada data', renderMobileCard }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} variant="rounded" height={48} />
                ))}
            </Box>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body2" color="text.secondary">{emptyMessage}</Typography>
            </Box>
        );
    }

    if (isMobile && renderMobileCard) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {data.map((row, index) => renderMobileCard(row, index))}
            </Box>
        );
    }

    return (
        <TableContainer>
            <MuiTable size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell
                                key={col.key}
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5,
                                    borderColor: 'divider',
                                    py: 1.5,
                                }}
                            >
                                {col.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow
                            key={row.id || rowIndex}
                            hover
                            sx={{ '&:last-child td': { border: 0 } }}
                        >
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key}
                                    sx={{
                                        fontSize: '0.875rem',
                                        borderColor: '#f8fafc',
                                        py: 1.5,
                                    }}
                                >
                                    {col.render ? col.render(row) : row[col.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => onPageChange(page)}
                color="primary"
                size="small"
                shape="rounded"
            />
        </Box>
    );
};

export { Table, Pagination };
export default Table;