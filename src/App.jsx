import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import EmailForm from './components/EmailForm';

const App = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Hero />
      <Features />
      <EmailForm />
    </div>
  );
};

export default App;
