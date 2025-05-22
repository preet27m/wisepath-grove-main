import { useState } from 'react';
import { ChevronRight, ArrowRight, ArrowLeft, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseCard from '../ui/CourseCard';

// Sample course data
const courses = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals: From Zero to Hero',
    instructor: 'Dr. Sarah Johnson',
    rating: 4.8,
    reviewCount: 2547,
    duration: '10 weeks',
    level: 'Beginner',
    students: 35820,
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    mobileThumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=70',
    thumbnailAlt: "Neural network visualization with blue nodes and connections",
    price: 89.99,
    discountPrice: 49.99,
    tags: ['AI', 'Machine Learning', 'Python', 'Data Science'],
    featured: true,
  },
  {
    id: '2',
    title: 'Web Development Bootcamp 2023: Full Stack Mastery',
    instructor: 'Michael Smith',
    rating: 4.9,
    reviewCount: 3254,
    duration: '12 weeks',
    level: 'Intermediate',
    students: 42150,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    mobileThumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=70',
    thumbnailAlt: "Laptop with code editor and modern web development tools",
    price: 99.99,
    discountPrice: 69.99,
    tags: ['Web Development', 'JavaScript', 'React', 'Node.js'],
    featured: true,
  },
  {
    id: '3',
    title: 'UX/UI Design Principles and Modern Interface Design',
    instructor: 'Emma Chen',
    rating: 4.7,
    reviewCount: 1832,
    duration: '8 weeks',
    level: 'All Levels',
    students: 28450,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    mobileThumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=70',
    thumbnailAlt: "Designer working on UX wireframes and interface elements",
    price: 79.99,
    tags: ['UX Design', 'UI Design', 'Figma', 'Adobe XD'],
    featured: false,
  },
  {
    id: '4',
    title: 'Data Science and Analytics: Business Intelligence',
    instructor: 'Dr. Robert Chen',
    rating: 4.6,
    reviewCount: 1247,
    duration: '10 weeks',
    level: 'Intermediate',
    students: 19785,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    mobileThumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=70',
    thumbnailAlt: "Data visualization dashboard with colorful graphs and charts",
    price: 94.99,
    discountPrice: 59.99,
    tags: ['Data Science', 'Analytics', 'SQL', 'Tableau'],
    featured: false,
  },
  {
    id: '5',
    title: 'Mobile App Development with Flutter & Dart',
    instructor: 'James Wilson',
    rating: 4.8,
    reviewCount: 1589,
    duration: '9 weeks',
    level: 'Intermediate',
    students: 21350,
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    mobileThumbnailUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=70',
    thumbnailAlt: "Mobile app development on multiple devices",
    price: 84.99,
    tags: ['Flutter', 'Dart', 'Mobile Development', 'iOS', 'Android'],
    featured: false,
  },
  {
    id: '6',
    title: 'Cloud Computing with AWS: From Basics to Advanced',
    instructor: 'Alex Rodriguez',
    rating: 4.7,
    reviewCount: 1378,
    duration: '11 weeks',
    level: 'Advanced',
    students: 18920,
    imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    mobileThumbnailUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=70',
    thumbnailAlt: "Cloud servers and networking infrastructure visualization",
    price: 109.99,
    discountPrice: 79.99,
    tags: ['AWS', 'Cloud Computing', 'DevOps', 'Serverless'],
    featured: true,
  },
];

const categories = [
  'All',
  'AI & Machine Learning',
  'Web Development',
  'Data Science',
  'UX/UI Design',
  'Mobile Development',
  'Cloud Computing',
];

const FeaturedCourses = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCourses, setVisibleCourses] = useState(courses);
  
  // Filter courses when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      setVisibleCourses(courses);
    } else {
      // This is a simplified approach, in a real app you would use more robust tag-based filtering
      const filtered = courses.filter(course => {
        // Map categories to related tags (simplified)
        const categoryToTagsMap: Record<string, string[]> = {
          'AI & Machine Learning': ['AI', 'Machine Learning'],
          'Web Development': ['Web Development', 'JavaScript', 'React'],
          'Data Science': ['Data Science', 'Analytics'],
          'UX/UI Design': ['UX Design', 'UI Design'],
          'Mobile Development': ['Mobile Development', 'Flutter', 'iOS', 'Android'],
          'Cloud Computing': ['AWS', 'Cloud Computing', 'DevOps'],
        };
        
        const relatedTags = categoryToTagsMap[category] || [];
        return course.tags.some(tag => relatedTags.includes(tag));
      });
      
      setVisibleCourses(filtered);
    }
  };

  // Filter out featured courses
  const featuredCourses = courses.filter(course => course.featured);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Trending Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Discover our most popular courses loved by thousands of students worldwide. Updated in real-time based on enrollment and ratings.
            </p>
          </div>
          <Link to="/courses" className="inline-flex items-center mt-4 md:mt-0 text-primary hover:underline font-medium">
            <span>View all courses</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {/* Featured courses section */}
        {featuredCourses.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Award className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-xl font-display font-medium">Featured Courses</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <CourseCard key={`featured-${course.id}`} {...course} />
              ))}
            </div>
          </div>
        )}
        
        {/* Category filters */}
        <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* All courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
        
        {/* Empty state */}
        {visibleCourses.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-xl font-medium mb-2">No courses found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We couldn't find any courses in this category. Try another category or check back later.
            </p>
            <button
              onClick={() => handleCategoryChange('All')}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium"
            >
              Show all courses
            </button>
          </div>
        )}
        
        {/* Course navigation buttons (desktop) */}
        <div className="hidden md:flex justify-center mt-12 space-x-4">
          <button 
            className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Previous page"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <button 
            className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Next page"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        
        {/* Mobile view all button */}
        <div className="flex justify-center mt-8 md:hidden">
          <Link 
            to="/courses"
            className="neo-btn w-full max-w-xs"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
