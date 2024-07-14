import React from 'react';

import img1 from '../assets/home/insta-1.jpg';
import img2 from '../assets/home/insta-2.jpg';
import img3 from '../assets/home/insta-3.jpg';
import img4 from '../assets/home/insta-4.jpg';
import img5 from '../assets/home/insta-5.jpg';

const photos = [
  { src: img1, alt: 'Delicious Dish 1' },
  { src: img2, alt: 'Delicious Dish 2' },
  { src: img3, alt: 'Delicious Dish 3' },
  { src: img4, alt: 'Delicious Dish 4' },
  { src: img5, alt: 'Delicious Dish 5' },
];

const PhotoGallery = () => {
  return (
    <section className="pt-16 sm:pt-24 md:pt-32 lg:pt-48" id="gallery">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-center text-gray-800 mb-8">
          Photo <span className='text-red-400'>Gallery</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="w-full">
              <img src={photo.src} alt={photo.alt} className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
