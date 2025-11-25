import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { getCurrentUser, submitToolboxTalk } from '../lib/firebase-service';

interface ToolboxTalkPageProps {
  onBack: () => void;
}

export function ToolboxTalkPage({ onBack }: ToolboxTalkPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    conductedBy: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    topic: '',
    attendees: '',
    keyPoints: '',
    actions: '',
  });

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
      await submitToolboxTalk({
        userId: user.uid,
        submittedBy: formData.conductedBy || user.displayName,
        submittedByEmail: user.email,
        topic: formData.topic,
        date: formData.date,
        location: formData.location,
        presenter: formData.conductedBy || user.displayName,
        attendees: formData.attendees.split(',').map(a => a.trim()).filter(a => a),
        keyPoints: formData.keyPoints,
        actions: formData.actions,
        status: 'submitted',
      });
      
      toast.success('Toolbox Talk submitted successfully to Tam & Ciro!');
      onBack();
    } catch (error) {
      toast.error('Failed to submit Toolbox Talk. Please try again.');
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
                Toolbox Talk
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

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className={`p-8 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="conductedBy" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Conducted By *
                </Label>
                <Input
                  id="conductedBy"
                  value={formData.conductedBy}
                  onChange={(e) => setFormData({ ...formData, conductedBy: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Location *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Topic *
                </Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g., Working at Heights, Electrical Safety"
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendees" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Attendees *
                </Label>
                <Textarea
                  id="attendees"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  rows={3}
                  placeholder="List all attendees (comma separated)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyPoints" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Key Points Discussed *
                </Label>
                <Textarea
                  id="keyPoints"
                  value={formData.keyPoints}
                  onChange={(e) => setFormData({ ...formData, keyPoints: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="actions" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Actions Taken
                </Label>
                <Textarea
                  id="actions"
                  value={formData.actions}
                  onChange={(e) => setFormData({ ...formData, actions: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  rows={4}
                  placeholder="Optional"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${theme === 'dark' ? 'bg-[#C9A24E] hover:bg-[#A88B63]' : 'bg-[#A88B63] hover:bg-[#C9A24E]'} text-white`}
                >
                  <Send size={18} className="mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Toolbox Talk'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}