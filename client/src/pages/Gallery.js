import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import img3 from '../assets/home/insta-3.jpg';
import img4 from '../assets/home/insta-4.jpg';
import appetizer from '../assets/gallery/appertizer.jpg';
import appetizer2 from '../assets/gallery/appertizer2.jpg';
import appetizer3 from '../assets/gallery/appertizer3.jpg';
import main1 from '../assets/gallery/main1.jpg';
import main2 from '../assets/gallery/main2.jpg';
import main3 from '../assets/gallery/main3.jpg';
import main4 from '../assets/gallery/main4.jpg';
import dessert1 from '../assets/gallery/dessert1.jpg';
import dessert2 from '../assets/gallery/dessert2.jpeg';
import dessert3 from '../assets/gallery/dessert3.jpg';
import dessert4 from '../assets/gallery/dessert4.jpg';
import drink1 from '../assets/gallery/drink1.jpg';
import drink2 from '../assets/gallery/drink2.jpg';
import interior1 from '../assets/navbar/hero2.jpg';
import interior2 from '../assets/gallery/interior2.jpg';
import even1 from '../assets/gallery/event1.jpg';
import even2 from '../assets/gallery/event2.jpg';
import even3 from '../assets/gallery/event3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import videoFile from '../assets/gallery/meal.mp4';

const Gallery = () => {
  const images = [
    { src: appetizer3, alt: 'Delicious Dish 2', category: 'Appetizers' },
    { src: dessert4, alt: 'Delicious Dish 3', category: 'Desserts' },
    { src: img3, alt: 'Restaurant Interior 1', category: 'Interior' },
    { src: img4, alt: 'Restaurant Interior 2', category: 'Interior' },
    { src: even3, alt: 'Special Event 1', category: 'Events' },
    { src: main3, alt: 'Restaurant Interior 1', category: 'Main Dishes' },
    { src: main4, alt: 'Restaurant Interior 2', category: 'Main Dishes' },
    { src: dessert3, alt: 'Special Event 1', category: 'Desserts' },
    { src: appetizer, alt: 'Delicious Dish 2', category: 'Appetizers' },
    { src: main1, alt: 'Delicious Dish 3', category: 'Main Dishes' },
    { src: dessert1, alt: 'Restaurant Interior 1', category: 'Desserts' },
    { src: drink1, alt: 'Restaurant Interior 2', category: 'Drinks' },
    { src: interior1, alt: 'Special Event 1', category: 'Interior' },
    { src: interior2, alt: 'Restaurant Interior 1', category: 'Interior' },
    { src: appetizer2, alt: 'Restaurant Interior 2', category: 'Appetizers' },
    { src: main2, alt: 'Special Event 1', category: 'Main Dishes' },
    { src: even1, alt: 'Special Event 1', category: 'Events' },
    { src: even2, alt: 'Special Event 1', category: 'Events' },
    { src: dessert2, alt: 'Restaurant Interior 1', category: 'Desserts' },
    { src: drink2, alt: 'Restaurant Interior 2', category: 'Drinks' },
  ];

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = document.getElementById('videoPlayer');
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const categories = ['All', 'Appetizers', 'Main Dishes', 'Desserts', 'Drinks', 'Interior', 'Events'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(image => image.category === selectedCategory);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <Header />
      <HeroSection title='GALLERY' />

      <section className='image-category px-4 sm:px-8 md:px-16 lg:px-24 mt-24 mb-24' data-aos="fade-up">
        <div className='flex flex-col lg:flex-row justify-between items-center mb-16'>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-center text-gray-800 mb-8 lg:mb-0">
            Photo <span className='text-red-400'>Gallery</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`mx-1 px-2 sm:px-4 py-1 sm:py-2 rounded ${selectedCategory === category ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {filteredImages.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group" data-aos="fade-up">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover transform transition duration-300 group-hover:scale-105 cursor-pointer"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <FontAwesomeIcon icon={faInstagram} className="text-white text-2xl sm:text-3xl md:text-4xl cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='video' data-aos="fade-up">
        <div className='relative px-4 sm:px-8 md:px-16 lg:px-32 mb-24'>
          <video id="videoPlayer" autoPlay loop className='w-full h-auto' onClick={togglePlay}>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            onClick={togglePlay}
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-4xl sm:text-6xl md:text-8xl bg-transparent border-2 border-white rounded-full w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 flex items-center justify-center'
          >
            {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </button>
          <div className='absolute inset-0 bg-black opacity-50 pointer-events-none'></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
