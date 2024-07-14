import React, {useEffect} from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useGetProductsQuery } from '../slices/productApiSlice';
import { BASE_URL } from '../constants';

const FeaturedDishes = () => {

  const { data: featuredDishes} = useGetProductsQuery();

    useEffect(() => {
        Aos.init({ duration: 1000 });
      }, []);


  return (
    <section className="py-12 bg-gray-100" id="featured-dishes">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-normal text-center text-gray-800 mb-8" data-aos="fade-up">Featured Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDishes && featuredDishes.slice(0,6).map((dish, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
              <img src={ BASE_URL + dish.image} alt={dish.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800">{dish.title}</h3>
                <p className="text-gray-600 mt-2">{dish.description}</p>
                <div className="mt-4 text-lg font-bold text-gray-800">{`LKR ${dish.price.toFixed(2)}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
