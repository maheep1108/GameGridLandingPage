import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [signupNumber, setSignupNumber] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const counterRef = doc(db, 'counters', 'signupsCounter');
      const counterSnap = await getDoc(counterRef);
      let currentCount = counterSnap.exists() ? counterSnap.data().totalSignups : 0;
      const newCount = currentCount + 1;

      await setDoc(counterRef, { totalSignups: newCount }, { merge: true });
      await addDoc(collection(db, 'signups'), { name, email, signupNumber: newCount });
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { to_name: name, to_email: email },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      setSignupNumber(newCount);
      setSuccess(true);
      setEmail('');
      setName('');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <section className="px-4 py-20 text-center min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 max-w-md mx-auto bg-white/10 p-8 rounded-lg shadow-xl backdrop-blur-md border border-green-500/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-white text-lg mb-2">
          Sign up now with your email and name to get notified when we launch 🚀
        </h2>
        <motion.input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-3 w-full rounded text-black focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
        <motion.input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 w-full rounded text-black focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
        <motion.button
          type="submit"
          className="bg-green-500 px-6 py-3 rounded font-semibold text-white hover:bg-green-600 transition-transform transform hover:scale-105 w-full"
        >
          Notify Me
        </motion.button>
      </motion.form>

      {/* ✅ Sleek popup animation */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-w-sm"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-2">🎉 Thanks for signing up!</h3>
              <p>You are signup number <span className="text-green-500 font-semibold">#{signupNumber}</span></p>
              <button 
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => setSuccess(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EmailForm;
