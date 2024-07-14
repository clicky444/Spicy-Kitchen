import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap mb-8 justify-between">
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h2 className="text-2xl font-semibold text-white mb-4">Spicy Kitchen</h2>
            <p>
                Welcome to Spicy Kitchen, where culinary excellence meets a warm and inviting atmosphere. Located in the heart of the city, we pride ourselves on offering a unique dining experience with a menu that features a blend of traditional and contemporary dishes. 
            </p>

            <div className="flex mt-4 justify-center">
              <FontAwesomeIcon icon={faFacebook} className='mr-4 w-8 h-8'/>
              <FontAwesomeIcon icon={faTwitter} className='mr-4 w-8 h-8'/>
              <FontAwesomeIcon icon={faInstagram} className='w-8 h-8'/>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h2 className="text-2xl font-semibold text-white mb-4">Open Hours</h2>
            <ul className="space-y-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                <li key={index} className="flex justify-between">
                  <span>{day}</span>
                  <span>8:00AM - 9:00PM </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h2 className="text-2xl font-semibold text-white mb-4">Newsletter</h2>
            <p>Far far away, behind the word mountains, far from the countries.</p>
            <form action="#" className="mt-4">
              <input
                type="text"
                className="w-full p-2 mb-2 text-center bg-gray-800 border border-gray-700 rounded text-gray-300"
                placeholder="Enter email address"
              />
              <button
                type="submit"
                className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>
        <div className="text-center">
          <p className="text-gray-500">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
