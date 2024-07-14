import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import { useSelector } from 'react-redux';
import RatingBar from '../components/RatingBar';
import { useGetProductsQuery } from '../slices/productApiSlice';
import { BASE_URL } from '../constants';
import review from '../assets/reviews/review.jpg'
import Spinner from '../components/Spinner';

const MyReviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const { data: products, isLoading, error } = useGetProductsQuery();

  useEffect(() => {
    if (products) {
      const reviews = [];
      products.forEach((product) => {
        product.reviews.forEach((review) => {
          if (review.user === userInfo._id) {
            reviews.push({ ...review, product });
          }
        });
      });
      setUserReviews(reviews);
    }
  }, [products, userInfo._id]);

  if (isLoading) {
    return <div className='flex justify-center items-center min-h-screen'>
      <Spinner/>
    </div>;
  }

  if (error) {
    return <p>Error loading products.</p>;
  }

  return (
    <div>
      <SideBar />
      <div className="p-4 sm:ml-64">
      <h2 className="text-2xl sm:text-3xl ml-4 sm:ml-6">My Reviews</h2>
        <div className="h-auto sm:h-96 w-full mb-10 sm:mb-20">
          {userReviews.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-screen'>
              <img src={review} alt="review" className="lg:w-64 w-40 lg:h-64 h-40 rounded-lg mt-4 sm:mt-0" />
              <p className="text-gray-500 text-3xl text-center">You have not reviewed any products yet.</p>
              
            </div>
          ) : (
            userReviews.map((review) => (
              <div key={review._id} className="review-card mx-4 sm:mx-6 mt-8 sm:mt-12 bg-gray-100 p-4 sm:p-6 rounded-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start mb-4 sm:mb-5">
                  <img src={`${BASE_URL}${review.product.image}`} alt={review.product.title} className="w-24 sm:w-28 h-24 sm:h-28 rounded-lg mt-4 sm:mt-0" />
                  <h2 className="product-name text-xl sm:text-2xl font-medium mt-4 sm:mt-0 sm:ml-8">{review.product.title}</h2>
                </div>
                <RatingBar value={review?.rating} />
                <p className="comment text-base sm:text-lg font-normal text-gray-500 mt-2">{review.comment}</p>
              </div>
            ))
          )}
        </div>

      </div>
      <div className="h-96 w-full mb-20"></div>
    </div>
  );
};

export default MyReviews;
