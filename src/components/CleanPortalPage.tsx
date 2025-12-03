
import { motion } from 'framer-motion';
import { Shield, Users, ArrowLeft } from 'lucide-react';

interface PortalPageProps {
  onNavigate: (page: string) => void;
}

export function CleanPortalPage({ onNavigate }: PortalPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-foreground-muted hover:text-gold-400 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-background" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient-gold mb-4">
              Peninsula Equine Portal
            </h1>
            
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto mb-12">
              Access your worker dashboard, submit forms, and manage your Peninsula Equine account.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Portal Options */}
      <div className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Existing Users */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => onNavigate('login')}
              className="glass-card p-8 hover-glow cursor-pointer group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                Existing Users
              </h3>
              
              <p className="text-foreground-muted mb-6">
                Access your worker dashboard, timesheets, and safety documentation.
              </p>
              
              <div className="flex items-center text-gold-400 font-medium">
                Sign In →
              </div>
            </motion.div>

            {/* New Registration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => onNavigate('register')}
              className="glass-card p-8 hover-glow cursor-pointer group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-leather-500 to-leather-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                New Registration
              </h3>
              
              <p className="text-foreground-muted mb-6">
                Join the Peninsula Equine team. Register for worker access and training.
              </p>
              
              <div className="flex items-center text-gold-400 font-medium">
                Register →
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}