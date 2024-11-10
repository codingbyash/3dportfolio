// src/components/BlogDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Blog not found');
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBlog();
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;

  if (!blog) return <p className="text-white text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center py-10 px-5">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#1A1A2E] p-10 rounded-lg shadow-lg max-w-7xl w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold text-white text-center mb-6"
        >
          {blog.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-300 text-lg leading-relaxed"
        >
          {blog.content}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default BlogDetails;
