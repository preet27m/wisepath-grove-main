
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="p-4 mb-6 inline-block">
            <div className="relative">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-7xl font-display font-bold text-gradient">404</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-pastel-pink rounded-full animate-pulse-soft"></div>
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-pastel-blue rounded-full animate-float"></div>
            </div>
          </div>
          
          <h1 className="text-3xl font-display font-bold mb-3">Page not found</h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center px-6 py-3 rounded-full border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Go Back</span>
            </button>
            
            <Link 
              to="/"
              className="neo-btn w-full sm:w-auto flex items-center justify-center"
            >
              <Home className="h-4 w-4 mr-2" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
