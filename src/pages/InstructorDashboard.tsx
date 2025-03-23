
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import Cursor from '../components/ui/Cursor';
import AIChat from '../components/ui/AIChat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Users, FileText, BookOpen, Video, BarChart, MessageSquare, Upload, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const InstructorDashboard = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex bg-offblack">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-64 mr-0 md:mr-72">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Instructor Dashboard</h1>
              <p className="text-cream/70">Manage your courses and students</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-forest-light flex items-center justify-center">
                <Users className="h-6 w-6 text-cream" />
              </div>
              <div>
                <p className="text-cream font-medium">Dr. Sarah Johnson</p>
                <p className="text-xs text-sand">Instructor ID: 789012</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card rounded-xl p-5 flex items-center">
              <div className="h-12 w-12 rounded-full bg-forest/20 flex items-center justify-center mr-4">
                <BookOpen className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-sm text-sand">Active Courses</p>
                <p className="text-2xl font-bold text-cream">5</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-5 flex items-center">
              <div className="h-12 w-12 rounded-full bg-forest/20 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-sm text-sand">Total Students</p>
                <p className="text-2xl font-bold text-cream">1,247</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-5 flex items-center">
              <div className="h-12 w-12 rounded-full bg-forest/20 flex items-center justify-center mr-4">
                <MessageSquare className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-sm text-sand">Pending Questions</p>
                <p className="text-2xl font-bold text-cream">18</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="courses" className="mb-8">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="materials">Course Materials</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-forest">Your Courses</h2>
                <Button className="bg-forest text-cream hover:bg-forest-light">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Course
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5].map((course) => (
                  <div key={course} className="glass-card rounded-xl overflow-hidden">
                    <div className="relative h-40">
                      <img 
                        src={`https://images.unsplash.com/photo-160${course}761568499-6d2451b23c66?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ`} 
                        alt="Course thumbnail" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-offblack/90 to-transparent">
                        <h3 className="text-lg font-semibold text-cream">
                          {course === 1 ? 'Machine Learning Fundamentals' : 
                           course === 2 ? 'Advanced Python Programming' : 
                           course === 3 ? 'Data Science Masterclass' : 
                           course === 4 ? 'Neural Networks Deep Dive' :
                           'AI Ethics and Applications'}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-sm text-sand">
                          <span className="text-forest font-medium mr-2">{course * 180 + 50}</span> enrolled students
                        </p>
                        <span className="text-xs bg-forest/20 text-forest px-2 py-1 rounded-full">
                          {course % 2 === 0 ? 'Active' : 'Featured'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <Link 
                          to={`/courses/${course}`} 
                          className="text-sm font-medium text-forest hover:text-forest-light"
                        >
                          Edit Course
                        </Link>
                        <Link 
                          to="/students" 
                          className="text-sm font-medium text-forest hover:text-forest-light"
                        >
                          View Students
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="materials" className="pt-6">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-forest">Video Lessons</h2>
                    <Button className="bg-forest text-cream hover:bg-forest-light">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Video
                    </Button>
                  </div>
                  
                  <div className="glass-card rounded-xl p-4">
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center p-2 hover:bg-forest/10 rounded-md">
                          <Video className="h-5 w-5 text-forest mr-3" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-cream">
                              {item === 1 ? 'Introduction to Machine Learning' : 
                               item === 2 ? 'Supervised Learning Algorithms' : 
                               item === 3 ? 'Neural Networks Architecture' :
                               'Model Evaluation Techniques'}
                            </p>
                            <p className="text-xs text-sand">Duration: {item === 1 ? '45 mins' : item === 2 ? '1 hour 12 mins' : item === 3 ? '58 mins' : '1 hour 22 mins'}</p>
                          </div>
                          <button className="text-xs py-1 px-2 text-forest">Edit</button>
                          <button className="text-xs py-1 px-2 text-forest ml-2">Preview</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-forest">Documents & PDFs</h2>
                    <Button className="bg-forest text-cream hover:bg-forest-light">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                  
                  <div className="glass-card rounded-xl p-4">
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-center p-2 hover:bg-forest/10 rounded-md">
                          <FileText className="h-5 w-5 text-forest mr-3" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-cream">
                              {item === 1 ? 'Machine Learning Algorithms.pdf' : 
                               item === 2 ? 'Data Preprocessing Guide.pdf' : 
                               item === 3 ? 'Neural Networks Overview.pdf' :
                               item === 4 ? 'Model Evaluation Metrics.pdf' :
                               'Course Syllabus.pdf'}
                            </p>
                            <p className="text-xs text-sand">Size: {item === 1 ? '2.8 MB' : item === 2 ? '1.5 MB' : item === 3 ? '3.2 MB' : item === 4 ? '1.1 MB' : '0.9 MB'}</p>
                          </div>
                          <button className="text-xs py-1 px-2 text-forest">Edit</button>
                          <button className="text-xs py-1 px-2 text-forest ml-2">Download</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="pt-6">
              <div className="glass-card rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-forest mb-4">Course Performance</h3>
                <div className="h-60 flex items-center justify-center bg-forest/5 rounded-lg mb-4">
                  <BarChart className="h-12 w-12 text-forest/40" />
                  <p className="text-sm text-sand ml-3">Interactive analytics charts will appear here</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-forest/10 p-3 rounded-lg">
                    <p className="text-sm text-sand mb-1">Completion Rate</p>
                    <p className="text-2xl font-bold text-forest">78%</p>
                  </div>
                  <div className="bg-forest/10 p-3 rounded-lg">
                    <p className="text-sm text-sand mb-1">Avg. Engagement</p>
                    <p className="text-2xl font-bold text-forest">65%</p>
                  </div>
                  <div className="bg-forest/10 p-3 rounded-lg">
                    <p className="text-sm text-sand mb-1">Student Satisfaction</p>
                    <p className="text-2xl font-bold text-forest">4.7/5</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-forest mb-4">Student Demographics</h3>
                <div className="h-60 flex items-center justify-center bg-forest/5 rounded-lg mb-4">
                  <BarChart className="h-12 w-12 text-forest/40" />
                  <p className="text-sm text-sand ml-3">Interactive demographic charts will appear here</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-forest/10 p-3 rounded-lg">
                    <p className="text-sm text-sand mb-1">Top Country</p>
                    <p className="text-xl font-bold text-forest">United States</p>
                  </div>
                  <div className="bg-forest/10 p-3 rounded-lg">
                    <p className="text-sm text-sand mb-1">Age Range</p>
                    <p className="text-xl font-bold text-forest">24-35 years</p>
                  </div>
                  <div className="bg-forest/10 p-3 rounded-lg">
                    <p className="text-sm text-sand mb-1">Most Active Time</p>
                    <p className="text-xl font-bold text-forest">7pm - 10pm</p>
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

export default InstructorDashboard;
