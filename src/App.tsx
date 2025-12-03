import { useState, useEffect } from 'react';
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
// Portal/Worker Pages
import { SWMSFormPage } from './pages/SWMSFormPage';
import { ToolboxTalkPage } from './pages/ToolboxTalkPage';
import { TimesheetPage } from './pages/TimesheetPage';
import { IncidentReportPage } from './pages/IncidentReportPage';
import { ReferenceDocsPage } from './pages/ReferenceDocsPage';
import { WorkerRegistrationPage } from './pages/WorkerRegistrationPage';
// Admin Pages
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminUserManagementPage } from './pages/AdminUserManagementPage';
import { AdminTimesheetsPage } from './pages/AdminTimesheetsPage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';
import { AdminAllSubmissionsPage } from './pages/AdminAllSubmissionsPage';
// Components
import { IntroScreen } from './components/IntroScreen';
import { ChangePasswordDialog } from './components/ChangePasswordDialog';
import { HorseshoeCursor } from './components/HorseshoeCursor';
import { Toaster } from './components/ui/sonner';
import { getCurrentUser, changePassword, signOut } from './lib/firebase-service';
import { toast } from 'sonner';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [showIntro, setShowIntro] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const { theme } = useTheme();
  
  console.log('App render - currentPage:', currentPage, 'showIntro:', showIntro);

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
    console.log('App navigate to:', page);
    setCurrentPage(page);
    setShowIntro(false); // Ensure intro is hidden when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIntroComplete = () => {
    console.log('Intro completed');
    setShowIntro(false);
  };

  const handleLogin = (_email: string, _password: string) => {
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

    await changePassword(currentUser.uid, oldPassword, newPassword);
    setShowPasswordChange(false);
    setCurrentUser(getCurrentUser());
    toast.success('Password changed successfully!');
  };

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <>
      <HorseshoeCursor />
      <main className="min-h-screen bg-[#0F0F0F]" role="main" aria-label="Main content">
        {currentPage === 'home' && (
          <div key="home" className="page-wrapper">
            <HomePage onNavigate={handleNavigate} />
          </div>
        )}
        {currentPage === 'constructions' && (
          <div key="constructions" className="page-wrapper">
            <ConstructionsPage onNavigate={handleNavigate} />
          </div>
        )}
        {currentPage === 'laser' && (
          <div key="laser" className="page-wrapper">
            <LaserCuttingPage onNavigate={handleNavigate} />
          </div>
        )}
        {currentPage === 'shop' && (
          <div key="shop" className="page-wrapper">
            <ShopPage onNavigate={handleNavigate} />
          </div>
        )}
        {currentPage === 'projects' && (
          <div key="projects" className="page-wrapper">
            <ProjectsPage onNavigate={handleNavigate} />
          </div>
        )}
        {currentPage === 'contact' && (
          <div key="contact" className="page-wrapper">
            <ContactPage onNavigate={handleNavigate} />
          </div>
        )}
        
        {/* Portal Entry */}
        {currentPage === 'portal' && !isAuthenticated && (
          <LoginPage 
            onLogin={(_role, user) => {
              handleLogin(user.email, '');
            }} 
            onBack={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'portal' && isAuthenticated && (
          <PortalPage onNavigate={handleNavigate} />
        )}
        
        {/* Worker Dashboard & Pages */}
        {currentPage === 'dashboard' && isAuthenticated && currentUser && (
          <DashboardPage 
            onNavigate={handleNavigate} 
            userRole={currentUser.role}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'swms' && isAuthenticated && (
          <SWMSFormPage onBack={() => handleNavigate('dashboard')} />
        )}
        {currentPage === 'toolbox' && isAuthenticated && (
          <ToolboxTalkPage onBack={() => handleNavigate('dashboard')} />
        )}
        {currentPage === 'timesheet' && isAuthenticated && (
          <TimesheetPage onBack={() => handleNavigate('dashboard')} />
        )}
        {currentPage === 'incident' && isAuthenticated && (
          <IncidentReportPage onBack={() => handleNavigate('dashboard')} />
        )}
        {currentPage === 'reference' && isAuthenticated && (
          <ReferenceDocsPage onBack={() => handleNavigate('dashboard')} />
        )}
        {currentPage === 'register' && (
          <WorkerRegistrationPage onBack={() => handleNavigate('portal')} onSuccess={() => handleNavigate('portal')} />
        )}
        
        {/* Admin Pages */}
        {currentPage === 'admin-dashboard' && isAuthenticated && currentUser?.role === 'admin' && (
          <AdminDashboardPage onNavigate={handleNavigate} onBack={() => handleNavigate('dashboard')} />
        )}
        {currentPage === 'admin-users' && isAuthenticated && currentUser?.role === 'admin' && (
          <AdminUserManagementPage onBack={() => handleNavigate('admin-dashboard')} />
        )}
        {currentPage === 'admin-timesheets' && isAuthenticated && currentUser?.role === 'admin' && (
          <AdminTimesheetsPage onBack={() => handleNavigate('admin-dashboard')} />
        )}
        {currentPage === 'admin-analytics' && isAuthenticated && currentUser?.role === 'admin' && (
          <AdminAnalyticsPage onBack={() => handleNavigate('admin-dashboard')} />
        )}
        {currentPage === 'admin-submissions' && isAuthenticated && currentUser?.role === 'admin' && (
          <AdminAllSubmissionsPage onBack={() => handleNavigate('admin-dashboard')} />
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
      </main>
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
