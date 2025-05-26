"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaTrophy, FaMedal, FaAward, FaRobot } from 'react-icons/fa';

const achievements = [
  {
    year: '2024',
    competition: 'World Robotics Championship',
    achievement: 'Finalist',
    description: 'Reached the finals with our autonomous navigation system setting a new record in the obstacle course.',
    icon: <FaRobot />,
    color: 'from-red-600 to-orange-500'
  },
  {
    year: '2023',
    competition: 'National Robotics League',
    achievement: '1st Place',
    description: 'Won first place in the advanced robotics category with our innovative AI-driven robot design.',
    icon: <FaTrophy />,
    color: 'from-amber-500 to-yellow-400'
  },
  {
    year: '2022',
    competition: 'Tech Innovation Summit',
    achievement: 'Best Engineering Award',
    description: 'Recognized for outstanding mechanical design and system integration.',
    icon: <FaAward />,
    color: 'from-blue-600 to-indigo-500'
  },
  {
    year: '2021',
    competition: 'International Robot Olympics',
    achievement: 'Silver Medal',
    description: 'Second place overall with gold medal performance in the precision assembly challenge.',
    icon: <FaMedal />,
    color: 'from-gray-400 to-gray-300'
  }
];

const AchievementCard = ({ achievement, index }) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: false, amount: 0.3, margin: "0px 0px -100px 0px" });
  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? 60 : -60,
      y: 30
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        duration: 0.9, 
        ease: "easeInOut",
        delay: 0.1
      }
    }
  };

  const mobileCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.9, 
        ease: "easeInOut",
        delay: 0.1
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.4
      }
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative mb-12 sm:mb-16 md:mb-24"
    >
      <div className="hidden md:flex relative" style={{ paddingLeft: isEven ? 0 : '1rem', paddingRight: isEven ? '1rem' : 0 }}>
        <div className="flex-1"></div>
        
        <motion.div 
          initial="hidden"
          animate={cardInView ? "visible" : "hidden"}
          variants={iconVariants}
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-10"
        >
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${achievement.color} shadow-lg 
            flex items-center justify-center text-white text-xl
            border-4 border-[#060608] relative`}>
            {achievement.icon}
            
            <span className="absolute top-0 left-0 w-full h-full rounded-full 
              bg-gradient-to-br animate-ping opacity-20 duration-1000"></span>
          </div>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          animate={cardInView ? "visible" : "hidden"}
          variants={cardVariants}
          className={`flex-1 p-8 ${isEven ? 'md:order-first' : ''}`}
        >
          <div className={`bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 rounded-xl shadow-2xl 
            p-6 md:p-8 border border-zinc-800/50 transform transition-all duration-500 
            backdrop-blur-sm hover:border-red-500 group
            ${isEven ? 'md:mr-10' : 'md:ml-10'}`}
            >
            
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b 
              from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 
              transition-opacity duration-700 rounded-xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-red-600 h-8 w-1 mr-3 rounded-full"></div>
                <span className="text-red-500 font-bold text-2xl">{achievement.year}</span>
              </div>
              <span className="bg-gradient-to-r from-red-600/30 to-red-500/30 
                text-red-400 text-sm font-semibold px-4 py-1.5 rounded-full 
                border border-red-500/20 shadow-inner">
                {achievement.achievement}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-400 
              transition-colors duration-300">
              {achievement.competition}
            </h3>
            
            <p className="text-gray-300 leading-relaxed">{achievement.description}</p>
          </div>
        </motion.div>
      </div>

      <div className="md:hidden relative px-4">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600/80 via-red-600/50 to-red-600/20"></div>
        
        <motion.div 
          initial="hidden"
          animate={cardInView ? "visible" : "hidden"}
          variants={iconVariants}
          className="absolute left-4 transform -translate-x-1/2 z-10"
        >
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${achievement.color} shadow-lg 
            flex items-center justify-center text-white text-sm sm:text-lg
            border-3 border-[#060608] relative`}>
            {achievement.icon}
          </div>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          animate={cardInView ? "visible" : "hidden"}
          variants={mobileCardVariants}
          className="ml-5 pl-2" 
        >
          <div className="bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 rounded-xl shadow-2xl 
            p-4 sm:p-5 border border-zinc-800/50 transform transition-all duration-500 
            backdrop-blur-sm hover:border-red-500 group">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
              <div className="flex items-center">
                <div className="bg-red-600 h-6 w-1 mr-2 rounded-full"></div>
                <span className="text-red-500 font-bold text-lg sm:text-xl">{achievement.year}</span>
              </div>
              <span className="bg-gradient-to-r from-red-600/30 to-red-500/30 
                text-red-400 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full 
                border border-red-500/20 shadow-inner inline-block w-fit">
                {achievement.achievement}
              </span>
            </div>
            
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-red-400 
              transition-colors duration-300">
              {achievement.competition}
            </h3>
            
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{achievement.description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function Achievements() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#060608] relative overflow-hidden" id="achievements">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-2/5 h-2/5 bg-red-800/6 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-rose-900/6 blur-[150px] rounded-full"></div>
        <div className="absolute top-2/3 right-1/3 w-1/4 h-1/4 bg-blue-600/2 blur-[120px] rounded-full"></div>
        
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.015]"></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/1.5 via-transparent to-rose-600/1.5"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div 
          className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-red-600/8 rounded-full 
                    filter blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-blue-600/8 rounded-full 
                    filter blur-3xl animate-pulse"
          style={{ animationDuration: '12s' }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 md:mb-4 text-white">
            Our <span className="text-red-600">Achievements</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-center text-gray-400 max-w-3xl mx-auto">
            A journey of innovation and excellence in robotics engineering
          </p>
        </motion.div>
        
        <div className="relative" ref={containerRef}>
          <motion.div 
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-600 via-red-600/70 to-red-600/30"
          ></motion.div>
          
          <div className="relative">
            {achievements.map((achievement, index) => (
              <AchievementCard 
                key={index} 
                achievement={achievement} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}