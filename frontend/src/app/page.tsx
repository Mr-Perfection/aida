// src/app/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // For now, just simulate API call until backend is ready
      console.log('Adding to waitlist:', phoneNumber);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to add to waitlist:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="text-2xl font-bold text-indigo-600">Aida</div>
          <Link 
            href="/auth/signin" 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your AI Personal Assistant for 
            <span className="text-indigo-600"> Calendar Management</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Manage your Google Calendar through simple text messages. 
            Schedule meetings, set reminders, and invite guests - all via SMS.
          </p>

          {/* Waitlist Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Join the Waitlist
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Join Waitlist
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  You&apos;re on the list!
                </h2>
                <p className="text-gray-600">
                  We&apos;ll notify you when Aida is ready for you.
                </p>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SMS Interface</h3>
              <p className="text-gray-600">Text Aida to schedule events, no app needed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Google Calendar</h3>
              <p className="text-gray-600">Seamless integration with your existing calendar</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Powered</h3>
              <p className="text-gray-600">Smart scheduling with natural language processing</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
