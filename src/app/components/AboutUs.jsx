"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Montserrat } from 'next/font/google'

// Font setup to match Hero
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat', 
});

export default function AboutUs() {
  return (
    <section className={`${montserrat.variable} py-16 sm:py-20 lg:py-24 bg-[#060608] relative overflow-hidden`} id="about">
      {/* Background Elements to Match Hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-2/5 h-2/5 bg-red-800/10 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-rose-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-1/4 h-1/4 bg-blue-600/3 blur-[120px] rounded-full"></div>
        
        {/* Tech grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.02]"></div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/3 via-transparent to-rose-600/3"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#060608]/20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Content Section */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Section Badge */}
            <div className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-red-700/10 to-rose-600/10 border border-red-700/20 backdrop-blur-sm">
              <span className="text-red-400 text-xs sm:text-sm font-medium">Our Story</span>
            </div>

            <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 text-white tracking-tight leading-tight">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-700">
                Team Techno
              </span>
            </h2>
            
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed">
                Founded in 2018, Team Techno is an award-winning robotics team focused on pushing the boundaries of innovation. 
                Our team of talented engineers, programmers, and designers collaborate to create cutting-edge robotic solutions 
                for competitions around the world.
              </p>
              <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed">
                With multiple regional championships under our belt, we combine technical expertise with 
                creative problem-solving to design robots that excel in performance, reliability, and innovation.
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { value: "2018", label: "Founded" },
                { value: "50+", label: "Projects" },
                { value: "12", label: "Championships" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm hover:border-red-500/30 hover:bg-gradient-to-b hover:from-red-500/5 hover:to-transparent transition-all flex-shrink-0"
                >
                  <div className="flex flex-col">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-gray-400 text-xs uppercase tracking-wider mt-1">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
          
          {/* Image Section */}
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              {/* Decorative background elements */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-2xl bg-gradient-to-br from-red-600/10 via-rose-500/10 to-purple-500/5 blur-xl sm:blur-2xl"></div>
              
              {/* Main image container */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-red-600/15 to-rose-600/10 backdrop-blur-sm border border-white/10">
                {/* Tech overlay pattern */}
                <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] bg-cover opacity-5"></div>
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-red-500/10"></div>
                
                {/* Image */}
                <Image 
                  src="/robot-showcase.jpg" 
                  alt="Team Techno Robot" 
                  fill 
                  className="object-cover rounded-2xl drop-shadow-[0_10px_30px_rgba(220,38,38,0.25)]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentElement.innerHTML = `
                      <div class="flex items-center justify-center h-full w-full border-2 border-dashed border-red-500/30 rounded-2xl bg-black/50 p-8">
                        <div class="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-red-500/50 mx-auto mb-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.60a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          </svg>
                          <p class="text-red-400 text-lg font-medium">Robot Showcase Image</p>
                          <p class="text-gray-400 text-sm mt-2">Image not found: /robot-showcase.jpg</p>
                        </div>
                      </div>
                    `;
                  }}
                />
                
                {/* Floating tech elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="hidden sm:block"
                >
                  <div className="absolute top-4 right-6 w-3 h-3 bg-red-500/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-4 w-2 h-2 bg-rose-400/30 rounded-full animate-ping-slow"></div>
                  <div className="absolute top-1/3 left-2 w-4 h-0.5 bg-red-500/30 rounded-full animate-pulse-slow"></div>
                  <div className="absolute bottom-1/4 right-2 w-0.5 h-4 bg-rose-500/30 rounded-full animate-pulse-slow"></div>
                </motion.div>
              </div>

              {/* Additional floating cards */}
              <motion.div 
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 p-4 sm:p-6 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <span className="text-lg sm:text-xl font-bold text-white">Excellence</span>
                  <p className="text-xs text-gray-400 mt-1">In Innovation</p>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 p-4 sm:p-6 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <span className="text-lg sm:text-xl font-bold text-white">Award</span>
                  <p className="text-xs text-gray-400 mt-1">Winning</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}