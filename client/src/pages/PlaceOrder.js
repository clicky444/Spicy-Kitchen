import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPerson, faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';
import clock from '../assets/delivery/clock .png';
import delivery from '../assets/delivery/delivery.jpg';
import deadline from '../assets/delivery/deadline.png';
import paypal from '../assets/payments/paypal.png';
import './Menu.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems, saveShippingAddress, savePaymentMethod } from '../slices/cartSlice';
import { BASE_URL } from '../constants';
import PopUp from '../components/PopUp';

const PlaceOrder = () => {
  const [deliveryPopup, setDeliveryPopup] = useState(false);
  const [dropoffPopup, setDropoffPopup] = useState(false);
  const [dropoff, setDropoff] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [address1, setAddress1] = useState(cart.shippingAddress.address1 || '');
  const [address2, setAddress2] = useState(cart.shippingAddress.address2 || '');
  const [city, setCity] = useState(cart.shippingAddress.city || '');

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const itemsPrice = Number(cart.itemsPrice);
      const shippingPrice = Number(cart.shippingPrice);
      const serviceCharge = Number(cart.serviceCharge);
      const totalPrice = itemsPrice + deliveryFee + serviceCharge;

      const res = await createOrder({
        orderItems: cart.cartItems,
        deliveryAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice.toFixed(2),
        deliveryFee: deliveryFee.toFixed(2),
        serviceFee: serviceCharge.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
      }).unwrap();

      dispatch(clearCartItems());
      toast.success('Order placed successfully');
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to place order');
    }
  };

  const deliveryAddressHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address1, address2, city }));
    setDeliveryPopup(false);
    toast.success('Address updated successfully');
  };

  const dropoffHandler = (e) => {
    e.preventDefault();
    setDropoffPopup(false);
    toast.success('Dropoff option updated successfully');
  };

  const selectPriorityDelivery = () => {
    setDeliveryFee(129); 
  };

  const selectStandardDelivery = () => {
    setDeliveryFee(0);
  };

  return (
    <div>
      <section className='px-4 sm:px-6 lg:px-52 header flex flex-col sm:flex-row items-center justify-between w-full h-16'>
        <div className='back-button flex flex-row items-center mb-2 sm:mb-0'>
          <Link to='/menu'>
            <FontAwesomeIcon icon={faArrowLeft} className='text-lg sm:text-xl text-gray-600' />
          </Link>
          <p className='ml-2 sm:ml-4'>Back to store</p>
        </div>
        <h2 className='text-xl sm:text-2xl lg:text-3xl font-medium text-center lg:mr-96'>Spicy Kitchen</h2>
      </section>
      <section className='w-full h-screen bg-gray-100'>
        <div className='flex flex-col lg:flex-row px-4 sm:px-6 lg:px-52 justify-center lg:space-x-4 items-center w-full h-auto lg:h-screen'>
          <div className='flex flex-col w-full lg:w-4/5 h-auto'>
            <div className='bg-white w-full h-auto rounded-lg p-4 sm:p-6'>
              <h2 className='text-xl sm:text-2xl font-medium'>Delivery details</h2>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4'>
                <div className='flex items-center'>
                  <img src={delivery} alt='delivery' className='w-12 sm:w-16 h-12 sm:h-16' />
                  <h4 className='text-lg sm:text-xl ml-4'>
                    {cart?.shippingAddress.address1},
                    {cart?.shippingAddress.address2 === "" 
                      ? cart?.shippingAddress.city 
                      : ` ${cart?.shippingAddress.address2}, ${cart?.shippingAddress.city}`}
                  </h4>
                </div>
                <button onClick={() => setDeliveryPopup(true)} className='mt-2 sm:mt-0 rounded-xl bg-gray-200 p-2'>Edit</button>
              </div>
              <hr className='my-4' />
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faPerson} className='text-3xl sm:text-4xl ml-0 sm:ml-6' />
                  <h4 className='text-lg sm:text-xl ml-4 sm:ml-8'>{dropoff || 'Meet at my door'}</h4>
                </div>
                <button onClick={() => setDropoffPopup(true)} className='mt-2 sm:mt-0 rounded-xl bg-gray-200 p-2'>Edit</button>
              </div>
              <hr className='my-4' />
              <h2 className='text-xl sm:text-2xl font-medium mt-6'>Delivery options</h2>
              <div onClick={selectPriorityDelivery} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 border border-gray-200 p-4 rounded-xl cursor-pointer ${deliveryFee === 129 ? 'bg-gray-200' : ''}`}>
                <div className='flex items-center'>
                  <img src={deadline} alt='delivery' className='w-10 sm:w-12 h-10 sm:h-12' />
                  <div>
                    <h4 className='text-lg sm:text-xl ml-4'>Priority <span className='text-white bg-green-700 p-1.5 text-sm rounded-2xl ml-2'>Faster</span></h4>
                    <p className='text-gray-500 ml-4 mt-1.5'>10-25 min • Delivered directly to you</p>
                  </div>
                </div>
                <p className='text-gray-500 mt-2 sm:mt-0'>+LKR 129.00</p>
              </div>
              <div onClick={selectStandardDelivery} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 border border-gray-200 p-4 rounded-xl cursor-pointer ${deliveryFee === 0 ? 'bg-gray-200' : ''}`}>
                <div className='flex items-center'>
                  <img src={clock} alt='clock' className='w-8 sm:w-10 h-8 sm:h-10 ml-0 sm:ml-1' />
                  <div>
                    <h4 className='text-lg sm:text-xl ml-4 sm:ml-6'>Standard</h4>
                    <p className='text-gray-500 ml-4 sm:ml-6 mt-1'>15-30 min</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-white w-full h-auto rounded-lg p-4 sm:p-6 mt-4'>
              <h2 className='text-xl sm:text-2xl font-medium'>Payment method</h2>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6'>
                <div className='flex items-center'>
                  <img src={paypal} alt='paypal' className='w-6 sm:w-8 h-6 sm:h-8' />
                  <h4 className='text-lg sm:text-xl ml-4'>{cart.paymentMethod}</h4>
                </div>
               
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full lg:w-1/2 h-auto'>
            <div className='bg-white w-full h-64 sm:h-80 max-h-80 hover:overflow-y-auto overflow-hidden rounded-lg p-4 sm:p-6 mt-4 sm:mt-6 custom-scrollbar'>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faCartShopping} className='text-gray-500' />
                <h3 className='text-xl sm:text-2xl font-medium ml-4'>Cart summary ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)})</h3>
              </div>
              {cart.cartItems.length === 0 ? (
                <p className='text-gray-500'>Your cart is empty</p>
              ) : (
                <div>
                  {cart.cartItems.map((item, index) => (
                    <div key={index}>
                      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4'>
                        <div className='flex items-center'>
                          <img src={`${BASE_URL}${item.image}`} alt='image' className='w-16 sm:w-20 h-16 sm:h-20 mr-4 rounded-lg' />
                          <div>
                            <h3 className='text-lg sm:text-xl font-medium'>{item.title}</h3>
                            <p className='text-gray-500 mt-1'>LKR {item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <p className='text-gray-700 text-lg sm:text-xl mt-2 sm:mt-0 bg-gray-200 p-2.5 rounded-lg font-medium'>{item.qty}</p>
                      </div>
                      <hr className='my-4' />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='bg-white w-full h-auto rounded-lg p-4 sm:p-6 mt-4 mb-4'>
              <h2 className='text-xl sm:text-2xl font-medium mb-4 sm:mb-6'>Order Total</h2>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg sm:text-xl font-normal'>Subtotal</h3>
                <h3 className='text-lg font-normal text-gray-500'>LKR {Number(cart.itemsPrice).toFixed(2)}</h3>
              </div>
              <div className='flex items-center justify-between my-4'>
                <h3 className='text-lg sm:text-xl font-normal'>Delivery fee</h3>
                <h3 className='text-lg font-normal text-gray-500'>LKR {Number(deliveryFee).toFixed(2)}</h3>
              </div>
              <div className='flex items-center justify-between my-4'>
                <h3 className='text-lg sm:text-xl font-normal'>Service fee</h3>
                <h3 className='text-lg font-normal text-gray-500'>LKR {Number(cart.serviceCharge).toFixed(2)}</h3>
              </div>
              <hr className='my-4' />
              <div className='flex items-center justify-between mb-4 sm:mb-8'>
                <h3 className='text-lg sm:text-xl font-medium'>Total</h3>
                <h3 className='text-lg sm:text-xl font-semibold text-gray-700'>LKR {(Number(cart.itemsPrice) + Number(deliveryFee) + Number(cart.serviceCharge)).toFixed(2)}</h3>
              </div>
              <button onClick={placeOrderHandler} type='button' className='w-full p-3 bg-black text-white font-medium rounded-xl text-lg sm:text-xl'>Place order</button>
            </div>
          </div>
        </div>
      </section>


      {/* edit address */}
      <PopUp trigger={deliveryPopup} setTrigger={setDeliveryPopup} width='w-1/3'>
        <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onClick={() => setDeliveryPopup(false)} />
        <h2 className='text-3xl text-center mb-6'>Delivery Address</h2>
        <form onSubmit={deliveryAddressHandler} className='mt-4'>
          <div className='mb-4'>
            <label htmlFor="address_line_1" className="block mb-2 text-xl font-medium text-gray-900">Address Line 1</label>
            <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} id="address_line_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5" placeholder="e.g. 50 E Waterloo Rd" required />
          </div>
          <div className='mb-4'>
            <label htmlFor="address_line_2" className="block mb-2 text-xl font-medium text-gray-900">Address Line 2</label>
            <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} id="address_line_2" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5" placeholder="(optional)" />
          </div>
          <div className='mb-4'>
            <label htmlFor="city" className="block mb-2 text-xl font-medium text-gray-900">City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5" placeholder="e.g. Waterloo" required />
          </div>
          <button type='submit' className='w-full p-3 mt-6 bg-black text-white font-medium rounded-xl text-xl mb-4'>Update</button>
        </form>
      </PopUp>

      {/* dropoff options */}
      <PopUp trigger={dropoffPopup} setTrigger={setDropoffPopup} width='w-1/3'>
        <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onClick={() => setDropoffPopup(false)} />
        <h2 className='text-3xl text-center mb-6'>Dropoff Options</h2>
        <form onSubmit={dropoffHandler} className='mt-4'>
          <div className="flex flex-col items-center">
            <div className="flex items-center w-full justify-start cursor-pointer hover:bg-gray-50 rounded-xl transition-all ease-in-out px-6 py-4">
              <input
                id="meet_at_my_door"
                type="radio"
                value="Meet at my door"
                name="dropoff"
                className="w-4 h-4 text-blue-600 bg-blue-600 border-blue-600 focus:ring-blue-500 cursor-pointer"
                onChange={(e) => setDropoff(e.target.value)}
              />
              <label htmlFor="meet_at_my_door" className="ms-2 text-xl font-medium text-gray-900 cursor-pointer">
                Meet at my door
              </label>
            </div>

            <div className="flex items-center w-full justify-start cursor-pointer hover:bg-gray-50 rounded-xl transition-all ease-in-out px-6 py-4">
              <input
                id="meet_outside"
                type="radio"
                value="Meet outside"
                name="dropoff"
                className="w-4 h-4 text-blue-600 bg-blue-600 border-blue-600 focus:ring-blue-500 cursor-pointer"
                onChange={(e) => setDropoff(e.target.value)}
              />
              <label htmlFor="meet_outside" className="ms-2 text-xl font-medium text-gray-900 cursor-pointer">
                Meet outside
              </label>
            </div>

            <div className="flex items-center w-full justify-start cursor-pointer hover:bg-gray-50 rounded-xl transition-all ease-in-out px-6 py-4">
              <input
                id="meet_in_the_lobby"
                type="radio"
                value="Meet in the lobby"
                name="dropoff"
                className="w-4 h-4 text-blue-600 bg-blue-600 border-blue-600 focus:ring-blue-500 cursor-pointer"
                onChange={(e) => setDropoff(e.target.value)}
              />
              <label htmlFor="meet_in_the_lobby" className="ms-2 text-xl font-medium text-gray-900 cursor-pointer">
                Meet in the lobby
              </label>
            </div>
          </div>
          <button type='submit' className='w-full p-3 mt-6 bg-black text-white font-medium rounded-xl text-xl mb-4'>Update</button>
        </form>
      </PopUp>
    </div>
  );
}

export default PlaceOrder;
