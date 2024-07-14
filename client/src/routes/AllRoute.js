import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from '../pages/Home'
import AboutUs from '../pages/AboutUs'
import Menu from '../pages/Menu'
import Reservations from '../pages/Reservations'
import Order from '../pages/Order'
import Gallery from '../pages/Gallery'
import ContactUs from '../pages/ContactUs'
import MyProfile from '../pages/MyProfile'
import MyReviews from '../pages/MyReviews'
import CartScreen from '../pages/CartScreen'
import PrivateRoute from '../components/PrivateRoute'
import PlaceOrder from '../pages/PlaceOrder'
import OrderDetails from '../pages/OrderDetails'
import MyOrders from '../pages/MyOrders'
import VerifyEmail from '../pages/VerifyEmail'
import ForgotPassword from '../pages/ForgotPassword'



const AllRoute = () => {
  return (
    <div>
      <Routes>
        {/* public routes */}
        <Route path="/*" element={<h1>404 Not Found</h1>} />
        <Route path='/' element = {<Home/>}/>
        <Route path='/aboutUs' element = {<AboutUs/>}/>
        <Route path='/menu' element = {<Menu/>}/>
        <Route path='/reservations' element = {<Reservations/>}/>
        <Route path='/order' element = {<Order/>}/>
        <Route path='/gallery' element = {<Gallery/>}/>
        <Route path='/contact' element = {<ContactUs/>}/>
        <Route path='/cart' element = {<CartScreen/>}/>

         {/* private routes */}
        <Route path='' element={<PrivateRoute/>}>
          <Route path='/myProfile' element = {<MyProfile/>}/>
          <Route path='/myReviews' element = {<MyReviews/>}/>
          <Route path='/myOrders' element = {<MyOrders/>}/>
          <Route path='/placeOrder' element = {<PlaceOrder/>}/>
          <Route path='/order/:id' element = {<OrderDetails/>}/>
          <Route path= '/users/:id/verify/:token' element= {<VerifyEmail/>}/>
          <Route path= '/users/:id/resetpassword/:token' element={<ForgotPassword/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default AllRoute
