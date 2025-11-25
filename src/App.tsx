import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { HomePage } from './pages/HomePage';
import { ConstructionsPage } from './pages/ConstructionsPage';
import { LaserCuttingPage } from './pages/LaserCuttingPage';
import { ShopPage } from './pages/ShopPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { PortalPage } from './pages/PortalPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
// import { VideoPreviewPage } from './pages/VideoPreviewPage'; // Disabled - requires video files
import { IntroScreen } from './components/IntroScreen';
import { ChangePasswordDialog } from './components/ChangePasswordDialog';
import { getCurrentUser, changePassword, signOut } from './lib/firebase-service';
import { toast } from 'sonner';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [showIntro, setShowIntro] = useState(false); // Temporarily disabled for debugging
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      if (user.mustChangePassword) {
        setShowPasswordChange(true);
      }
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleLogin = (email: string, password: string) => {
    const user = getCurrentUser();
    setIsAuthenticated(true);
    setCurrentUser(user);
    
    if (user?.mustChangePassword) {
      setShowPasswordChange(true);
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = async () => {
    await signOut();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    if (!currentUser) return;

    try {
      await changePassword(currentUser.uid, oldPassword, newPassword);
      setShowPasswordChange(false);
      setCurrentUser(getCurrentUser());
      toast.success('Password changed successfully!');
    } catch (error: any) {
      throw error;
    }
  };

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'constructions' && <ConstructionsPage onNavigate={handleNavigate} />}
      {currentPage === 'laser' && <LaserCuttingPage onNavigate={handleNavigate} />}
      {currentPage === 'shop' && <ShopPage onNavigate={handleNavigate} />}
      {currentPage === 'projects' && <ProjectsPage onNavigate={handleNavigate} />}
      {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      {/* {currentPage === 'video-preview' && <VideoPreviewPage onNavigate={handleNavigate} />} */}
      {currentPage === 'portal' && !isAuthenticated && (
        <LoginPage 
          onLogin={(role, user) => {
            handleLogin(user.email, '');
          }} 
          onBack={() => handleNavigate('home')} 
        />
      )}
      {currentPage === 'portal' && isAuthenticated && (
        <PortalPage onNavigate={handleNavigate} />
      )}
      {currentPage === 'dashboard' && isAuthenticated && (
        <DashboardPage onNavigate={handleNavigate} />
      )}

      {/* Password Change Dialog (First Login) */}
      {showPasswordChange && currentUser && (
        <ChangePasswordDialog
          onChangePassword={handleChangePassword}
          isFirstLogin={currentUser.mustChangePassword}
          theme={theme}
          userEmail={currentUser.email}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
