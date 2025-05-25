"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat', 
});

export default function AboutUs() {
  return (
    <section className={`${montserrat.variable} py-16 sm:py-20 lg:py-24 bg-[#060608] relative overflow-hidden`} id="about">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-2/5 h-2/5 bg-red-800/10 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-rose-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-1/4 h-1/4 bg-blue-600/3 blur-[120px] rounded-full"></div>
        
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.02]"></div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/3 via-transparent to-rose-600/3"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#060608]/20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-red-700/10 to-rose-600/10 border border-red-700/20 backdrop-blur-sm">
              <span className="text-red-400 text-xs sm:text-sm font-medium">Our Story</span>
            </div>

            <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 text-white tracking-tight leading-tight">
              Meet{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-700">
                Team Techno
              </span>
            </h2>
            
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
              <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed">
                We are a passionate group of engineers, programmers, and designers who came together in 2018 
                with a shared vision: to push the boundaries of robotics innovation and inspire the next 
                generation of tech enthusiasts.
              </p>
              <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed">
                Our diverse team combines technical expertise with creative problem-solving, working 
                collaboratively to design and build cutting-edge robotic solutions that compete on 
                the global stage.
              </p>
              <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed">
                From conceptualization to competition, we believe in the power of teamwork, continuous 
                learning, and the relentless pursuit of technological excellence.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              {[
                { value: "2018", label: "Founded" },
                { value: "15", label: "Team Members" },
                { value: "50+", label: "Projects Built" },
                { value: "6", label: "Years Strong" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center px-3 sm:px-4 py-3 sm:py-4 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm hover:border-red-500/30 hover:bg-gradient-to-b hover:from-red-500/5 hover:to-transparent transition-all duration-300 flex-shrink-0"
                >
                  <div className="flex flex-col">
                    <span className="text-lg sm:text-xl font-bold text-white">{stat.value}</span>
                    <span className="text-gray-400 text-xs uppercase tracking-wider mt-1">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              <div className="absolute -inset-4 sm:-inset-6 rounded-2xl bg-gradient-to-br from-red-600/10 via-rose-500/10 to-purple-500/5 blur-xl sm:blur-2xl"></div>
              
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-red-600/10 to-rose-600/8 backdrop-blur-sm border border-white/10 group">
                <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-cover opacity-[0.03]"></div>
                
                <div className="absolute inset-0 rounded-2xl border border-red-500/20 group-hover:border-red-500/40 transition-colors duration-500"></div>
                
                <Image 
                  src="/team-photo.jpg" 
                  alt="Team Techno - Our Amazing Team" 
                  fill 
                  className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentElement.innerHTML = `
                      <div class="flex items-center justify-center h-full w-full border-2 border-dashed border-red-500/30 rounded-2xl bg-black/40 p-8">
                        <div class="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-red-500/60 mx-auto mb-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                          </svg>
                          <p class="text-red-400 text-lg font-medium mb-2">Team Photo</p>
                          <p class="text-gray-400 text-sm">Add your team photo: /team-photo.jpg</p>
                        </div>
                      </div>
                    `;
                  }}
                />
                
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-red-500/30 rounded-tl-lg"></div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-red-500/30 rounded-tr-lg"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-red-500/30 rounded-bl-lg"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-red-500/30 rounded-br-lg"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}