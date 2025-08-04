import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [signupNumber, setSignupNumber] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Get the counter doc
      const counterRef = doc(db, 'counters', 'signupsCounter');
      const counterSnap = await getDoc(counterRef);

      let currentCount = 0;
      if (counterSnap.exists()) {
        currentCount = counterSnap.data().totalSignups;
      }

      const newCount = currentCount + 1;

      // 2️⃣ Update counter (create if doesn't exist)
      await setDoc(counterRef, { totalSignups: newCount }, { merge: true });

      // 3️⃣ Add user signup with signup number
      const docRef = await addDoc(collection(db, 'signups'), { 
        name, 
        email, 
        signupNumber: newCount 
      });
      console.log('Document written with ID:', docRef.id);

      // 4️⃣ Send email
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: name,
          to_email: email
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      // ✅ Show confirmation
      setSignupNumber(newCount);
      setSuccess(true);

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <section className="px-4 py-12 text-center min-h-screen flex items-center justify-center">
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 max-w-md mx-auto bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-md"
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

      {success && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-w-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-2">Thanks for signing up! 🎉</h3>
            <p>You are signup number <span className="text-green-500 font-semibold">#{signupNumber}</span>!</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default EmailForm;
