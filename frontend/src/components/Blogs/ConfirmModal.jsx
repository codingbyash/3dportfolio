// src/components/ConfirmModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import "./ConfirmModal.css"

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Confirm Deletion</h2>
        <p className="text-center mb-6">Are you sure you want to delete this blog?</p>
        <div className="flex justify-around">
          <button 
            onClick={onConfirm} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
          >
            Delete
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;
