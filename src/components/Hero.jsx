import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const handleScroll = () => {
    const section = document.getElementById("signup-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative text-center py-32 px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Subtle animated circles in background */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-600 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400 opacity-10 rounded-full blur-3xl animate-ping"></div>

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-green-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        GameGrid is Coming
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Join the waitlist and experience the next generation of sports betting research.
      </motion.p>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span
          onClick={handleScroll}
          className="inline-block px-8 py-4 text-lg bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-110 transition-transform cursor-pointer"
        >
          🚀 Coming Soon
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
