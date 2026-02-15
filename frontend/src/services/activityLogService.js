import api from '../lib/axios';

export const activityLogService = {
    getActivityLogs: async (params = {}) => {
        const response = await api.get('/activity-logs', { params });
        return response.data;
    },
};
