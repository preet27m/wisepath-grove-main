import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CourseDetail from "./pages/CourseDetail";
import LearningRoom from "./pages/LearningRoom";
import MicroInternships from "./pages/MicroInternships";
import AIMentor from "./pages/AIMentor";
import TimeCapsule from "./pages/TimeCapsule";
import Simulations from "./pages/Simulations";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import Certificates from "./pages/Certificates";
import Notes from "./pages/Notes";
import VideoLessons from "./pages/VideoLessons";
import Courses from "./pages/Courses";
import Community from "./pages/Community";
import Signup from "./pages/Signup";
import CourseEnrollment from "./pages/CourseEnrollment";
import EnrollmentSuccess from "./pages/EnrollmentSuccess";
import LoginPrompt from "./components/auth/LoginPrompt";

const queryClient = new QueryClient();

const App = () => {
  const [theme, setTheme] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Setup theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
    }
  }, []);

  // Don't render until theme is determined to avoid flash
  if (theme === null) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
          <div className="bg-white dark:bg-offblack text-gray-900 dark:text-cream min-h-screen transition-colors duration-300">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CourseDetail />} />
                <Route path="/community" element={<Community />} />
                <Route path="/learning-room" element={<LearningRoom />} />
                <Route path="/micro-internships" element={<MicroInternships />} />
                <Route path="/ai-mentor" element={<AIMentor />} />
                <Route path="/time-capsule" element={<TimeCapsule />} />
                <Route path="/simulations" element={<Simulations />} />
                
                {/* Payment Flow Routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/course-enrollment" element={<CourseEnrollment />} />
                <Route path="/enrollment-success" element={<EnrollmentSuccess />} />
                
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/video-lessons" element={<VideoLessons />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            
            <LoginPrompt open={showLoginPrompt} onOpenChange={setShowLoginPrompt} />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
