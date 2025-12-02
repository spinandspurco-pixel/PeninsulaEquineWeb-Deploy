import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Mail, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { Footer } from '../components/Footer';
import type { UserRole } from '../types';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { signInWithEmailPassword } from '../lib/firebase-service';
import logoImage from 'figma:asset/43b0d27420f20197681aa3cacbf2abda7c055e3d.png';

interface LoginPageProps {
  onLogin: (role: UserRole, user: any) => void;
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function LoginPage({ onLogin, onBack, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await signInWithEmailPassword(email, password);
      toast.success(`Welcome back, ${user.displayName}!`);
      onLogin(user.role, user);
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6">
      <HorseshoeCursor />
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1a1a1a] to-[#0F0F0F]"></div>
      
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="absolute top-8 left-8 z-10 flex items-center gap-2 text-[#C9A24E] hover:text-[#D4B366] transition-colors"
        whileHover={{ x: -4 }}
      >
        <ArrowLeft size={20} />
        Back to Home
      </motion.button>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="login-container"
        >
          {/* Logo - Smaller Size */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full bg-[#C9A24E]/10 flex items-center justify-center">
              <img
                src={logoImage}
                alt="Peninsula Equine"
                className="w-20 h-20 object-contain"
                style={{
                  filter: 'brightness(0) saturate(100%) sepia(100%) hue-rotate(35deg) brightness(1.5) contrast(1.2)',
                }}
              />
            </div>
            <h1 className="text-2xl font-bold text-[#C9A24E] mb-3">
              Peninsula Equine Portal
            </h1>
            <p className="text-[#F5F4F1]/70 text-sm">
              Sign in to access your workspace
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Field */}
            <div>
              <label className="block text-[#F5F4F1] text-sm font-medium mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={20} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <h4>Access Credentials</h4>
            <p>Admin: jordynn@peninsulaequine.com.au</p>
            <p>Worker: phil@peninsulaequine.com.au</p>
            <p>Password: peninsula25</p>
          </div>

          {/* Registration Link */}
          <div className="registration-link">
            <p>
              New worker?{' '}
              <button
                type="button"
                onClick={() => onNavigate?.('register')}
                className="link-button"
              >
                Request an account
              </button>
            </p>
          </div>
        </motion.div>
      </div>
      <Footer onNavigate={onNavigate || (() => {})} />
    </div>
  );
}