import api from '../lib/axios';

export const leadService = {
    getLeads: async (params = {}) => {
        const response = await api.get('/leads', { params });
        return response.data;
    },

    getLead: async (id) => {
        const response = await api.get(`/leads/${id}`);
        return response.data;
    },

    createLead: async (data) => {
        const response = await api.post('/leads', data);
        return response.data;
    },

    updateLead: async (id, data) => {
        const response = await api.put(`/leads/${id}`, data);
        return response.data;
    },

    deleteLead: async (id) => {
        const response = await api.delete(`/leads/${id}`);
        return response.data;
    },

    submitPublic: async (data) => {
        const response = await api.post('/leads/submit', data);
        return response.data;
    },
};
