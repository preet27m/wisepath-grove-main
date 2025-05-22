import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Book, 
  Briefcase, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Home, 
  MessageSquare, 
  Users, 
  Brain, 
  Sparkles,
  User,
  Award,
  FileText,
  Video,
  Bookmark,
  Activity,
  Menu,
  X
} from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

// Create a key for localStorage
const SIDEBAR_STATE_KEY = 'sidebar_state';

const Sidebar = () => {
  // Possible states: 'expanded', 'collapsed', 'hidden'
  const [sidebarState, setSidebarState] = useState(() => {
    // Try to load the state from localStorage
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    return savedState === 'collapsed' || savedState === 'hidden' ? savedState : 'expanded';
  });
  const location = useLocation();
  
  // Create helper getters for readability
  const isCollapsed = sidebarState === 'collapsed';
  const isHidden = sidebarState === 'hidden';
  const isExpanded = sidebarState === 'expanded';

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, sidebarState);
  }, [sidebarState]);

  const toggleSidebar = () => {
    // Cycle through states: expanded -> collapsed -> hidden
    if (isExpanded) {
      setSidebarState('collapsed');
    } else if (isCollapsed) {
      setSidebarState('hidden');
    } else {
      setSidebarState('expanded');
    }
    
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  // Show the sidebar toggle button when sidebar is hidden
  const showSidebar = () => {
    setSidebarState('expanded');
  };

  return (
    <>
      {/* Main sidebar */}
      <div 
        className={`h-screen fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out 
        border-r border-forest/20 dark:border-forest/10 bg-offblack/95 dark:bg-offblack/95 backdrop-blur-sm
        ${isCollapsed ? 'w-16' : isHidden ? '-translate-x-full' : 'w-64'}`}
      >
        {/* Collapse/expand button */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-12 bg-forest text-cream rounded-full p-1 shadow-md"
          aria-label={isCollapsed ? "Hide sidebar" : isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isCollapsed ? (
            <ChevronLeft className="h-4 w-4" />
          ) : isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {/* Logo and header - Fixed at top */}
        <div className="p-4 flex items-center justify-between sticky top-0 bg-offblack/95 z-10">
          {!isCollapsed && (
            <Link to="/" className="text-xl font-bold text-cream">
              <span className="text-gradient font-display">CurioCity</span>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/" className="text-xl font-bold text-cream mx-auto">
              <span className="text-gradient font-display">CC</span>
            </Link>
          )}
        </div>

        {/* Navigation items - Scrollable */}
        <div className="h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
          <nav className="mt-8 px-2">
            <ul className="space-y-2">
              <NavItem 
                to="/" 
                icon={<Home />} 
                label="Home" 
                isCollapsed={isCollapsed}
                isActive={location.pathname === '/'}
              />
              <NavItem 
                to="/courses" 
                icon={<Book />} 
                label="Courses" 
                isCollapsed={isCollapsed}
                isActive={location.pathname.includes('/courses')}
              />
              <NavItem 
                to="/learning-room" 
                icon={<Users />} 
                label="Learning Rooms" 
                isCollapsed={isCollapsed}
                isActive={location.pathname === '/learning-room'}
              />
              <NavItem 
                to="/micro-internships" 
                icon={<Briefcase />} 
                label="Micro-Internships" 
                isCollapsed={isCollapsed}
                isActive={location.pathname === '/micro-internships'}
              />
              <NavItem 
                to="/ai-mentor" 
                icon={<Brain />} 
                label="AI Mentor" 
                isCollapsed={isCollapsed}
                isActive={location.pathname === '/ai-mentor'}
              />
              <NavItem 
                to="/time-capsule" 
                icon={<Clock />} 
                label="Time Capsule" 
                isCollapsed={isCollapsed}
                isActive={location.pathname === '/time-capsule'}
              />
              <NavItem 
                to="/simulations" 
                icon={<Sparkles />} 
                label="Simulations" 
                isCollapsed={isCollapsed}
                isActive={location.pathname === '/simulations'}
              />
              <NavItem 
                to="/community" 
                icon={<MessageSquare />} 
                label="Community" 
                isCollapsed={isCollapsed}
                isActive={location.pathname === '/community'}
              />
              
              {/* New dashboards */}
              <li className="pt-4 pb-1">
                {!isCollapsed && <p className="text-xs text-cream/50 px-3">Dashboards</p>}
              </li>
              <NavItem 
                to="/student-dashboard" 
                icon={<User />} 
                label="Student Dashboard" 
                isCollapsed={isCollapsed} 
                isActive={location.pathname === '/student-dashboard'}
              />
              <NavItem 
                to="/instructor-dashboard" 
                icon={<Users />} 
                label="Instructor Dashboard" 
                isCollapsed={isCollapsed}
                isActive={location.pathname === '/instructor-dashboard'}
              />
              
              {/* New resources */}
              <li className="pt-4 pb-1">
                {!isCollapsed && <p className="text-xs text-cream/50 px-3">Resources</p>}
              </li>
              <NavItem 
                to="/certificates" 
                icon={<Award />} 
                label="Certificates" 
                isCollapsed={isCollapsed}
                isActive={location.pathname === '/certificates'}
              />
              <NavItem 
                to="/video-lessons" 
                icon={<Video />} 
                label="Video Lessons" 
                isCollapsed={isCollapsed}
                isActive={location.pathname === '/video-lessons'}
              />
              <NavItem 
                to="/notes" 
                icon={<FileText />} 
                label="Notes & PDFs" 
                isCollapsed={isCollapsed}
                isActive={location.pathname === '/notes'}
              />
            </ul>
          </nav>
        </div>

        {/* Footer with theme toggle - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-offblack/95 z-10">
          <div className="flex items-center justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Show sidebar button (only visible when sidebar is hidden) */}
      {isHidden && (
        <button
          onClick={showSidebar}
          className="fixed left-4 top-20 z-50 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-forest-light transition-colors animate-pulse"
          aria-label="Show sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isActive?: boolean;
};

const NavItem = ({ to, icon, label, isCollapsed, isActive }: NavItemProps) => (
  <li>
    <Link
      to={to}
      className={`flex items-center rounded-md px-4 py-3 text-cream hover:bg-forest/20 transition-colors
      ${isCollapsed ? 'justify-center' : 'justify-start'}
      ${isActive ? 'bg-forest/20 text-forest' : ''}`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!isCollapsed && <span className="ml-3">{label}</span>}
    </Link>
  </li>
);

export default Sidebar;
