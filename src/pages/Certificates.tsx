
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import Cursor from '../components/ui/Cursor';
import AIChat from '../components/ui/AIChat';
import { Award, Download, Share2 } from 'lucide-react';

const Certificates = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample certificates data
  const certificates = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      issueDate: 'April 15, 2023',
      instructor: 'Dr. Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
    {
      id: 2,
      title: 'Web Development Bootcamp',
      issueDate: 'June 10, 2023',
      instructor: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
    {
      id: 3,
      title: 'JavaScript Mastery',
      issueDate: 'September 5, 2023',
      instructor: 'Emma Roberts',
      image: 'https://images.unsplash.com/photo-1597239451170-1c59d6b0c836?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
    {
      id: 4,
      title: 'UX/UI Design Principles',
      issueDate: 'November 12, 2023',
      instructor: 'David Wilson',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
    {
      id: 5,
      title: 'Data Science with Python',
      issueDate: 'January 20, 2024',
      instructor: 'Dr. James Wilson',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
  ];

  return (
    <div className="min-h-screen flex bg-offblack">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-64 mr-0 md:mr-72">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="glass-card rounded-xl p-6 mb-8">
            <h1 className="text-3xl font-bold text-gradient mb-4">Your Certificates</h1>
            <p className="text-cream mb-6">
              Showcase your achievements and skills with these verified certificates from completed courses.
              Each certificate can be downloaded or shared with potential employers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-offblack/50 border border-forest/20 rounded-xl overflow-hidden hover:border-forest/50 transition-colors">
                  <div className="relative h-48">
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-offblack/90 via-offblack/40 to-transparent flex items-center justify-center">
                      <Award className="h-20 w-20 text-forest" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-cream mb-1">{cert.title}</h3>
                    <p className="text-sm text-sand mb-1">Instructor: {cert.instructor}</p>
                    <p className="text-xs text-sand/70 mb-4">Issued on {cert.issueDate}</p>
                    
                    <div className="flex justify-between">
                      <button className="flex items-center text-xs py-1.5 px-3 bg-forest hover:bg-forest-light text-cream rounded-md transition-colors">
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        Download
                      </button>
                      <button className="flex items-center text-xs py-1.5 px-3 bg-sand hover:bg-sand-light text-offblack rounded-md transition-colors">
                        <Share2 className="h-3.5 w-3.5 mr-1.5" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-2xl font-bold text-forest mb-4">LinkedIn Integration</h2>
            <p className="text-cream mb-6">
              Add your certificates directly to your LinkedIn profile to showcase your skills and achievements to your professional network.
            </p>
            <button className="bg-forest hover:bg-forest-light text-cream py-2 px-4 rounded-md transition-colors">
              Connect with LinkedIn
            </button>
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

export default Certificates;
