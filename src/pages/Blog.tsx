import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Bookmark, Calendar, ChevronRight, Heart, Share2, Tag, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl: string;
  likes: number;
  commentsCount: number;
}

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Sample blog categories
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'technology', name: 'Technology' },
    { id: 'education', name: 'Education' },
    { id: 'ai', name: 'Artificial Intelligence' },
    { id: 'student-stories', name: 'Student Stories' },
    { id: 'future-trends', name: 'Future Trends' },
  ];
  
  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Impact of AI on Education: Present and Future',
      excerpt: 'How artificial intelligence is transforming the learning landscape and what we can expect in the coming years.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies.',
      author: {
        name: 'Dr. Emily Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      date: 'May 15, 2023',
      readTime: '8 min read',
      category: 'ai',
      tags: ['AI', 'Education', 'Future', 'Machine Learning'],
      imageUrl: 'https://images.unsplash.com/photo-1655720844348-f28d7564e38a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      likes: 243,
      commentsCount: 42
    },
    {
      id: '2',
      title: 'Why Problem-Based Learning Works Better Than Traditional Methods',
      excerpt: 'A deep dive into the science behind problem-based learning and how it promotes deeper understanding.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies.',
      author: {
        name: 'Prof. Michael Johnson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      date: 'Apr 28, 2023',
      readTime: '12 min read',
      category: 'education',
      tags: ['Education', 'Learning', 'Teaching', 'Methodology'],
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80',
      likes: 189,
      commentsCount: 37
    },
    {
      id: '3',
      title: 'The Role of Immersive Technologies in Next-Generation Learning',
      excerpt: 'Exploring how VR, AR, and mixed reality are creating powerful new learning environments.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies.',
      author: {
        name: 'Sarah Williams',
        avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      date: 'Mar 12, 2023',
      readTime: '10 min read',
      category: 'technology',
      tags: ['VR', 'AR', 'Technology', 'Education'],
      imageUrl: 'https://images.unsplash.com/photo-1617997455403-41f333d44d5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      likes: 315,
      commentsCount: 54
    },
    {
      id: '4',
      title: 'From Campus to Cloud: How Online Education is Evolving',
      excerpt: 'The shift from traditional campus learning to cloud-based education platforms and what it means for students.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies.',
      author: {
        name: 'David Lee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      date: 'Feb 5, 2023',
      readTime: '7 min read',
      category: 'education',
      tags: ['Online Learning', 'Education', 'Technology'],
      imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      likes: 178,
      commentsCount: 23
    },
    {
      id: '5',
      title: 'Student Success Story: From CurioCity to Silicon Valley',
      excerpt: 'How one student used our platform to land a dream job at a leading tech company.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies.',
      author: {
        name: 'Jessica Martinez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      date: 'Jan 18, 2023',
      readTime: '9 min read',
      category: 'student-stories',
      tags: ['Success Story', 'Career', 'Technology'],
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      likes: 423,
      commentsCount: 87
    },
    {
      id: '6',
      title: 'The Future of Work: Skills That Will Matter in 2030',
      excerpt: 'A look ahead at the most critical skills for the future job market and how to prepare now.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam ultricies.',
      author: {
        name: 'Dr. Robert Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      date: 'Dec 3, 2022',
      readTime: '11 min read',
      category: 'future-trends',
      tags: ['Future of Work', 'Skills', 'Career'],
      imageUrl: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      likes: 290,
      commentsCount: 45
    }
  ];
  
  // Filter posts by category
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);
  
  // Featured post (first post)
  const featuredPost = blogPosts[0];
  
  return (
    <MainLayout>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">CurioCity Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Insights, trends, and stories from the world of education, technology, and lifelong learning
            </p>
          </div>
          
          {/* Featured Article */}
          <div className="mb-20">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="h-[400px] md:h-auto relative">
                  <img 
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 text-white py-1 px-3 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {categories.find(c => c.id === featuredPost.category)?.name}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center mb-6">
                    <img 
                      className="h-10 w-10 rounded-full mr-3"
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                    />
                    <div>
                      <div className="font-medium">{featuredPost.author.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{featuredPost.date}</div>
                    </div>
                  </div>
                  <button className="neo-btn w-full md:w-auto flex items-center justify-center">
                    <span>Read Article</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${activeCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col">
                <div className="h-52 relative">
                  <img 
                    className="w-full h-full object-cover"
                    src={post.imageUrl}
                    alt={post.title}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center text-white">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{post.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{post.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-grow">
                  <div className="flex items-center mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {categories.find(c => c.id === post.category)?.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center mb-4">
                    <img 
                      className="h-8 w-8 rounded-full mr-2"
                      src={post.author.avatar}
                      alt={post.author.name}
                    />
                    <div className="text-sm font-medium">{post.author.name}</div>
                  </div>
                </div>
                <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <span>•</span>
                    <span>{post.commentsCount} comments</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Bookmark className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Share2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="mt-12 text-center">
            <button className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Blog; 