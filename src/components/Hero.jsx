import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="text-center py-28 px-4 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-green-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        GameGrid is Coming
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl max-w-xl mx-auto text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Sign up now to be the first to access the ultimate sports betting research platform.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <span className="inline-block px-6 py-3 text-lg bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 cursor-pointer">
          Coming Soon
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
