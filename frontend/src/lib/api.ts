// src/lib/api.ts
import axios from 'axios';
import type { UserPreferences } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 seconds
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

export const waitlistApi = {
  async addToWaitlist(phoneNumber: string) {
    const response = await api.post('/api/waitlist', { phoneNumber });
    return response.data;
  },

  async getWaitlistUsers() {
    const response = await api.get('/api/admin/waitlist');
    return response.data;
  },

  async approveUser(userId: string) {
    const response = await api.patch(`/api/admin/waitlist/${userId}/approve`);
    return response.data;
  },

  async rejectUser(userId: string) {
    const response = await api.patch(`/api/admin/waitlist/${userId}/reject`);
    return response.data;
  }
};

export const authApi = {
  async sendOTP(phoneNumber: string) {
    const response = await api.post('/api/auth/send-otp', { phoneNumber });
    return response.data;
  },

  async verifyOTP(phoneNumber: string, otp: string) {
    const response = await api.post('/api/auth/verify-otp', { phoneNumber, otp });
    return response.data;
  },

  async getGoogleAuthUrl() {
    const response = await api.get('/api/auth/google/url');
    return response.data;
  },

  async signOut() {
    const response = await api.post('/api/auth/signout');
    return response.data;
  }
};

export const userApi = {
  async getPreferences() {
    const response = await api.get('/api/user/preferences');
    return response.data;
  },

  async updatePreferences(preferences: UserPreferences) {
    const response = await api.patch('/api/user/preferences', preferences);
    return response.data;
  }
};

export default api;