import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { getCurrentUser, submitSWMS } from '../lib/firebase-service';

interface SWMSFormPageProps {
  onBack: () => void;
}

export function SWMSFormPage({ onBack }: SWMSFormPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    workerName: '',
    projectName: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    supervisor: '',
    hazardsIdentified: '',
    controlMeasures: '',
    emergencyProcedures: '',
    ppe: [] as string[],
  });

  const ppeOptions = [
    'Hard Hat',
    'Safety Glasses',
    'Steel-Toe Boots',
    'High-Vis Vest',
    'Gloves',
    'Ear Protection',
    'Respirator',
    'Fall Protection',
  ];

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
      await submitSWMS({
        userId: user.uid,
        workerName: formData.workerName || user.displayName,
        workerEmail: user.email,
        projectName: formData.projectName,
        location: formData.location,
        date: formData.date,
        supervisor: formData.supervisor,
        hazards: formData.hazardsIdentified.split('\n').filter(h => h.trim()),
        controlMeasures: formData.controlMeasures,
        emergencyProcedures: formData.emergencyProcedures,
        ppe: formData.ppe,
        status: 'submitted',
      });
      
      toast.success('SWMS Form submitted successfully to Tam & Ciro!');
      onBack();
    } catch (error) {
      toast.error('Failed to submit SWMS form. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePPE = (item: string) => {
    setFormData(prev => ({
      ...prev,
      ppe: prev.ppe.includes(item)
        ? prev.ppe.filter(p => p !== item)
        : [...prev.ppe, item]
    }));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#111111]' : 'bg-[#F5F4F1]'}`}>
      <HorseshoeCursor />
      
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
              <h1 className={`text-2xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
                SWMS Form
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
              {/* Worker Name */}
              <div className="space-y-2">
                <Label htmlFor="workerName" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Worker Name *
                </Label>
                <Input
                  id="workerName"
                  value={formData.workerName}
                  onChange={(e) => setFormData({ ...formData, workerName: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  required
                />
              </div>

              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="projectName" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Project Name *
                </Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  required
                />
              </div>

              {/* Location */}
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

              {/* Date */}
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

              {/* Supervisor */}
              <div className="space-y-2">
                <Label htmlFor="supervisor" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Supervisor *
                </Label>
                <Input
                  id="supervisor"
                  value={formData.supervisor}
                  onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  required
                />
              </div>

              {/* Hazards Identified */}
              <div className="space-y-2">
                <Label htmlFor="hazardsIdentified" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Hazards Identified *
                </Label>
                <Textarea
                  id="hazardsIdentified"
                  value={formData.hazardsIdentified}
                  onChange={(e) => setFormData({ ...formData, hazardsIdentified: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  rows={4}
                  placeholder="List all potential hazards..."
                  required
                />
              </div>

              {/* Control Measures */}
              <div className="space-y-2">
                <Label htmlFor="controlMeasures" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Control Measures *
                </Label>
                <Textarea
                  id="controlMeasures"
                  value={formData.controlMeasures}
                  onChange={(e) => setFormData({ ...formData, controlMeasures: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  rows={4}
                  placeholder="Describe safety measures to be implemented..."
                  required
                />
              </div>

              {/* Emergency Procedures */}
              <div className="space-y-2">
                <Label htmlFor="emergencyProcedures" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Emergency Procedures *
                </Label>
                <Textarea
                  id="emergencyProcedures"
                  value={formData.emergencyProcedures}
                  onChange={(e) => setFormData({ ...formData, emergencyProcedures: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  rows={4}
                  placeholder="Describe emergency procedures..."
                  required
                />
              </div>

              {/* PPE Required */}
              <div className="space-y-3">
                <Label className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  PPE Required *
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {ppeOptions.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={item}
                        checked={formData.ppe.includes(item)}
                        onCheckedChange={() => togglePPE(item)}
                      />
                      <label
                        htmlFor={item}
                        className={`text-sm cursor-pointer ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${theme === 'dark' ? 'bg-[#C9A24E] hover:bg-[#A88B63]' : 'bg-[#A88B63] hover:bg-[#C9A24E]'} text-white`}
                >
                  <Send size={18} className="mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit SWMS Form'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}