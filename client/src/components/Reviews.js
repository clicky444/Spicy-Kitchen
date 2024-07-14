import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img1 from '../assets/home/testimonial-2.jpg';
import img2 from '../assets/home/testimonial-3.jpg';
import img3 from '../assets/home/testimonial-4.jpg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../src/style.css';

const reviews = [
  {
    name: 'John Doe',
    review: 'The food was absolutely wonderful, from preparation to presentation, very pleasing.',
    image: img1,
  },
  {
    name: 'Jane Smith',
    review: 'We had a great experience! The atmosphere is very welcoming and charming.',
    image: img2,
  },
  {
    name: 'Sam Wilson',
    review: 'The service was excellent, and the dishes were delicious. Highly recommended!',
    image: img3,
  },
];

const Reviews = () => {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 pt-24" id="reviews">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-normal text-center text-gray-800 mb-8" data-aos="fade-up">
          What People Think <span className='text-red-400'>About Us</span>
        </h2>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden p-6 " data-aos="fade-up" data-aos-delay={`${index * 100}`}>
              <img src={review.image} alt={review.name} className="w-28 h-28 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center text-gray-800">{review.name}</h3>
              <div className="flex items-center justify-center my-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-300 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mt-2 text-center">{review.review}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Reviews;
