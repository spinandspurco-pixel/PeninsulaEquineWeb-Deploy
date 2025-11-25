import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sun, Moon, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { getCurrentUser, submitTimesheet } from '../lib/firebase-service';

interface TimesheetPageProps {
  onBack: () => void;
}

interface TimeEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  project: string;
}

export function TimesheetPage({ onBack }: TimesheetPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workerName, setWorkerName] = useState('');
  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      startTime: '08:00',
      endTime: '17:00',
      breakMinutes: 30,
      project: '',
    },
  ]);

  const addEntry = () => {
    setEntries([
      ...entries,
      {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        startTime: '08:00',
        endTime: '17:00',
        breakMinutes: 30,
        project: '',
      },
    ]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  const updateEntry = (id: string, field: keyof TimeEntry, value: string | number) => {
    setEntries(entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const calculateHours = (entry: TimeEntry) => {
    const start = new Date(`2000-01-01T${entry.startTime}`);
    const end = new Date(`2000-01-01T${entry.endTime}`);
    const diff = (end.getTime() - start.getTime()) / 1000 / 60; // minutes
    const hours = (diff - entry.breakMinutes) / 60;
    return hours > 0 ? hours.toFixed(2) : '0.00';
  };

  const totalHours = entries.reduce((sum, entry) => sum + parseFloat(calculateHours(entry)), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = getCurrentUser();
    if (!user) {
      toast.error('User not found. Please log in again.');
      setIsSubmitting(false);
      return;
    }

    try {
      const timesheetEntries = entries.map(entry => ({
        id: entry.id,
        date: entry.date,
        startTime: entry.startTime,
        endTime: entry.endTime,
        breakMinutes: entry.breakMinutes,
        project: entry.project,
        hours: parseFloat(calculateHours(entry)),
      }));

      await submitTimesheet({
        userId: user.uid,
        workerName: workerName || user.displayName,
        workerEmail: user.email,
        weekEnding: entries[entries.length - 1]?.date || new Date().toISOString().split('T')[0],
        totalHours,
        status: 'pending',
        entries: timesheetEntries,
      });
      
      toast.success('Timesheet submitted successfully to Tam & Ciro!');
      onBack();
    } catch (error) {
      toast.error('Failed to submit timesheet. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#111111]' : 'bg-[#F5F4F1]'}`}>
      <HorseshoeCursor />
      
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
              <h1 className={`text-2xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
                Timesheet
              </h1>
            </div>
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

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className={`p-8 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="workerName" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Worker Name *
                </Label>
                <Input
                  id="workerName"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  required
                />
              </div>

              <div className="border-t pt-6" style={{ borderColor: theme === 'dark' ? 'rgba(201, 162, 78, 0.2)' : 'rgba(201, 162, 78, 0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}`}>
                    Time Entries
                  </h3>
                  <Button
                    type="button"
                    onClick={addEntry}
                    variant="outline"
                    size="sm"
                    className={theme === 'dark' ? 'border-[#C9A24E]/30 text-[#C9A24E]' : 'border-[#A88B63]/40 text-[#A88B63]'}
                  >
                    <Plus size={16} className="mr-1" />
                    Add Entry
                  </Button>
                </div>

                <div className="space-y-4">
                  {entries.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <Label className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Date</Label>
                          <Input
                            type="date"
                            value={entry.date}
                            onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                            className={`mt-1 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20 text-white' : 'bg-[#F5F4F1] border-[#C9A24E]/30 text-[#0F0F0F]'}`}
                            required
                          />
                        </div>
                        <div>
                          <Label className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Start</Label>
                          <Input
                            type="time"
                            value={entry.startTime}
                            onChange={(e) => updateEntry(entry.id, 'startTime', e.target.value)}
                            className={`mt-1 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20 text-white' : 'bg-[#F5F4F1] border-[#C9A24E]/30 text-[#0F0F0F]'}`}
                            required
                          />
                        </div>
                        <div>
                          <Label className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>End</Label>
                          <Input
                            type="time"
                            value={entry.endTime}
                            onChange={(e) => updateEntry(entry.id, 'endTime', e.target.value)}
                            className={`mt-1 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20 text-white' : 'bg-[#F5F4F1] border-[#C9A24E]/30 text-[#0F0F0F]'}`}
                            required
                          />
                        </div>
                        <div>
                          <Label className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Break (min)</Label>
                          <Input
                            type="number"
                            value={entry.breakMinutes}
                            onChange={(e) => updateEntry(entry.id, 'breakMinutes', parseInt(e.target.value) || 0)}
                            className={`mt-1 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20 text-white' : 'bg-[#F5F4F1] border-[#C9A24E]/30 text-[#0F0F0F]'}`}
                            min="0"
                            required
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Label className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Hours</Label>
                            <div className={`mt-1 px-3 py-2 rounded-md border ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20 text-[#C9A24E]' : 'bg-[#F5F4F1] border-[#C9A24E]/30 text-[#A88B63]'}`}>
                              {calculateHours(entry)}
                            </div>
                          </div>
                          {entries.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeEntry(entry.id)}
                              className="text-red-500 hover:bg-red-500/10"
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="mt-3">
                        <Label className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Project</Label>
                        <Input
                          value={entry.project}
                          onChange={(e) => updateEntry(entry.id, 'project', e.target.value)}
                          className={`mt-1 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20 text-white' : 'bg-[#F5F4F1] border-[#C9A24E]/30 text-[#0F0F0F]'}`}
                          placeholder="Project name"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-[#C9A24E]/10' : 'bg-[#C9A24E]/20'}`}>
                <span className={`font-display ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>Total Hours:</span>
                <span className={`text-2xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}`}>
                  {totalHours.toFixed(2)}
                </span>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${theme === 'dark' ? 'bg-[#C9A24E] hover:bg-[#A88B63]' : 'bg-[#A88B63] hover:bg-[#C9A24E]'} text-white`}
                >
                  <Send size={18} className="mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Timesheet'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}