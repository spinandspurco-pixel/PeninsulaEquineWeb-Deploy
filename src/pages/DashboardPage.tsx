import { Card } from '../components/ui/card';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import type { UserRole } from '../types';
import { useTheme } from '../context/ThemeContext';
import logoImage from 'figma:asset/43b0d27420f20197681aa3cacbf2abda7c055e3d.png';

interface DashboardPageProps {
  userRole: UserRole;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function DashboardPage({ userRole, onLogout, onNavigate }: DashboardPageProps) {
  const isAdmin = userRole === 'admin';
  const { theme, toggleTheme } = useTheme();

  const quickActions = [
    { label: 'SWMS Form', icon: ClipboardCheck, page: 'swms', color: 'text-[#C9A24E]', bg: 'bg-[#C9A24E]/20' },
    { label: 'Toolbox Talk', icon: Wrench, page: 'toolbox', color: 'text-[#A88B63]', bg: 'bg-[#A88B63]/20' },
    { label: 'Timesheet', icon: Clock, page: 'timesheet', color: 'text-[#78A1BB]', bg: 'bg-[#78A1BB]/20' },
    { label: 'Incident Report', icon: AlertOctagon, page: 'incident', color: 'text-red-500', bg: 'bg-red-500/20' },
    { label: 'Reference Docs', icon: FolderOpen, page: 'reference', color: 'text-green-500', bg: 'bg-green-500/20' },
  ];

  console.log('App loaded:', !!document.getElementById('root'))

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#111111]' : 'bg-[#F5F4F1]'}`}>
      <HorseshoeCursor />
      {/* Header */}
      <div className={`border-b ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={logoImage}
                alt="Peninsula Equine"
                className="h-10 w-auto"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(201, 162, 78, 0.4))',
                }}
              />
              <div>
                <h1 className={`text-xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
                  {isAdmin ? 'Admin Dashboard' : 'Worker Dashboard'}
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Peninsula Equine Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button
                  onClick={() => onNavigate('admin-timesheets')}
                  variant="outline"
                  className={theme === 'dark' ? 'border-amber-600/30 text-[#C9A24E] hover:bg-amber-600/10' : 'border-[#C9A24E]/40 text-[#A88B63] hover:bg-[#C9A24E]/10'}
                >
                  <Clock className="mr-2" size={18} />
                  Review Timesheets
                </Button>
              )}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className={theme === 'dark' ? 'text-[#C9A24E] hover:bg-white/5' : 'text-[#A88B63] hover:bg-black/5'}
              >
                return (
                  <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#111111]' : 'bg-[#F5F4F1]'}`}>
                    <HorseshoeCursor />
                    {/* Header */}
                    <div className={`border-b ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
                      <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={logoImage}
                              alt="Peninsula Equine"
                              className="h-10 w-auto"
                              style={{
                                filter: 'drop-shadow(0 0 12px rgba(201, 162, 78, 0.4))',
                              }}
                            />
                            <div>
                              <h1 className={`text-xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}> 
                                {isAdmin ? 'Admin Dashboard' : 'Worker Dashboard'}
                              </h1>
                              <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Peninsula Equine Portal</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isAdmin && (
                              <Button
                                onClick={() => onNavigate('admin-timesheets')}
                                variant="outline"
                                className={theme === 'dark' ? 'border-amber-600/30 text-[#C9A24E] hover:bg-amber-600/10' : 'border-[#C9A24E]/40 text-[#A88B63] hover:bg-[#C9A24E]/10'}
                              >
                                <Clock className="mr-2" size={18} />
                                Review Timesheets
                              </Button>
                            )}
                            <Button
                              onClick={toggleTheme}
                              variant="ghost"
                              size="icon"
                              className={theme === 'dark' ? 'text-[#C9A24E] hover:bg-white/5' : 'text-[#A88B63] hover:bg-black/5'}
                            >
                              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </Button>
                            <Button
                              onClick={onLogout}
                              variant="outline"
                              className={theme === 'dark' ? 'border-amber-600/30 text-white hover:bg-amber-600/20' : 'border-[#C9A24E]/40 text-[#0F0F0F] hover:bg-[#C9A24E]/10'}
                            >
                              <LogOut className="mr-2" size={18} />
                              Logout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="container mx-auto px-4 py-8">
                      {/* Next-level dashboard widgets */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Project Status Widget */}
                        <div className="bg-gradient-to-br from-[#232323] via-[#181818] to-[#C9A24E]/10 rounded-xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
                          <h2 className="text-2xl font-bold text-[#C9A24E] mb-2">Project Status</h2>
                          <p className="text-white/80 mb-4">All projects on track</p>
                          <button className="px-4 py-2 bg-[#C9A24E] text-black rounded hover:bg-[#A88B63] transition">View Projects</button>
                        </div>
                        {/* Timesheets Widget */}
                        <div className="bg-gradient-to-br from-[#232323] via-[#181818] to-[#C9A24E]/10 rounded-xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
                          <h2 className="text-2xl font-bold text-[#C9A24E] mb-2">Timesheets</h2>
                          <p className="text-white/80 mb-4">Submit and review timesheets</p>
                          <button className="px-4 py-2 bg-[#C9A24E] text-black rounded hover:bg-[#A88B63] transition">Go to Timesheets</button>
                        </div>
                        {/* Documentation Widget */}
                        <div className="bg-gradient-to-br from-[#232323] via-[#181818] to-[#C9A24E]/10 rounded-xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
                          <h2 className="text-2xl font-bold text-[#C9A24E] mb-2">Documentation</h2>
                          <p className="text-white/80 mb-4">Access all guidelines and docs</p>
                          <button className="px-4 py-2 bg-[#C9A24E] text-black rounded hover:bg-[#A88B63] transition">View Docs</button>
                        </div>
                        {/* Team Chat Widget */}
                        <div className="bg-gradient-to-br from-[#232323] via-[#181818] to-[#C9A24E]/10 rounded-xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
                          <h2 className="text-2xl font-bold text-[#C9A24E] mb-2">Team Chat</h2>
                          <p className="text-white/80 mb-4">Collaborate with your team</p>
                          <button className="px-4 py-2 bg-[#C9A24E] text-black rounded hover:bg-[#A88B63] transition">Open Chat</button>
                        </div>
                        {/* Notifications Widget */}
                        <div className="bg-gradient-to-br from-[#232323] via-[#181818] to-[#C9A24E]/10 rounded-xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
                          <h2 className="text-2xl font-bold text-[#C9A24E] mb-2">Notifications</h2>
                          <p className="text-white/80 mb-4">Stay up to date</p>
                          <button className="px-4 py-2 bg-[#C9A24E] text-black rounded hover:bg-[#A88B63] transition">View Notifications</button>
                        </div>
                        {/* Quick Links Widget */}
                        <div className="bg-gradient-to-br from-[#232323] via-[#181818] to-[#C9A24E]/10 rounded-xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
                          <h2 className="text-2xl font-bold text-[#C9A24E] mb-2">Quick Links</h2>
                          <p className="text-white/80 mb-4">Access important resources</p>
                          <button className="px-4 py-2 bg-[#C9A24E] text-black rounded hover:bg-[#A88B63] transition">Go to Links</button>
                        </div>
                      </div>
                      {/* Quick Actions Section (fixed JSX) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
                        {quickActions.map((action, index) => (
                          <motion.button
                            key={action.page}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => onNavigate(action.page)}
                            className={`p-6 rounded-xl border transition-all ${
                              theme === 'dark' 
                                ? 'bg-[#0F0F0F] border-[#C9A24E]/20 hover:border-[#C9A24E]/50 hover:bg-[#0F0F0F]/80' 
                                : 'bg-white border-[#C9A24E]/30 hover:border-[#C9A24E]/60 hover:bg-[#F5F4F1]'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-lg ${action.bg} flex items-center justify-center mb-3 mx-auto`}>
                              <action.icon className={action.color} size={24} />
                            </div>
                            <p className={`text-center text-sm ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                              {action.label}
                            </p>
                          </motion.button>
                        ))}
                      </div>
                      {/* Stats Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className={`backdrop-blur-lg p-6 ${theme === 'dark' ? 'bg-[#0F0F0F]/50 border-amber-600/30' : 'bg-white border-[#C9A24E]/30'}`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Active Projects</p>
                              <p className={`text-3xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}`}>{isAdmin ? '12' : '3'}</p>
                            </div>
                            <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center">
                              <Hammer className="text-amber-500" size={24} />
                            </div>
                          </div>
                        </Card>
                        <Card className={`backdrop-blur-lg p-6 ${theme === 'dark' ? 'bg-[#0F0F0F]/50 border-amber-600/30' : 'bg-white border-[#C9A24E]/30'}`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{isAdmin ? 'Team Members' : 'Hours This Week'}</p>
                              <p className={`text-3xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}`}>{isAdmin ? '24' : '38'}</p>
                            </div>
                            <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center">
                              {isAdmin ? <Users className="text-amber-500" size={24} /> : <Clock className="text-amber-500" size={24} />}
                            </div>
                          </div>
                        </Card>
                        {/* ...existing code... */}
                      </div>
                      {/* ...existing code... */}
                    </div>
                  </div>
                );
                      activity.status === 'In Progress' ? 'bg-amber-600/20 text-amber-400' :
                      'bg-blue-600/20 text-blue-400'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Schedule */}
            <Card className={`backdrop-blur-lg p-6 ${theme === 'dark' ? 'bg-[#0F0F0F]/50 border-amber-600/30' : 'bg-white border-[#C9A24E]/30'}`}>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-amber-500" size={24} />
                <h3 className={`text-xl font-display ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                  {isAdmin ? 'Project Schedule' : 'My Schedule'}
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  { date: 'Nov 6', day: 'Wednesday', project: 'Valley View Ranch', time: '8:00 AM - 4:00 PM' },
                  { date: 'Nov 7', day: 'Thursday', project: 'Sunset Stables', time: '7:00 AM - 3:00 PM' },
                  { date: 'Nov 8', day: 'Friday', project: 'Diamond Arena', time: '9:00 AM - 5:00 PM' },
                ].map((schedule, index) => (
                  <div key={index} className={`flex gap-4 p-3 rounded-lg border transition-colors ${theme === 'dark' ? 'bg-neutral-900/50 border-amber-600/10 hover:border-amber-600/30' : 'bg-[#F5F4F1] border-[#C9A24E]/20 hover:border-[#C9A24E]/40'}`}>
                    <div className="flex flex-col items-center justify-center bg-amber-600/20 rounded-lg px-3 py-2 min-w-[60px]">
                      <p className="text-amber-500 font-display text-lg">{schedule.date.split(' ')[1]}</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{schedule.day.slice(0, 3)}</p>
                    </div>
                    <div className="flex-1">
                      <p className={`mb-1 ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>{schedule.project}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{schedule.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Additional Admin Content */}
            {isAdmin && (
              <Card className={`backdrop-blur-lg p-6 lg:col-span-2 ${theme === 'dark' ? 'bg-[#0F0F0F]/50 border-amber-600/30' : 'bg-white border-[#C9A24E]/30'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="text-amber-500" size={24} />
                  <h3 className={`text-xl font-display ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>Project Overview</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: 'Valley View Ranch', progress: 75, status: 'On Track' },
                    { name: 'Sunset Stables Build', progress: 45, status: 'In Progress' },
                    { name: 'Diamond Arena Renovation', progress: 90, status: 'Near Completion' },
                  ].map((project, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-neutral-900/50 border-amber-600/10' : 'bg-[#F5F4F1] border-[#C9A24E]/20'}`}>
                      <h4 className={`${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'} mb-2`}>{project.name}</h4>
                      <div className="mb-2">
                        <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-neutral-700' : 'bg-[#C9A24E]/20'}`}>
                          <div 
                            className="bg-gradient-to-r from-amber-600 to-amber-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{project.progress}% Complete</span>
                        <span className="text-amber-500 text-sm">{project.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}