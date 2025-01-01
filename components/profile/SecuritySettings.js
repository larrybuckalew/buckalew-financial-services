import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import MFASetup from '../auth/MFASetup';

export default function SecuritySettings({ user }) {
  const [showMFASetup, setShowMFASetup] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordForm)
      });

      if (response.ok) {
        setIsChangingPassword(false);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

      <div className="space-y-6">
        {/* Password Change Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Password</h3>
          {isChangingPassword ? (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              Change Password
            </button>
          )}
        </div>

        {/* Two-Factor Authentication Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
          {user.hasMFA ? (
            <div>
              <p className="text-green-600 font-medium">Enabled</p>
              <button
                onClick={() => setShowMFASetup(true)}
                className="mt-2 text-blue-600 hover:text-blue-700"
              >
                Reconfigure 2FA
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <button
                onClick={() => setShowMFASetup(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Enable 2FA
              </button>
            </div>
          )}
        </div>

        {showMFASetup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <MFASetup
                onComplete={() => {
                  setShowMFASetup(false);
                  // Refresh user data
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
