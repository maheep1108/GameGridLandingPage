import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { title: "Live Game Stats", desc: "Track real-time data for every major sport." },
  { title: "AI Predictions", desc: "Smarter insights using predictive models and trends." },
  { title: "Custom Alerts", desc: "Get notified for props, scores, and special stats." },
];

const Features = () => {
  return (
    <section className="py-16 px-6 bg-gray-900 text-white">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-green-400 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Why Choose GameGrid?
      </motion.h2>
      <div className="grid gap-8 md:grid-cols-3 text-center max-w-5xl mx-auto">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/10 p-6 rounded-lg shadow-md hover:shadow-green-400/40 backdrop-blur-sm"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-400">{item.title}</h3>
            <p className="text-sm mt-3 text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
