import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { CheckCircle, Users, GraduationCap, BookOpen, Award, ChevronRight, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

const About = () => {
  const stats = [
    { count: '500K+', label: 'Active Learners', icon: <Users className="h-8 w-8 text-primary" /> },
    { count: '1000+', label: 'Courses Available', icon: <BookOpen className="h-8 w-8 text-primary" /> },
    { count: '250+', label: 'Expert Instructors', icon: <GraduationCap className="h-8 w-8 text-primary" /> },
    { count: '98%', label: 'Success Rate', icon: <Award className="h-8 w-8 text-primary" /> },
  ];

  const team = [
    {
      name: 'Dr. Maya Patel',
      role: 'Founder & CEO',
      bio: 'Former professor with 15 years of experience in educational technology and a vision to transform learning for everyone.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'AI researcher and full-stack developer with a passion for creating intuitive educational experiences powered by technology.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Content',
      bio: 'Education expert who collaborates with top instructors worldwide to bring the highest quality learning materials to our platform.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    },
    {
      name: 'David Rodriguez',
      role: 'Head of Community',
      bio: 'Former teacher who now leads our community initiatives, ensuring every learner feels supported throughout their journey.',
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 via-white to-white dark:from-primary/10 dark:via-gray-900 dark:to-gray-900">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">We're on a Mission to Transform Education</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
              At CurioCity, we believe that quality education should be accessible to everyone, 
              everywhere. We're building the future of learning through technology, community, and innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="neo-btn">
                Join Our Community
              </button>
              <button className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                <span>View Courses</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                CurioCity was founded in 2018 with a simple idea: to make high-quality education accessible to everyone, regardless of their location or background. What started as a small collection of online courses has grown into a global learning ecosystem.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our founder, Dr. Maya Patel, left her position as a university professor to create a platform that would break down traditional barriers to education. She envisioned a place where curious minds could connect with expert instructors and learn through engaging, interactive content.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Today, CurioCity serves learners in over 150 countries, offering courses in everything from coding and data science to creative writing and personal development. We're proud to be part of our students' learning journeys and remain committed to innovation in education.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80" 
                alt="CurioCity team collaborating" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.count}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-400">
              At the heart of everything we do are our core values. These principles guide our decisions,
              shape our culture, and drive our mission forward.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Inclusive Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe that education is a right, not a privilege. We design our platform and content to be accessible to learners of all backgrounds and abilities.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Quality Content</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We never compromise on the quality of our educational content. Every course undergoes a rigorous review process to ensure it meets our high standards.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community Focus</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learning is social. We foster a supportive community where students can connect, collaborate, and learn from each other as well as their instructors.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-400">
              The passionate individuals behind CurioCity are educators, technologists, and lifelong learners
              committed to revolutionizing education.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md">
                <div className="h-64 relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Have questions about CurioCity? We'd love to hear from you. Contact us using any of the methods below.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">hello@curiocity.edu</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Learning Lane<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-gray-700 dark:text-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-gray-700 dark:text-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-gray-700 dark:text-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Message subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-gray-700 dark:text-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="neo-btn w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About; 