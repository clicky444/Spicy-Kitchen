import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AOS from 'aos';
import 'aos/dist/aos.css';

const mapStyles = {
  height: "400px",
  width: "100%",
};

const defaultCenter = {
  lat: 40.730610, 
  lng: -73.935242, 
};

const Location = () => {
    useEffect(() => {
        AOS.init({ duration: 3000 });
      }, []);

  return (
    <section className="py-12 bg-gray-100" id="location">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-normal text-center text-gray-800 mb-8">
          Our <span className='text-red-400'>Location</span>
        </h2>
        <div className="mb-8">
          <p className="text-center text-gray-600">
            We are located in the heart of the city, easily accessible and ready to serve you the best culinary delights. Visit us for an unforgettable dining experience.
          </p>
        </div>
        <div className='flex justify-center'>
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63321.01686791662!2d79.83977708453042!3d6.927079391756785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591e39d4b291%3A0x80b8f15e8cfecd0e!2sNo.%2024%2C%20Lotus%20Road%2C%20Colombo%2001%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1622400429387!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
            >  
          </iframe>
          </div>
      </div>
    </section>
  );
};

export default Location;
