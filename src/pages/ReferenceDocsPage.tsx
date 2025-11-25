import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, FileText, Sun, Moon, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';
import { HorseshoeCursor } from '../components/HorseshoeCursor';

interface ReferenceDocsPageProps {
  onBack: () => void;
}

export function ReferenceDocsPage({ onBack }: ReferenceDocsPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    {
      title: 'Safety Guidelines 2025',
      category: 'Safety',
      size: '2.4 MB',
      updated: '2025-01-15',
      description: 'Comprehensive safety guidelines and protocols',
    },
    {
      title: 'Arena Construction Manual',
      category: 'Technical',
      size: '5.8 MB',
      updated: '2024-12-20',
      description: 'Detailed arena construction procedures',
    },
    {
      title: 'Equipment Operation Guide',
      category: 'Operations',
      size: '3.1 MB',
      updated: '2025-01-10',
      description: 'Operating instructions for machinery',
    },
    {
      title: 'PPE Requirements',
      category: 'Safety',
      size: '890 KB',
      updated: '2025-01-05',
      description: 'Personal protective equipment standards',
    },
    {
      title: 'Stable Building Standards',
      category: 'Technical',
      size: '4.2 MB',
      updated: '2024-11-30',
      description: 'Standards for stable construction',
    },
    {
      title: 'Emergency Procedures',
      category: 'Safety',
      size: '1.5 MB',
      updated: '2025-01-20',
      description: 'Emergency response protocols',
    },
    {
      title: 'Material Specifications',
      category: 'Technical',
      size: '2.8 MB',
      updated: '2024-12-15',
      description: 'Approved materials and suppliers',
    },
    {
      title: 'Quality Control Checklist',
      category: 'Operations',
      size: '670 KB',
      updated: '2025-01-12',
      description: 'QC procedures and checklists',
    },
  ];

  const filteredDocs = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (title: string) => {
    toast.success(`Downloading: ${title}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Safety':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Technical':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Operations':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
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
                Reference Documents
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
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/30 text-white' : 'bg-white border-[#C9A24E]/40 text-[#0F0F0F]'}
          />
        </motion.div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc, index) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className={`p-6 h-full ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20 hover:border-[#C9A24E]/40' : 'bg-white border-[#C9A24E]/30 hover:border-[#C9A24E]/50'} transition-all`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-[#C9A24E]/20' : 'bg-[#C9A24E]/30'}`}>
                    <FileText className="text-[#C9A24E]" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`font-display ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                        {doc.title}
                      </h3>
                      <Badge variant="outline" className={getCategoryColor(doc.category)}>
                        {doc.category}
                      </Badge>
                    </div>
                    <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                      {doc.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                        <span>{doc.size}</span>
                        <span className="mx-2">•</span>
                        <span>Updated {doc.updated}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(doc.title)}
                          className={theme === 'dark' ? 'text-[#C9A24E] hover:bg-white/5' : 'text-[#A88B63] hover:bg-black/5'}
                        >
                          <Download size={16} className="mr-1" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={theme === 'dark' ? 'text-[#78A1BB] hover:bg-white/5' : 'text-[#78A1BB] hover:bg-black/5'}
                        >
                          <ExternalLink size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <FileText className={`mx-auto mb-4 ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`} size={48} />
            <p className={theme === 'dark' ? 'text-white/40' : 'text-black/40'}>
              No documents found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}