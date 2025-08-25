import React, { useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  runTransaction,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [signupNumber, setSignupNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(''); // success message text
  const [err, setErr] = useState(''); // error message text

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setMsg('');
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = name.trim();

      if (!cleanName || !cleanEmail) {
        throw new Error('Please provide your name and a valid email.');
      }

      // 1) Prevent duplicates: check if this email already exists
      const q = query(collection(db, 'signups'), where('email', '==', cleanEmail));
      const existing = await getDocs(q);
      if (!existing.empty) {
        // Already signed up — do not increment counter or add another doc
        setSignupNumber(existing.docs[0].data().signupNumber ?? null);
        setMsg("You're already on the list!");
        setSuccess(true);
        setLoading(false);
        setEmail('');
        setName('');
        return;
      }

      // 2) Atomically increment counter and get the new number
      const counterRef = doc(db, 'counters', 'signupsCounter');
      const newCount = await runTransaction(db, async (tx) => {
        const snap = await tx.get(counterRef);
        if (!snap.exists()) {
          // initialize if missing
          tx.set(counterRef, { totalSignups: 0 });
          return 1;
        }
        const current = snap.data().totalSignups || 0;
        const next = current + 1;
        tx.update(counterRef, { totalSignups: next });
        return next;
      });

      // 3) Create signup document
      const docRef = await addDoc(collection(db, 'signups'), {
        name: cleanName,
        email: cleanEmail,
        signupNumber: newCount,
        createdAt: new Date().toISOString(),
      });
      // console.log('Document written with ID:', docRef.id);

      // 4) Send confirmation email
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { to_name: cleanName, to_email: cleanEmail },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      // 5) Success UI
      setSignupNumber(newCount);
      setMsg('Thanks for signing up!');
      setSuccess(true);
      setEmail('');
      setName('');
    } catch (error) {
      console.error('Error signing up:', error);
      setErr(
        error?.message ||
          'Something went wrong while signing you up. Please try again in a moment.'
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="signup-section"
      className="px-4 py-20 text-center min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 max-w-md mx-auto bg-white/10 p-8 rounded-lg shadow-xl backdrop-blur-md border border-green-500/20 w-full"
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
          disabled={loading}
        />
        <motion.input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 w-full rounded text-black focus:ring-2 focus:ring-green-500 outline-none"
          required
          disabled={loading}
        />

        {err ? (
          <div className="text-red-400 text-sm w-full text-left">{err}</div>
        ) : null}

        <motion.button
          type="submit"
          className="bg-green-500 px-6 py-3 rounded font-semibold text-white hover:bg-green-600 transition-transform transform hover:scale-105 w-full disabled:opacity-60 disabled:hover:scale-100"
          disabled={loading}
        >
          {loading ? 'Submitting…' : 'Notify Me'}
        </motion.button>
      </motion.form>

      {/* Popup */}
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
              <h3 className="text-xl font-bold mb-2">🎉 {msg || 'Thanks for signing up!'}</h3>
              {signupNumber ? (
                <p>
                  You are signup number{' '}
                  <span className="text-green-600 font-semibold">#{signupNumber}</span>
                </p>
              ) : (
                <p>We’ve already got you on the list.</p>
              )}
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
