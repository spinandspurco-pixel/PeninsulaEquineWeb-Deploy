import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Eye, EyeOff, Mail, User, Lock, Shield, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface CreateUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateUser: (userData: {
    email: string;
    displayName: string;
    password: string;
    role: 'worker' | 'admin';
  }) => Promise<void>;
  theme: 'light' | 'dark';
}

export function CreateUserDialog({ isOpen, onClose, onCreateUser, theme }: CreateUserDialogProps) {
  const [formData, setFormData] = useState({
    email: '',
    displayName: '',
    password: '',
    confirmPassword: '',
    role: 'worker' as 'worker' | 'admin',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const generatePassword = () => {
    // Generate a secure temporary password
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password, confirmPassword: password }));
    setShowPassword(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.email || !formData.displayName || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      await onCreateUser({
        email: formData.email,
        displayName: formData.displayName,
        password: formData.password,
        role: formData.role,
      });

      // Reset form
      setFormData({
        email: '',
        displayName: '',
        password: '',
        confirmPassword: '',
        role: 'worker',
      });
      setShowPassword(false);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md"
        >
          <Card className={`${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${theme === 'dark' ? 'border-[#C9A24E]/20' : 'border-[#C9A24E]/30'}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#C9A24E]/10">
                  <UserPlus size={24} className="text-[#C9A24E]" />
                </div>
                <div>
                  <h2 className={`text-xl font-display ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                    Create New User
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                    Add a new worker or admin account
                  </p>
                </div>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className={theme === 'dark' ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-black/60 hover:text-black hover:bg-black/5'}
              >
                <X size={20} />
              </Button>
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

              {/* Role Selection */}
              <div>
                <Label className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Account Type
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'worker' }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === 'worker'
                        ? 'border-[#C9A24E] bg-[#C9A24E]/10'
                        : theme === 'dark'
                          ? 'border-white/10 hover:border-white/20'
                          : 'border-black/10 hover:border-black/20'
                    }`}
                  >
                    <Briefcase size={20} className={`mx-auto mb-1 ${formData.role === 'worker' ? 'text-[#C9A24E]' : theme === 'dark' ? 'text-white/60' : 'text-black/60'}`} />
                    <p className={`text-sm font-medium ${formData.role === 'worker' ? 'text-[#C9A24E]' : theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                      Worker
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'admin' }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === 'admin'
                        ? 'border-[#C9A24E] bg-[#C9A24E]/10'
                        : theme === 'dark'
                          ? 'border-white/10 hover:border-white/20'
                          : 'border-black/10 hover:border-black/20'
                    }`}
                  >
                    <Shield size={20} className={`mx-auto mb-1 ${formData.role === 'admin' ? 'text-[#C9A24E]' : theme === 'dark' ? 'text-white/60' : 'text-black/60'}`} />
                    <p className={`text-sm font-medium ${formData.role === 'admin' ? 'text-[#C9A24E]' : theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                      Admin
                    </p>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <Label htmlFor="displayName" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  <User size={16} className="inline mr-2" />
                  Full Name
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                  placeholder="John Smith"
                  className={theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-[#0F0F0F]'}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  <Mail size={16} className="inline mr-2" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="worker@peninsulaequine.com.au"
                  className={theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-[#0F0F0F]'}
                  required
                />
              </div>

              {/* Temporary Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="password" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                    <Lock size={16} className="inline mr-2" />
                    Temporary Password
                  </Label>
                  <Button
                    type="button"
                    onClick={generatePassword}
                    variant="ghost"
                    size="sm"
                    className="text-[#C9A24E] hover:text-[#A88B63] h-auto py-1 px-2"
                  >
                    Generate
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Min. 8 characters"
                    className={theme === 'dark' ? 'bg-white/5 border-white/10 text-white pr-10' : 'bg-black/5 border-black/10 text-[#0F0F0F] pr-10'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                  User will be required to change this password on first login
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Re-enter password"
                  className={theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-[#0F0F0F]'}
                  required
                />
              </div>

              {/* Info Box */}
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-[#C9A24E]/10 border border-[#C9A24E]/20' : 'bg-[#C9A24E]/10 border border-[#C9A24E]/30'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}`}>
                  💡 The user will receive login credentials and be prompted to change their password on first login.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className={`flex-1 ${theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-[#0F0F0F] hover:bg-black/5'}`}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#C9A24E] hover:bg-[#A88B63] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create User'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
