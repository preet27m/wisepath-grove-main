import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  User, 
  Calendar, 
  ArrowLeft, 
  MessageSquare,
  Share2 
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import { Button } from '@/components/ui/button';

interface CourseModule {
  title: string;
  lessons: number;
  duration: string;
  description: string;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  instructorImage: string;
  rating: number;
  reviewCount: number;
  duration: string;
  level: string;
  students: number;
  imageUrl: string;
  price: number;
  discountPrice: number | null;
  tags: string[];
  description: string;
  whatYouWillLearn: string[];
  modules: CourseModule[];
  requirements: string[];
}

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch course data based on courseId
  useEffect(() => {
    // This would typically be an API call
    // For now, we'll simulate fetching from our mock data
    const fetchCourse = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Sample data for the course
        const courseData = {
          id: courseId,
          title: 'Machine Learning Fundamentals: From Zero to Hero',
          instructor: 'Dr. Sarah Johnson',
          instructorTitle: 'PhD in Computer Science, Stanford University',
          instructorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          rating: 4.8,
          reviewCount: 2547,
          duration: '10 weeks',
          level: 'Beginner',
          students: 35820,
          imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          price: 89.99,
          discountPrice: 49.99,
          tags: ['AI', 'Machine Learning', 'Python', 'Data Science'],
          description: 'This comprehensive course takes you from the basics of machine learning to advanced techniques. You\'ll learn through hands-on projects, quizzes, and real-world case studies. By the end, you\'ll have the skills to tackle complex ML problems.',
          whatYouWillLearn: [
            'Understand the fundamentals of machine learning and AI',
            'Build and train models using Python and popular libraries',
            'Apply machine learning to real-world problems and datasets',
            'Optimize models for better performance and accuracy',
            'Deploy machine learning models to production environments',
            'Stay current with the latest trends and techniques in AI'
          ],
          modules: [
            {
              title: 'Introduction to Machine Learning',
              lessons: 8,
              duration: '2.5 hours',
              description: 'Learn the basics of machine learning, types of ML algorithms, and when to use them.'
            },
            {
              title: 'Python for Data Science',
              lessons: 12,
              duration: '4 hours',
              description: 'Master the essential Python libraries for data manipulation and analysis.'
            },
            {
              title: 'Supervised Learning Algorithms',
              lessons: 15,
              duration: '6 hours',
              description: 'Explore regression, classification, and ensemble methods through practical examples.'
            },
            {
              title: 'Unsupervised Learning',
              lessons: 10,
              duration: '4.5 hours',
              description: 'Understand clustering, dimensionality reduction, and other unsupervised techniques.'
            },
            {
              title: 'Deep Learning Fundamentals',
              lessons: 14,
              duration: '7 hours',
              description: 'Learn about neural networks, backpropagation, and training deep models.'
            }
          ],
          requirements: [
            'Basic programming knowledge (any language)',
            'High school level math (algebra, basic statistics)',
            'A computer with internet access',
            'Curiosity and willingness to learn!'
          ]
        };
        
        setCourse(courseData);
        setLoading(false);
      }, 800);
    };
    
    fetchCourse();
  }, [courseId]);

  const formatPrice = (amount: number) => {
    // Convert USD to INR (approximate exchange rate)
    const inrAmount = amount * 82.5;
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(inrAmount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-offblack flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-forest mx-auto"></div>
          <p className="mt-4 text-cream">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-offblack flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-cream mb-4">Course Not Found</h2>
          <p className="text-sand mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses" className="forest-btn">Browse All Courses</Link>
        </div>
      </div>
    );
  }

  const discountPercentage = course.discountPrice 
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex bg-offblack">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Back button */}
          <Link to="/courses" className="flex items-center text-cream hover:text-sand mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Courses</span>
          </Link>
          
          {/* Course header section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Course image */}
            <div className="lg:col-span-2">
              <div className="relative rounded-xl overflow-hidden aspect-video">
                <img 
                  src={course.imageUrl} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                {course.discountPrice && (
                  <div className="absolute top-4 right-4 bg-forest text-cream px-3 py-1.5 rounded-full font-medium">
                    {discountPercentage}% OFF
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-offblack/80 text-cream px-3 py-1.5 rounded-full backdrop-blur-sm text-sm font-medium">
                  {course.level}
                </div>
              </div>
            </div>
            
            {/* Course info */}
            <div className="glass-card rounded-xl p-6">
              <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(course.rating) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-400 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-sand">
                  {course.rating.toFixed(1)}
                </span>
                <span className="ml-1 text-xs text-sand/70">
                  ({course.reviewCount} reviews)
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center text-xs text-cream/80">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-xs text-cream/80">
                  <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center text-xs text-cream/80">
                  <Users className="h-3.5 w-3.5 mr-1.5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <img 
                    src={course.instructorImage} 
                    alt={course.instructor} 
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="text-cream font-medium">{course.instructor}</h4>
                    <p className="text-xs text-cream/70">{course.instructorTitle}</p>
                  </div>
                </div>
              </div>
              
              {/* Price and enrollment */}
              <div className="border-t border-cream/10 pt-5">
                <div className="flex items-center mb-6">
                  {course.discountPrice ? (
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-forest">
                        {formatPrice(course.discountPrice)}
                      </span>
                      <span className="ml-2 text-base line-through text-cream/50">
                        {formatPrice(course.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-forest">
                      {formatPrice(course.price)}
                    </span>
                  )}
                  <span className="ml-auto text-sm text-cream">
                    {course.discountPrice && (
                      <span className="font-medium text-forest bg-forest/10 px-2 py-0.5 rounded">
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </span>
                </div>
                
                <Link 
                  to={`/course-enrollment?courseId=${course.id}`} 
                  className="forest-btn w-full mb-3 text-center"
                >
                  Enroll Now
                </Link>
                
                <button className="w-full border border-cream/20 rounded-full py-2.5 px-4 text-cream hover:bg-cream/10 transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          
          {/* Course content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              {/* About the course */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-forest">About this course</h2>
                <p className="text-cream/90 leading-relaxed">{course.description}</p>
              </section>
              
              {/* What you'll learn */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-forest">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-forest/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <span className="h-2 w-2 rounded-full bg-forest"></span>
                      </div>
                      <p className="text-sm text-cream/90">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Course content */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-forest">Course content</h2>
                <div className="space-y-3">
                  {course.modules.map((module: CourseModule, index: number) => (
                    <div key={index} className="glass-card rounded-lg overflow-hidden">
                      <div className="p-4 bg-forest/10">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-cream">
                            {index + 1}. {module.title}
                          </h3>
                          <div className="text-xs text-cream/70">
                            {module.lessons} lessons • {module.duration}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-cream/80">{module.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Requirements */}
              <section>
                <h2 className="text-xl font-bold mb-4 text-forest">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-cream/90">
                  {course.requirements.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
            
            {/* Sidebar with additional information */}
            <div className="space-y-6">
              {/* Course includes */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-bold mb-4 text-forest">This course includes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-cream/90">
                    <BookOpen className="h-4 w-4 mr-3 text-forest" />
                    <span>48+ on-demand video lessons</span>
                  </li>
                  <li className="flex items-center text-sm text-cream/90">
                    <Clock className="h-4 w-4 mr-3 text-forest" />
                    <span>24+ hours of content</span>
                  </li>
                  <li className="flex items-center text-sm text-cream/90">
                    <User className="h-4 w-4 mr-3 text-forest" />
                    <span>1-on-1 AI tutor support</span>
                  </li>
                  <li className="flex items-center text-sm text-cream/90">
                    <Calendar className="h-4 w-4 mr-3 text-forest" />
                    <span>Lifetime access</span>
                  </li>
                  <li className="flex items-center text-sm text-cream/90">
                    <Users className="h-4 w-4 mr-3 text-forest" />
                    <span>Access to learning rooms</span>
                  </li>
                </ul>
              </div>
              
              {/* Related courses */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-bold mb-4 text-forest">You might also like:</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((id) => (
                    <Link key={id} to={`/courses/${id}`} className="block group">
                      <div className="flex items-start">
                        <div className="h-16 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={`https://images.unsplash.com/photo-162071294354${id}-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`} 
                            alt="Course thumbnail" 
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-cream group-hover:text-forest transition-colors">
                            {id === 1 ? 'Deep Learning for Computer Vision' : 
                             id === 2 ? 'Natural Language Processing' : 
                             'Data Science and Analytics'}
                          </h4>
                          <p className="text-xs text-cream/70 mt-1">
                            {id === 1 ? 'Dr. James Wilson' : 
                             id === 2 ? 'Emma Roberts' : 
                             'Michael Chen'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CourseDetail;
