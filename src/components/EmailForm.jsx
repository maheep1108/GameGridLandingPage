import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'signups'), { name, email });
      console.log('Document written with ID:', docRef.id);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: name,
          to_email: email
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      setSuccess(true);
      setEmail('');
      setName('');

      // Auto-close popup after 3 seconds
      setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <section className="px-4 py-12 text-center bg-gradient-to-b from-black via-gray-900 to-black min-h-screen flex items-center justify-center relative">
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 max-w-md mx-auto bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ✅ Description */}
        <motion.h2 
          className="text-lg text-white font-medium mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sign up now with your name and email to get notified when we launch GameGrid!
        </motion.h2>

        <motion.input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-3 w-full rounded text-black focus:ring-2 focus:ring-green-500 outline-none"
          required
          whileFocus={{ scale: 1.02 }}
        />
        <motion.input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 w-full rounded text-black focus:ring-2 focus:ring-green-500 outline-none"
          required
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          type="submit"
          className="bg-green-500 px-6 py-3 rounded font-semibold text-white hover:bg-green-600 transition-transform transform hover:scale-105 w-full"
          whileTap={{ scale: 0.95 }}
        >
          Notify Me
        </motion.button>
      </motion.form>

      {/* ✅ Popup modal */}
      <AnimatePresence>
  {success && (
    <>
      {/* Background Overlay */}
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      {/* ✅ Properly Centered Popup */}
      <motion.div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] bg-white text-black px-8 py-6 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-lg font-semibold">✅ Thanks for signing up!</p>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </section>
  );
};

export default EmailForm;
