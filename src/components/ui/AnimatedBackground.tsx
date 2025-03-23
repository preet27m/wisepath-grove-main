import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const colors = {
  light: [
    'from-blue-100/30 to-purple-100/30',
    'from-green-100/30 to-blue-100/30',
    'from-yellow-100/30 to-orange-100/30',
    'from-pink-100/30 to-purple-100/30',
    'from-blue-100/30 to-orange-100/30',
  ],
  dark: [
    'from-pastel-blue to-pastel-purple',
    'from-pastel-green to-pastel-blue',
    'from-pastel-yellow to-pastel-orange',
    'from-pastel-pink to-pastel-purple',
    'from-pastel-blue to-pastel-peach',
  ]
};

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });

        // Create particles
        const particleCount = Math.min(15, Math.floor((width * height) / 40000));
        particlesRef.current = Array.from({ length: particleCount }).map(() => createParticle(width, height));
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Listen for theme changes and recreate particles
    const handleThemeChange = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        particlesRef.current = Array.from({ length: particlesRef.current.length }).map(() => 
          createParticle(width, height)
        );
      }
    };
    
    window.addEventListener('themeChanged', handleThemeChange);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('themeChanged', handleThemeChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const animate = () => {
      updateParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        setMousePosition({ 
          x: e.clientX - left, 
          y: e.clientY - top 
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Create a single particle
  const createParticle = (width: number, height: number): Particle => {
    // Check if we're in dark mode
    const isDarkMode = document.documentElement.classList.contains('dark');
    const colorOptions = isDarkMode ? colors.dark : colors.light;
    
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 60 + 40,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
    };
  };

  // Update all particles
  const updateParticles = () => {
    particlesRef.current = particlesRef.current.map(particle => {
      // Basic movement
      let newX = particle.x + particle.speedX;
      let newY = particle.y + particle.speedY;

      // Mouse influence (subtle attraction)
      const dx = mousePosition.x - particle.x;
      const dy = mousePosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 300) {
        const force = 0.5 / distance;
        newX += dx * force;
        newY += dy * force;
      }

      // Boundary checks
      if (newX < -particle.size) newX = dimensions.width + particle.size;
      if (newX > dimensions.width + particle.size) newX = -particle.size;
      if (newY < -particle.size) newY = dimensions.height + particle.size;
      if (newY > dimensions.height + particle.size) newY = -particle.size;

      return {
        ...particle,
        x: newX,
        y: newY,
      };
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {particlesRef.current.map((particle, index) => (
        <div
          key={index}
          className={`particle bg-gradient-to-r ${particle.color}`}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `translate(-50%, -50%)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
