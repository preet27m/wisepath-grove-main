
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import Cursor from '../components/ui/Cursor';
import AIChat from '../components/ui/AIChat';
import { FileText, Download, Eye, Search, Upload, Plus, Clock, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Notes = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample documents data
  const documents = [
    {
      id: 1,
      title: 'Machine Learning Algorithms.pdf',
      course: 'Machine Learning Fundamentals',
      size: '2.8 MB',
      dateAdded: 'May 15, 2023',
      icon: <FileText className="h-5 w-5 text-forest" />,
    },
    {
      id: 2,
      title: 'Data Preprocessing Techniques.pdf',
      course: 'Data Science with Python',
      size: '1.5 MB',
      dateAdded: 'June 3, 2023',
      icon: <FileText className="h-5 w-5 text-forest" />,
    },
    {
      id: 3,
      title: 'Neural Networks Overview.pdf',
      course: 'Deep Learning Specialization',
      size: '3.2 MB',
      dateAdded: 'July 12, 2023',
      icon: <FileText className="h-5 w-5 text-forest" />,
    },
    {
      id: 4,
      title: 'Module 1 - JavaScript Fundamentals.pdf',
      course: 'Web Development Bootcamp',
      size: '4.1 MB',
      dateAdded: 'August 22, 2023',
      icon: <FileText className="h-5 w-5 text-forest" />,
    },
    {
      id: 5,
      title: 'UX Research Methods.pdf',
      course: 'UX/UI Design Principles',
      size: '2.3 MB',
      dateAdded: 'September 5, 2023',
      icon: <FileText className="h-5 w-5 text-forest" />,
    },
    {
      id: 6,
      title: 'Statistical Analysis Fundamentals.pdf',
      course: 'Data Science with Python',
      size: '1.8 MB',
      dateAdded: 'October 10, 2023',
      icon: <FileText className="h-5 w-5 text-forest" />,
    },
    {
      id: 7,
      title: 'React Hooks Deep Dive.pdf',
      course: 'Web Development Bootcamp',
      size: '3.5 MB',
      dateAdded: 'November 15, 2023',
      icon: <FileText className="h-5 w-5 text-forest" />,
    },
  ];

  // Sample notes data
  const notes = [
    {
      id: 1,
      title: 'Supervised Learning Notes',
      course: 'Machine Learning Fundamentals',
      dateAdded: 'April 20, 2023',
      snippet: 'Key differences between classification and regression algorithms...',
    },
    {
      id: 2,
      title: 'Python Data Structures',
      course: 'Data Science with Python',
      dateAdded: 'May 12, 2023',
      snippet: 'Lists, dictionaries, sets, and tuples are the primary data structures...',
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox',
      course: 'Web Development Bootcamp',
      dateAdded: 'June 5, 2023',
      snippet: 'Grid is two-dimensional while Flexbox is one-dimensional...',
    },
  ];

  return (
    <div className="min-h-screen flex bg-offblack">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-64 mr-0 md:mr-72">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gradient">Notes & PDFs</h1>
            <div className="flex space-x-3">
              <Button className="bg-forest text-cream hover:bg-forest-light">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button className="bg-forest-light text-cream hover:bg-forest">
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Button>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-4 mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sand" />
              <Input 
                placeholder="Search for notes and documents..." 
                className="pl-10 py-5 bg-offblack/80 border-forest/20 text-cream"
              />
            </div>
            
            <Tabs defaultValue="documents">
              <TabsList className="w-full md:w-auto mb-4">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documents">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-forest/20">
                        <th className="text-left py-3 px-4 text-sm font-medium text-sand">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-sand">Course</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-sand">Size</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-sand">Date Added</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-sand">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <tr 
                          key={doc.id} 
                          className="border-b border-forest/10 hover:bg-forest/5 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {doc.icon}
                              <span className="ml-3 text-sm text-cream">{doc.title}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-sand">{doc.course}</td>
                          <td className="py-3 px-4 text-sm text-sand">{doc.size}</td>
                          <td className="py-3 px-4 text-sm text-sand">{doc.dateAdded}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="p-1.5 text-forest hover:text-forest-light">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1.5 text-forest hover:text-forest-light">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="notes">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notes.map((note) => (
                    <div 
                      key={note.id} 
                      className="bg-offblack/50 border border-forest/20 rounded-lg p-4 hover:border-forest/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-md font-semibold text-cream">{note.title}</h3>
                        <div className="flex items-center text-xs text-sand">
                          <Calendar className="h-3 w-3 mr-1" />
                          {note.dateAdded}
                        </div>
                      </div>
                      <p className="text-sm text-sand mb-3">{note.course}</p>
                      <p className="text-sm text-cream/70 mb-4">{note.snippet}</p>
                      <div className="flex justify-end">
                        <button className="text-xs py-1.5 px-3 bg-forest hover:bg-forest-light text-cream rounded-md transition-colors">
                          Open Note
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recent">
                <div className="space-y-4">
                  {[...documents, ...notes].slice(0, 5).map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-offblack/50 border border-forest/10 rounded-lg"
                    >
                      <div className="flex items-center">
                        {'icon' in item ? item.icon : <FileText className="h-5 w-5 text-forest" />}
                        <div className="ml-3">
                          <p className="text-sm text-cream">{'title' in item ? item.title : ''}</p>
                          <p className="text-xs text-sand">{'course' in item ? item.course : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-sand">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        Viewed 2 hours ago
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
        <Cursor />
        <AIChat />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Notes;
