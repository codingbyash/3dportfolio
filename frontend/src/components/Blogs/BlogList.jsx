import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal'; // Import the modal component
import { motion } from 'framer-motion'; // Import Framer Motion
import { fadeIn } from '../../utils/motion';
const BlogCard = ({ blog, onDelete }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0.3, 0.75)} // Adding motion effect
    className='bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-[20px] shadow-card transition-transform duration-300 transform hover:scale-105 w-[340px] h-[300px]'
  >
    <div className='bg-[#000000] rounded-[20px] py-5 px-10 h-full min-h-[280px] flex flex-col justify-between'>
      <h3 className='text-white text-[22px] font-semibold text-center'>{blog.title}</h3>
      <p className='text-gray-300 text-[16px] leading-[24px]'>{blog.content.substring(0, 100)}...</p>
      <div className='flex justify-between mt-2'>
        <Link to={`/blogs/${blog._id}`} className='px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold transition hover:bg-blue-700 mr-2'>Read More</Link>
        <Link to={`/edit-blog/${blog._id}`} className='px-4 py-2 rounded-lg bg-yellow-500 text-black text-sm font-semibold transition hover:bg-yellow-600 mr-2'>Edit</Link>
        <button onClick={() => onDelete(blog._id)} className='px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold transition hover:bg-red-700'>Delete</button>
      </div>
    </div>
  </motion.div>
);

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null); // Store the blog ID to delete
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    setBlogToDelete(id); // Set the blog ID to delete
    setModalOpen(true); // Open the modal
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${blogToDelete}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the deleted blog from the state
          setBlogs(blogs.filter(blog => blog._id !== blogToDelete));
          setModalOpen(false); // Close the modal
        } else {
          throw new Error('Failed to delete blog');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  if (isLoading) {
    return <div className='text-white'>Loading blogs...</div>; // Loading state
  }

  return (
    <div className="blog-section min-h-screen bg-primary">

     <motion.div variants={fadeIn("", "", 0.1, 1)} className='flex justify-between mt-4 mr-8'>
  <h2 className="text-[32px] ml-6 text-white font-bold">Blog List</h2>
  <div className="flex space-x-4">
    <Link 
      to="/" 
      className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold transition duration-200 hover:bg-blue-700"
    >
      Home
    </Link>
    <Link 
      to="/add-blog"  
      className="mt-4 px-6 py-2 rounded-lg bg-green-600 text-white font-semibold transition duration-200 hover:bg-green-700"
    >
      Add Blog
    </Link>
  </div>
</motion.div>


      <div className='blog-container'>
        <div className='mt-10 ml-5 flex flex-wrap gap-10'>
          {blogs.map((blog, index) => (
            <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default BlogList;
