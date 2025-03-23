
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'UX Designer at Google',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    content: 'The UX/UI Design course completely transformed my career. The AI-powered suggestions helped me focus on areas where I needed improvement, and the community support was invaluable. I landed my dream job at Google just two months after completing the course!',
    rating: 5,
    course: 'UX/UI Design Mastery',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Senior Developer at Spotify',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    content: "The Web Development Bootcamp was intense, but in the best way possible. The interactive coding challenges and real-time feedback helped me solidify my skills quickly. The career support team also helped me revamp my portfolio, which led to multiple job offers.",
    rating: 5,
    course: 'Full Stack Web Development',
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Data Scientist at Netflix',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    content: 'As someone transitioning from marketing to data science, I was worried about the learning curve. The personalized learning path and AI tutor made the journey smooth and less intimidating. I particularly loved the practical projects that gave me real-world experience.',
    rating: 4.5,
    course: 'Data Science Essentials',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto-rotate testimonials unless paused
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setTimeout(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [activeIndex, isPaused]);

  const currentTestimonial = testimonials[activeIndex];
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900/20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Transforming Careers <span className="text-gradient">Worldwide</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Hear from our students who have transformed their careers and lives through our platform.
          </p>
        </div>
        
        {/* Testimonial slider */}
        <div 
          className="relative max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute top-10 right-10 text-primary/30 dark:text-primary/20">
            <Quote className="h-24 w-24 rotate-180" />
          </div>
          
          <div className="relative z-10">
            {/* Content */}
            <div className="mb-8 md:mb-12">
              <p className="text-xl md:text-2xl leading-relaxed italic text-gray-700 dark:text-gray-300 relative z-10">
                "{currentTestimonial.content}"
              </p>
            </div>
            
            {/* Author */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="flex-shrink-0">
                  <img 
                    src={currentTestimonial.avatar} 
                    alt={currentTestimonial.name}
                    className="h-14 w-14 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-medium">{currentTestimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{currentTestimonial.role}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(currentTestimonial.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : i < currentTestimonial.rating 
                              ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                              : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      Course: {currentTestimonial.course}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Navigation buttons */}
              <div className="flex space-x-3 self-end md:self-auto">
                <button 
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress indicators */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-12 h-1.5 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-primary' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
