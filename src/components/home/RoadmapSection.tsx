
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, Check, Star, UserPlus, LucideIcon, Code, Figma, Database, LineChart, Film, Book, Cpu } from 'lucide-react';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  skills: string[];
  icon: LucideIcon;
  completed?: boolean;
}

interface Roadmap {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  steps: RoadmapStep[];
  students: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  ratings: number;
  reviewCount: number;
  color: string;
}

const roadmaps: Roadmap[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    slug: 'full-stack-web-development',
    description: 'Master front-end and back-end technologies to build complete web applications.',
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
    students: 45230,
    difficulty: 'Intermediate',
    ratings: 4.8,
    reviewCount: 3254,
    steps: [
      {
        id: 's1',
        title: 'HTML, CSS & JavaScript Fundamentals',
        description: 'Learn the core building blocks of modern web development.',
        duration: '4 weeks',
        level: 'Beginner',
        icon: Code,
        skills: ['HTML5', 'CSS3', 'JavaScript ES6+'],
        completed: true,
      },
      {
        id: 's2',
        title: 'Frontend Frameworks',
        description: 'Build interactive UIs with React.js and supporting libraries.',
        duration: '6 weeks',
        level: 'Intermediate',
        icon: Code,
        skills: ['React', 'Redux', 'Tailwind CSS'],
        completed: true,
      },
      {
        id: 's3',
        title: 'Backend Development with Node.js',
        description: 'Create fast, scalable server-side applications and APIs.',
        duration: '5 weeks',
        level: 'Intermediate',
        icon: Database,
        skills: ['Node.js', 'Express', 'RESTful APIs'],
      },
      {
        id: 's4',
        title: 'Database Design & Integration',
        description: 'Work with SQL and NoSQL databases for data persistence.',
        duration: '4 weeks',
        level: 'Intermediate',
        icon: Database,
        skills: ['MongoDB', 'PostgreSQL', 'Mongoose'],
      },
      {
        id: 's5',
        title: 'Full Stack Projects & Deployment',
        description: 'Build complete applications and deploy them to the cloud.',
        duration: '6 weeks',
        level: 'Advanced',
        icon: Code,
        skills: ['AWS', 'Docker', 'CI/CD'],
      },
    ],
  },
  {
    id: '2',
    title: 'UX/UI Design Professional',
    slug: 'uxui-design-professional',
    description: 'Become a professional designer capable of creating beautiful, user-friendly interfaces.',
    icon: Figma,
    color: 'from-purple-500 to-pink-500',
    students: 28450,
    difficulty: 'Beginner',
    ratings: 4.7,
    reviewCount: 1832,
    steps: [
      {
        id: 's1',
        title: 'Design Principles & Theory',
        description: 'Master fundamental principles of visual design and user experience.',
        duration: '3 weeks',
        level: 'Beginner',
        icon: Figma,
        skills: ['Color Theory', 'Typography', 'Layout'],
      },
      {
        id: 's2',
        title: 'User Research & Personas',
        description: 'Learn to conduct research and create user personas for targeted design.',
        duration: '4 weeks',
        level: 'Beginner',
        icon: UserPlus,
        skills: ['User Interviews', 'Personas', 'Journey Mapping'],
      },
      {
        id: 's3',
        title: 'Wireframing & Prototyping',
        description: 'Create wireframes and interactive prototypes for user testing.',
        duration: '5 weeks',
        level: 'Intermediate',
        icon: Figma,
        skills: ['Figma', 'Wireframing', 'Prototyping'],
      },
      {
        id: 's4',
        title: 'UI Design Systems',
        description: 'Build scalable design systems for consistent user experiences.',
        duration: '4 weeks',
        level: 'Intermediate',
        icon: Figma,
        skills: ['Design Systems', 'Component Libraries', 'Style Guides'],
      },
      {
        id: 's5',
        title: 'Portfolio Development',
        description: 'Develop a professional portfolio to showcase your design work.',
        duration: '4 weeks',
        level: 'Advanced',
        icon: Figma,
        skills: ['Portfolio', 'Case Studies', 'Presentation'],
      },
    ],
  },
  {
    id: '3',
    title: 'Data Science & AI',
    slug: 'data-science-ai',
    description: 'Develop expertise in data analysis, machine learning, and artificial intelligence.',
    icon: Cpu,
    color: 'from-green-500 to-teal-500',
    students: 32120,
    difficulty: 'Advanced',
    ratings: 4.9,
    reviewCount: 2354,
    steps: [
      {
        id: 's1',
        title: 'Python Programming & Data Structures',
        description: 'Build a strong foundation in Python for data science applications.',
        duration: '4 weeks',
        level: 'Beginner',
        icon: Code,
        skills: ['Python', 'NumPy', 'Pandas'],
      },
      {
        id: 's2',
        title: 'Data Analysis & Visualization',
        description: 'Learn to analyze and visualize data for insights and communication.',
        duration: '5 weeks',
        level: 'Intermediate',
        icon: LineChart,
        skills: ['Matplotlib', 'Seaborn', 'Tableau'],
      },
      {
        id: 's3',
        title: 'Machine Learning Fundamentals',
        description: 'Understand core ML algorithms and their applications.',
        duration: '6 weeks',
        level: 'Intermediate',
        icon: Cpu,
        skills: ['Scikit-learn', 'Regression', 'Classification'],
      },
      {
        id: 's4',
        title: 'Deep Learning & Neural Networks',
        description: 'Master neural network architectures and deep learning frameworks.',
        duration: '7 weeks',
        level: 'Advanced',
        icon: Cpu,
        skills: ['TensorFlow', 'PyTorch', 'CNN', 'RNN'],
      },
      {
        id: 's5',
        title: 'MLOps & Deployment',
        description: 'Deploy and maintain ML models in production environments.',
        duration: '5 weeks',
        level: 'Advanced',
        icon: Cpu,
        skills: ['Docker', 'Kubernetes', 'CI/CD for ML'],
      },
    ],
  },
];

const RoadmapSection = () => {
  const [activeRoadmap, setActiveRoadmap] = useState(roadmaps[0]);
  
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Career-focused <span className="text-gradient">Learning Paths</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Follow expert-curated learning paths personalized to your goals and skill level. 
            Our AI assistant adjusts your journey based on your progress.
          </p>
        </div>
        
        {/* Roadmaps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Roadmap selection */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Choose a learning path</h3>
            
            {roadmaps.map((roadmap) => (
              <button
                key={roadmap.id}
                onClick={() => setActiveRoadmap(roadmap)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-start ${
                  activeRoadmap.id === roadmap.id
                    ? 'glass-card shadow-md'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                }`}
              >
                <div className={`flex items-center justify-center rounded-full p-2.5 mr-4 bg-gradient-to-br ${roadmap.color}`}>
                  <roadmap.icon className="h-5 w-5 text-white" />
                </div>
                
                <div>
                  <h4 className="font-medium">{roadmap.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mt-1">
                    {roadmap.difficulty} · {roadmap.steps.length} modules
                  </p>
                </div>
              </button>
            ))}
            
            <div className="pt-4">
              <Link 
                to="/learning-paths" 
                className="inline-flex items-center text-primary hover:underline text-sm font-medium"
              >
                <span>View all learning paths</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          
          {/* Roadmap details */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 sm:p-8 rounded-2xl animate-fade-in">
              {/* Roadmap header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${activeRoadmap.color} mr-4`}>
                      <activeRoadmap.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold">{activeRoadmap.title}</h3>
                  </div>
                  
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {activeRoadmap.description}
                  </p>
                </div>
                
                <Link
                  to={`/learning-paths/${activeRoadmap.slug}`}
                  className="neo-btn mt-4 sm:mt-0 text-sm"
                >
                  <span>Explore Path</span>
                </Link>
              </div>
              
              {/* Roadmap meta info */}
              <div className="flex flex-wrap gap-4 mb-8 text-sm">
                <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center">
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span>{activeRoadmap.ratings}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    ({activeRoadmap.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                  <span className="font-medium">{activeRoadmap.difficulty}</span>
                </div>
                
                <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center">
                  <UserPlus className="h-3.5 w-3.5 mr-1" />
                  <span>{activeRoadmap.students.toLocaleString()} students</span>
                </div>
              </div>
              
              {/* Steps timeline */}
              <div className="space-y-4">
                {activeRoadmap.steps.map((step, index) => (
                  <div key={step.id} className="relative">
                    {/* Timeline connector */}
                    {index < activeRoadmap.steps.length - 1 && (
                      <div 
                        className={`absolute left-6 top-12 bottom-0 w-0.5 ${
                          step.completed ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    )}
                    
                    <div className="flex">
                      {/* Timeline marker */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                        step.completed 
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        {step.completed ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      
                      {/* Step content */}
                      <div className="ml-6">
                        <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="text-lg font-medium mb-1">{step.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {step.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {step.skills.map((skill) => (
                              <span 
                                key={skill}
                                className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              {step.duration} · {step.level}
                            </span>
                            
                            <Link
                              to={`/learning-paths/${activeRoadmap.slug}/${step.id}`}
                              className="inline-flex items-center text-primary hover:underline text-sm"
                            >
                              <span>Explore module</span>
                              <ExternalLink className="h-3.5 w-3.5 ml-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
