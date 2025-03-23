
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import Cursor from '../components/ui/Cursor';
import AIChat from '../components/ui/AIChat';

const AIMentor = () => {
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
            <h1 className="text-3xl font-bold mb-6 text-gradient">AI Mentor with Emotional Intelligence</h1>
            <p className="text-cream mb-6">
              Instead of generic AI assistants, our AI mentor tracks your behavior and learning struggles, 
              providing motivational nudges, personalized feedback, and mental health check-ins.
            </p>
            <div className="bg-forest/20 p-4 rounded-lg mb-6 border border-forest/30">
              <p className="italic text-cream">
                "Hey, you've been stuck on this topic for a while. Want a different approach or a quick brain break?"
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Personalized Learning Path</h3>
                <p>The AI mentor adapts to your learning style and pace, creating a truly personalized experience.</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Emotional Support</h3>
                <p>Get encouragement when you're struggling and celebrations when you achieve milestones.</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
                <p>See how you're improving over time with detailed analytics and insights.</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Smart Recommendations</h3>
                <p>Receive content and resource suggestions based on your learning patterns.</p>
              </div>
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

export default AIMentor;
