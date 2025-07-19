// src/types/index.ts

export interface WaitlistUser {
  id: string;
  phoneNumber: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface UserPreferences {
  reminderTime: string;
  reminderOffset: number;
  timezone: string;
  smsNotifications: boolean;
  emailNotifications: boolean;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    phoneNumber: string;
    isVerified: boolean;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}