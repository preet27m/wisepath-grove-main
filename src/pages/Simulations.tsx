
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import Cursor from '../components/ui/Cursor';
import AIChat from '../components/ui/AIChat';
import { Sparkles, Code, Briefcase, Shuffle } from 'lucide-react';

const Simulations = () => {
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
            <h1 className="text-3xl font-bold mb-6 text-gradient">Real-World Simulation Learning</h1>
            <p className="text-cream mb-6">
              Instead of just watching videos, enter a simulated scenario relevant to your course.
              Apply your knowledge in realistic situations that prepare you for real-world challenges.
            </p>
            
            <div className="bg-forest/20 p-5 rounded-lg mb-8 border border-forest/30">
              <h3 className="text-xl font-semibold mb-3">How Simulations Work</h3>
              <p className="mb-4">
                Our simulations put you in realistic scenarios where you can apply what you've learned 
                without the pressure of real-world consequences. Make decisions, solve problems, 
                and receive immediate feedback on your performance.
              </p>
            </div>
            
            <h3 className="text-2xl font-semibold mb-4">Available Simulation Categories</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <Code className="h-6 w-6 text-forest mr-3" />
                  <h4 className="text-xl font-medium">Programming Challenges</h4>
                </div>
                <p>Solve coding problems in a simulated development environment with real-time feedback.</p>
              </div>
              <div className="glass-card p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <Briefcase className="h-6 w-6 text-forest mr-3" />
                  <h4 className="text-xl font-medium">Business Scenarios</h4>
                </div>
                <p>Make strategic decisions in simulated business environments and see the outcomes.</p>
              </div>
              <div className="glass-card p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <Shuffle className="h-6 w-6 text-forest mr-3" />
                  <h4 className="text-xl font-medium">Design Challenges</h4>
                </div>
                <p>Work through design problems with interactive tools and expert guidance.</p>
              </div>
              <div className="glass-card p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <Sparkles className="h-6 w-6 text-forest mr-3" />
                  <h4 className="text-xl font-medium">Creative Projects</h4>
                </div>
                <p>Express your creativity in structured simulations with clear objectives and feedback.</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="neo-btn">
                Explore Available Simulations
              </button>
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

export default Simulations;
