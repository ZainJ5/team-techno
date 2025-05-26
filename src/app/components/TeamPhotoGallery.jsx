"use client"

import Image from 'next/image';
import { useState } from 'react';

export default function TeamPhotoGallery() {
  const [activePhoto, setActivePhoto] = useState(null);
  
  const teamPhotos = [
    { id: 1, image: "/team-photos/1.jpg" }, 
    { id: 2, image: "/team-photos/2.jpg" },
    { id: 3, image: "/team-photos/3.jpg" },
    { id: 4, image: "/team-photos/8.jpg" },
    { id: 5, image: "/team-photos/5.jpg" },
    { id: 6, image: "/team-photos/10.jpg" },
    { id: 7, image: "/team-photos/7.jpg" },
    { id: 8, image: "/team-photos/4.jpg" },
    { id: 9, image: "/team-photos/9.jpg" },
    { id: 10, image: "/team-photos/6.jpg" },
  ];

  const openModal = (id) => {
    setActivePhoto(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActivePhoto(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-20 bg-[#060608] relative overflow-hidden" id="team-gallery">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-2/5 h-2/5 bg-red-800/8 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-rose-900/8 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/2 via-transparent to-rose-600/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">
            Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Gallery</span>
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-28 h-1.5 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {teamPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="relative group overflow-hidden rounded-lg cursor-pointer shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/20 hover:shadow-xl"
              onClick={() => openModal(photo.id)}
            >
              <div className="aspect-square relative w-full">
                <Image
                  src={photo.image}
                  alt="Team photo"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {activePhoto && (
          <>
            {/* Backdrop with highest z-index */}
            <div 
              className="fixed inset-0 bg-black/95 z-[9999]" 
              onClick={closeModal}
              style={{ position: 'fixed' }}
            ></div>
            
            {/* Modal content */}
            <div 
              className="fixed inset-0 z-[10000] flex items-center justify-center"
              style={{ position: 'fixed' }}
              onClick={closeModal}
            >
              <div 
                className="relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-b from-gray-900 to-black rounded-md border border-red-500/30 shadow-2xl shadow-red-500/30 overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
                style={{ position: 'relative' }}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-gray-900 to-black flex justify-end items-center pr-2"
                  style={{ position: 'absolute', zIndex: 10 }}
                >
                  <button 
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
                    onClick={closeModal}
                    aria-label="Close"
                    style={{ position: 'relative' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div 
                  className="pt-10"
                  style={{ position: 'relative' }}
                >
                  <div className="relative w-full">
                    <Image
                      src={teamPhotos.find(p => p.id === activePhoto).image}
                      alt="Team photo"
                      width={1200}
                      height={800}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        
        /* Ensure modal is above ALL other elements */
        #__next {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </section>
  );
}