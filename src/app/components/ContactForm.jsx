"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      alert('Thank you for your message! Our team will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-black/80 via-zinc-900/80 to-black/80 p-8 rounded-xl shadow-2xl border border-zinc-800/50 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-zinc-900/70 border border-zinc-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-200 backdrop-blur-sm"
            placeholder="Your name"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-zinc-900/70 border border-zinc-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-200 backdrop-blur-sm"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-3 bg-zinc-900/70 border border-zinc-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-200 backdrop-blur-sm"
          placeholder="How can we help you?"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full p-3 bg-zinc-900/70 border border-zinc-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-200 backdrop-blur-sm resize-none"
          placeholder="Your message..."
        />
      </div>
      
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-md transition-all duration-300 flex justify-center items-center shadow-lg hover:shadow-red-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}