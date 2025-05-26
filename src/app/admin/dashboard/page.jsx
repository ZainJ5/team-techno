'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Head from 'next/head';

export default function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    faculty: '',
    memberType: 'team',
    ecTitle: '',
    imageUrl: '',
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchMembers();
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };
  
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/member');
      setMembers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load members');
      setLoading(false);
      console.error('Error fetching members:', err);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitMessage({
          type: 'error',
          text: 'Image size should be less than 5MB'
        });
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSubmitMessage({
          type: 'error',
          text: 'Please select a valid image file'
        });
        return;
      }
      
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Replace the current uploadImage function with this improved version
const uploadImage = async () => {
  if (!selectedImage) return null;
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'team_members';
  
  if (!cloudName) {
    console.error('Cloudinary cloud name not configured');
    setSubmitMessage({
      type: 'error',
      text: 'Image upload configuration missing. Please check .env.local file.'
    });
    return null;
  }
  
  const formDataForUpload = new FormData();
  formDataForUpload.append('file', selectedImage);
  formDataForUpload.append('upload_preset', uploadPreset);
  
  setUploading(true);
  
  try {
    console.log('Uploading to Cloudinary:', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);
    console.log('Upload preset being used:', uploadPreset);
    
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formDataForUpload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000,
      }
    );
    
    setUploading(false);
    console.log('Upload successful:', response.data);
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    console.error('Error details:', error.response?.data);
    setUploading(false);
    
    if (error.response?.data?.error) {
      setSubmitMessage({
        type: 'error',
        text: `Upload failed: ${error.response.data.error.message}`
      });
    } else if (error.response?.status === 401) {
      setSubmitMessage({
        type: 'error',
        text: 'Image upload failed: Invalid upload preset or unauthorized.'
      });
    } else if (error.response?.status === 400) {
      setSubmitMessage({
        type: 'error',
        text: 'Image upload failed: Invalid file or configuration. Check console for details.'
      });
    } else if (error.code === 'ECONNABORTED') {
      setSubmitMessage({
        type: 'error',
        text: 'Image upload timed out. Please try with a smaller image.'
      });
    } else {
      setSubmitMessage({
        type: 'error',
        text: `Failed to upload image: ${error.message}`
      });
    }
    return null;
  }
};
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.batch || !formData.faculty || !selectedImage) {
      setSubmitMessage({ 
        type: 'error', 
        text: 'Please fill all required fields and upload an image' 
      });
      return;
    }
    
    if (formData.memberType === 'ec' && !formData.ecTitle) {
      setSubmitMessage({ 
        type: 'error', 
        text: 'Please enter a title for EC member' 
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' }); // Clear previous messages
    
    try {
      const imageUrl = await uploadImage();
      
      if (!imageUrl) {
        setIsSubmitting(false);
        return;
      }
      
      const memberData = {
        ...formData,
        imageUrl,
        ...(formData.memberType !== 'ec' && { ecTitle: undefined })
      };
      
      await axios.post('/api/member', memberData);
      
      setSubmitMessage({ 
        type: 'success', 
        text: 'Member added successfully!' 
      });
      
      setFormData({
        name: '',
        batch: '',
        faculty: '',
        memberType: 'team',
        ecTitle: '',
        imageUrl: '',
      });
      setSelectedImage(null);
      setImagePreview(null);
      
      fetchMembers();
    } catch (error) {
      console.error('Error adding member:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: `Failed to add member: ${error.response?.data?.message || error.message}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await axios.delete(`/api/member/${memberId}`);
        setMembers(members.filter(member => member._id !== memberId));
        setSubmitMessage({ 
          type: 'success', 
          text: 'Member deleted successfully' 
        });
      } catch (error) {
        console.error('Error deleting member:', error);
        setSubmitMessage({ 
          type: 'error', 
          text: 'Failed to delete member' 
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | Team Management</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white">
        <header className="bg-black shadow-md py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              Team Admin <span className="text-red-600">Dashboard</span>
            </h1>
            <button 
              onClick={handleLogout}
              className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 shadow-lg rounded-lg p-6 border border-zinc-800">
                <h2 className="text-xl font-semibold mb-6 text-red-500">Add New Team Member</h2>
                
                {submitMessage.text && (
                  <div className={`p-4 mb-6 rounded-md ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-900/30 border border-green-800 text-green-400' 
                      : 'bg-red-900/30 border border-red-800 text-red-400'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="batch" className="block text-sm font-medium text-gray-300 mb-1">
                      Batch *
                    </label>
                    <input
                      type="text"
                      id="batch"
                      name="batch"
                      value={formData.batch}
                      onChange={handleInputChange}
                      placeholder="e.g. 2021-2025"
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="faculty" className="block text-sm font-medium text-gray-300 mb-1">
                      Faculty *
                    </label>
                    <input
                      type="text"
                      id="faculty"
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleInputChange}
                      placeholder="e.g. Computer Science"
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Member Type *
                    </label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="team"
                          name="memberType"
                          value="team"
                          checked={formData.memberType === 'team'}
                          onChange={handleInputChange}
                          className="mr-2 text-red-600 focus:ring-red-600"
                        />
                        <label htmlFor="team" className="text-gray-300">Team Member</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="ec"
                          name="memberType"
                          value="ec"
                          checked={formData.memberType === 'ec'}
                          onChange={handleInputChange}
                          className="mr-2 text-red-600 focus:ring-red-600"
                        />
                        <label htmlFor="ec" className="text-gray-300">EC Member</label>
                      </div>
                    </div>
                  </div>
                  
                  {formData.memberType === 'ec' && (
                    <div className="mb-4">
                      <label htmlFor="ecTitle" className="block text-sm font-medium text-gray-300 mb-1">
                        EC Title *
                      </label>
                      <select
                        id="ecTitle"
                        name="ecTitle"
                        value={formData.ecTitle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        required={formData.memberType === 'ec'}
                      >
                        <option value="">Select a title</option>
                        <option value="Captain">Captain</option>
                        <option value="Vice Captain">Vice Captain</option>
                        <option value="Technical Lead">Technical Lead</option>
                        <option value="Creative Director">Creative Director</option>
                        <option value="Operations Manager">Operations Manager</option>
                        <option value="Community Lead">Community Lead</option>
                        <option value="Innovation Head">Innovation Head</option>
                        <option value="Quality Assurance Lead">Quality Assurance Lead</option>
                        <option value="Marketing Lead">Marketing Lead</option>
                        <option value="Finance Head">Finance Head</option>
                      </select>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Profile Image * (Max 5MB)
                    </label>
                    <div className="flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg p-4">
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label 
                        htmlFor="imageUpload" 
                        className="cursor-pointer flex flex-col items-center justify-center w-full"
                      >
                        {imagePreview ? (
                          <div className="relative w-40 h-40 mb-2">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-40 h-40 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedImage(null);
                                setImagePreview(null);
                              }}
                              className="absolute top-1 right-1 bg-red-600 rounded-full p-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg className="w-12 h-12 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="mt-2 text-sm text-zinc-500">
                              Click to upload image
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || uploading}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                      (isSubmitting || uploading) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting || uploading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {uploading ? 'Uploading Image...' : 'Adding Member...'}
                      </span>
                    ) : (
                      'Add Member'
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-zinc-900 shadow-lg rounded-lg p-6 border border-zinc-800">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-red-500">Team Members</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => fetchMembers()} 
                      className="px-4 py-2 bg-zinc-800 rounded-md"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex justify-center items-center p-8">
                    <svg className="animate-spin h-10 w-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : error ? (
                  <div className="bg-red-900/30 border border-red-800 p-4 rounded-md text-red-400">
                    {error}
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-200 mb-4 border-b border-zinc-800 pb-2">
                        EC Members ({members.filter(m => m.memberType === 'ec').length})
                      </h3>
                      {members.filter(m => m.memberType === 'ec').length === 0 ? (
                        <p className="text-gray-500 italic">No EC members found</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {members
                            .filter(member => member.memberType === 'ec')
                            .map(member => (
                              <div key={member._id} className="bg-black border border-zinc-800 rounded-lg p-4 flex space-x-4">
                                <img 
                                  src={member.imageUrl} 
                                  alt={member.name} 
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-white">{member.name}</h4>
                                  <p className="text-sm text-red-500">{member.ecTitle}</p>
                                  <div className="text-xs text-gray-400 mt-1">
                                    {member.batch} • {member.faculty}
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDelete(member._id)}
                                  className="text-zinc-500 hover:text-red-500"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-4 border-b border-zinc-800 pb-2">
                        Regular Team Members ({members.filter(m => m.memberType === 'team').length})
                      </h3>
                      {members.filter(m => m.memberType === 'team').length === 0 ? (
                        <p className="text-gray-500 italic">No team members found</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {members
                            .filter(member => member.memberType === 'team')
                            .map(member => (
                              <div key={member._id} className="bg-black border border-zinc-800 rounded-lg p-4 flex space-x-4">
                                <img 
                                  src={member.imageUrl} 
                                  alt={member.name} 
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-white">{member.name}</h4>
                                  <div className="text-xs text-gray-400 mt-1">
                                    {member.batch} • {member.faculty}
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDelete(member._id)}
                                  className="text-zinc-500 hover:text-red-500"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}