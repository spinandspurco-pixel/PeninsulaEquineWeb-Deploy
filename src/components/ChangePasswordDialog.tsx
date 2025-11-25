import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface ChangePasswordDialogProps {
  onChangePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  isFirstLogin?: boolean;
  theme: 'light' | 'dark';
  userEmail: string;
}

export function ChangePasswordDialog({ 
  onChangePassword, 
  isFirstLogin = false, 
  theme,
  userEmail 
}: ChangePasswordDialogProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (oldPassword === newPassword) {
      setError('New password must be different from current password');
      return;
    }

    setIsSubmitting(true);

    try {
      await onChangePassword(oldPassword, newPassword);
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className={`${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
          {/* Header */}
          <div className={`p-6 border-b ${theme === 'dark' ? 'border-[#C9A24E]/20' : 'border-[#C9A24E]/30'}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#C9A24E]/10">
                <Lock size={24} className="text-[#C9A24E]" />
              </div>
              <div>
                <h2 className={`text-xl font-display ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                  {isFirstLogin ? 'Change Your Password' : 'Change Password'}
                </h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                  {userEmail}
                </p>
              </div>
            </div>

            {isFirstLogin && (
              <div className={`flex items-start gap-2 p-3 mt-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-500/10 border border-yellow-500/30'}`}>
                <AlertCircle size={20} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    Password Change Required
                  </p>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-yellow-400/80' : 'text-yellow-600/80'}`}>
                    For security, you must change your temporary password before continuing.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
              >
                <p className="text-sm text-red-500">{error}</p>
              </motion.div>
            )}

            {/* Current Password */}
            <div>
              <Label htmlFor="oldPassword" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                Current Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                  className={theme === 'dark' ? 'bg-white/5 border-white/10 text-white pr-10' : 'bg-black/5 border-black/10 text-[#0F0F0F] pr-10'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <Label htmlFor="newPassword" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                New Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={theme === 'dark' ? 'bg-white/5 border-white/10 text-white pr-10' : 'bg-black/5 border-black/10 text-[#0F0F0F] pr-10'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <Label htmlFor="confirmPassword" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className={`mt-2 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-[#0F0F0F]'}`}
                required
              />
            </div>

            {/* Password Requirements */}
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
              <p className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                Password Requirements:
              </p>
              <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                <li className={newPassword.length >= 8 ? 'text-green-500' : ''}>
                  • At least 8 characters
                </li>
                <li className={/[A-Z]/.test(newPassword) ? 'text-green-500' : ''}>
                  • One uppercase letter
                </li>
                <li className={/[a-z]/.test(newPassword) ? 'text-green-500' : ''}>
                  • One lowercase letter
                </li>
                <li className={/[0-9]/.test(newPassword) ? 'text-green-500' : ''}>
                  • One number
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#C9A24E] hover:bg-[#A88B63] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Changing Password...' : 'Change Password'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
