import React from 'react';
import { motion } from 'framer-motion';

import screen1 from '../assets/gg-screen-1.png';
import screen2 from '../assets/gg-screen-2.png';
import screen3 from '../assets/gg-screen-3.png';

const Hero = () => {
  const handleScroll = () => {
    const el = document.getElementById('signup-section');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative overflow-hidden text-center py-28 md:py-36 px-6 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* floating phones/screens (now above background) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* left phone */}
        <motion.img
          src={screen1}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute -left-10 top-8 w-64 md:w-72 lg:w-80 rounded-3xl shadow-2xl border border-white/5"
          initial={{ y: 40, opacity: 0, rotate: -8 }}
          animate={{ y: 0, opacity: 1, rotate: -8 }}
          transition={{ duration: 0.8 }}
          loading="eager"
        />
        {/* center phone */}
        <motion.img
          src={screen2}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 top-16 w-64 md:w-72 lg:w-80 rounded-3xl shadow-2xl border border-white/5"
          initial={{ y: 60, opacity: 0, rotate: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.9 }}
        />
        {/* right phone */}
        <motion.img
          src={screen3}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute -right-10 top-24 w-64 md:w-72 lg:w-80 rounded-3xl shadow-2xl border border-white/5"
          initial={{ y: 40, opacity: 0, rotate: 8 }}
          animate={{ y: 0, opacity: 1, rotate: 8 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          loading="lazy"
        />
        {/* soft glow blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-green-400/10 rounded-full blur-3xl" />
      </div>

      {/* gradient overlay (above images, below text) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/80"
        aria-hidden="true"
      />

      {/* foreground copy */}
      <motion.h1
        className="relative z-20 text-5xl md:text-6xl font-extrabold text-green-400 drop-shadow-[0_2px_10px_rgba(34,197,94,0.3)]"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        GameGrid is Coming
      </motion.h1>

      <motion.p
        className="relative z-20 mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Live stats, smart AI insights, trends, and tickets — all in one sleek app. Get early access.
      </motion.p>

      <motion.div
        className="relative z-20 mt-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <button
          onClick={handleScroll}
          className="inline-block px-8 py-4 text-lg bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-110 transition-transform"
        >
          🚀 Coming Soon
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
