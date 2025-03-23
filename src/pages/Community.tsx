import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import RightSidebar from '../components/layout/RightSidebar';
import Cursor from '../components/ui/Cursor';
import AIChat from '../components/ui/AIChat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users, Linkedin, Instagram, Globe, Facebook, Twitter, MessageSquare, Calendar, MapPin } from 'lucide-react';

const Community = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const localEvents = [
    {
      id: 1,
      title: 'Machine Learning Meetup',
      date: '2023-12-10T18:00:00',
      location: 'Tech Hub, San Francisco',
      attendees: 42,
      imageUrl: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      date: '2023-12-15T10:00:00',
      location: 'Creative Space, New York',
      attendees: 28,
      imageUrl: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Data Science Conference',
      date: '2023-12-20T09:00:00',
      location: 'University Center, Boston',
      attendees: 114,
      imageUrl: '/placeholder.svg'
    }
  ];

  const discussionGroups = [
    {
      id: 1,
      name: 'JavaScript Developers',
      members: 1245,
      topics: 89,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'UX/UI Design Enthusiasts',
      members: 876,
      topics: 54,
      lastActive: '5 hours ago'
    },
    {
      id: 3,
      name: 'Data Science & AI',
      members: 2134,
      topics: 127,
      lastActive: '1 hour ago'
    },
    {
      id: 4,
      name: 'Full Stack Development',
      members: 1567,
      topics: 98,
      lastActive: '3 hours ago'
    }
  ];

  return (
    <div className="min-h-screen flex bg-offblack dark:bg-offblack text-cream dark:text-cream">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-64">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-gradient">Community</h1>
          
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search communities, events, or topics..."
                className="pl-10 pr-4 py-2 w-full bg-offblack-light dark:bg-offblack-light border-forest/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="local" className="w-full">
            <TabsList className="mb-6 w-full sm:w-auto justify-start overflow-auto">
              <TabsTrigger value="local">Local Community</TabsTrigger>
              <TabsTrigger value="discussions">Discussion Groups</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
            </TabsList>
            
            <TabsContent value="local" className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Upcoming Local Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localEvents.map((event) => (
                  <Card key={event.id} className="glass-card overflow-hidden hover:shadow-forest/20 hover:shadow-lg transition-all duration-300">
                    <div className="h-40 bg-forest/20 relative">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover opacity-70"
                      />
                    </div>
                    
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription className="flex items-center text-cream/70">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString(undefined, { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center mb-3 text-sm text-cream/70">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      
                      <div className="flex items-center text-sm text-cream/70">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees} people attending
                      </div>
                      
                      <Button className="w-full mt-4 bg-forest hover:bg-forest-light">
                        Join Event
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="discussions" className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Discussion Groups</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {discussionGroups.map((group) => (
                  <Card key={group.id} className="glass-card overflow-hidden hover:shadow-forest/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
                          <div className="flex flex-wrap gap-2 text-xs text-cream/70">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {group.members} members
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {group.topics} topics
                            </span>
                            <span>Active {group.lastActive}</span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-forest hover:bg-forest-light">
                          Join
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="outline" className="border-forest text-forest hover:bg-forest/10">
                  View All Groups
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="social" className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Connect on Social Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SocialCard 
                  title="LinkedIn Community" 
                  description="Connect with professionals and expand your network" 
                  icon={<Linkedin className="h-10 w-10 text-[#0077B5]" />}
                  color="#0077B5"
                  link="https://linkedin.com/groups/CurioCity"
                />
                
                <SocialCard 
                  title="Instagram" 
                  description="Follow our visual journey and stay inspired" 
                  icon={<Instagram className="h-10 w-10 text-[#E1306C]" />} 
                  color="#E1306C"
                  link="https://instagram.com/CurioCity"
                />
                
                <SocialCard 
                  title="Facebook Group" 
                  description="Join our community discussions and events" 
                  icon={<Facebook className="h-10 w-10 text-[#1877F2]" />} 
                  color="#1877F2"
                  link="https://facebook.com/groups/CurioCity"
                />
                
                <SocialCard 
                  title="Twitter/X" 
                  description="Follow for updates, news and quick tips" 
                  icon={<Twitter className="h-10 w-10 text-[#1DA1F2]" />} 
                  color="#1DA1F2"
                  link="https://twitter.com/CurioCity"
                />
                
                <SocialCard 
                  title="Online Forum" 
                  description="Discuss topics in-depth with our global community" 
                  icon={<Globe className="h-10 w-10 text-[#6366F1]" />} 
                  color="#6366F1"
                  link="https://forum.CurioCity.com"
                />
                
                <SocialCard 
                  title="Community Chat" 
                  description="Real-time discussions with learners worldwide" 
                  icon={<MessageSquare className="h-10 w-10 text-[#10B981]" />} 
                  color="#10B981"
                  link="https://chat.CurioCity.com"
                />
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
        <RightSidebar />
        <Cursor />
        <AIChat />
      </div>
    </div>
  );
};

interface SocialCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

const SocialCard = ({ title, description, icon, color, link }: SocialCardProps) => {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <Card 
        className="glass-card overflow-hidden hover:shadow-md transition-all duration-300 h-full"
        style={{ borderColor: `${color}30` }}
      >
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="mb-4">{icon}</div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-cream/70">{description}</p>
          <Button 
            variant="outline" 
            className="mt-4 w-full" 
            style={{ borderColor: `${color}50`, color: `${color}CC` }}
          >
            Connect
          </Button>
        </CardContent>
      </Card>
    </a>
  );
};

export default Community;
