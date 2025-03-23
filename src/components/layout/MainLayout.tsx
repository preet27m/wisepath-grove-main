import { useState, useEffect, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Cursor from '../ui/Cursor';
import AIChat from '../ui/AIChat';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Check sidebar state from localStorage
  const [sidebarState, setSidebarState] = useState(() => {
    return localStorage.getItem('sidebar_state') || 'expanded';
  });

  // Update sidebar state when it changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setSidebarState(localStorage.getItem('sidebar_state') || 'expanded');
    };

    // Listen for changes to localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom sidebar events
    const handleSidebarChange = (e: Event) => {
      const event = e as CustomEvent;
      if (event.detail && event.detail.state) {
        setSidebarState(event.detail.state);
      } else {
        handleStorageChange();
      }
    };
    
    window.addEventListener('sidebarStateChanged', handleSidebarChange);
    
    // Also check periodically (for changes within the same window)
    const interval = setInterval(() => {
      const currentState = localStorage.getItem('sidebar_state') || 'expanded';
      if (currentState !== sidebarState) {
        setSidebarState(currentState);
      }
    }, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sidebarStateChanged', handleSidebarChange);
      clearInterval(interval);
    };
  }, [sidebarState]);

  // Determine main content margin based on sidebar state
  const getMainContentClass = () => {
    switch (sidebarState) {
      case 'collapsed':
        return 'ml-16 transition-all duration-300';
      case 'hidden':
        return 'ml-0 transition-all duration-300';
      default: // 'expanded'
        return 'ml-16 md:ml-64 transition-all duration-300';
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-offblack text-gray-900 dark:text-cream transition-colors duration-300">
      <Sidebar />
      <div className={`flex-1 ${getMainContentClass()}`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Cursor />
        <AIChat />
      </div>
    </div>
  );
};

export default MainLayout; 