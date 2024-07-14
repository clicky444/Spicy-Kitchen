import React from 'react';
import { BASE_URL } from '../constants';
import RatingBar from './RatingBar';

const ItemCard = ({ image, title, price, onClick, value, text }) => {
  const baseUrl = BASE_URL;
  const imagePath = `${baseUrl}${image}`;
  console.log('Image Path:', imagePath);

  return (
    <div className='bg-white w-full sm:w-1/2 md:w-1/3 lg:w-72 h-auto pb-3 rounded-2xl shadow-xl mx-auto my-4'>
      <img
        src={imagePath}
        alt={title}
        className='w-full h-64 object-cover rounded-t-2xl cursor-pointer'
        onClick={onClick}
        onError={(e) => {
          e.target.onerror = null; e.target.src="/path/to/placeholder/image.jpg";
        }}
      />
      <h3 className='text-start m-3 text-2xl'>{title}</h3>
      <h3 className='text-start m-3 text-xl font-semibold'>{`LKR ${price}`}</h3>
      <div className='ml-2'>
        <RatingBar value={value} text={text} />
      </div>
    </div>
  );
};

export default ItemCard;
