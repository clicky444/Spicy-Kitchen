import React, { useEffect } from 'react';
import Header from '../components/Header';

import bgImage2 from '../assets/navbar/hero2.jpg';
import chef1 from '../assets/about/chef-1.jpg';
import chef2 from '../assets/about/chef-2.jpg';
import chef3 from '../assets/about/chef-3.jpg';
import chef4 from '../assets/about/chef-4.jpg';
import '../../src/style.css'
import Footer from '../components/Footer'
import AOS from 'aos';
import HeroSection from '../components/HeroSection';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <Header />
      <HeroSection title= 'About Us'/>
      <section className="py-12 px-4 sm:px-8 md:px-12 lg:px-24 mt-24 flex flex-col lg:flex-row justify-between items-center" data-aos="fade-up">
      <img src={bgImage2} alt='Our Story Image' className='w-full lg:w-1/2 mb-8 lg:mb-0' />
      <div className="container mx-auto px-4 lg:ml-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center text-gray-800 mb-8">
          Our <span className='text-red-400'>Story</span>
        </h2>
        <p className="text-center text-base sm:text-lg text-gray-600 tracking-wider leading-7 sm:leading-8 md:leading-9">
          Our restaurant was established in 2010 with the goal of creating a distinctive dining experience. Our mission is to provide exceptional service and delectable dishes that bring people together, creating a warm and inviting atmosphere where cherished memories are made. From the freshest ingredients to traditional recipes, we are dedicated to excellence in every aspect of our restaurant.
        </p>
      </div>
    </section>

      <section className="py-12 " data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <span className=" intro-about text-customOrange absolute">Chef</span>
            <h2 className="text-5xl font-bold text-gray-800 mb-4 relative mt-24 ml-24">Our Master Chef</h2>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-72 bg-cover" style={{ backgroundImage: `url(${chef1})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">John Smooth</h3>
                <span className="block text-gray-400 mb-2">Restaurant Owner</span>
                <p className="text-gray-600 text-lg tracking-wide">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-72 bg-cover " style={{ backgroundImage: `url(${chef2})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Rebeca Welson</h3>
                <span className="block text-gray-400 mb-2">Head Chef</span>
                <p className="text-gray-600 text-lg tracking-wide">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-72 bg-cover " style={{ backgroundImage: `url(${chef3})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Kharl Branyt</h3>
                <span className="block text-gray-400 mb-2">Chef</span>
                <p className="text-gray-600 text-lg tracking-wide">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-72 bg-cover " style={{ backgroundImage: `url(${chef4})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Luke Simon</h3>
                <span className="block text-gray-400 mb-2">Chef</span>
                <p className="text-gray-600 text-lg tracking-wide">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
    </div>
  );
};

export default AboutUs;
