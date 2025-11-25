import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { RopeLogo } from '../components/RopeLogo';

interface PortalPageProps {
  onNavigate: (page: string) => void;
}

export function PortalPage({ onNavigate }: PortalPageProps) {
  return (
    <div className="min-h-screen bg-neutral-900 relative overflow-hidden">
      <HorseshoeCursor />
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <Button
            onClick={() => onNavigate('home')}
            variant="ghost"
            className="text-white hover:text-amber-500 hover:bg-white/10"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl w-full"
          >
            {/* Logo */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-48 md:w-64 mx-auto mb-6 relative inline-block"
              >
                <RopeLogo 
                  animate={true}
                  className="w-full h-auto"
                />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-display text-golden-solid mb-4">
                Portal Access
              </h1>
              <p className="text-white/70 text-lg">
                Select your access level to continue
              </p>
            </div>

            {/* Access Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Worker Portal */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="group"
              >
                <div className="bg-neutral-800/50 backdrop-blur-lg border border-amber-600/30 rounded-xl p-8 hover:border-amber-500/70 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-600/25 relative overflow-hidden">
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.1) 50%, transparent 100%)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <div className="flex flex-col items-center text-center relative">
                    <motion.div 
                      className="w-20 h-20 bg-amber-600/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-600/35 transition-all relative"
                      whileHover={{ scale: 1.1 }}
                    >
                      {/* Icon glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          backgroundImage: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
                          filter: 'blur(12px)',
                        }}
                      />
                      <Users size={40} className="text-amber-500 relative" />
                    </motion.div>
                    <h2 className="text-2xl font-display text-white mb-3">
                      Worker Portal
                    </h2>
                    <p className="text-white/60 mb-6">
                      Access your schedule, timesheets, and project assignments
                    </p>
                    <Button
                      onClick={() => onNavigate('login')}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-display"
                    >
                      Worker Login
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Admin Portal */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="group"
              >
                <div className="bg-neutral-800/50 backdrop-blur-lg border border-amber-600/30 rounded-xl p-8 hover:border-amber-500/70 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-600/25 relative overflow-hidden">
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.1) 50%, transparent 100%)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <div className="flex flex-col items-center text-center relative">
                    <motion.div 
                      className="w-20 h-20 bg-amber-600/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-600/35 transition-all relative"
                      whileHover={{ scale: 1.1 }}
                    >
                      {/* Icon glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          backgroundImage: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
                          filter: 'blur(12px)',
                        }}
                      />
                      <Shield size={40} className="text-amber-500 relative" />
                    </motion.div>
                    <h2 className="text-2xl font-display text-white mb-3">
                      Admin Portal
                    </h2>
                    <p className="text-white/60 mb-6">
                      Manage projects, teams, and company operations
                    </p>
                    <Button
                      onClick={() => onNavigate('login')}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-display"
                    >
                      Admin Login
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <p className="text-white/40 text-sm">
                <Shield className="inline mr-2" size={16} />
                Secure access protected by Peninsula Equine authentication
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}