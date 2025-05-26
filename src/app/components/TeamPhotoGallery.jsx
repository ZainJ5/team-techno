"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function TeamPhotoGallery() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
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
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setActivePhoto(null);
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
  };

  const Modal = () => {
    if (!activePhoto) return null;
    
    return (
      <>
        <div id='gallery'
          className="fixed inset-0 bg-black opacity-95" 
          style={{ position: 'fixed', zIndex: 999999 }}
          onClick={closeModal}
        ></div>
        
        <div 
          className="fixed inset-0 flex items-center justify-center"
          style={{ position: 'fixed', zIndex: 9999999 }}
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-b from-gray-900 to-black rounded-md border border-red-500/30 shadow-2xl shadow-red-500/30 overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 shadow-lg z-10 group"
              onClick={closeModal}
              aria-label="Close"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 group-hover:scale-110 transition-transform" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="w-full">
              <div className="relative w-full">
                <Image
                  src={teamPhotos.find(p => p.id === activePhoto).image}
                  alt="Team photo"
                  width={1200}
                  height={800}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
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
      </div>

      {mounted && createPortal(
        <Modal />,
        document.body
      )}

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
        
        /* Force the navbar below modal when modal is open */
        body.modal-open header,
        body.modal-open nav,
        body.modal-open [class*="header"],
        body.modal-open [class*="navbar"],
        body.modal-open [class*="nav-"],
        body.modal-open [id*="header"],
        body.modal-open [id*="navbar"],
        body.modal-open [id*="nav-"] {
          z-index: 1 !important;
        }
      `}</style>
    </section>
  );
}