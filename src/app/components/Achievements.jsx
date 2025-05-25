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
      className={`relative mb-24 md:mb-32 flex ${isEven ? 'md:flex-row-reverse' : ''}`}
      style={{ paddingLeft: isEven ? 0 : '1rem', paddingRight: isEven ? '1rem' : 0 }}
    >
      <div className="flex-1 md:w-1/2"></div>
      
      {/* Timeline dot with animated pulse */}
      <motion.div 
        initial="hidden"
        animate={cardInView ? "visible" : "hidden"}
        variants={iconVariants}
        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-10"
      >
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${achievement.color} shadow-lg 
          flex items-center justify-center text-white text-xl
          border-4 border-black relative`}>
          {achievement.icon}
          
          {/* Animated pulse effect */}
          <span className="absolute top-0 left-0 w-full h-full rounded-full 
            bg-gradient-to-br animate-ping opacity-20 duration-1000"></span>
        </div>
      </motion.div>
      
      <motion.div 
        initial="hidden"
        animate={cardInView ? "visible" : "hidden"}
        variants={cardVariants}
        className="flex-1 md:w-1/2 p-4 md:p-8"
      >
        <div className={`bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-xl shadow-2xl 
          p-6 md:p-8 border border-zinc-800 transform transition-all duration-500 
          backdrop-blur-sm hover:border-red-500 group
          ${isEven ? 'md:ml-10' : 'md:mr-10'}`}
          >
          
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b 
            from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 
            transition-opacity duration-700 rounded-xl pointer-events-none
            'md:ml-10'  md:ml-10
            "></div>
          
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
    <section className="py-20 bg-black relative overflow-hidden" id="achievements">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full 
                    filter blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full 
                    filter blur-3xl animate-pulse"
          style={{ animationDuration: '12s' }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-bold text-center mb-4 text-white">
            Our <span className="text-red-600">Achievements</span>
          </h2>
          <p className="text-xl text-center text-gray-400 mb-16 max-w-3xl mx-auto">
            A journey of innovation and excellence in robotics engineering
          </p>
        </motion.div>
        
        <div className="relative" ref={containerRef}>
          {/* Vertical timeline line with animation */}
          <motion.div 
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-600 via-red-600/70 to-red-600/30"
            style={{ marginLeft: '-0.5rem', marginRight: '-0.5rem' }}
          ></motion.div>
          
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={index} 
              achievement={achievement} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}