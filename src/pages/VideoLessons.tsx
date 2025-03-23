import { useEffect, useRef, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import Cursor from '../components/ui/Cursor';
import AIChat from '../components/ui/AIChat';
import { Play, Pause, Volume2, VolumeX, List, Maximize, Download, BookmarkPlus, MessageSquare, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const VideoLessons = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(1);

  const lessons = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      duration: '45:12',
      course: 'Machine Learning Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 2,
      title: 'Supervised Learning Algorithms',
      duration: '38:24',
      course: 'Machine Learning Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    {
      id: 3,
      title: 'Unsupervised Learning Techniques',
      duration: '41:35',
      course: 'Machine Learning Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  ];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
      const progressBarWidth = progressBar.offsetWidth;
      const seekTime = (clickPosition / progressBarWidth) * videoRef.current.duration;
      
      videoRef.current.currentTime = seekTime;
      setProgress((seekTime / videoRef.current.duration) * 100);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const selectLesson = (lessonId: number) => {
    setSelectedLesson(lessonId);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  const currentLesson = lessons.find(lesson => lesson.id === selectedLesson) || lessons[0];

  return (
    <div className="min-h-screen flex bg-offblack">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-64 mr-0 md:mr-72">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gradient mb-6">Video Lessons</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass-card rounded-xl p-4 overflow-hidden mb-6">
                <div className="relative rounded-lg overflow-hidden aspect-video bg-black mb-4">
                  <video
                    ref={videoRef}
                    src={currentLesson.videoUrl}
                    className="w-full h-full object-contain"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onClick={handlePlayPause}
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-offblack to-transparent">
                    <div 
                      className="relative w-full h-2 bg-offblack/50 rounded-full cursor-pointer mb-3"
                      onClick={handleProgressClick}
                    >
                      <div 
                        className="absolute top-0 left-0 h-full bg-forest rounded-full" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={handlePlayPause}
                          className="h-8 w-8 rounded-full bg-forest flex items-center justify-center text-cream"
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                        
                        <div className="text-xs text-sand">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={toggleMute}
                          className="text-sand hover:text-cream transition-colors"
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>
                        
                        <button className="text-sand hover:text-cream transition-colors">
                          <Maximize className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-cream mb-2">{currentLesson.title}</h2>
                <p className="text-sm text-sand mb-4">{currentLesson.course} • {currentLesson.instructor}</p>
                
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-forest text-cream hover:bg-forest-light">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button className="bg-sand text-offblack hover:bg-sand-light">
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button className="bg-offblack-light text-cream border border-forest/20 hover:border-forest/50">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask Question
                  </Button>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <Tabs defaultValue="description">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="pt-4">
                    <p className="text-cream mb-4">
                      In this lesson, we explore the fundamentals of machine learning, including key concepts, algorithms, and applications. 
                      You'll learn about the difference between supervised and unsupervised learning, and how to approach common machine learning problems.
                    </p>
                    <p className="text-cream">
                      By the end of this video, you'll understand the basic principles that govern machine learning systems 
                      and be prepared for the more advanced topics in subsequent lessons.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-forest mt-6 mb-3">Key Learning Objectives</h3>
                    <ul className="list-disc list-inside space-y-1 text-cream">
                      <li>Understand the core concepts of machine learning</li>
                      <li>Differentiate between supervised and unsupervised learning</li>
                      <li>Recognize common applications of machine learning</li>
                      <li>Get familiar with the basic workflow of a machine learning project</li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="transcript" className="pt-4">
                    <div className="h-80 overflow-y-auto pr-4 space-y-4">
                      <div>
                        <p className="text-xs text-sand mb-1">0:00 - 0:15</p>
                        <p className="text-sm text-cream">
                          Welcome to the Introduction to Machine Learning course. In this video series, 
                          we'll explore the fascinating world of machine learning and how it's transforming industries across the globe.
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-sand mb-1">0:16 - 0:45</p>
                        <p className="text-sm text-cream">
                          So what exactly is machine learning? At its core, machine learning is a subset of artificial intelligence 
                          that focuses on developing systems that can learn from and make decisions based on data.
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-sand mb-1">0:46 - 1:30</p>
                        <p className="text-sm text-cream">
                          Unlike traditional programming where we explicitly code rules and logic, 
                          machine learning algorithms can learn patterns from data and improve their performance over time without being explicitly programmed.
                        </p>
                      </div>
                      
                      {/* Additional transcript sections would continue here */}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="resources" className="pt-4">
                    <div className="space-y-4">
                      <div className="p-3 border border-forest/20 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <File className="h-5 w-5 text-forest mr-3" />
                          <span className="text-sm text-cream">Lecture Notes - Introduction to ML.pdf</span>
                        </div>
                        <Button size="sm" className="bg-forest text-cream hover:bg-forest-light">
                          <Download className="h-3.5 w-3.5 mr-1.5" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="p-3 border border-forest/20 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <File className="h-5 w-5 text-forest mr-3" />
                          <span className="text-sm text-cream">ML Algorithms Cheat Sheet.pdf</span>
                        </div>
                        <Button size="sm" className="bg-forest text-cream hover:bg-forest-light">
                          <Download className="h-3.5 w-3.5 mr-1.5" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="p-3 border border-forest/20 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <File className="h-5 w-5 text-forest mr-3" />
                          <span className="text-sm text-cream">Python Code Examples.zip</span>
                        </div>
                        <Button size="sm" className="bg-forest text-cream hover:bg-forest-light">
                          <Download className="h-3.5 w-3.5 mr-1.5" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-forest">Course Lessons</h3>
                <Button variant="outline" size="sm" className="border-forest/20 text-cream">
                  <List className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    onClick={() => selectLesson(lesson.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedLesson === lesson.id 
                        ? 'bg-forest/20 border border-forest/30' 
                        : 'hover:bg-forest/10 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="w-24 h-16 rounded overflow-hidden bg-black flex-shrink-0 mr-3">
                        <div className="w-full h-full bg-offblack-light flex items-center justify-center">
                          <Play className="h-6 w-6 text-cream/70" />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-cream mb-1">{lesson.title}</h4>
                        <p className="text-xs text-sand mb-2">{lesson.duration}</p>
                        
                        {selectedLesson === lesson.id && progress > 0 && (
                          <div className="w-full h-1.5 bg-offblack/50 rounded-full">
                            <div 
                              className="h-full bg-forest rounded-full" 
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-forest/20">
                <h3 className="text-lg font-semibold text-forest mb-4">Up Next</h3>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg hover:bg-forest/10 cursor-pointer border border-transparent transition-colors">
                    <h4 className="text-sm font-medium text-cream mb-1">Deep Learning Introduction</h4>
                    <p className="text-xs text-sand">52:18 • Advanced ML Course</p>
                  </div>
                  
                  <div className="p-3 rounded-lg hover:bg-forest/10 cursor-pointer border border-transparent transition-colors">
                    <h4 className="text-sm font-medium text-cream mb-1">Natural Language Processing</h4>
                    <p className="text-xs text-sand">48:05 • NLP Specialization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <Cursor />
        <AIChat />
      </div>
      <RightSidebar />
    </div>
  );
};

export default VideoLessons;
