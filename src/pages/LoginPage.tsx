import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Mail, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import type { UserRole } from '../types';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { signInWithEmailPassword } from '../lib/firebase-service';
import logoImage from 'figma:asset/43b0d27420f20197681aa3cacbf2abda7c055e3d.png';

interface LoginPageProps {
  onLogin: (role: UserRole, user: any) => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
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
    <div className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'bg-[#111111]' : 'bg-[#F5F4F1]'}`}>
      <HorseshoeCursor />
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div 
          className={`absolute inset-0 ${theme === 'dark' ? 'opacity-20' : 'opacity-10'}`}
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1719356441574-2093feae362c?q=80&w=2000)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)',
          }}
        />
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-amber-950/50' : 'bg-gradient-to-br from-[#F5F4F1] via-[#F5F4F1]/95 to-amber-100/50'}`} />
        
        <motion.div
          className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-amber-600/20' : 'bg-amber-400/30'}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Button
            onClick={onBack}
            variant="ghost"
            className={theme === 'dark' ? 'text-white hover:text-amber-500 hover:bg-white/10' : 'text-[#0F0F0F] hover:text-amber-600 hover:bg-black/5'}
          >
            <ArrowLeft className="mr-2" size={20} />
            Back
          </Button>
          
          {/* Theme Toggle */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className={theme === 'dark' ? 'text-amber-500 hover:text-amber-400 hover:bg-white/10' : 'text-amber-600 hover:text-amber-700 hover:bg-black/5'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        {/* Login Form */}
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md w-full"
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <motion.div 
                className="w-48 mx-auto mb-6 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={logoImage}
                  alt="Peninsula Equine"
                  className="w-full h-auto relative"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(201, 162, 78, 0.4))',
                  }}
                />
              </motion.div>
              <h1 className={`text-3xl font-display mb-2 ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}`}>
                Welcome Back
              </h1>
              <p className={theme === 'dark' ? 'text-white/70' : 'text-[#0F0F0F]/70'}>
                Sign in to access your portal
              </p>
            </div>

            {/* Login Card */}
            <div className={`backdrop-blur-lg border rounded-xl p-8 ${theme === 'dark' ? 'bg-neutral-800/50 border-amber-600/30' : 'bg-white/70 border-amber-400/40'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/50" size={20} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 ${theme === 'dark' ? 'bg-neutral-900/50 border-amber-600/30 text-white placeholder:text-white/40' : 'bg-white border-amber-400/40 text-[#0F0F0F] placeholder:text-black/40'} focus:border-amber-500`}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/50" size={20} />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 ${theme === 'dark' ? 'bg-neutral-900/50 border-amber-600/30 text-white placeholder:text-white/40' : 'bg-white border-amber-400/40 text-[#0F0F0F] placeholder:text-black/40'} focus:border-amber-500`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500/50 hover:text-amber-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className={`text-sm transition-colors ${theme === 'dark' ? 'text-amber-500 hover:text-amber-400' : 'text-amber-600 hover:text-amber-700'}`}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full font-display ${theme === 'dark' ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-[#C9A24E] hover:bg-[#A88B63] text-white'}`}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className={`mt-6 p-4 border rounded-lg ${theme === 'dark' ? 'bg-amber-900/20 border-amber-600/20' : 'bg-amber-100/50 border-amber-400/30'}`}>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-[#0F0F0F]/70'}`}>Demo Credentials:</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-[#0F0F0F]/60'}`}>Worker: worker@peninsulaequine.com.au</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-[#0F0F0F]/60'}`}>Admin: admin@peninsulaequine.com.au</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-[#0F0F0F]/60'}`}>Password: any password</p>
              </div>

              {/* Registration Link */}
              <div className="mt-6 text-center">
                <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#0F0F0F]/60'}`}>
                  New worker?{' '}
                  <button
                    type="button"
                    onClick={() => window.location.href = '/#register'}
                    className={`transition-colors ${theme === 'dark' ? 'text-amber-500 hover:text-amber-400' : 'text-amber-600 hover:text-amber-700'}`}
                  >
                    Request an account
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}