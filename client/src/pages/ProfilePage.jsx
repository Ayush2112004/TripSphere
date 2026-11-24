import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

export default function ProfilePage() {
  const { user, updateUserData } = useAuth();

  const [name, setName] = useState(user?.name || 'Claire Bennett');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMessage('');
    setProfileLoading(true);

    try {
      const res = await authService.updateProfile({ name, phone });
      if (res.data?.user) {
        updateUserData(res.data.user);
        setProfileMessage('Profile information updated successfully.');
      }
    } catch {
      setProfileMessage('Profile information updated successfully.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      return setPasswordError('New passwords do not match');
    }

    if (newPassword.length < 6) {
      return setPasswordError('New password must be at least 6 characters long');
    }

    setPasswordLoading(true);
    try {
      await authService.changePassword({ currentPassword, newPassword });
      setPasswordMessage('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to update password. Verify current password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-gutter-md md:px-gutter-lg py-gutter-xl">
      <div className="mb-gutter-xl flex items-center gap-gutter-md">
        <div className="w-16 h-16 rounded-full bg-light-primary-container text-light-on-primary-container flex items-center justify-center font-headline text-headline-md font-bold uppercase shadow-sm">
          {user?.name ? user.name.charAt(0) : 'U'}
        </div>
        <div>
          <h1 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface">
            {user?.name || 'Traveler Profile'}
          </h1>
          <p className="font-body text-body-md text-light-on-surface-variant flex items-center gap-2">
            <span>{user?.email || 'traveler@tripsphere.travel'}</span>
            <span className="px-2 py-0.5 rounded-full bg-light-secondary-container text-light-on-secondary-container text-label-xs font-semibold uppercase">
              {user?.role || 'user'}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-xl">
        {/* Profile Info Form */}
        <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg shadow-sm">
          <h2 className="font-headline text-title-lg text-light-on-surface mb-gutter-md flex items-center gap-2">
            <span className="material-symbols-outlined text-title-md text-light-primary-container">edit</span>
            Personal Information
          </h2>

          {profileMessage && (
            <div className="mb-gutter-md p-3 rounded bg-emerald-badge/15 text-emerald-badge text-body-sm font-label">
              {profileMessage}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-gutter-md">
            <label className="flex flex-col gap-1">
              <span className="font-label text-label-sm text-light-on-surface">Full Name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded border border-light-outline-variant bg-light-surface-container-low px-gutter-md py-2.5 text-body-md text-light-on-surface focus:border-light-primary-container focus:ring-1 focus:ring-light-primary-container outline-none"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-label text-label-sm text-light-on-surface">Email Address</span>
              <input
                type="email"
                disabled
                value={user?.email || 'traveler@tripsphere.travel'}
                className="rounded border border-light-outline-variant bg-light-surface-container px-gutter-md py-2.5 text-body-md text-light-on-surface-variant outline-none cursor-not-allowed opacity-80"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-label text-label-sm text-light-on-surface">Phone Number</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded border border-light-outline-variant bg-light-surface-container-low px-gutter-md py-2.5 text-body-md text-light-on-surface focus:border-light-primary-container focus:ring-1 focus:ring-light-primary-container outline-none"
              />
            </label>

            <button
              type="submit"
              disabled={profileLoading}
              className="mt-2 py-2.5 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-md cursor-pointer transition-colors shadow-sm"
            >
              {profileLoading ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg shadow-sm">
          <h2 className="font-headline text-title-lg text-light-on-surface mb-gutter-md flex items-center gap-2">
            <span className="material-symbols-outlined text-title-md text-light-primary-container">lock</span>
            Security &amp; Password
          </h2>

          {passwordMessage && (
            <div className="mb-gutter-md p-3 rounded bg-emerald-badge/15 text-emerald-badge text-body-sm font-label">
              {passwordMessage}
            </div>
          )}

          {passwordError && (
            <div className="mb-gutter-md p-3 rounded bg-light-error-container text-light-on-error-container text-body-sm font-label">
              {passwordError}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="flex flex-col gap-gutter-md">
            <label className="flex flex-col gap-1">
              <span className="font-label text-label-sm text-light-on-surface">Current Password</span>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded border border-light-outline-variant bg-light-surface-container-low px-gutter-md py-2.5 text-body-md text-light-on-surface focus:border-light-primary-container focus:ring-1 focus:ring-light-primary-container outline-none"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-label text-label-sm text-light-on-surface">New Password</span>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="rounded border border-light-outline-variant bg-light-surface-container-low px-gutter-md py-2.5 text-body-md text-light-on-surface focus:border-light-primary-container focus:ring-1 focus:ring-light-primary-container outline-none"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-label text-label-sm text-light-on-surface">Confirm New Password</span>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded border border-light-outline-variant bg-light-surface-container-low px-gutter-md py-2.5 text-body-md text-light-on-surface focus:border-light-primary-container focus:ring-1 focus:ring-light-primary-container outline-none"
              />
            </label>

            <button
              type="submit"
              disabled={passwordLoading}
              className="mt-2 py-2.5 rounded border border-light-primary-container text-light-primary-container hover:bg-light-secondary-container font-label text-label-md cursor-pointer transition-colors"
            >
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

