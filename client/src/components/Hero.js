import React, { useState, useEffect } from 'react';
import '../../src/style.css';
import {Link} from 'react-router-dom'
import img1 from '../assets/navbar/hero.jpg';
import img2 from '../assets/navbar/hero1.jpg';
import img3 from '../assets/navbar/hero2.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);


  const images = [img1, img2, img3];

  const texts = [
    "OUR DELICIOUS SPECALITIES",
    "CREAMY HOT AND READY TO SERVE",
    "THE BEST PLACE TO KICK OF YOUR DAY"
  ];

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide" onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      <div className="relative w-full min-h-screen overflow-hidden md:h-96">
        {images.map((image, index) => (
          <div 
          key={index} 
          className={`${index === currentSlide ? '' : 'hidden'} duration-700 ease-in-out`} data-carousel-item
          >
            <img src={image} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" 
             
             alt={`Slide ${index + 1}`} />
             
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
              <div className="absolute w-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" style={{ lineHeight: '1.5' }}>{texts[index]}</h1>

                <div className='flex items-center mt-4 justify-center'>
                  <Link to='/reservations'>
                     <button className='p-4 px-xl-4 py-xl-3 bg-customOrange text-white text-lg rounded-sm hover:bg-transparent hover:border hover:border-customOrange hover:text-customOrange'>Make a Reservation</button>
                  </Link>
                  <Link to='/menu'>
                     <button className='p-4 px-xl-4 py-xl-3 bg-transparent ml-4 border border-solid text-white text-lg rounded-sm hover:bg-white hover:text-customOrange'>View Menu</button>
                  </Link>
                </div>
              </div>
              
          </div>
        ))}
         
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-500'}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>

      <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" style={{ 
            visibility: isHovered ? 'visible' : 'hidden',
            opacity: isHovered ? 1 : 0, 
            transition: 'opacity 0.8s ease-in-out', 
          }} data-carousel-prev onClick={goToPrevSlide}>
      
        <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
        </svg>
        <span className="sr-only">Previous</span>
      
      </button>
      <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" style={{ 
            visibility: isHovered ? 'visible' : 'hidden',
            opacity: isHovered ? 1 : 0, 
            transition: 'opacity 0.7s ease-in-out', 
          }} data-carousel-next onClick={goToNextSlide}>
      
            <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        
      </button>
    </div>
  );
};

export default Hero;





