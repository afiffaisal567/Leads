import { create } from 'zustand';
import { authService } from '../services/authService';

const useAuthStore = create((set, get) => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isLoading: false,

    get isAuthenticated() {
        return !!get().token;
    },

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const response = await authService.login(email, password);
            if (response.success) {
                const { access_token, user } = response.data;
                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify(user));
                set({ token: access_token, user, isLoading: false });
                return { success: true };
            }
            set({ isLoading: false });
            return { success: false, message: response.message };
        } catch (error) {
            set({ isLoading: false });
            let message = 'Login gagal. Silakan coba lagi.';
            if (error.response?.data?.message) {
                message = error.response.data.message;
            } else if (error.message) {
                message = error.message;
            }
            return { success: false, message };
        }
    },

    logout: async () => {
        try {
            await authService.logout();
        } catch {
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            set({ token: null, user: null });
        }
    },

    fetchProfile: async () => {
        try {
            const response = await authService.getProfile();
            if (response.success) {
                const user = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                set({ user });
            }
        } catch {
        }
    },
}));

export default useAuthStore;
