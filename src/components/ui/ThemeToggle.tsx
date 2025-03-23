import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ThemeToggle = () => {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
  });

  // Update theme when component mounts and when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Dispatch a custom event that components can listen for
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: isDarkMode ? 'dark' : 'light' } 
    }));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    
    // Show toast notification
    toast({
      title: isDarkMode ? "Light mode activated" : "Dark mode activated",
      description: isDarkMode 
        ? "The application is now in light mode" 
        : "The application is now in dark mode",
      duration: 2000,
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-200/50 dark:bg-gray-800/50 transition-all duration-300"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 transition-all duration-300" />
      ) : (
        <Moon className="h-5 w-5 transition-all duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
