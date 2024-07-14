import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img1 from '../assets/home/harps-joseph-_-hYymSwxUM-unsplash.jpg';
import img2 from '../assets/home/joyful-vT5xrj3z1OE-unsplash.jpg';
import img3 from '../assets/home/istockphoto-1155921165-612x612.jpg';

const specialOffers = [
  {
    title: 'Happy Hour Specials',
    description: 'Enjoy 50% off on all drinks every weekday from 4 PM to 6 PM.',
    image: img1
  },
  {
    title: 'Family Feast',
    description: 'Get a free dessert with every family meal order on weekends.',
    image: img2
  },
  {
    title: 'Loyalty Program',
    description: 'Join our loyalty program and earn points for every dollar spent.',
    image: img3
  }
];

const SpecialOffers = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-12 bg-yellow-100" id="special-offers">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-medium text-center text-gray-800 mb-8" data-aos="fade-up">Special Offers & Promotions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialOffers.map((offer, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
              <img src={offer.image} alt={offer.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800">{offer.title}</h3>
                <p className="text-gray-600 mt-2">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
