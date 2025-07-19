// src/app/user/preferences/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const REMINDER_OPTIONS = [
  { value: '15-min', label: '15 minutes before', hours: 0.25 },
  { value: '30-min', label: '30 minutes before', hours: 0.5 },
  { value: '1-hour', label: '1 hour before', hours: 1 },
  { value: '2-hour', label: '2 hours before', hours: 2 },
  { value: '1-day', label: '1 day before', hours: 24 },
  { value: '1-day-1-hour', label: '1 day + 1 hour before', hours: 25 },
  { value: '2-day', label: '2 days before', hours: 48 }
];

const DEFAULT_REMINDER_OFFSET_HOURS = 25;

interface UserPreferences {
  reminderTime: string;
  reminderOffset: number;
  timezone: string;
  smsNotifications: boolean;
  emailNotifications: boolean;
}

export default function UserPreferencesPage() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    reminderTime: '1-day-1-hour',
    reminderOffset: DEFAULT_REMINDER_OFFSET_HOURS,
    timezone: 'America/New_York',
    smsNotifications: true,
    emailNotifications: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Saving preferences:', preferences);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReminderTimeChange = (value: string) => {
    const option = REMINDER_OPTIONS.find(opt => opt.value === value);
    setPreferences({
      ...preferences,
      reminderTime: value,
      reminderOffset: option?.hours || DEFAULT_REMINDER_OFFSET_HOURS
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Preferences
            </h1>
            <div className="flex items-center space-x-4">
              <Link 
                href="/user/dashboard"
                className="text-indigo-600 hover:text-indigo-700"
              >
                Dashboard
              </Link>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Notification Settings
            </h2>
            <p className="text-gray-600 mt-1">
              Configure how and when you receive reminders for your calendar events.
            </p>
          </div>

          <form onSubmit={handleSave} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Default Reminder Time
              </label>
              <select
                value={preferences.reminderTime}
                onChange={(e) => handleReminderTimeChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {REMINDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                This will be the default reminder time for new events. You can override this for specific events via SMS.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Timezone
              </label>
              <select
                value={preferences.timezone}
                onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="America/New_York">Eastern Time (EST/EDT)</option>
                <option value="America/Chicago">Central Time (CST/CDT)</option>
                <option value="America/Denver">Mountain Time (MST/MDT)</option>
                <option value="America/Los_Angeles">Pacific Time (PST/PDT)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Notification Methods
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.smsNotifications}
                    onChange={(e) => setPreferences({...preferences, smsNotifications: e.target.checked})}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">SMS notifications</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={(e) => setPreferences({...preferences, emailNotifications: e.target.checked})}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Email notifications</span>
                </label>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                SMS Commands
              </h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Text &quot;preferences&quot; to update these settings via SMS</p>
                <p>• Text &quot;schedule [event] for [time]&quot; to create events</p>
                <p>• Text &quot;remind me [time] before&quot; to set custom reminder times</p>
                <p>• Text &quot;help&quot; for more commands</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}