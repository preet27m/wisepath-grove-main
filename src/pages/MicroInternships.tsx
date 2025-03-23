
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Briefcase, Calendar, ChevronRight, Clock, Search, Star, User } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import { Button } from '@/components/ui/button';

// Mock data for micro-internships
const mockInternships = [
  {
    id: '1',
    title: 'Fix JavaScript Bug in E-Commerce Cart',
    company: 'ShopWave',
    companyLogo: 'https://images.unsplash.com/photo-1612810806695-30f7a8258391?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    difficulty: 'Intermediate',
    duration: '1-2 days',
    compensation: '$50',
    skills: ['JavaScript', 'React', 'Debugging'],
    description: 'Help fix a bug in our shopping cart where items sometimes disappear when quantity is updated. You\'ll work with our existing codebase to identify and patch the issue.',
    requirements: ['Experience with React and state management', 'Familiarity with e-commerce concepts', 'Strong debugging skills'],
    applicationDeadline: '2023-08-15',
  },
  {
    id: '2',
    title: 'Design Mobile App Onboarding Screens',
    company: 'FitTrack',
    companyLogo: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    difficulty: 'Beginner',
    duration: '3-4 days',
    compensation: '$75',
    skills: ['UI Design', 'Figma', 'User Experience'],
    description: 'Create engaging onboarding screens for our fitness tracking mobile app. You\'ll design 4-5 screens that explain key features and encourage user sign-ups.',
    requirements: ['Basic UI/UX design skills', 'Experience with Figma', 'Understanding of mobile design principles'],
    applicationDeadline: '2023-08-10',
  },
  {
    id: '3',
    title: 'Implement REST API Endpoint',
    company: 'TechCloud',
    companyLogo: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    difficulty: 'Advanced',
    duration: '1 week',
    compensation: '$120',
    skills: ['Node.js', 'Express', 'MongoDB', 'API Design'],
    description: 'Design and implement a new REST API endpoint for our cloud storage service that allows users to share files with expiring links. You\'ll work with our backend team to integrate this feature.',
    requirements: ['Strong Node.js and Express experience', 'MongoDB knowledge', 'Understanding of API security best practices'],
    applicationDeadline: '2023-08-20',
  },
  {
    id: '4',
    title: 'Create Data Visualization Dashboard',
    company: 'AnalyticsPro',
    companyLogo: 'https://images.unsplash.com/photo-1611162616305-c69b3710ff51?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    difficulty: 'Intermediate',
    duration: '5-7 days',
    compensation: '$100',
    skills: ['D3.js', 'SVG', 'Data Visualization', 'JavaScript'],
    description: 'Build an interactive dashboard to visualize user engagement metrics. You\'ll create charts and graphs that display key performance indicators from our analytics API.',
    requirements: ['Experience with D3.js or similar visualization libraries', 'Strong JavaScript skills', 'Understanding of data analysis concepts'],
    applicationDeadline: '2023-08-25',
  },
  {
    id: '5',
    title: 'Develop WordPress Plugin for Newsletter Integration',
    company: 'ContentHub',
    companyLogo: 'https://images.unsplash.com/photo-1611162618479-ee4528c31dfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    difficulty: 'Beginner',
    duration: '3 days',
    compensation: '$60',
    skills: ['PHP', 'WordPress', 'Plugin Development'],
    description: 'Create a simple WordPress plugin that integrates with popular email marketing services to display newsletter signup forms with custom styling options.',
    requirements: ['Basic PHP knowledge', 'WordPress development experience', 'Understanding of APIs and third-party integrations'],
    applicationDeadline: '2023-08-18',
  },
  {
    id: '6',
    title: 'Machine Learning Model Optimization',
    company: 'AILabs',
    companyLogo: 'https://images.unsplash.com/photo-1611162616763-3ea7c41af1f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    difficulty: 'Advanced',
    duration: '1-2 weeks',
    compensation: '$200',
    skills: ['Python', 'TensorFlow', 'Machine Learning', 'Optimization'],
    description: 'Optimize an existing machine learning model for image classification to improve accuracy and reduce inference time. You\'ll work with our data science team to implement and test your improvements.',
    requirements: ['Strong Python skills', 'Experience with TensorFlow or PyTorch', 'Understanding of CNN architectures and optimization techniques'],
    applicationDeadline: '2023-08-30',
  },
];

// Filters for the internships
const difficultyFilters = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const durationFilters = ['Any Duration', '1-3 days', '4-7 days', '1-2 weeks'];
const skillFilters = [
  'JavaScript', 'React', 'Python', 'Machine Learning', 
  'UI Design', 'API Design', 'Node.js', 'WordPress', 'PHP'
];

const MicroInternships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [selectedDuration, setSelectedDuration] = useState('Any Duration');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [internships, setInternships] = useState(mockInternships);
  const [selectedInternship, setSelectedInternship] = useState<string | null>(null);

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const filteredInternships = mockInternships.filter(internship => {
    // Search term filter
    const matchesSearchTerm = searchTerm === '' || 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === 'All Levels' || 
      internship.difficulty === selectedDifficulty;
    
    // Duration filter (simplified)
    const matchesDuration = selectedDuration === 'Any Duration' || 
      (selectedDuration === '1-3 days' && internship.duration.includes('1-2 days')) ||
      (selectedDuration === '4-7 days' && internship.duration.includes('3-4 days')) ||
      (selectedDuration === '1-2 weeks' && internship.duration.includes('week'));
    
    // Skills filter
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.some(skill => internship.skills.includes(skill));
    
    return matchesSearchTerm && matchesDifficulty && matchesDuration && matchesSkills;
  });

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
            <h1 className="text-3xl font-bold text-cream mb-3">Micro-Internships</h1>
            <p className="text-cream/80 max-w-2xl">
              Apply your skills to real-world projects from companies and non-profits.
              These short-term opportunities help you gain practical experience while building your portfolio.
            </p>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-xl p-6 sticky top-20">
                <h2 className="font-bold text-lg text-cream mb-6">Filters</h2>
                
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-cream mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search projects..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-md bg-offblack-light border border-forest/20 pl-10 pr-4 py-2 text-cream placeholder-cream/50 focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cream/50" />
                  </div>
                </div>
                
                {/* Difficulty filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-cream mb-2">
                    Difficulty Level
                  </label>
                  <div className="space-y-2">
                    {difficultyFilters.map((difficulty) => (
                      <label key={difficulty} className="flex items-center">
                        <input 
                          type="radio" 
                          name="difficulty" 
                          checked={selectedDifficulty === difficulty}
                          onChange={() => setSelectedDifficulty(difficulty)}
                          className="h-4 w-4 text-forest rounded"
                        />
                        <span className="ml-2 text-sm text-cream">{difficulty}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Duration filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-cream mb-2">
                    Duration
                  </label>
                  <div className="space-y-2">
                    {durationFilters.map((duration) => (
                      <label key={duration} className="flex items-center">
                        <input 
                          type="radio" 
                          name="duration" 
                          checked={selectedDuration === duration}
                          onChange={() => setSelectedDuration(duration)}
                          className="h-4 w-4 text-forest rounded"
                        />
                        <span className="ml-2 text-sm text-cream">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Skills filter */}
                <div>
                  <label className="block text-sm font-medium text-cream mb-2">
                    Skills
                  </label>
                  <div className="space-y-2">
                    {skillFilters.map((skill) => (
                      <label key={skill} className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={selectedSkills.includes(skill)}
                          onChange={() => handleSkillToggle(skill)}
                          className="h-4 w-4 text-forest rounded"
                        />
                        <span className="ml-2 text-sm text-cream">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Clear filters button */}
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDifficulty('All Levels');
                    setSelectedDuration('Any Duration');
                    setSelectedSkills([]);
                  }}
                  className="mt-6 w-full py-2 text-sm text-forest hover:text-forest-light transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </div>
            
            {/* Internship listings */}
            <div className="lg:col-span-3">
              {selectedInternship ? (
                // Selected internship details
                (() => {
                  const internship = mockInternships.find(i => i.id === selectedInternship);
                  if (!internship) return null;
                  
                  return (
                    <div className="glass-card rounded-xl p-6">
                      <button 
                        onClick={() => setSelectedInternship(null)}
                        className="flex items-center text-cream hover:text-sand mb-6 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        <span>Back to listings</span>
                      </button>
                      
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-xl font-bold text-cream mb-2">{internship.title}</h2>
                          <div className="flex items-center">
                            <img 
                              src={internship.companyLogo} 
                              alt={internship.company} 
                              className="h-6 w-6 rounded-full mr-2"
                            />
                            <span className="text-sm text-sand">{internship.company}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-forest text-cream text-xs px-3 py-1 rounded-full mb-2">
                            {internship.difficulty}
                          </div>
                          <div className="text-xl font-bold text-forest">
                            {internship.compensation}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-forest" />
                          <span className="text-sm text-cream">{internship.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-forest" />
                          <span className="text-sm text-cream">Remote work</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-forest" />
                          <span className="text-sm text-cream">Apply by: {new Date(internship.applicationDeadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="font-bold text-forest mb-3">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {internship.skills.map((skill) => (
                            <span 
                              key={skill} 
                              className="bg-forest/10 text-sand text-xs px-3 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="font-bold text-forest mb-3">Description</h3>
                        <p className="text-cream/90 mb-4">{internship.description}</p>
                        
                        <h3 className="font-bold text-forest mb-3">Requirements</h3>
                        <ul className="list-disc list-inside space-y-2 text-cream/90">
                          {internship.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="font-bold text-forest mb-3">What You'll Learn</h3>
                        <ul className="list-disc list-inside space-y-2 text-cream/90">
                          <li>Practical experience solving real-world problems</li>
                          <li>Working with industry standard tools and practices</li>
                          <li>Collaboration and communication with a professional team</li>
                          <li>Feedback from experienced developers</li>
                        </ul>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="font-bold text-forest mb-3">About {internship.company}</h3>
                        <div className="flex items-start">
                          <img 
                            src={internship.companyLogo} 
                            alt={internship.company} 
                            className="h-12 w-12 rounded-full mr-4"
                          />
                          <div>
                            <p className="text-cream/90 mb-3">
                              {internship.company} is a leading company in the technology sector,
                              focusing on innovative solutions for businesses and consumers.
                              Working with them provides valuable industry experience.
                            </p>
                            <div className="flex items-center">
                              <div className="flex items-center mr-4">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="text-sm text-cream">4.8/5 company rating</span>
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-forest mr-1" />
                                <span className="text-sm text-cream">50+ completed internships</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button className="bg-forest hover:bg-forest-light text-cream">
                          Apply for this Micro-Internship
                        </Button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                // Internship listings
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-lg text-cream">
                      {filteredInternships.length} opportunities available
                    </h2>
                    <div className="text-sm text-cream/70">
                      Sorted by: <span className="text-forest">Recommended</span>
                    </div>
                  </div>
                  
                  {filteredInternships.length > 0 ? (
                    <div className="space-y-6">
                      {filteredInternships.map((internship) => (
                        <div 
                          key={internship.id} 
                          className="glass-card rounded-xl p-6 hover:border-forest/30 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div className="flex items-center mb-4 md:mb-0">
                              <img 
                                src={internship.companyLogo} 
                                alt={internship.company} 
                                className="h-10 w-10 rounded-full mr-4"
                              />
                              <div>
                                <h3 className="font-bold text-lg text-cream mb-1">{internship.title}</h3>
                                <p className="text-sm text-sand">{internship.company}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="bg-forest text-cream text-xs px-3 py-1 rounded-full mr-3">
                                {internship.difficulty}
                              </div>
                              <div className="text-lg font-bold text-forest">
                                {internship.compensation}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-forest" />
                              <span className="text-sm text-cream">{internship.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-forest" />
                              <span className="text-sm text-cream">Apply by: {new Date(internship.applicationDeadline).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-2 text-forest" />
                              <span className="text-sm text-cream">Remote work</span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {internship.skills.map((skill) => (
                                <span 
                                  key={skill} 
                                  className="bg-forest/10 text-sand text-xs px-3 py-1 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-cream/80 mb-4 line-clamp-2">{internship.description}</p>
                          
                          <div className="flex justify-between items-center">
                            <button 
                              onClick={() => setSelectedInternship(internship.id)}
                              className="text-forest hover:text-forest-light text-sm font-medium flex items-center"
                            >
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                            
                            <Button 
                              className="bg-forest hover:bg-forest-light text-cream text-xs h-9 px-4"
                              onClick={() => setSelectedInternship(internship.id)}
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {/* Pagination */}
                      <div className="flex justify-center mt-8">
                        <button className="h-10 w-10 rounded-l-md flex items-center justify-center bg-offblack-light text-cream border border-forest/20">
                          <ArrowLeft className="h-4 w-4" />
                        </button>
                        <button className="h-10 w-10 flex items-center justify-center bg-forest text-cream">1</button>
                        <button className="h-10 w-10 flex items-center justify-center bg-offblack-light text-cream border-t border-b border-forest/20">2</button>
                        <button className="h-10 w-10 flex items-center justify-center bg-offblack-light text-cream border-t border-b border-forest/20">3</button>
                        <button className="h-10 w-10 rounded-r-md flex items-center justify-center bg-offblack-light text-cream border border-forest/20">
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card rounded-xl p-10 text-center">
                      <h3 className="text-xl font-bold text-cream mb-3">No results found</h3>
                      <p className="text-sand mb-6">
                        We couldn't find any micro-internships matching your filters.
                        Try adjusting your search criteria.
                      </p>
                      <Button 
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedDifficulty('All Levels');
                          setSelectedDuration('Any Duration');
                          setSelectedSkills([]);
                        }}
                        className="bg-forest hover:bg-forest-light text-cream"
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MicroInternships;
