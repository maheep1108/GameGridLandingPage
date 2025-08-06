import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { 
    title: "📊 Live Game Stats", 
    desc: "Stay ahead of every game with real-time updates on scores, player performances, and team stats. Our live scoreboard refreshes instantly, giving you the most accurate data without delay." 
  },
  { 
    title: "📈 Trends Dashboard", 
    desc: "Analyze betting market shifts, prop line movements, and public betting percentages all in one place. See where the money is going and find early value plays before the odds adjust." 
  },
  { 
    title: "🔍 Research Hub", 
    desc: "Dive deep into historical matchups, player form, head-to-head stats, and advanced metrics. Our research tab provides the data you need to back every bet with solid evidence." 
  },
  { 
    title: "🤖 AI Betting Bot", 
    desc: "Get smarter picks powered by machine learning. The AI Bot scans thousands of data points to identify high-probability bets and unique player props tailored to your preferences." 
  },
  { 
    title: "📢 Custom Alerts", 
    desc: "Set alerts for your favorite teams, players, or specific prop markets. Receive instant notifications when odds move, lines change, or the AI detects a potential winning opportunity." 
  },
  { 
    title: "⚡ Live Scores & Game Feeds", 
    desc: "Track multiple games across different sports simultaneously with fast, accurate live updates. No more jumping between apps – GameGrid keeps it all in one dashboard." 
  },
];

const Features = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.h2
        className="text-4xl font-extrabold text-center text-green-400 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Everything You Need in One Place
      </motion.h2>
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/10 p-8 rounded-xl shadow-lg backdrop-blur-md text-center hover:shadow-green-400/40 transition-all hover:-translate-y-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * index, duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-green-400">{item.title}</h3>
            <p className="text-gray-300 mt-3 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
