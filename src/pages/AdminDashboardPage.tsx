import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  AlertTriangle, 
  Users, 
  TrendingUp, 
  Search, 
  Filter, 
  Download,
  Eye,
  FileDown,
  ArrowLeft,
  Sun,
  Moon,
  BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { HorseshoeCursor } from '../components/HorseshoeCursor';

interface AdminDashboardPageProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function AdminDashboardPage({ onNavigate, onBack }: AdminDashboardPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  // Mock data
  const stats = [
    { title: 'Total Forms (30d)', value: '128', change: '+5%', icon: FileText, color: 'text-[#C9A24E]' },
    { title: 'New (Unread)', value: '7', change: '', icon: AlertTriangle, color: 'text-amber-500' },
    { title: 'Active Workers (wk)', value: '23', change: '', icon: Users, color: 'text-[#78A1BB]' },
    { title: 'Incidents (mo)', value: '1', change: '', icon: AlertTriangle, color: 'text-red-500' },
  ];

  const chartData = [
    { name: 'SWMS', value: 58, fill: '#C9A24E' },
    { name: 'Toolbox', value: 32, fill: '#A88B63' },
    { name: 'Timesheets', value: 34, fill: '#78A1BB' },
    { name: 'Incidents', value: 4, fill: '#cc5c2a' },
  ];

  const submissions = [
    { id: 1, worker: 'Tom Harrison', type: 'SWMS', date: '2025-11-05', status: 'New', time: '14:23' },
    { id: 2, worker: 'Jodie Miller', type: 'Incident Report', date: '2025-11-04', status: 'Reviewed', time: '09:15' },
    { id: 3, worker: 'Sam Chen', type: 'Toolbox Talk', date: '2025-11-04', status: 'Reviewed', time: '08:30' },
    { id: 4, worker: 'Emma Walsh', type: 'Timesheet', date: '2025-11-03', status: 'Reviewed', time: '16:45' },
    { id: 5, worker: 'Dan Cooper', type: 'SWMS', date: '2025-11-03', status: 'New', time: '11:20' },
  ];

  const handleExportPDF = (submissionId: number) => {
    toast.success(`PDF downloaded for submission #${submissionId}`);
  };

  const handleBatchExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success('Batch export completed! 5 PDFs downloaded.');
    }, 2000);
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || sub.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

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
                  Admin Console
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                  Tam (Admin)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`p-6 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-display ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                      {stat.value}
                    </p>
                    {stat.change && (
                      <p className="text-sm text-green-500 mt-1">{stat.change}</p>
                    )}
                  </div>
                  <stat.icon className={stat.color} size={24} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Card className={`p-6 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
            <h2 className={`text-xl font-display mb-6 ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
              Forms by Category
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#ddd'} />
                <XAxis 
                  dataKey="name" 
                  stroke={theme === 'dark' ? '#888' : '#666'}
                  style={{ fontSize: '12px' }}
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
                <Bar dataKey="value" fill="#C9A24E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Submissions Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6"
        >
          <Card className={`p-6 ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A24E]" size={18} />
                  <Input
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 ${theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}`}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className={`w-full sm:w-48 ${theme === 'dark' ? 'bg-[#111111] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}`}>
                    <Filter size={18} className="mr-2 text-[#C9A24E]" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="swms">SWMS</SelectItem>
                    <SelectItem value="toolbox">Toolbox Talk</SelectItem>
                    <SelectItem value="timesheet">Timesheet</SelectItem>
                    <SelectItem value="incident">Incident Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleBatchExport}
                disabled={isExporting}
                className={`${theme === 'dark' ? 'bg-[#C9A24E] hover:bg-[#A88B63]' : 'bg-[#A88B63] hover:bg-[#C9A24E]'} text-white`}
              >
                <Download size={18} className="mr-2" />
                {isExporting ? 'Exporting...' : 'Batch Export PDF'}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className={`${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-[#C9A24E]/20' : 'border-[#C9A24E]/30'}>
                  <TableHead className={theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}>Worker</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}>Type</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}>Date</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}>Time</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}>Status</TableHead>
                  <TableHead className={`text-right ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#A88B63]'}`}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((sub) => (
                  <TableRow 
                    key={sub.id}
                    className={theme === 'dark' ? 'border-[#C9A24E]/10 hover:bg-white/5' : 'border-[#C9A24E]/20 hover:bg-black/5'}
                  >
                    <TableCell className={theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}>
                      {sub.worker}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>
                      {sub.type}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>
                      {sub.date}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>
                      {sub.time}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={sub.status === 'New' ? 'default' : 'secondary'}
                        className={sub.status === 'New' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                      >
                        {sub.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className={theme === 'dark' ? 'text-[#C9A24E] hover:bg-white/5' : 'text-[#A88B63] hover:bg-black/5'}
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleExportPDF(sub.id)}
                          className={theme === 'dark' ? 'text-[#78A1BB] hover:bg-white/5' : 'text-[#78A1BB] hover:bg-black/5'}
                        >
                          <FileDown size={16} className="mr-1" />
                          PDF
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </motion.div>

        {/* Analytics Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 text-center"
        >
          <Button
            onClick={() => onNavigate('admin-analytics')}
            variant="link"
            className={`${theme === 'dark' ? 'text-[#C9A24E] hover:text-[#A88B63]' : 'text-[#A88B63] hover:text-[#C9A24E]'}`}
          >
            <BarChart3 size={18} className="mr-2" />
            View Full Analytics →
          </Button>
        </motion.div>
      </div>
    </div>
  );
}