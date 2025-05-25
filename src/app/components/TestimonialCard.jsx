import React from 'react';

export default function TestimonialCard({ quote, author, company }) {
  return (
    <div className="p-8 border border-zinc-800 rounded-lg bg-black relative">
      {/* Quotation mark decoration */}
      <div className="absolute -top-4 -left-4 text-red-600 text-6xl opacity-20">"</div>
      
      <p className="text-lg mb-6 relative z-10">{quote}</p>
      
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center text-xl font-bold">
          {author.charAt(0)}
        </div>
        <div className="ml-4">
          <h4 className="font-bold text-red-500">{author}</h4>
          <p className="text-sm text-gray-400">{company}</p>
        </div>
      </div>
    </div>
  );
}