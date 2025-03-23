
import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, ChevronRight, Clock, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import { Button } from '@/components/ui/button';

// Mock data for learning rooms
const mockRooms = [
  {
    id: '1',
    courseName: 'Machine Learning Fundamentals',
    topic: 'Supervised Learning Algorithms',
    participants: 7,
    maxParticipants: 10,
    startTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    duration: 60, // 60 minutes
    level: 'Beginner',
    instructor: 'Dr. Sarah Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '2',
    courseName: 'Web Development Bootcamp',
    topic: 'Building React Components',
    participants: 5,
    maxParticipants: 8,
    startTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    duration: 45, // 45 minutes
    level: 'Intermediate',
    instructor: 'Michael Smith',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '3',
    courseName: 'UX/UI Design Principles',
    topic: 'User Research Methods',
    participants: 3,
    maxParticipants: 6,
    startTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    duration: 75, // 75 minutes
    level: 'All Levels',
    instructor: 'Emma Chen',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  },
  {
    id: '4',
    courseName: 'Python for Data Science',
    topic: 'Data Visualization with Matplotlib',
    participants: 9,
    maxParticipants: 12,
    startTime: new Date(Date.now() + 120 * 60 * 1000), // 2 hours from now
    duration: 60, // 60 minutes
    level: 'Intermediate',
    instructor: 'Dr. Robert Chen',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

const LearningRoom = () => {
  const [rooms, setRooms] = useState(mockRooms);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number } | null>(null);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'active' | 'create'>('upcoming');

  // Countdown timer for active room
  useEffect(() => {
    if (!activeRoom) return;

    const selectedRoom = rooms.find(room => room.id === activeRoom);
    if (!selectedRoom) return;

    const interval = setInterval(() => {
      const now = new Date();
      const startTime = selectedRoom.startTime;
      const diff = startTime.getTime() - now.getTime();

      if (diff <= 0) {
        // Room is now active, reset countdown
        setTimeLeft({ minutes: selectedRoom.duration, seconds: 0 });
        clearInterval(interval);
      } else {
        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeRoom, rooms]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours} hr ${remainingMinutes} min` : `${hours} hr`;
  };

  const handleJoinRoom = (roomId: string) => {
    setActiveRoom(roomId);
    setSelectedTab('active');
  };

  return (
    <div className="min-h-screen flex bg-offblack">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Back button */}
          <Link to="/" className="flex items-center text-cream hover:text-sand mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Home</span>
          </Link>
          
          {/* Page header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-cream mb-3">Learning Rooms</h1>
            <p className="text-cream/80 max-w-2xl">
              Join live study sessions with other students taking the same courses.
              Discuss topics, solve problems together, and enhance your learning experience.
            </p>
          </div>
          
          {/* Tabs navigation */}
          <div className="flex border-b border-forest/20 mb-8">
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                selectedTab === 'upcoming' 
                  ? 'text-forest border-b-2 border-forest' 
                  : 'text-cream/70 hover:text-cream'
              }`}
            >
              Upcoming Rooms
            </button>
            <button
              onClick={() => setSelectedTab('active')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                selectedTab === 'active' 
                  ? 'text-forest border-b-2 border-forest' 
                  : 'text-cream/70 hover:text-cream'
              }`}
            >
              {activeRoom ? 'My Active Room' : 'Join a Room'}
            </button>
            <button
              onClick={() => setSelectedTab('create')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                selectedTab === 'create' 
                  ? 'text-forest border-b-2 border-forest' 
                  : 'text-cream/70 hover:text-cream'
              }`}
            >
              Create New Room
            </button>
          </div>
          
          {/* Tab content */}
          <div className="min-h-[60vh]">
            {/* Upcoming rooms */}
            {selectedTab === 'upcoming' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <div key={room.id} className="glass-card rounded-xl overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden relative">
                      <img 
                        src={room.imageUrl} 
                        alt={room.courseName} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-offblack to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-forest/90 text-cream text-xs px-3 py-1 rounded-full">
                          {room.level}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-1 text-cream">{room.topic}</h3>
                      <p className="text-sm text-sand mb-3">{room.courseName}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center text-xs text-cream/80">
                          <Calendar className="h-3.5 w-3.5 mr-1.5 text-forest" />
                          <span>{formatTime(room.startTime)}</span>
                        </div>
                        <div className="flex items-center text-xs text-cream/80">
                          <Clock className="h-3.5 w-3.5 mr-1.5 text-forest" />
                          <span>{formatDuration(room.duration)}</span>
                        </div>
                        <div className="flex items-center text-xs text-cream/80">
                          <Users className="h-3.5 w-3.5 mr-1.5 text-forest" />
                          <span>{room.participants}/{room.maxParticipants} people</span>
                        </div>
                        <div className="flex items-center text-xs text-cream/80">
                          <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-forest" />
                          <span>AI Moderated</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-xs text-cream/70">
                          <span className="font-medium">{room.instructor}</span>
                        </div>
                        <Button 
                          onClick={() => handleJoinRoom(room.id)}
                          className="bg-forest hover:bg-forest-light text-cream text-xs h-8 px-4"
                        >
                          Join Room
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Active room view */}
            {selectedTab === 'active' && (
              <div>
                {activeRoom ? (
                  <div className="glass-card rounded-xl p-6">
                    {timeLeft && (
                      <div className="mb-6 text-center">
                        <div className="text-2xl font-bold text-forest mb-2">
                          {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
                        </div>
                        <p className="text-sm text-cream/70">
                          {timeLeft.minutes > 0 ? 'until the room starts' : 'remaining in this session'}
                        </p>
                      </div>
                    )}
                    
                    {(() => {
                      const room = rooms.find(r => r.id === activeRoom);
                      if (!room) return null;
                      
                      return (
                        <div>
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                            <div>
                              <h2 className="text-xl font-bold text-cream mb-1">{room.topic}</h2>
                              <p className="text-sm text-sand">{room.courseName} with {room.instructor}</p>
                            </div>
                            <div className="flex items-center mt-4 md:mt-0">
                              <div className="flex items-center mr-4">
                                <Users className="h-4 w-4 mr-2 text-forest" />
                                <span className="text-sm text-cream/80">{room.participants}/{room.maxParticipants}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-forest" />
                                <span className="text-sm text-cream/80">{formatDuration(room.duration)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-offblack-light rounded-lg p-6 mb-6">
                            <h3 className="font-medium text-cream mb-4">Participants</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {Array.from({ length: room.participants }).map((_, index) => (
                                <div key={index} className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-forest/20 flex items-center justify-center mr-3">
                                    <span className="text-xs text-forest font-medium">
                                      {String.fromCharCode(65 + index)}
                                    </span>
                                  </div>
                                  <span className="text-sm text-cream/90">
                                    {index === 0 ? 'You' : `Student ${index + 1}`}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="font-medium text-cream mb-4">Discussion Topics</h3>
                            <div className="space-y-3">
                              <div className="p-4 bg-forest/10 rounded-lg">
                                <p className="text-sm text-cream">
                                  Key concepts from today's lecture on {room.topic}.
                                </p>
                              </div>
                              <div className="p-4 bg-forest/10 rounded-lg">
                                <p className="text-sm text-cream">
                                  Practice problems and solutions.
                                </p>
                              </div>
                              <div className="p-4 bg-forest/10 rounded-lg">
                                <p className="text-sm text-cream">
                                  Questions for the upcoming quiz.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="font-medium text-cream mb-4">AI Assistant</h3>
                            <div className="p-4 bg-forest/5 rounded-lg border border-forest/20">
                              <div className="flex items-start">
                                <div className="h-8 w-8 rounded-full bg-forest flex items-center justify-center mr-3 flex-shrink-0">
                                  <span className="text-xs text-cream font-medium">AI</span>
                                </div>
                                <div>
                                  <p className="text-sm text-cream/90 mb-2">
                                    I'm your AI learning assistant for this session. I can help moderate discussions,
                                    answer questions about {room.topic}, and suggest additional resources.
                                  </p>
                                  <p className="text-sm text-cream/90">
                                    What would you like to discuss today?
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex">
                            <input 
                              type="text" 
                              placeholder="Type your message here..." 
                              className="flex-1 rounded-l-md bg-offblack-light border border-forest/20 px-4 py-2 text-cream focus:outline-none focus:ring-1 focus:ring-forest"
                            />
                            <button className="bg-forest hover:bg-forest-light text-cream px-4 rounded-r-md">
                              Send
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <h3 className="text-xl font-bold text-cream mb-4">No Active Room</h3>
                    <p className="text-sand mb-6 max-w-lg mx-auto">
                      You haven't joined any learning rooms yet. Browse the upcoming rooms and join one,
                      or create your own room to start collaborating with other students.
                    </p>
                    <Button 
                      onClick={() => setSelectedTab('upcoming')}
                      className="bg-forest hover:bg-forest-light text-cream"
                    >
                      Browse Rooms
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {/* Create new room */}
            {selectedTab === 'create' && (
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-bold text-cream mb-6">Create a New Learning Room</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-cream mb-2">
                      Select Course
                    </label>
                    <select className="w-full rounded-md bg-offblack-light border border-forest/20 px-4 py-2 text-cream">
                      <option>Machine Learning Fundamentals</option>
                      <option>Web Development Bootcamp</option>
                      <option>UX/UI Design Principles</option>
                      <option>Data Science and Analytics</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-cream mb-2">
                      Topic / Study Focus
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g., Supervised Learning Algorithms" 
                      className="w-full rounded-md bg-offblack-light border border-forest/20 px-4 py-2 text-cream"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-cream mb-2">
                        Date & Time
                      </label>
                      <input 
                        type="datetime-local" 
                        className="w-full rounded-md bg-offblack-light border border-forest/20 px-4 py-2 text-cream"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-cream mb-2">
                        Duration (minutes)
                      </label>
                      <input 
                        type="number" 
                        placeholder="60" 
                        min="15" 
                        max="180" 
                        className="w-full rounded-md bg-offblack-light border border-forest/20 px-4 py-2 text-cream"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-cream mb-2">
                        Maximum Participants
                      </label>
                      <input 
                        type="number" 
                        placeholder="10" 
                        min="2" 
                        max="20" 
                        className="w-full rounded-md bg-offblack-light border border-forest/20 px-4 py-2 text-cream"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-cream mb-2">
                        Level
                      </label>
                      <select className="w-full rounded-md bg-offblack-light border border-forest/20 px-4 py-2 text-cream">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>All Levels</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-forest rounded" />
                      <span className="ml-2 text-sm text-cream">Enable AI moderation</span>
                    </label>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => setSelectedTab('upcoming')}
                      variant="outline" 
                      className="mr-4 border-forest/20 text-cream hover:bg-forest/10"
                    >
                      Cancel
                    </Button>
                    <Button className="bg-forest hover:bg-forest-light text-cream">
                      Create Room
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LearningRoom;
