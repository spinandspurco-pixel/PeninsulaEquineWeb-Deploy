import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Sun, Moon, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { getCurrentUser, submitIncidentReport } from '../lib/firebase-service';

interface IncidentReportPageProps {
  onBack: () => void;
}

export function IncidentReportPage({ onBack }: IncidentReportPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reportedBy: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    location: '',
    severity: '' as 'minor' | 'moderate' | 'serious' | 'critical' | '',
    type: '',
    description: '',
    injuriesDescription: '',
    witnessNames: '',
    immediateActions: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.severity || !formData.type) {
      toast.error('Please select severity and type');
      return;
    }
    
    setIsSubmitting(true);

    const user = getCurrentUser();
    if (!user) {
      toast.error('User not found. Please log in again.');
      setIsSubmitting(false);
      return;
    }

    try {
      await submitIncidentReport({
        userId: user.uid,
        reportedBy: formData.reportedBy || user.displayName,
        reportedByEmail: user.email,
        incidentDate: formData.date,
        incidentTime: formData.time,
        location: formData.location,
        incidentType: formData.type,
        description: formData.description,
        injuredPerson: formData.injuriesDescription,
        witnesses: formData.witnessNames,
        immediateAction: formData.immediateActions,
        severity: formData.severity as 'minor' | 'moderate' | 'serious' | 'critical',
        status: 'submitted',
      });
      
      toast.success('Incident Report submitted successfully to Tam & Ciro! [URGENT]', {
        duration: 5000,
      });
      onBack();
    } catch (error) {
      toast.error('Failed to submit incident report. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#111111]' : 'bg-[#F5F4F1]'}`}>
      <HorseshoeCursor />
      
      <div className={`border-b ${theme === 'dark' ? 'bg-[#0F0F0F] border-red-500/30' : 'bg-white border-red-500/40'}`}>
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
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-red-500" size={24} />
                <h1 className={`text-2xl font-display ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  Incident Report
                </h1>
              </div>
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
          {/* Warning Banner */}
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
              <strong>Important:</strong> This incident report will be immediately flagged and sent to management.
              Ensure all details are accurate and complete.
            </p>
          </div>

          <Card className={`p-8 ${theme === 'dark' ? 'bg-[#0F0F0F] border-red-500/20' : 'bg-white border-red-500/30'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Reporter Info */}
              <div className="space-y-2">
                <Label htmlFor="reportedBy" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Reported By *
                </Label>
                <Input
                  id="reportedBy"
                  value={formData.reportedBy}
                  onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                    Date of Incident *
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
                  <Label htmlFor="time" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                    Time of Incident *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                    required
                  />
                </div>
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
                  placeholder="Specific location where incident occurred"
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  required
                />
              </div>

              {/* Severity & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                    Severity *
                  </Label>
                  <Select value={formData.severity} onValueChange={(value) => setFormData({ ...formData, severity: value })}>
                    <SelectTrigger className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minor">Minor</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="serious">Serious</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                    Type *
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>

                    <SelectTrigger className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="injury">Injury</SelectItem>
                      <SelectItem value="nearmiss">Near Miss</SelectItem>
                      <SelectItem value="propertydamage">Property Damage</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Incident Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  rows={5}
                  placeholder="Provide a detailed description of what happened..."
                  required
                />
              </div>

              {/* Injuries */}
              <div className="space-y-2">
                <Label htmlFor="injuriesDescription" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Injuries/Damage Description
                </Label>
                <Textarea
                  id="injuriesDescription"
                  value={formData.injuriesDescription}
                  onChange={(e) => setFormData({ ...formData, injuriesDescription: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  rows={3}
                  placeholder="Describe any injuries or property damage"
                />
              </div>

              {/* Witnesses */}
              <div className="space-y-2">
                <Label htmlFor="witnessNames" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Witness Names
                </Label>
                <Textarea
                  id="witnessNames"
                  value={formData.witnessNames}
                  onChange={(e) => setFormData({ ...formData, witnessNames: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  rows={2}
                  placeholder="List any witnesses (one per line)"
                />
              </div>

              {/* Immediate Actions */}
              <div className="space-y-2">
                <Label htmlFor="immediateActions" className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                  Immediate Actions Taken *
                </Label>
                <Textarea
                  id="immediateActions"
                  value={formData.immediateActions}
                  onChange={(e) => setFormData({ ...formData, immediateActions: e.target.value })}
                  className={theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
                  rows={3}
                  placeholder="What actions were taken immediately after the incident?"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <AlertTriangle size={18} className="mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Incident Report (URGENT)'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}