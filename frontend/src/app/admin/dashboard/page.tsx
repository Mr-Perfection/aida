// src/app/admin/dashboard/page.tsx
'use client';

import { useState } from 'react';

interface WaitlistUser {
  id: string;
  phoneNumber: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AdminDashboard() {
  const [waitlistUsers] = useState<WaitlistUser[]>([
    {
      id: '1',
      phoneNumber: '+1 (555) 123-4567',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'pending'
    },
    {
      id: '2', 
      phoneNumber: '+1 (555) 987-6543',
      createdAt: '2024-01-14T15:45:00Z',
      status: 'approved'
    },
    {
      id: '3',
      phoneNumber: '+1 (555) 555-5555',
      createdAt: '2024-01-13T09:15:00Z',
      status: 'pending'
    }
  ]);

  const handleApprove = (userId: string) => {
    // TODO: Integrate with backend API
    console.log('Approving user:', userId);
  };

  const handleReject = (userId: string) => {
    // TODO: Integrate with backend API
    console.log('Rejecting user:', userId);
  };

  const pendingUsers = waitlistUsers.filter(user => user.status === 'pending');
  const approvedUsers = waitlistUsers.filter(user => user.status === 'approved');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Aida Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin User</span>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {waitlistUsers.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Pending Approval</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingUsers.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Approved Users</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {approvedUsers.length}
            </p>
          </div>
        </div>

        {/* Waitlist Management */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Waitlist Management
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {waitlistUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : user.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {user.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(user.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(user.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}