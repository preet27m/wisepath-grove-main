import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarState, setSidebarState] = useState(() => {
    return localStorage.getItem('sidebar_state') || 'expanded';
  });
  
  // Update header styling on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Listen for sidebar state changes
  useEffect(() => {
    const handleStorageChange = () => {
      setSidebarState(localStorage.getItem('sidebar_state') || 'expanded');
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically
    const interval = setInterval(() => {
      const currentSidebarState = localStorage.getItem('sidebar_state') || 'expanded';
      if (currentSidebarState !== sidebarState) {
        setSidebarState(currentSidebarState);
      }
    }, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [sidebarState]);
  
  const toggleSidebar = () => {
    const currentState = localStorage.getItem('sidebar_state') || 'expanded';
    let newState;
    
    // Cycle through states
    if (currentState === 'expanded') {
      newState = 'collapsed';
    } else if (currentState === 'collapsed') {
      newState = 'hidden';
    } else {
      newState = 'expanded';
    }
    
    localStorage.setItem('sidebar_state', newState);
    setSidebarState(newState);
    
    // Also dispatch an event to notify other components
    window.dispatchEvent(new Event('storage'));
    // Dispatch a custom event for components that might be listening
    window.dispatchEvent(new CustomEvent('sidebarStateChanged', { 
      detail: { state: newState } 
    }));
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'Blog', path: '/blog' },
    { label: 'Community', path: '/community' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo and sidebar toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-primary/20 dark:bg-primary/20 transition-all duration-300"
            aria-label="Toggle sidebar"
          >
            {sidebarState === 'hidden' ? (
              <Menu className="h-5 w-5" />
            ) : sidebarState === 'collapsed' ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
          
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-semibold"
          >
            <BookOpen className="h-7 w-7 text-primary animate-pulse-soft" />
            <span className="text-gradient font-display">CurioCity</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-primary dark:hover:text-primary hover:bg-primary/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            aria-label="Search" 
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
          
          <ThemeToggle />
          
          <Link 
            to="/login" 
            className="text-sm font-medium px-5 py-2 rounded-full 
            border border-gray-200 dark:border-gray-700 
            hover:border-primary dark:hover:border-primary 
            text-gray-700 dark:text-gray-300 transition-all"
          >
            Log in
          </Link>
          
          <Link 
            to="/signup" 
            className="neo-btn"
          >
            Get Started
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex items-center space-x-3 md:hidden">
          <ThemeToggle />
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <nav className="container mx-auto py-4 px-6 flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 space-y-3">
              <Link
                to="/login"
                className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-3 text-base font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
