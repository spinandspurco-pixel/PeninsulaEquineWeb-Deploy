import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, FileText, AlertCircle, Wrench, ClipboardCheck, Sun, Moon, Eye, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { useTheme } from '../context/ThemeContext';
import { 
  getAllSWMS, 
  getAllToolboxTalks, 
  getAllIncidentReports,
  markSWMSAsReviewed,
  markToolboxTalkAsReviewed,
  updateIncidentStatus,
  type SWMSForm,
  type ToolboxTalk,
  type IncidentReport
} from '../lib/firebase-service';
import { toast } from 'sonner';

interface AdminAllSubmissionsPageProps {
  onBack: () => void;
}

type SubmissionType = 'swms' | 'toolbox' | 'incident';

export function AdminAllSubmissionsPage({ onBack }: AdminAllSubmissionsPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<SubmissionType>('swms');
  const [swmsForms, setSWMSForms] = useState<SWMSForm[]>([]);
  const [toolboxTalks, setToolboxTalks] = useState<ToolboxTalk[]>([]);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [swmsData, toolboxData, incidentData] = await Promise.all([
        getAllSWMS(),
        getAllToolboxTalks(),
        getAllIncidentReports(),
      ]);
      
      setSWMSForms(swmsData);
      setToolboxTalks(toolboxData);
      setIncidents(incidentData);
    } catch (error) {
      toast.error('Failed to load submissions');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkSWMSReviewed = async (id: string) => {
    try {
      await markSWMSAsReviewed(id);
      toast.success('SWMS marked as reviewed');
      loadData();
      setSelectedItem(null);
    } catch (error) {
      toast.error('Failed to update SWMS');
    }
  };

  const handleMarkToolboxReviewed = async (id: string) => {
    try {
      await markToolboxTalkAsReviewed(id);
      toast.success('Toolbox Talk marked as reviewed');
      loadData();
      setSelectedItem(null);
    } catch (error) {
      toast.error('Failed to update Toolbox Talk');
    }
  };

  const handleUpdateIncidentStatus = async (id: string, status: IncidentReport['status']) => {
    try {
      await updateIncidentStatus(id, status);
      toast.success(`Incident marked as ${status}`);
      loadData();
      setSelectedItem(null);
    } catch (error) {
      toast.error('Failed to update incident');
    }
  };

  const tabs = [
    { id: 'swms' as const, label: 'SWMS Forms', icon: ClipboardCheck, count: swmsForms.length },
    { id: 'toolbox' as const, label: 'Toolbox Talks', icon: Wrench, count: toolboxTalks.length },
    { id: 'incident' as const, label: 'Incident Reports', icon: AlertCircle, count: incidents.length },
  ];

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
              <div>
                <h1 className={`text-2xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
                  All Submissions
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                  Review all worker submissions
                </p>
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

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              className={activeTab === tab.id
                ? 'bg-[#C9A24E] text-white hover:bg-[#A88B63]'
                : theme === 'dark'
                  ? 'border-[#C9A24E]/30 text-white hover:bg-white/5'
                  : 'border-[#A88B63]/40 text-[#0F0F0F] hover:bg-black/5'
              }
            >
              <tab.icon size={18} className="mr-2" />
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id 
                  ? 'bg-white/20' 
                  : theme === 'dark' 
                    ? 'bg-[#C9A24E]/20 text-[#C9A24E]' 
                    : 'bg-[#A88B63]/20 text-[#A88B63]'
              }`}>
                {tab.count}
              </span>
            </Button>
          ))}
        </div>

        {loading ? (
          <Card className={`p-12 text-center ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
            <p className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>Loading...</p>
          </Card>
        ) : (
          <>
            {/* SWMS Forms */}
            {activeTab === 'swms' && (
              <div className="grid gap-4">
                {swmsForms.length === 0 ? (
                  <Card className={`p-12 text-center ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
                    <ClipboardCheck size={48} className="mx-auto mb-4 text-[#C9A24E]/50" />
                    <p className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>
                      No SWMS forms submitted yet
                    </p>
                  </Card>
                ) : (
                  swmsForms.map((swms) => (
                    <motion.div
                      key={swms.id}
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
                        onClick={() => setSelectedItem({ type: 'swms', data: swms })}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className={`font-display text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                                {swms.projectName}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs ${
                                swms.status === 'submitted'
                                  ? 'bg-yellow-600/20 text-yellow-400'
                                  : 'bg-green-600/20 text-green-400'
                              }`}>
                                {swms.status === 'submitted' ? 'Needs Review' : 'Reviewed'}
                              </span>
                            </div>
                            <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-2`}>
                              {swms.workerName} • {swms.workerEmail}
                            </p>
                            <p className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                              Location: {swms.location} • Date: {new Date(swms.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye size={18} />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {/* Toolbox Talks */}
            {activeTab === 'toolbox' && (
              <div className="grid gap-4">
                {toolboxTalks.length === 0 ? (
                  <Card className={`p-12 text-center ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
                    <Wrench size={48} className="mx-auto mb-4 text-[#C9A24E]/50" />
                    <p className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>
                      No toolbox talks submitted yet
                    </p>
                  </Card>
                ) : (
                  toolboxTalks.map((talk) => (
                    <motion.div
                      key={talk.id}
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
                        onClick={() => setSelectedItem({ type: 'toolbox', data: talk })}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className={`font-display text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                                {talk.topic}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs ${
                                talk.status === 'submitted'
                                  ? 'bg-yellow-600/20 text-yellow-400'
                                  : 'bg-green-600/20 text-green-400'
                              }`}>
                                {talk.status === 'submitted' ? 'Needs Review' : 'Reviewed'}
                              </span>
                            </div>
                            <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-2`}>
                              {talk.submittedBy} • {talk.submittedByEmail}
                            </p>
                            <p className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                              Presenter: {talk.presenter} • Attendees: {talk.attendees.length}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye size={18} />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {/* Incident Reports */}
            {activeTab === 'incident' && (
              <div className="grid gap-4">
                {incidents.length === 0 ? (
                  <Card className={`p-12 text-center ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
                    <AlertCircle size={48} className="mx-auto mb-4 text-[#C9A24E]/50" />
                    <p className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>
                      No incident reports submitted yet
                    </p>
                  </Card>
                ) : (
                  incidents.map((incident) => (
                    <motion.div
                      key={incident.id}
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
                        onClick={() => setSelectedItem({ type: 'incident', data: incident })}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className={`font-display text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                                {incident.incidentType}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs ${
                                incident.severity === 'critical' ? 'bg-red-600/20 text-red-400' :
                                incident.severity === 'serious' ? 'bg-orange-600/20 text-orange-400' :
                                incident.severity === 'moderate' ? 'bg-yellow-600/20 text-yellow-400' :
                                'bg-blue-600/20 text-blue-400'
                              }`}>
                                {incident.severity}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs ${
                                incident.status === 'resolved' ? 'bg-green-600/20 text-green-400' :
                                incident.status === 'under-review' ? 'bg-yellow-600/20 text-yellow-400' :
                                'bg-blue-600/20 text-blue-400'
                              }`}>
                                {incident.status}
                              </span>
                            </div>
                            <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-2`}>
                              {incident.reportedBy} • {incident.reportedByEmail}
                            </p>
                            <p className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                              Location: {incident.location} • {new Date(incident.incidentDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye size={18} />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
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
                <h2 className={`text-2xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}`}>
                  {selectedItem.type === 'swms' && 'SWMS Form Details'}
                  {selectedItem.type === 'toolbox' && 'Toolbox Talk Details'}
                  {selectedItem.type === 'incident' && 'Incident Report Details'}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedItem(null)}
                  className={theme === 'dark' ? 'text-white hover:bg-white/5' : 'text-[#0F0F0F] hover:bg-black/5'}
                >
                  Close
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {selectedItem.type === 'swms' && (
                <>
                  <div>
                    <h3 className={`font-display mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>Project</h3>
                    <p className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>{selectedItem.data.projectName}</p>
                  </div>
                  <div>
                    <h3 className={`font-display mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>Hazards</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedItem.data.hazards.map((hazard: string, i: number) => (
                        <li key={i} className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>{hazard}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className={`font-display mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>Control Measures</h3>
                    <p className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>{selectedItem.data.controlMeasures}</p>
                  </div>
                  {selectedItem.data.status === 'submitted' && (
                    <Button
                      onClick={() => handleMarkSWMSReviewed(selectedItem.data.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle size={18} className="mr-2" />
                      Mark as Reviewed
                    </Button>
                  )}
                </>
              )}

              {selectedItem.type === 'toolbox' && (
                <>
                  <div>
                    <h3 className={`font-display mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>Topic</h3>
                    <p className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>{selectedItem.data.topic}</p>
                  </div>
                  <div>
                    <h3 className={`font-display mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>Key Points</h3>
                    <p className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>{selectedItem.data.keyPoints}</p>
                  </div>
                  <div>
                    <h3 className={`font-display mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>Actions</h3>
                    <p className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>{selectedItem.data.actions}</p>
                  </div>
                  {selectedItem.data.status === 'submitted' && (
                    <Button
                      onClick={() => handleMarkToolboxReviewed(selectedItem.data.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle size={18} className="mr-2" />
                      Mark as Reviewed
                    </Button>
                  )}
                </>
              )}

              {selectedItem.type === 'incident' && (
                <>
                  <div>
                    <h3 className={`font-display mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>Description</h3>
                    <p className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>{selectedItem.data.description}</p>
                  </div>
                  <div>
                    <h3 className={`font-display mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>Immediate Action</h3>
                    <p className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>{selectedItem.data.immediateAction}</p>
                  </div>
                  {selectedItem.data.status !== 'resolved' && (
                    <div className="flex gap-4">
                      {selectedItem.data.status === 'submitted' && (
                        <Button
                          onClick={() => handleUpdateIncidentStatus(selectedItem.data.id, 'under-review')}
                          className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                          Mark as Under Review
                        </Button>
                      )}
                      <Button
                        onClick={() => handleUpdateIncidentStatus(selectedItem.data.id, 'resolved')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle size={18} className="mr-2" />
                        Mark as Resolved
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}