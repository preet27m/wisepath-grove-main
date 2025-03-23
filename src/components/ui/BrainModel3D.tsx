import React, { useState, useEffect } from 'react';

// Simplified BrainModel3D component that doesn't rely on Three.js
const BrainModel3D = () => {
  const [rotation, setRotation] = useState(0);
  
  // Simple animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Basic animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 animate-pulse"></div>
      
      {/* Main container */}
      <div 
        className="w-64 h-64 rounded-full bg-gradient-to-br from-forest-light to-forest flex flex-col items-center justify-center transform-gpu"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="text-3xl font-bold text-white mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" 
             style={{ 
               textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ff, 0 0 20px #0ff, 0 0 25px #0ff',
               color: '#fff'
             }}>
          CurioCity
        </div>
      </div>
      
      {/* Floating bubbles */}
      {['Learn', 'Explore', 'AI', 'Create', 'Discover'].map((word, i) => (
        <div 
          key={word}
          className="absolute text-sm font-medium bg-white/90 dark:bg-forest-light/90 rounded-full px-3 py-1 shadow-md animate-float"
          style={{
            top: `${20 + i * 15}%`,
            left: `${(i % 2 === 0 ? 15 : 75) + Math.sin(i) * 10}%`,
            animationDelay: `${i * 0.5}s`
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
};

export default BrainModel3D; 