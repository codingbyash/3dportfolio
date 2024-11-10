import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = { title, content };
    console.log('Submitting:', newBlog);

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        navigate('/blogs');
      } else {
        throw new Error('Failed to add blog');
      }
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#1A1A2E] p-10 rounded-lg shadow-lg w-full max-w-xl"
      >
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold text-white text-center mb-6"
        >
          Add Blog
        </motion.h2>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          <div>
            <label className="text-white text-sm font-medium">Title:</label>
            <motion.input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="w-full px-9 py-2 rounded-md mt-2 bg-[#2C2C3A] text-white focus:ring focus:ring-blue-500 outline-none"
              whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
            />
          </div>
          
          <div>
            <label className="text-white text-sm font-medium">Content:</label>
            <motion.textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required 
              rows="6"
              className="w-full px-4 py-2 rounded-md mt-2 bg-[#2C2C3A] text-white focus:ring focus:ring-blue-500 outline-none resize-none"
              whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
            />
          </div>
          
          <motion.button 
            type="submit"
            className="w-full py-2 rounded-md bg-purple-600 text-white font-semibold transition hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Add Blog
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AddBlog;
