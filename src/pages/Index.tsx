import { useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/home/Hero';
import FeaturedCourses from '../components/home/FeaturedCourses';
import Testimonials from '../components/home/Testimonials';
import RoadmapSection from '../components/home/RoadmapSection';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <Hero />
      <FeaturedCourses />
      <Testimonials />
      <RoadmapSection />
    </MainLayout>
  );
};

export default Index;
