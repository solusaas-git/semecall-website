'use client';

import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Mail, Save, Eye, EyeOff, Send } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'system' | 'smtp'>('system');
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [testMessage, setTestMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  
  const [smtpSettings, setSmtpSettings] = useState({
    host: '',
    port: 587,
    secure: false,
    user: '',
    password: '',
    fromEmail: '',
    fromName: ''
  });

  useEffect(() => {
    if (activeTab === 'smtp') {
      fetchSmtpSettings();
    }
  }, [activeTab]);

  const fetchSmtpSettings = async () => {
    try {
      const response = await fetch('/api/admin/smtp-settings');
      if (response.ok) {
        const data = await response.json();
        setSmtpSettings(data);
      }
    } catch (error) {
      console.error('Error fetching SMTP settings:', error);
    }
  };

  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/admin/smtp-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtpSettings)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'SMTP settings saved successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Error saving SMTP settings:', error);
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleTestSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestLoading(true);
    setTestMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/admin/test-smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testEmail })
      });

      const data = await response.json();

      if (response.ok) {
        setTestMessage({ type: 'success', text: 'Test email sent successfully! Check your inbox.' });
        setTestEmail('');
      } else {
        setTestMessage({ type: 'error', text: data.error || 'Failed to send test email' });
      }
    } catch (error) {
      console.error('Error testing SMTP:', error);
      setTestMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">System settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('system')}
            className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
              activeTab === 'system'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              System
            </div>
          </button>
          <button
            onClick={() => setActiveTab('smtp')}
            className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
              activeTab === 'smtp'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email (SMTP)
            </div>
          </button>
        </nav>
      </div>

      {/* System Tab */}
      {activeTab === 'system' && (
        <div>
          {/* System Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              System Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Application Name</span>
                <span className="font-medium text-gray-900">Semecall Admin</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Version</span>
                <span className="font-medium text-gray-900">1.0.0</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Environment</span>
                <span className="font-medium text-gray-900">Production</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link
                href="/admin/profile"
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors text-blue-600 hover:text-blue-700"
              >
                → Manage your profile
              </Link>
              <Link
                href="/admin/contacts"
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors text-blue-600 hover:text-blue-700"
              >
                → View messages
              </Link>
              <Link
                href="/admin/dashboard"
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors text-blue-600 hover:text-blue-700"
              >
                → Go to dashboard
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* SMTP Tab */}
      {activeTab === 'smtp' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            SMTP Configuration
          </h2>
          <p className="text-gray-600 mb-6">
            Configure SMTP settings to send emails directly from the platform
          </p>

          {message.text && (
            <div className={`mb-4 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSaveSmtp} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Host *
                </label>
                <input
                  type="text"
                  required
                  value={smtpSettings.host}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, host: e.target.value })}
                  placeholder="smtp.example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Port *
                </label>
                <input
                  type="number"
                  required
                  value={smtpSettings.port}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, port: parseInt(e.target.value) })}
                  placeholder="587"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={smtpSettings.secure}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, secure: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Use SSL/TLS</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  required
                  value={smtpSettings.user}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, user: e.target.value })}
                  placeholder="your-email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={smtpSettings.password}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Email *
                </label>
                <input
                  type="email"
                  required
                  value={smtpSettings.fromEmail}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, fromEmail: e.target.value })}
                  placeholder="noreply@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Name
                </label>
                <input
                  type="text"
                  value={smtpSettings.fromName}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, fromName: e.target.value })}
                  placeholder="Semecall"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>

          {/* Test SMTP */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Test SMTP Configuration</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Send a test email to verify your SMTP settings are working correctly
            </p>

            {testMessage.text && (
              <div className={`mb-4 p-4 rounded-lg ${
                testMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {testMessage.text}
              </div>
            )}

            <form onSubmit={handleTestSmtp} className="flex gap-3">
              <input
                type="email"
                required
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Enter email address to receive test"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={testLoading}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {testLoading ? 'Sending...' : 'Send Test'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

