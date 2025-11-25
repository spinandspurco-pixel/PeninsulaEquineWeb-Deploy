import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Mail, FileText, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { HorseshoeCursor } from '../components/HorseshoeCursor';

interface AdminAnalyticsPageProps {
  onBack: () => void;
}

export function AdminAnalyticsPage({ onBack }: AdminAnalyticsPageProps) {
  const { theme, toggleTheme } = useTheme();

  // Mock data for 30 days
  const timelineData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    submissions: Math.floor(Math.random() * 10) + 2,
  }));

  const categoryData = [
    { name: 'SWMS', value: 58, color: '#C9A24E' },
    { name: 'Toolbox Talk', value: 32, color: '#A88B63' },
    { name: 'Timesheets', value: 34, color: '#78A1BB' },
    { name: 'Incidents', value: 4, color: '#cc5c2a' },
  ];

  const topWorkersData = [
    { name: 'Tom Harrison', submissions: 24 },
    { name: 'Jodie Miller', submissions: 19 },
    { name: 'Sam Chen', submissions: 16 },
    { name: 'Emma Walsh', submissions: 14 },
    { name: 'Dan Cooper', submissions: 12 },
  ];

  const handleDownloadReport = () => {
    toast.success('Analytics report downloaded (PDF)');
  };

  const handleExportCSV = () => {
    toast.success('Data exported to CSV');
  };

  const handleEmailSummary = () => {
    toast.success('Summary email sent to Ciro');
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
              <div>
                <h1 className={`text-2xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
                  Analytics Overview
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                  Ciro (Director)
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
        {/* Submissions Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className={`p-6 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
            <h2 className={`text-xl font-display mb-6 ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
              Submissions Over Time (30 Days)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#ddd'} />
                <XAxis 
                  dataKey="day" 
                  stroke={theme === 'dark' ? '#888' : '#666'}
                  style={{ fontSize: '12px' }}
                  label={{ value: 'Days', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#888' : '#666'}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#C9A24E' : '#A88B63'}`,
                    borderRadius: '8px',
                    color: theme === 'dark' ? '#fff' : '#0F0F0F'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="submissions" 
                  stroke="#C9A24E" 
                  strokeWidth={3}
                  dot={{ fill: '#C9A24E', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Category Split and Top Workers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Donut Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className={`p-6 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
              <h2 className={`text-xl font-display mb-6 ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
                Category Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
                      border: `1px solid ${theme === 'dark' ? '#C9A24E' : '#A88B63'}`,
                      borderRadius: '8px',
                      color: theme === 'dark' ? '#fff' : '#0F0F0F'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Top Workers Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className={`p-6 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
              <h2 className={`text-xl font-display mb-6 ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
                Top 5 Workers by Submissions
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topWorkersData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#ddd'} />
                  <XAxis 
                    type="number" 
                    stroke={theme === 'dark' ? '#888' : '#666'}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    stroke={theme === 'dark' ? '#888' : '#666'}
                    style={{ fontSize: '12px' }}
                    width={120}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
                      border: `1px solid ${theme === 'dark' ? '#C9A24E' : '#A88B63'}`,
                      borderRadius: '8px',
                      color: theme === 'dark' ? '#fff' : '#0F0F0F'
                    }}
                  />
                  <Bar dataKey="submissions" fill="#78A1BB" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Export Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className={`p-6 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
            <h2 className={`text-xl font-display mb-6 ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
              Export & Share
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleDownloadReport}
                className={`flex-1 ${theme === 'dark' ? 'bg-[#C9A24E] hover:bg-[#A88B63]' : 'bg-[#A88B63] hover:bg-[#C9A24E]'} text-white`}
              >
                <Download size={18} className="mr-2" />
                Download Report (PDF)
              </Button>
              <Button
                onClick={handleExportCSV}
                variant="outline"
                className={`flex-1 ${theme === 'dark' ? 'border-[#C9A24E]/30 text-[#C9A24E] hover:bg-white/5' : 'border-[#A88B63]/40 text-[#A88B63] hover:bg-black/5'}`}
              >
                <FileText size={18} className="mr-2" />
                Export Data (CSV)
              </Button>
              <Button
                onClick={handleEmailSummary}
                variant="outline"
                className={`flex-1 ${theme === 'dark' ? 'border-[#78A1BB]/30 text-[#78A1BB] hover:bg-white/5' : 'border-[#78A1BB]/40 text-[#78A1BB] hover:bg-black/5'}`}
              >
                <Mail size={18} className="mr-2" />
                Email Summary to Ciro
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}