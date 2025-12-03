import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, CheckCircle, XCircle, Clock, Calendar, Filter, Search, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { getAllTimesheets, approveTimesheet, rejectTimesheet, getCurrentUser, type Timesheet } from '../lib/firebase-service';

interface AdminTimesheetsPageProps {
  onBack: () => void;
}

export function AdminTimesheetsPage({ onBack }: AdminTimesheetsPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    loadTimesheets();
  }, []);

  const loadTimesheets = async () => {
    setLoading(true);
    try {
      const data = await getAllTimesheets();
      setTimesheets(data);
    } catch (error) {
      toast.error('Failed to load timesheets');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    if (!currentUser) return;
    
    try {
      await approveTimesheet(id, currentUser.uid);
      toast.success('Timesheet approved successfully!');
      setSelectedTimesheet(null);
      loadTimesheets();
    } catch (error) {
      toast.error('Failed to approve timesheet');
    }
  };

  const handleReject = async (id: string) => {
    if (!currentUser) return;
    
    try {
      await rejectTimesheet(id, currentUser.uid);
      toast.error('Timesheet rejected');
      setSelectedTimesheet(null);
      loadTimesheets();
    } catch (error) {
      toast.error('Failed to reject timesheet');
    }
  };

  const handleExport = () => {
    toast.success('Exporting timesheets to CSV...');
    // In production, this would generate and download a CSV file
  };

  const filteredTimesheets = timesheets.filter(ts => {
    const matchesSearch = ts.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ts.workerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ts.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = timesheets.filter(ts => ts.status === 'pending').length;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#111111]' : 'bg-[#F5F4F1]'}`}>
      {/* Header */}
      <div className={`border-b ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="ghost"
                size="icon"
                className={theme === 'dark' ? 'text-[#C9A24E] hover:bg-white/5' : 'text-[#A88B63] hover:bg-black/5'}
              >
                <ArrowLeft size={20} />
              </Button>
              <div>
                <h1 className={`text-2xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
                  Timesheet Review
                </h1>
                {pendingCount > 0 && (
                  <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                    {pendingCount} pending approval
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleExport}
                variant="outline"
                className={theme === 'dark' ? 'border-[#C9A24E]/30 text-[#C9A24E]' : 'border-[#A88B63]/40 text-[#A88B63]'}
              >
                <Download size={18} className="mr-2" />
                Export
              </Button>
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className={theme === 'dark' ? 'text-[#C9A24E] hover:bg-white/5' : 'text-[#A88B63] hover:bg-black/5'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className={`p-6 mb-6 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A24E]/50" size={20} />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}`}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  onClick={() => setStatusFilter(status as any)}
                  className={statusFilter === status 
                    ? 'bg-[#C9A24E] text-white hover:bg-[#A88B63]'
                    : theme === 'dark' 
                      ? 'border-[#C9A24E]/30 text-white hover:bg-white/5' 
                      : 'border-[#A88B63]/40 text-[#0F0F0F] hover:bg-black/5'
                  }
                >
                  <Filter size={16} className="mr-2" />
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Timesheets List */}
        <div className="grid gap-4">
          {filteredTimesheets.map((timesheet) => (
            <motion.div
              key={timesheet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className={`p-6 cursor-pointer transition-all ${
                  theme === 'dark' 
                    ? 'bg-[#0F0F0F] border-[#C9A24E]/20 hover:border-[#C9A24E]/40' 
                    : 'bg-white border-[#C9A24E]/30 hover:border-[#C9A24E]/50'
                }`}
                onClick={() => setSelectedTimesheet(timesheet)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`font-display text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                        {timesheet.workerName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        timesheet.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                        timesheet.status === 'approved' ? 'bg-green-600/20 text-green-400' :
                        'bg-red-600/20 text-red-400'
                      }`}>
                        {timesheet.status.charAt(0).toUpperCase() + timesheet.status.slice(1)}
                      </span>
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-1`}>
                      {timesheet.workerEmail}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#C9A24E]" />
                        <span className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>
                          Week ending: {new Date(timesheet.weekEnding).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#C9A24E]" />
                        <span className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>
                          {timesheet.totalHours} hours
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {timesheet.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(timesheet.id);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle size={18} className="mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(timesheet.id);
                        }}
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500/10"
                      >
                        <XCircle size={18} className="mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}

          {filteredTimesheets.length === 0 && (
            <Card className={`p-12 text-center ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
              <Clock size={48} className="mx-auto mb-4 text-[#C9A24E]/50" />
              <p className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>
                No timesheets found matching your filters
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Detailed View Modal */}
      {selectedTimesheet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTimesheet(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl ${
              theme === 'dark' ? 'bg-[#0F0F0F] border border-[#C9A24E]/20' : 'bg-white border border-[#C9A24E]/30'
            }`}
          >
            <div className={`sticky top-0 border-b p-6 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className={`text-2xl font-display mb-2 ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}`}>
                    {selectedTimesheet.workerName}
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                    Submitted: {new Date(selectedTimesheet.submittedDate).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedTimesheet(null)}
                  className={theme === 'dark' ? 'text-white hover:bg-white/5' : 'text-[#0F0F0F] hover:bg-black/5'}
                >
                  <XCircle size={24} />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {selectedTimesheet.entries.map((entry, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/20' : 'bg-[#F5F4F1] border-[#C9A24E]/30'}`}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className={`block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-1`}>Date</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className={`block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-1`}>Start</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>{entry.startTime}</span>
                      </div>
                      <div>
                        <span className={`block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-1`}>End</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>{entry.endTime}</span>
                      </div>
                      <div>
                        <span className={`block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-1`}>Break</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>{entry.breakMinutes}min</span>
                      </div>
                      <div>
                        <span className={`block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-1`}>Hours</span>
                        <span className="text-[#C9A24E]">{entry.hours}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className={`block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-1 text-sm`}>Project</span>
                      <span className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>{entry.project}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-[#C9A24E]/10' : 'bg-[#C9A24E]/20'}`}>
                <div className="flex justify-between items-center">
                  <span className={`font-display ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>Total Hours:</span>
                  <span className="text-2xl font-display text-[#C9A24E]">
                    {selectedTimesheet.totalHours.toFixed(2)}
                  </span>
                </div>
              </div>

              {selectedTimesheet.status === 'pending' && (
                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={() => handleApprove(selectedTimesheet.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle size={18} className="mr-2" />
                    Approve Timesheet
                  </Button>
                  <Button
                    onClick={() => handleReject(selectedTimesheet.id)}
                    variant="outline"
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10"
                  >
                    <XCircle size={18} className="mr-2" />
                    Reject Timesheet
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}