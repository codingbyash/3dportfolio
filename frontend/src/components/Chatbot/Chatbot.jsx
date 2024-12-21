import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Chatbot.css';
import { FaComments, FaTimes } from 'react-icons/fa';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sessionId = Math.random().toString(36).substr(2, 9);

        const res = await fetch(`http://localhost:5000/api/website?text=${message}&mysession=${sessionId}`);
        const data = await res.text();

        setResponses([...responses, { user: message, bot: data }]);
        setMessage('');
    };

    return (
        <>
            {!isOpen && (
                <motion.div 
                    className="chat-icon" 
                    onClick={() => setIsOpen(true)}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
                    whileHover={{ scale: 1.1 }}
                >
                    <FaComments size={28} color="#800000" />
                    <p>Need Help?</p>
                </motion.div>
            )}
            
            {isOpen && (
                <motion.div
                    className="chatbot-floating-container"
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4 }}
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                >
                    <div className="chatbot-container">
                        <div className="chatbot-header">
                            <h2>Chatbot</h2>
                            <FaTimes
                                className="close-icon"
                                onClick={() => setIsOpen(false)}
                            />
                        </div>
                        <div className="chatbox">
                            {responses.map((response, index) => (
                                <motion.div
                                    key={index}
                                    className="chat-message"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <p><strong>You:</strong> {response.user}</p>
                                    <p><strong>Bot:</strong> {response.bot}</p>
                                </motion.div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} className="chatbot-form">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                required
                                className="chat-input"
                            />
                            <motion.button
                                type="submit"
                                className="send-button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Send
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default Chatbot;
