import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import CounterSection from '../components/Counter'
import FeaturedDishes from '../components/Features'
import SpecialOffers from '../components/SpecialOffer'
import Reviews from '../components/Reviews'
import PhotoGallery from '../components/PhotoGallery'
import '../../src/style.css'
import Footer from '../components/Footer'
import Location from '../components/Location'




const Home = () => {
  return (
    <div>
      <Header/>
      <Hero/>
       <div className='text-center mt-12'>
       <div className="px-4 sm:px-8 lg:px-16 py-8">
          <p className="intro-about text-customOrange text-lg sm:text-xl mb-16">About</p>
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2">Spicy Kitchen Restaurant</div>
          <div className="text-base sm:text-lg md:text-xl mt-4 sm:mt-6 lg:mt-8 text-gray-500 max-w-prose mx-auto mb-10">
            At Spicy Kitchen, we bring you a vibrant culinary experience where every dish is a celebration of flavor and passion. Located in the heart of New York, our restaurant is dedicated to serving mouth-watering dishes that blend traditional recipes with contemporary twists.
          </div>
          <CounterSection />
        </div>
         <FeaturedDishes/>
         <SpecialOffers/>
         <Location/>
         <div className='review-gallery relative'>
          <Reviews />
          <PhotoGallery />
         </div>
         <Footer/>
       </div>
    </div>
  )
}

export default Home
