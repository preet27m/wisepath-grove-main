
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, MessageSquare, Bookmark, Activity, CheckCircle } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const RightSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`h-screen fixed right-0 top-0 z-30 transition-all duration-300 ease-in-out 
      border-l border-forest/20 dark:border-forest/10 bg-offblack/95 dark:bg-offblack/95 backdrop-blur-sm
      ${isCollapsed ? 'w-0 opacity-0' : 'w-72 opacity-100'}`}
    >
      {/* Collapse button */}
      <button 
        onClick={toggleSidebar}
        className={`absolute -left-3 top-12 bg-forest text-cream rounded-full p-1 shadow-md transition-all
        ${isCollapsed ? '-left-10' : '-left-3'}`}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      <div className="h-full pt-16 pb-4 px-3 overflow-y-auto">
        <Tabs defaultValue="progress">
          <TabsList className="w-full">
            <TabsTrigger value="progress" className="flex-1">
              <Activity className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="discussion" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Q&A
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex-1">
              <Bookmark className="h-4 w-4 mr-2" />
              Saved
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="pt-4">
            <h3 className="text-lg font-semibold text-cream mb-4">Your Progress</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-cream">Machine Learning Fundamentals</p>
                  <span className="text-xs text-sand">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-cream">Web Development Bootcamp</p>
                  <span className="text-xs text-sand">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-cream">Data Science with Python</p>
                  <span className="text-xs text-sand">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <h3 className="text-lg font-semibold text-cream mb-4">Completed Courses</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-forest mr-3" />
                <p className="text-sm text-cream">Introduction to JavaScript</p>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-forest mr-3" />
                <p className="text-sm text-cream">SQL Fundamentals</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="discussion" className="pt-4">
            <h3 className="text-lg font-semibold text-cream mb-4">Recent Discussions</h3>
            
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="glass-card p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-cream">How do I implement a recursive function?</h4>
                    <span className="text-xs text-sand">2h ago</span>
                  </div>
                  <p className="text-xs text-cream/70 mb-2">I'm stuck on the recursive function exercise in module 3...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-forest">4 replies</span>
                    <button className="text-xs text-forest hover:text-forest-light">Reply</button>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-2 text-sm text-forest hover:text-forest-light">
                View all discussions
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="bookmarks" className="pt-4">
            <h3 className="text-lg font-semibold text-cream mb-4">Saved Items</h3>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start gap-3 p-2 hover:bg-forest/10 rounded-md">
                  <Bookmark className="h-4 w-4 text-forest flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-cream">Understanding Promises in JavaScript</h4>
                    <p className="text-xs text-sand">Module 4 • Web Development</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RightSidebar;
