import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import { useGetMyOrdersQuery, useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productApiSlice';
import { BASE_URL } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faStar } from '@fortawesome/free-solid-svg-icons';
import PopUp from '../components/PopUp';
import paypal from '../assets/payments/paypal.png';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import orderImage from '../assets/order/order.jpg'

const MyOrders = () => {
  const [popUp, setPopUp] = useState(false);
  const [popUpReview, setPopUpReview] = useState(false);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const { data: order, refetch, isLoading: isOrderLoading, isError } = useGetOrderDetailsQuery(selectedOrderId, {
    skip: !selectedOrderId, 
  });
  const { userInfo } = useSelector((state) => state.auth);
  const { data: product, refetch: refetchDetails } = useGetProductDetailsQuery(selectedProductId, { skip: !selectedProductId });
  const [createReview, { isLoading: loadingProductReview, error: isReviewError }] = useCreateReviewMutation();

  useEffect(() => {
    if (selectedOrderId) {
      refetch();
    }
  }, [selectedOrderId, refetch]);

  if (isLoading) {
    return <div className='flex justify-center items-center min-h-screen'>
      <Spinner/>
    </div>;
  }

  if (error) {
    return <p>Error loading order details.</p>;
  }

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateString = date.toLocaleDateString('en-GB');
    const timeString = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return `${dateString} at ${timeString}`;
  };

  const handleViewReceipt = (orderId) => {
    setSelectedOrderId(orderId);
    setPopUp(true);
  };

  const handleReview = (productId, isDelivered) => {
    setSelectedProductId(productId);
    if (isDelivered) {
      setPopUpReview(true);
    } else {
      toast.error('Order is not delivered yet. you can not add a review to this order');
    }
  };

  const ratingTexts = ["Terrible", "Poor", "Fair", "Good", "Excellent"];

  const reviewHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        product: selectedProductId,
        userId: userInfo._id,
        rating,
        comment,
      }).unwrap();
      refetchDetails();

      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
      setPopUpReview(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.data?.message || 'Failed to submit review');
    }
  };

  return (
    <div>
      <SideBar />
      <div className="p-4 sm:ml-64">
      <h2 className="text-2xl sm:text-3xl ml-4 sm:ml-6">Order history</h2>
        { orders.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-screen'>
              <img src={orderImage} alt="order" className="lg:w-64 w-40 lg:h-64 h-40 rounded-lg mt-4 sm:mt-0" />
              <p className="text-gray-500 text-3xl text-center">You have not ordered any products yet.</p>
              
            </div>
          ):(orders.map((order) => (
          <div key={order._id} className="order-card mx-4 sm:mx-6 mt-8 sm:mt-12 bg-gray-100 p-4 sm:p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex flex-col">
                <h2 className="order-id text-xl sm:text-2xl font-medium">
                  OrderID <span className="text-xl sm:text-2xl font-medium text-gray-500">{`#${order._id}`}</span>
                </h2>
                <h4 className="date">
                  Placed on <span className="text-gray-400 font-medium text-lg">{formatDateTime(order.createdAt)}</span>
                </h4>
              </div>

              <p
                onClick={() => handleViewReceipt(order._id)}
                className="mt-2 sm:mt-0 text-gray-500 text-lg font-normal hover:text-gray-900 cursor-pointer transition duration-300 ease-in-out"
              >
                View Receipt
              </p>
            </div>
            <hr className="my-4 sm:my-6" />
            {order.orderItems.length === 0 ? (
              <p className="text-gray-500">There are no orders</p>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
                  <div key={index} className="order-items grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-5 my-4 items-center cursor-pointer" onClick={() => handleReview(item.product, order.isDelivered)}>
                    <div className="item-image flex justify-center sm:justify-start">
                      <img src={`${BASE_URL}${item?.image}`} alt="item-image" className="w-24 sm:w-28 h-24 sm:h-28 rounded-lg mt-4 sm:mt-0" />
                    </div>
                    <div className="item-name flex justify-center sm:justify-start">
                      <h2 className="item-name text-xl sm:text-2xl font-medium">{item.title}</h2>
                    </div>
                    <div className="items-qty flex justify-center sm:justify-start">
                      <h3 className="item-qty text-lg sm:text-xl font-normal">
                        {item.qty}
                        {item.qty === 1 ? ' item' : ' items'}
                      </h3>
                    </div>
                    <div className="total-price flex justify-center sm:justify-start">
                      <h3 className="total-price text-lg sm:text-xl font-normal text-gray-500">LKR {item.price.toFixed(2)}</h3>
                    </div>
                    <div className="status flex justify-center sm:justify-start">
                      {order.isDelivered ? (
                        <h3 className="status text-lg sm:text-xl font-normal text-gray-800 bg-green-400 p-2 sm:p-3 rounded-3xl">Delivered</h3>
                      ) : (
                        <h3 className="status text-lg sm:text-xl font-normal text-gray-800 bg-yellow-400 p-2 sm:p-3 rounded-3xl">Pending</h3>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )))}


        {/* order item details */}
        <PopUp trigger={popUp} setTrigger={setPopUp} width="w-1/2" maxWidth="max-w-2xl" minHeight="min-h-1/2">
          <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onClick={() => setPopUp(false)} />
          {isOrderLoading ? "Loading..." : (
            <div>
              <h2 className="text-3xl font-normal text-start mt-4">Spicy Kitchen Restaurant</h2>
              {order?.isDelivered ? <h2 className="text-4xl font-medium text-start mt-8">Thanks for ordering, {order?.user.name}</h2> :
                <h2 className="text-3xl font-medium text-start mt-8">We are currently preparing your order.</h2>}

              <p className="text-gray-400 text-2xl mt-2 ml-1.5">Here is your Receipt</p>

              {/* Total */}
              <div className="flex justify-between items-center mt-12">
                <h3 className="text-2xl font-medium">Total</h3>
                <h3 className="text-2xl font-semibold text-gray-700">LKR {order?.totalPrice.toFixed(2)}</h3>
              </div>
              <hr className="my-6" />

              {/* Items */}
              <h3 className="text-2xl font-medium">Items</h3>
              <div className="w-full h-auto popup-custom-scrollbar">
                {order?.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mt-8">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p className="text-gray-700 text-xl bg-gray-200 p-2.5 rounded-lg font-medium">{item.qty}</p>
                        <h3 className="text-xl font-medium ml-3">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-500 text-lg mt-1 mr-1">LKR {item.price.toFixed(2)}</p>
                  </div>
                ))}
                <hr className="my-4" />
              </div>

              {/* Sub total */}
              <div className="flex justify-between items-center mt-8">
                <h3 className="text-xl font-medium">Sub Total</h3>
                <p className="text-xl font-medium text-gray-600">LKR {order?.itemsPrice.toFixed(2)}</p>
              </div>

              {/* Delivery fee */}
              <div className="flex justify-between items-center mt-6">
                <h3 className="text-xl font-medium">Delivery Fee</h3>
                <p className="text-xl font-medium text-gray-600">LKR {order?.deliveryFee.toFixed(2)}</p>
              </div>
              <hr className="my-6 bg-gray-500 h-px" />

              {/* Payment method */}
              <h3 className="text-2xl font-medium">Payment method</h3>
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center">
                  <img src={paypal} alt="paypal" className="w-8 h-8" />
                  <h3 className="text-xl font-medium ml-2.5">Paypal</h3>
                </div>
                <p className="text-xl font-medium text-gray-600">LKR {order?.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          )}
        </PopUp>

        {/* order item review */}
        <PopUp trigger={popUpReview} setTrigger={setPopUpReview} width="w-1/2" maxWidth="max-w-2xl" minHeight="min-h-1/2">
          <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onClick={() => setPopUpReview(false)} />
          <form onSubmit={reviewHandler} className="my-6" method="post">
            <h2 className='text-3xl font-semibold text-gray-800 mb-2 mt-3'>Add a review</h2>
            <div className='mb-4'>
              <label htmlFor="rating" className="block mb-12 text-xl font-medium text-gray-900 mt-6"> Select a Rating</label>

              <div className="flex flex-row items-center mb-12">
                {[...Array(5)].map((star, index) => (
                  <div key={index} className='relative'>
                    <input
                      type="radio"
                      name="rating"
                      value={index + 1}
                      id={`star-${index + 1}`}
                      className="form-radio hidden"
                      onChange={(e) => setRating(Number(e.target.value))}
                    />
                    <label htmlFor={`star-${index + 1}`} className="flex items-center">
                      <FontAwesomeIcon
                        icon={faStar}
                        className={`text-3xl mx-1.5 ${index + 1 <= (hover || rating) ? "text-yellow-400" : "text-gray-400"} cursor-pointer`}
                        onMouseEnter={() => setHover(index + 1)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                    {index + 1 === (hover || rating) && (
                      <span className="absolute left-0 font-medium text-gray-700 text-lg mt-4">
                        {ratingTexts[index]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className='mb-4 mt-28'>
              <label htmlFor="comment" className="block mb-2 text-xl font-medium text-gray-900">Comment</label>
              <textarea className='w-full p-2.5 bg-gray-100 rounded-lg outline-none' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add a note' />
            </div>
            <button className='w-1/2 p-3 mt-4 bg-black text-white font-medium rounded-xl text-lg' type='submit'>Add a review</button>
          </form>
        </PopUp>
      </div>
    </div>
  );
};

export default MyOrders;
