import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import Cursor from '../components/ui/Cursor';
import AIChat from '../components/ui/AIChat';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Award, BookOpen, Calendar, Clock, User, Video, File, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock certificates data
  const certificates = [
    { id: 1, title: 'Web Development Fundamentals', date: 'March 15, 2023', image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
    { id: 2, title: 'Introduction to React', date: 'June 10, 2023', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
    { id: 3, title: 'JavaScript Mastery', date: 'September 5, 2023', image: 'https://images.unsplash.com/photo-1597239450996-ea7c21fe77f5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
  ];

  return (
    <div className="min-h-screen flex bg-offblack">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-64 mr-0 md:mr-72">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Student Dashboard</h1>
              <p className="text-cream/70">Welcome back! Here's your learning progress</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-forest-light flex items-center justify-center">
                <User className="h-6 w-6 text-cream" />
              </div>
              <div>
                <p className="text-cream font-medium">Alex Johnson</p>
                <p className="text-xs text-sand">Student ID: 123456</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card rounded-xl p-5 flex items-center">
              <div className="h-12 w-12 rounded-full bg-forest/20 flex items-center justify-center mr-4">
                <BookOpen className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-sm text-sand">Enrolled Courses</p>
                <p className="text-2xl font-bold text-cream">8</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-5 flex items-center">
              <div className="h-12 w-12 rounded-full bg-forest/20 flex items-center justify-center mr-4">
                <Award className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-sm text-sand">Certificates Earned</p>
                <p className="text-2xl font-bold text-cream">3</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-5 flex items-center">
              <div className="h-12 w-12 rounded-full bg-forest/20 flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-sm text-sand">Learning Hours</p>
                <p className="text-2xl font-bold text-cream">74</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="courses" className="mb-8">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((course) => (
                  <div key={course} className="glass-card rounded-xl overflow-hidden">
                    <div className="relative h-40">
                      <img 
                        src={course === 1 ? 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' :
                             course === 2 ? 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80' :
                             course === 3 ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' :
                             'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'} 
                        alt={course === 1 ? 'Machine Learning visualization with neural networks' :
                             course === 2 ? 'Web development code editor with modern tools' :
                             course === 3 ? 'Data science dashboard with visualizations' :
                             'UX/UI design workspace with wireframes'} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-offblack/90 to-transparent">
                        <h3 className="text-lg font-semibold text-cream">
                          {course === 1 ? 'Machine Learning Fundamentals' : 
                           course === 2 ? 'Web Development Bootcamp' : 
                           course === 3 ? 'Data Science with Python' : 
                           'UX/UI Design Principles'}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-sand">
                          {course === 1 ? 'Dr. Sarah Johnson' : 
                           course === 2 ? 'Michael Chen' : 
                           course === 3 ? 'Emma Roberts' : 
                           'David Wilson'}
                        </p>
                        <span className="text-xs bg-forest/20 text-forest px-2 py-1 rounded-full">
                          {course === 1 || course === 3 ? 'In Progress' : 'Not Started'}
                        </span>
                      </div>
                      
                      <Progress 
                        value={course === 1 ? 68 : course === 3 ? 42 : 0} 
                        className="h-2 mb-4" 
                      />
                      
                      <div className="flex justify-between">
                        <Link 
                          to={`/courses/${course}`} 
                          className="text-sm font-medium text-forest hover:text-forest-light"
                        >
                          Continue Learning
                        </Link>
                        <Link 
                          to="/learning-room" 
                          className="text-sm font-medium text-forest hover:text-forest-light"
                        >
                          Join Room
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="certificates" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="glass-card rounded-xl overflow-hidden">
                    <div className="relative h-40">
                      <img 
                        src={cert.image} 
                        alt={cert.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-offblack/70 to-transparent flex items-center justify-center">
                        <Award className="h-16 w-16 text-forest" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-cream mb-1">{cert.title}</h3>
                      <p className="text-sm text-sand mb-3">Issued on {cert.date}</p>
                      <div className="flex space-x-2">
                        <button className="text-xs py-1.5 px-3 bg-forest text-cream rounded-md">View</button>
                        <button className="text-xs py-1.5 px-3 bg-sand text-offblack rounded-md">Download</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-forest mb-4">Notes & PDFs</h3>
                  <div className="glass-card rounded-xl p-4">
                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center p-2 hover:bg-forest/10 rounded-md">
                          <FileText className="h-5 w-5 text-forest mr-3" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-cream">
                              {item === 1 ? 'Machine Learning Algorithms.pdf' : 
                               item === 2 ? 'Data Preprocessing Notes.pdf' : 
                               'Neural Networks Overview.pdf'}
                            </p>
                            <p className="text-xs text-sand">Added on {item === 1 ? 'May 15, 2023' : item === 2 ? 'June 3, 2023' : 'July 12, 2023'}</p>
                          </div>
                          <button className="text-xs py-1 px-2 text-forest">Download</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-forest mb-4">Video Lessons</h3>
                  <div className="glass-card rounded-xl p-4">
                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center p-2 hover:bg-forest/10 rounded-md">
                          <Video className="h-5 w-5 text-forest mr-3" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-cream">
                              {item === 1 ? 'Introduction to Python' : 
                               item === 2 ? 'Building Neural Networks' : 
                               'Data Visualization Techniques'}
                            </p>
                            <p className="text-xs text-sand">Duration: {item === 1 ? '45 mins' : item === 2 ? '1 hour 12 mins' : '38 mins'}</p>
                          </div>
                          <Link to="/video-lessons" className="text-xs py-1 px-2 text-forest">Watch</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
        <Cursor />
        <AIChat />
      </div>
      <RightSidebar />
    </div>
  );
};

export default StudentDashboard;
