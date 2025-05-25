"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Montserrat } from 'next/font/google';

// Font setup
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat', 
});

export default function Hero({ subtitle }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const particlesRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (particlesRef.current) {
      const canvas = particlesRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Create particles with improved tech visuals
      const particles = [];
      const particleCount = window.innerWidth < 768 ? 60 : 120; // Reduced particles on mobile
      
      const colorPalette = [
        {r: 220, g: 38, b: 38, a: 0.15}, // Red-500 with lower opacity
        {r: 239, g: 68, b: 68, a: 0.12}, // Red-400 with lower opacity
        {r: 225, g: 29, b: 72, a: 0.15}, // Rose-600 with lower opacity
        {r: 244, g: 63, b: 94, a: 0.12}, // Rose-500 with lower opacity
        {r: 248, g: 113, b: 113, a: 0.08}, // Red-300 with lower opacity
        {r: 20, g: 184, b: 231, a: 0.08}, // Blue tech accent with low opacity
      ];

      for (let i = 0; i < particleCount; i++) {
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        const size = Math.random() * 2 + 0.5; // Smaller particles
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: size,
          originalRadius: size,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          speedX: Math.random() * 0.5 - 0.25, // Slightly faster movement
          speedY: Math.random() * 0.5 - 0.25, // Slightly faster movement
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03
        });
      }

      const drawParticles = () => {
        if (!canvas.parentElement) {
          cancelAnimationFrame(animationFrameId);
          return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw each particle
        particles.forEach(particle => {
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wrap around screen edges
          if (particle.x + particle.radius < 0) particle.x = canvas.width + particle.radius;
          if (particle.x - particle.radius > canvas.width) particle.x = -particle.radius;
          if (particle.y + particle.radius < 0) particle.y = canvas.height + particle.radius;
          if (particle.y - particle.radius > canvas.height) particle.y = -particle.radius;

          // Subtle pulsing effect
          particle.pulse += particle.pulseSpeed;
          particle.radius = particle.originalRadius + Math.sin(particle.pulse) * 0.5;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Maximum distance for connections
            const maxDistance = window.innerWidth < 768 ? 100 : 150; // Shorter connections on mobile
            
            if (distance < maxDistance) {
              let opacity = 0.08 * (1 - distance / maxDistance);
              
              ctx.strokeStyle = `rgba(${p1.r}, ${p1.g}, ${p1.b}, ${opacity})`;
              ctx.lineWidth = 0.6 * (1 - distance / maxDistance);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        animationFrameId = requestAnimationFrame(drawParticles);
      };

      drawParticles();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className={`${montserrat.variable} min-h-screen relative overflow-hidden bg-[#060608]`}
    >
      <canvas
        ref={particlesRef}
        className="absolute inset-0 w-full h-full z-0"
      />
      
      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-2/5 h-2/5 bg-red-800/15 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-rose-900/15 blur-[150px] rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 bg-blue-600/5 blur-[120px] rounded-full"></div>
        
        {/* Tech grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.03] z-0"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12 md:pb-16">
        <div className="flex flex-col-reverse items-center text-center space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8 lg:gap-16 md:items-center md:text-left">
          
          {/* Content - First on mobile, left on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="order-2 md:order-1 w-full max-w-2xl md:max-w-none"
          >
            <div className="inline-block mb-4 sm:mb-5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-red-700/10 to-rose-600/10 border border-red-700/20 backdrop-blur-sm">
              <span className="text-red-400 text-xs sm:text-sm font-medium">Innovation in Technology</span>
            </div>
            
            <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 text-white tracking-tight leading-tight">
              <span className="text-white">TEAM</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-700">
                TECHNO
              </span>
            </h1>
            
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-4 sm:mb-6 font-medium leading-tight">
              Advancing the Future Through Engineering Excellence
            </h2>
            
            <p className="text-sm sm:text-base text-gray-300/90 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
              {subtitle || "We push the boundaries of what's possible in robotics and technology. Our team combines precision engineering with cutting-edge artificial intelligence to solve tomorrow's challenges today."}
            </p>
            
            {/* Stats Section */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8 lg:mb-10">
              {[
                { value: "15+", label: "Competitions" },
                { value: "8", label: "Awards Won" },
                { value: "24/7", label: "Innovation" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm hover:border-red-500/30 hover:bg-gradient-to-b hover:from-red-500/5 hover:to-transparent transition-all flex-shrink-0"
                >
                  <div className="flex flex-col">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-gray-400 text-xs uppercase tracking-wider mt-1">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Buttons - Enhanced responsive design */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 sm:gap-4 max-w-md mx-auto md:mx-0">
            <motion.div 
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <a
                href="#projects"
                className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:shadow-lg hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2 text-sm sm:text-base flex-1 sm:flex-initial min-w-0"
              >
                <span>View Our Work</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
              
              <a
                href="#team"
                className="bg-white/5 border border-white/10 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white/10 transition-all text-sm sm:text-base flex-1 sm:flex-initial min-w-0 text-center"
              >
                Meet The Team
              </a>
            </motion.div>
            </div>
          </motion.div>
          
          {/* Hero Image - First on mobile (above text), right on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center order-1 md:order-2 w-full mb-8 md:mb-0"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square">
              {/* Enhanced decorative elements */}
              <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 rounded-full bg-gradient-to-br from-red-600/10 via-rose-500/10 to-purple-500/5 blur-xl sm:blur-2xl animate-pulse-slow"></div>
              
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/15 to-rose-600/10 blur-md"></div>
              
              {/* Tech circuit pattern behind image */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] bg-cover opacity-5"></div>
              </div>
              
              {/* Glowing rings - responsive sizing */}
              <div className="absolute inset-2 sm:inset-4 rounded-full border-4 sm:border-6 md:border-8 border-red-500/5 animate-spin-slow"></div>
              <div className="absolute inset-6 sm:inset-8 md:inset-10 rounded-full border-2 sm:border-3 md:border-4 border-red-500/10 animate-spin-slow-reverse"></div>
              
              {/* Hero image - properly sized and responsive */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="relative z-10 h-full w-full flex items-center justify-center p-4 sm:p-6 md:p-8"
              >
                <Image 
                  src="/hero1.png.png" 
                  alt="Team Techno" 
                  width={500}
                  height={500}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                  priority
                  className="z-10 relative drop-shadow-[0_10px_30px_rgba(220,38,38,0.25)]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentElement.innerHTML = `
                      <div class="flex items-center justify-center h-full w-full border-2 border-dashed border-red-500/30 rounded-xl bg-black/50 p-4 sm:p-6 md:p-8">
                        <div class="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 sm:w-16 sm:h-16 text-red-500/50 mx-auto mb-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          </svg>
                          <p class="text-red-400 text-sm">Image not found: /hero1.png.png</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              </motion.div>
              
              {/* Floating tech elements - responsive positioning */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="hidden sm:block"
              >
                <div className="absolute top-3 sm:top-5 right-6 sm:right-10 w-3 sm:w-4 h-3 sm:h-4 bg-red-500/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 sm:bottom-10 left-3 sm:left-5 w-2 sm:w-3 h-2 sm:h-3 bg-rose-400/30 rounded-full animate-ping-slow"></div>
                <div className="absolute top-1/3 left-0 w-4 sm:w-6 h-1 bg-red-500/30 rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1 sm:right-2 w-1 h-4 sm:h-6 bg-rose-500/30 rounded-full animate-pulse-slow"></div>
                <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-500/20 rounded-full animate-ping-slow delay-200"></div>
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-red-400/20 rounded-full animate-ping-slow delay-300"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}