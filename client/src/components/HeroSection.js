import React from 'react';
import bgImage from '../assets/navbar/hero1.jpg';

const HeroSection = ({title }) => {
  return (
    <section
      className="w-full h-96 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
      data-stellar-background-ratio="0.5"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container relative z-10 h-full flex items-center justify-center">
        <h1 className="text-white text-4xl text-center">{title}</h1>
      </div>
    </section>
  );
};

export default HeroSection;
