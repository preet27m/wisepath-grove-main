import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { Check, BookOpen, Calendar, Clock, ChevronRight, Star, Download } from 'lucide-react';

interface CourseDetails {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  thumbnailAlt: string;
  description?: string;
  features: string[];
  startDate?: Date | number;
  duration?: string;
  totalHours?: number;
}

const EnrollmentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  
  useEffect(() => {
    // Get course details from location state
    if (location.state?.course) {
      setCourseDetails(location.state.course);
    } else {
      // Fallback if user navigated directly to this page
      const sampleCourse = {
        id: '1',
        title: 'Machine Learning Fundamentals: From Zero to Hero',
        instructor: 'Dr. Sarah Johnson',
        rating: 4.8,
        reviewCount: 2547,
        price: 89.99,
        discountPrice: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        thumbnailAlt: "Neural network visualization with blue nodes and connections",
        description: "Master the fundamentals of machine learning from scratch. This comprehensive course teaches you the theory and practical applications through hands-on projects.",
        features: [
          'Lifetime access to 45+ lectures',
          'Hands-on projects with real data',
          'Certificate of completion',
          'Access to private community',
          'Monthly live Q&A sessions',
        ],
        startDate: new Date(Date.now() + 86400000), // Tomorrow
        duration: "8 weeks",
        totalHours: 45
      };
      setCourseDetails(sampleCourse);
    }
  }, [location]);

  if (!courseDetails) {
    return (
      <MainLayout>
        <div className="py-20 px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <MainLayout>
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-500 mb-6">
              <Check className="h-10 w-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">You're all set!</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Your enrollment for <span className="font-medium">{courseDetails.title}</span> has been confirmed. Get ready to start your learning journey!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Information */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="md:w-1/3">
                    <img 
                      src={courseDetails.imageUrl} 
                      alt={courseDetails.thumbnailAlt} 
                      className="w-full aspect-video object-cover rounded-xl"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-2">{courseDetails.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">by {courseDetails.instructor}</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(courseDetails.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{courseDetails.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({courseDetails.reviewCount} reviews)</span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300">
                      {courseDetails.description || "Start your learning journey with this comprehensive course that provides in-depth knowledge and practical skills."}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Calendar className="h-6 w-6 text-primary mr-3" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Start Date</div>
                      <div className="font-medium">{formatDate(new Date(courseDetails.startDate || Date.now() + 86400000))}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Clock className="h-6 w-6 text-primary mr-3" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Duration</div>
                      <div className="font-medium">{courseDetails.duration || "8 weeks"}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <BookOpen className="h-6 w-6 text-primary mr-3" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Total Hours</div>
                      <div className="font-medium">{courseDetails.totalHours || 45} hours</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">What you'll learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseDetails.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/dashboard/courses')}
                    className="neo-btn flex-1 flex items-center justify-center py-3"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    <span>Start Learning Now</span>
                  </button>
                  
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    <span>Download Receipt</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 sticky top-24">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">Next Steps</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-medium mb-1">Setup Your Profile</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Complete your learner profile to personalize your experience.</p>
                        <button 
                          onClick={() => navigate('/dashboard/profile')}
                          className="text-primary text-sm font-medium inline-flex items-center hover:underline"
                        >
                          <span>Go to Profile</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-medium mb-1">Explore Course Materials</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Access lectures, assignments, and supplementary resources.</p>
                        <button 
                          onClick={() => navigate('/dashboard/courses/' + courseDetails.id)}
                          className="text-primary text-sm font-medium inline-flex items-center hover:underline"
                        >
                          <span>View Course</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-medium mb-1">Join the Community</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Connect with fellow learners and instructors in the course forum.</p>
                        <button 
                          onClick={() => navigate('/dashboard/community')}
                          className="text-primary text-sm font-medium inline-flex items-center hover:underline"
                        >
                          <span>Join Forum</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <h4 className="font-medium mb-3">Need Help?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      If you have any questions about the course or your enrollment, our support team is here to help.
                    </p>
                    <button 
                      onClick={() => navigate('/contact')}
                      className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                    >
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EnrollmentSuccess; 