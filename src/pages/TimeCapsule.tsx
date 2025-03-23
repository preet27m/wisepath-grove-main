
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import Cursor from '../components/ui/Cursor';
import AIChat from '../components/ui/AIChat';
import { Video, MessageSquare, Clock } from 'lucide-react';

const TimeCapsule = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex bg-offblack">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="glass-card rounded-xl p-6 mb-8">
            <h1 className="text-3xl font-bold mb-6 text-gradient">Time Capsule Learning Reflections</h1>
            <p className="text-cream mb-6">
              Record short video/audio reflections about what you've learned in a module. 
              The platform stores these and replays them after a certain time (weeks/months) to reinforce learning.
              This can be combined with a "future message" feature where you write advice for your future self.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-5 rounded-lg flex flex-col items-center">
                <Video className="h-12 w-12 text-forest mb-3" />
                <h3 className="text-xl font-semibold mb-2">Record Reflections</h3>
                <p className="text-center">Capture your thoughts, insights, and learning moments with video or audio.</p>
              </div>
              <div className="glass-card p-5 rounded-lg flex flex-col items-center">
                <Clock className="h-12 w-12 text-forest mb-3" />
                <h3 className="text-xl font-semibold mb-2">Time-Released Learning</h3>
                <p className="text-center">Set your reflections to be delivered back to you at strategic intervals.</p>
              </div>
              <div className="glass-card p-5 rounded-lg flex flex-col items-center">
                <MessageSquare className="h-12 w-12 text-forest mb-3" />
                <h3 className="text-xl font-semibold mb-2">Future Messages</h3>
                <p className="text-center">Write advice for your future self as you progress through your learning.</p>
              </div>
            </div>
            
            <div className="bg-forest/10 p-6 rounded-lg border border-forest/30">
              <h3 className="text-xl font-semibold mb-3">How It Works</h3>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Complete a learning module or milestone in your course</li>
                <li>Record a 1-2 minute reflection on what you learned and what you found challenging</li>
                <li>Choose when you want to receive this reflection back (1 week, 1 month, 3 months)</li>
                <li>Add a special message or advice for your future self</li>
                <li>Receive your time capsule when the time comes, reinforcing your learning</li>
              </ol>
            </div>
          </div>
        </main>
        <Footer />
        <Cursor />
        <AIChat />
      </div>
    </div>
  );
};

export default TimeCapsule;
