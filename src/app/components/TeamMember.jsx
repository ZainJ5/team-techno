"use client"

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ECMemberCard = ({ member, isLeadership }) => {
  return (
    <div className={`relative flex-shrink-0 w-72 sm:w-80
      bg-gradient-to-br from-red-950/30 via-neutral-900 to-black
      ${isLeadership ? 'border-2 border-yellow-500 shadow-yellow-500/20' : 'border-2 border-red-700/50 shadow-red-700/10'}
      rounded-xl overflow-hidden mx-2 sm:mx-3 transition-all duration-300 hover:shadow-2xl 
      ${isLeadership ? 'hover:shadow-yellow-500/40' : 'hover:shadow-red-600/30'}`}>

      {isLeadership && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-xs uppercase tracking-wider py-1.5 px-4 rounded-bl-lg">
            {member.ecTitle}
          </div>
        </div>
      )}

      <div className="relative h-72 sm:h-80 w-full overflow-hidden group">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        <div className={`absolute inset-0 bg-gradient-to-b ${
          isLeadership
            ? 'from-transparent via-black/60 to-black/90'
            : 'from-transparent via-black/50 to-black/80'
        }`}></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h3 className={`${isLeadership ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'} font-semibold text-white text-center tracking-tight`}>
            {member.name}
          </h3>

          <div className="text-xs text-neutral-300 mt-2 sm:mt-2.5 text-center space-x-2">
            <span className="inline-block px-2.5 sm:px-3 py-1 bg-neutral-800/70 rounded-full">
              {member.batch}
            </span>
            <span className="inline-block px-2.5 sm:px-3 py-1 bg-neutral-800/70 rounded-full">
              {member.faculty}
            </span>
          </div>

          {!isLeadership && member.ecTitle && (
            <div className="mt-2.5 sm:mt-3 text-center">
              <span className="inline-block px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm font-medium bg-red-700/60 rounded-full text-white">
                {member.ecTitle}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TeamMemberCard = ({ member }) => {
  return (
    <div className="relative flex-shrink-0 w-56 sm:w-64 bg-neutral-900 border border-neutral-700/70 rounded-lg overflow-hidden mx-2 sm:mx-3 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-800/60 hover:border-neutral-600">
      <div className="relative h-64 sm:h-72 w-full overflow-hidden group">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl font-semibold text-white text-center tracking-tight">{member.name}</h3>
          <div className="text-xs text-neutral-400 mt-2 text-center space-x-2">
            <span className="inline-block px-2.5 py-1 bg-neutral-800/80 rounded-full">
              {member.batch}
            </span>
            <span className="inline-block px-2.5 py-1 bg-neutral-800/80 rounded-full">
              {member.faculty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollableContainer = ({ children, className = '', priority = false }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 640 ? -250 : -350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 250 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative max-w-full overflow-hidden">
      <div className={`absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#060608] to-transparent z-10 ${priority ? 'mix-blend-soft-light' : ''}`}></div>
      <div className={`absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#060608] to-transparent z-10 ${priority ? 'mix-blend-soft-light' : ''}`}></div>

      <button
        onClick={scrollLeft}
        className={`absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full
          ${priority ? 'bg-red-600 hover:bg-red-500' : 'bg-red-700/80 hover:bg-red-600'}
          flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none ring-2 ring-transparent focus:ring-red-500/50`}
        aria-label="Scroll left"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={scrollRight}
        className={`absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full
          ${priority ? 'bg-red-600 hover:bg-red-500' : 'bg-red-700/80 hover:bg-red-600'}
          flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none ring-2 ring-transparent focus:ring-red-500/50`}
        aria-label="Scroll right"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-auto scrollbar-hide py-8 sm:py-10 ${className}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex space-x-4 sm:space-x-6 px-10 sm:px-16 md:px-24">
          {children}
        </div>
      </div>
    </div>
  );
};

const ScrollbarHideStyle = () => (
  <style jsx global>{`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    .animate-shimmer {
      background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite linear;
    }
  `}</style>
);

const CardSkeleton = ({ isEC = false }) => {
  const cardWidth = isEC ? 'w-72 sm:w-80' : 'w-56 sm:w-64';
  const cardHeight = isEC ? 'h-72 sm:h-80' : 'h-64 sm:h-72';
  return (
    <div className={`relative flex-shrink-0 ${cardWidth} ${cardHeight} bg-neutral-800/70 rounded-xl overflow-hidden mx-2 sm:mx-3 border border-neutral-700/50`}>
      <div className="w-full h-full relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="h-6 sm:h-7 bg-neutral-700 rounded-md mb-3"></div>
          <div className="h-4 sm:h-5 w-3/4 bg-neutral-700 rounded-md mb-2"></div>
          {isEC && <div className="h-4 sm:h-5 w-28 mx-auto bg-neutral-700 rounded-md"></div>}
        </div>
      </div>
    </div>
  );
};

export default function TeamDisplay() {
  const [ecMembers, setEcMembers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/member');
        const sortedEc = response.data
          .filter(member => member.memberType === 'ec')
          .sort((a, b) => {
            const order = { 'Captain': 1, 'Vice Captain': 2 };
            const aOrder = order[a.ecTitle] || Infinity;
            const bOrder = order[b.ecTitle] || Infinity;
            if (aOrder !== bOrder) return aOrder - bOrder;
            return a.name.localeCompare(b.name);
          });
        const sortedTeam = response.data
          .filter(member => member.memberType === 'team')
          .sort((a, b) => a.name.localeCompare(b.name));
        setEcMembers(sortedEc);
        setTeamMembers(sortedTeam);
      } catch (err) {
        console.error('Failed to fetch members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const isLeadershipRole = (title) => {
    return title === 'Captain' || title === 'Vice Captain';
  };

  return (
    <div id='team' className="min-h-screen bg-[#060608] text-white">
      <ScrollbarHideStyle />

      <div className="relative overflow-hidden py-12 sm:py-16 md:py-20 bg-[#060608]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-2/5 h-2/5 bg-red-800/5 blur-[180px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-rose-900/5 blur-[150px] rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-blue-600/1.5 blur-[120px] rounded-full"></div>
          
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.01]"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/1 via-transparent to-rose-600/1"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden opacity-30 z-0">
          <div className="absolute h-[15rem] sm:h-[20rem] md:h-[24rem] w-[15rem] sm:w-[20rem] md:w-[24rem] rounded-full bg-red-600/15 blur-3xl -top-16 -left-16 animate-pulse"></div>
          <div className="absolute h-[15rem] sm:h-[20rem] md:h-[24rem] w-[15rem] sm:w-[20rem] md:w-[24rem] rounded-full bg-red-700/10 blur-3xl -bottom-12 -right-12 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="absolute inset-0 bg-black/10 z-0"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
              Meet Our <span className="text-red-600">Team</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
              A passionate group of innovators, creators, and leaders dedicated to pushing boundaries and building the future together.
            </p>

            <div className="flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#060608] relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.008]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/0.5 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Committee</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                The strategic minds and driving force guiding our mission and initiatives.
              </p>
            </div>

            {error && <div className="text-center text-red-500 py-6 sm:py-8 text-lg">{error}</div>}
            {loading ? (
              <ScrollableContainer priority>
                {[...Array(5)].map((_, i) => <CardSkeleton key={i} isEC={true} />)}
              </ScrollableContainer>
            ) : ecMembers.length > 0 ? (
              <ScrollableContainer priority>
                {ecMembers.map(member => (
                  <ECMemberCard
                    key={member._id || member.name}
                    member={member}
                    isLeadership={isLeadershipRole(member.ecTitle)}
                  />
                ))}
              </ScrollableContainer>
            ) : (
              !error && <div className="text-center text-neutral-500 py-6 sm:py-8 text-lg">No executive committee members found.</div>
            )}
          </div>

          <div>
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Dedicated Members</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                The talented individuals whose expertise and collaboration bring our projects to life.
              </p>
            </div>

            {error && !loading && teamMembers.length === 0 && <div className="text-center text-red-500 py-6 sm:py-8 text-lg">{error}</div>}
            {loading ? (
              <ScrollableContainer>
                {[...Array(7)].map((_, i) => <CardSkeleton key={i} />)}
              </ScrollableContainer>
            ) : teamMembers.length > 0 ? (
              <ScrollableContainer>
                {teamMembers.map(member => (
                  <TeamMemberCard key={member._id || member.name} member={member} />
                ))}
              </ScrollableContainer>
            ) : (
              !error && <div className="text-center text-neutral-500 py-6 sm:py-8 text-lg">No team members found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}