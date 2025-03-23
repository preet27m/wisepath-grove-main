import { ChevronRight, Play, Users, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../ui/AnimatedBackground';
import BrainModel3D from '../ui/BrainModel3D';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white dark:bg-offblack text-gray-900 dark:text-cream transition-colors duration-300">
      {/* Animated background */}
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="max-w-2xl animate-fade-in">
            {/* Eyebrow text */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2 fill-primary" />
              <span>The future of online learning is here</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              A Digital Learning City For Your <span className="text-gradient">Learnings</span> and Knowledge Curiosity
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 text-balance">
              Discover personalized courses, interactive content, and a global learning community that adapts to your unique journey.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-pastel-blue flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">500+</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Premium courses</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-pastel-green flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">50k+</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active students</p>
                </div>
              </div>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="neo-btn">
                Explore Courses
              </Link>
              
              <Link to="/learning-paths" className="flex items-center px-6 py-3 rounded-full border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-colors">
                <span className="mr-2">View Learning Paths</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Right content - 3D Neural Brain */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue via-pastel-purple to-pastel-pink rounded-full opacity-20 animate-pulse-soft"></div>
              
              {/* 3D Brain Container */}
              <div className="absolute inset-10 rounded-full overflow-hidden border-8 border-white/90 dark:border-gray-900/90 shadow-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 dark:from-blue-500/30 dark:to-purple-500/30 animate-float" style={{ aspectRatio: '1/1' }}>
                {/* 3D Neural Brain Model */}
                <div className="w-full h-full">
                  <BrainModel3D />
                </div>
                
                {/* CurioCity Text */}
                <div className="absolute bottom-4 left-0 right-0 text-center z-10">
                  <div className="text-xl font-display font-semibold text-white drop-shadow-lg">
                    CurioCity
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-pastel-yellow animate-float" style={{ animationDelay: "0.5s" }}></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-pastel-green animate-float" style={{ animationDelay: "1s" }}></div>
              
              {/* Feature cards */}
              <div className="absolute top-1/4 -right-14 glass-card px-4 py-3 rounded-xl shadow-lg animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pastel-purple flex items-center justify-center mr-3">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">AI Tutor</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">24/7 Support</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 right-10 glass-card px-4 py-3 rounded-xl shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pastel-blue flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Community</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Global network</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
