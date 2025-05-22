import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { Search as SearchIcon, Book, Newspaper, Users, BookOpen, Filter, X, ChevronRight, Clock } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'course' | 'blog' | 'community' | 'instructor';
  description: string;
  image?: string;
  url: string;
  date?: string;
  author?: {
    name: string;
    avatar: string;
  };
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  useEffect(() => {
    // Simulate API search
    const fetchSearchResults = async () => {
      setLoading(true);
      
      // Add a small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Sample search results for demonstration
      const mockResults: SearchResult[] = [
        // Courses
        {
          id: 'course-1',
          title: 'Machine Learning Fundamentals: From Zero to Hero',
          type: 'course',
          description: 'Learn the foundations of machine learning and AI with hands-on projects.',
          image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          url: '/courses/1'
        },
        {
          id: 'course-2',
          title: 'Web Development Bootcamp 2023: Full Stack Mastery',
          type: 'course',
          description: 'Comprehensive web development course covering frontend, backend, and deployment.',
          image: 'https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          url: '/courses/2'
        },
        
        // Blog posts
        {
          id: 'blog-1',
          title: 'The Impact of AI on Education: Present and Future',
          type: 'blog',
          description: 'How artificial intelligence is transforming the learning landscape and what we can expect in the coming years.',
          image: 'https://images.unsplash.com/photo-1655720844348-f28d7564e38a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
          url: '/blog/ai-education-impact',
          date: 'May 15, 2023',
          author: {
            name: 'Dr. Emily Chen',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
        },
        {
          id: 'blog-2',
          title: 'Why Problem-Based Learning Works Better Than Traditional Methods',
          type: 'blog',
          description: 'A deep dive into the science behind problem-based learning and how it promotes deeper understanding.',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80',
          url: '/blog/problem-based-learning',
          date: 'Apr 28, 2023',
          author: {
            name: 'Prof. Michael Johnson',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
        },
        
        // Community
        {
          id: 'community-1',
          title: 'Machine Learning Study Group',
          type: 'community',
          description: 'Join our weekly sessions where we discuss ML concepts, solve problems, and build projects together.',
          url: '/community/machine-learning-group'
        },
        {
          id: 'community-2',
          title: 'Web Development Mentorship Program',
          type: 'community',
          description: 'Connect with experienced developers who can guide you through your web development journey.',
          url: '/community/web-dev-mentorship'
        },
        
        // Instructors
        {
          id: 'instructor-1',
          title: 'Dr. Sarah Johnson',
          type: 'instructor',
          description: 'Expert in machine learning and AI with 10+ years of experience in both academia and industry.',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          url: '/instructors/sarah-johnson'
        },
        {
          id: 'instructor-2',
          title: 'David Rodriguez',
          type: 'instructor',
          description: 'Full-stack developer and educator specialized in modern web technologies.',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          url: '/instructors/david-rodriguez'
        }
      ];
      
      // Filter based on search query
      if (query) {
        const filtered = mockResults.filter(
          result => 
            result.title.toLowerCase().includes(query.toLowerCase()) || 
            result.description.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
      } else {
        setSearchResults([]);
      }
      
      setLoading(false);
    };
    
    fetchSearchResults();
  }, [query]);
  
  // Filter results based on type
  const filteredResults = activeFilter === 'all' 
    ? searchResults 
    : searchResults.filter(result => result.type === activeFilter);
  
  // Count results by type
  const resultCounts = {
    all: searchResults.length,
    course: searchResults.filter(r => r.type === 'course').length,
    blog: searchResults.filter(r => r.type === 'blog').length,
    community: searchResults.filter(r => r.type === 'community').length,
    instructor: searchResults.filter(r => r.type === 'instructor').length
  };
  
  // Get icon for result type
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'course':
        return <Book className="h-5 w-5 text-primary" />;
      case 'blog':
        return <Newspaper className="h-5 w-5 text-emerald-500" />;
      case 'community':
        return <Users className="h-5 w-5 text-indigo-500" />;
      case 'instructor':
        return <BookOpen className="h-5 w-5 text-amber-500" />;
      default:
        return <SearchIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get type label with proper capitalization
  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <MainLayout>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Search Header */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto mb-8">
              <form action="/search" className="relative">
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search courses, blog posts, communities..."
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                {query && (
                  <Link
                    to="/search"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                  </Link>
                )}
              </form>
            </div>
            
            {query && (
              <div className="text-center text-xl mb-6">
                {loading ? (
                  <p>Searching for "{query}"...</p>
                ) : (
                  <p>
                    Found <span className="font-bold">{searchResults.length}</span> results for "{query}"
                  </p>
                )}
              </div>
            )}
            
            {/* Filters */}
            {!loading && searchResults.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 
                    ${activeFilter === 'all' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  <span>All</span>
                  <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                    {resultCounts.all}
                  </span>
                </button>
                
                {Object.entries(resultCounts)
                  .filter(([key, count]) => key !== 'all' && count > 0)
                  .map(([key, count]) => (
                    <button
                      key={key}
                      onClick={() => setActiveFilter(key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 
                        ${activeFilter === key 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                      {getTypeIcon(key)}
                      <span>{getTypeLabel(key)}s</span>
                      <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                        {count}
                      </span>
                    </button>
                  ))
                }
              </div>
            )}
          </div>
          
          {/* Search Results */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Searching...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-16">
              {query ? (
                <div>
                  <div className="mb-6 flex justify-center">
                    <SearchIcon className="h-16 w-16 text-gray-300 dark:text-gray-700" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">No results found</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We couldn't find any content matching "{query}". Try different keywords or browse our categories.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link to="/courses" className="neo-btn">
                      Browse Courses
                    </Link>
                    <Link to="/blog" className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      Read Our Blog
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Enter a search term to begin</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Search for courses, blog posts, community groups, and more
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredResults.map((result) => (
                <div 
                  key={result.id} 
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
                >
                  <Link to={result.url} className="flex flex-col md:flex-row">
                    {result.image && (
                      <div className="w-full md:w-[30%] h-48 md:h-auto relative flex-shrink-0">
                        <img 
                          src={result.image} 
                          alt={result.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                          {getTypeIcon(result.type)}
                          <span className="ml-1.5">{getTypeLabel(result.type)}</span>
                        </div>
                      </div>
                    )}
                    <div className={`flex-1 p-6 ${!result.image ? 'pl-14 relative' : ''}`}>
                      {!result.image && (
                        <div className="absolute left-4 top-6">
                          <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                            {getTypeIcon(result.type)}
                          </div>
                        </div>
                      )}
                      
                      <h3 className="text-xl font-bold mb-2">
                        {result.title}
                        <ChevronRight className="inline-block ml-1 h-4 w-4 opacity-50" />
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {result.description}
                      </p>
                      
                      {result.date && result.author && (
                        <div className="flex items-center mt-4">
                          <img 
                            src={result.author.avatar} 
                            alt={result.author.name}
                            className="h-8 w-8 rounded-full mr-3"
                          />
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <span>{result.author.name}</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {result.date}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Search; 