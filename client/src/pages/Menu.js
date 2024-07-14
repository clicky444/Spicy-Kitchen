import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CheckBox from '../components/CheckBox';
import ItemCard from '../components/ItemCard';
import Footer from '../components/Footer';
import PopUp from '../components/PopUp';
import { useGetProductsQuery, useGetProductDetailsQuery } from '../slices/productApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import RatingBar from '../components/RatingBar';
import { BASE_URL } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import './Menu.css';
import { addToCart, saveShippingAddress, savePaymentMethod } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import paypal from '../assets/payments/paypal.png';
import { formatDistanceToNow } from 'date-fns';

const Menu = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [itemPopup, setItemPopup] = useState(false);
  const [cartPopup, setCartPopup] = useState(false);
  const [deliveryPopup, setDeliveryPopup] = useState(false);
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { data: productList, isLoading, error } = useGetProductsQuery();
  const { data: product, refetch } = useGetProductDetailsQuery(selectedProductId, { skip: !selectedProductId });
  const [filteredItems, setFilteredItems] = useState([]);
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;
  const [address1, setAddress1] = useState(shippingAddress?.address1 || '');
  const [address2, setAddress2] = useState(shippingAddress?.address2 || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [landMark, setLandMark] = useState(shippingAddress?.landmark || '');
  const [instruction, setInstructions] = useState(shippingAddress?.instruction || '');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = ["Appetizers", "Salads", "Beverages", "Desserts", "Soups", "Pizza", "Burger", "Main dishes", "Drinks", "Sri Lankan", "Italian", "Mexican", "Indian", "Chinese", "Thai"];
  const filterCuisine = ["Sri Lankan", "Italian", "Mexican", "Indian", "Chinese", "Thai"];

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleFilterCuisine = (event) => {
    const filter = event.target.value;
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleItemClick = (id) => {
    setSelectedProductId(id);
    setItemPopup(true);
  };

  useEffect(() => {
    if (!isLoading && productList) {
      if (selectedFilters.length === 0) {
        setFilteredItems(productList);
      } else {
        setFilteredItems(
          productList.filter(item =>
            selectedFilters.includes(item.category) || selectedFilters.includes(item.cuisineCategory)
          )
        );
      }
    }
  }, [selectedFilters, isLoading, productList]);

  const options = [];
  for (let i = 1; i <= 98; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    setItemPopup(false);
    setCartPopup(true);
  };

  const checkOutHandler = () => {
    setCartPopup(false);
    setDeliveryPopup(true);
  };

  const deliveryAddressHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address1, address2, city, landMark }));
    setDeliveryPopup(false);
    setPaymentPopup(true);
  };

  const paymentMethodHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    setPaymentPopup(false);
    navigate('/placeOrder');
  };

  return (
    <div>
      <Header />
      <HeroSection title="Menu" />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center text-gray-800 mb-4 sm:mb-6 md:mb-8 mt-4 sm:mt-6 md:mt-8">
        Food <span className="text-red-400">Items</span>
      </h2>
      <section className="food-items mb-8 sm:mb-12 md:mb-16">
        <div className="flex flex-col lg:flex-row justify-around items-start mt-8 sm:mt-12 md:mt-16">
          <div className="filter-container lg:ml-16 mb-8 lg:mb-0 px-4 sm:px-6 lg:px-0">
            <div className="category">
              <h2 className="text-xl sm:text-2xl">Filter Items by Category</h2>
              <div className="filter-items mt-2 sm:mt-4">
                {filters.slice(0, 9).map((filter, index) => (
                  <CheckBox key={index} title={filter} value={filter} onChange={handleFilterChange} />
                ))}
              </div>
            </div>
            <div className="cuisine mt-8 lg:mt-16">
              <h2 className="text-xl sm:text-2xl">Filter Items by Cuisine</h2>
              <div className="filter-items mt-2 sm:mt-4">
                {filterCuisine.map((filter, index) => (
                  <CheckBox key={index} title={filter} value={filter} onChange={handleFilterCuisine} />
                ))}
              </div>
            </div>
          </div>
          <div className="food-items-container w-full lg:w-auto px-4 sm:px-6 lg:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-auto">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item._id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  value={item.rating}
                  text={`${item.numReviews} reviews`}
                  onClick={() => handleItemClick(item._id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Item Details Popup */}
      <PopUp trigger={itemPopup} setTrigger={setItemPopup} width="w-2/3">
        <FontAwesomeIcon icon={faXmark} className="cursor-pointer" onClick={() => setItemPopup(false)} />
        {product && (
          <div className="flex flex-row items-center">
            <div className="w-1/2 mr-8 h-full image-container">
              <img src={`${BASE_URL}${product.image}`} className='mt-8'/>
            </div>
            <div className="w-1/2 h-auto">
              <h2 className="text-3xl font-semibold text-gray-800">{product.title}</h2>
              <h3 className="text-gray-600 font-medium text-xl mb-1.5">LKR {product.price}</h3>
              <div className="flex flex-row items-center">
                <RatingBar value={product.rating} text={product.numReviews} />
                <p className="text-lg ml-2 text-gray-500">reviews</p>
              </div>
              <hr className="h-px my-4 border bg-gray-300" />
              <h4 className="font font-medium text-xl mb-2.5">Special instructions</h4>
              <textarea className="w-full p-2.5 bg-gray-100 rounded-lg outline-none" placeholder="Add a note" />
              <p className="text-gray-600 mb-2">You may be charged for extras.</p>
              <div className="relative inline-block">
                <select className="select-dropdown w-16 p-2 mb-2 bg-gray-200 rounded-xl outline-none" onClick={(e) => setQty(Number(e.target.value))}>
                  {options}
                </select>
              </div>
              <button onClick={addToCartHandler} className="w-full p-3 mt-4 bg-black text-white font-medium rounded-xl text-lg" type="button">
                Add {qty} to order • LKR {product.price * qty}
              </button>
            </div>
          </div>
        )}
        <section className="review-section my-8">
          {product && <h2 className="text-3xl font-semibold text-gray-800">Reviews ({product.numReviews})</h2>}
          <hr className="h-px my-4 border bg-gray-300" />
          <div className="flex flex-col max-h-52 overflow-y-auto custom-scrollbar">
            {product?.reviews?.length === 0 ? (
              <h2>No reviews</h2>
            ) : (
              product?.reviews?.map((review) => (
                <div key={review?._id}>
                  <div className="flex flex-row items-start justify-between mb-4">
                    <div className="w-3/4">
                      <h3 className="text-xl font-medium text-gray-800 mb-1.5 ml-2">{review?.name}</h3>
                      <RatingBar value={review?.rating} />
                      <h3 className="text-gray-600 text-xl mb-2 ml-2 mt-1">{review?.comment}</h3>
                    </div>
                    <p className="mr-4 text-gray-500">{formatDistanceToNow(new Date(review?.createdAt), { addSuffix: true })}</p>
                  </div>
                  <hr className="my-8" />
                </div>
              ))
            )}
          </div>
        </section>
      </PopUp>

      {/* Cart Items details */}
      <PopUp trigger={cartPopup} setTrigger={setCartPopup} width="w-1/2" minHeight="h-[700px]">
        <FontAwesomeIcon icon={faXmark} className="cursor-pointer" onClick={() => setCartPopup(false)} />
        <div className="flex flex-col h-[610px]">
          <div className="flex-1 mt-3 max-h-128 custom-scrollbar overflow-y-auto">
            {cartItems.length === 0 ? (
              <h2 className="text-center text-3xl">Your Cart is empty</h2>
            ) : (
              cartItems.map((item) => (
                <div key={item._id}>
                  <CartItem id={item._id} title={item.title} price={item.price} image={item.image} quantity={item.qty} />
                  <hr className="my-4" />
                </div>
              ))
            )}
          </div>
          <div className="mt-6">
            <textarea className="w-full p-2 bg-gray-100 rounded-lg outline-none" placeholder="Add a Special note, instructions, etc." />
            <div className="flex flex-row justify-between items-center mt-4">
              <h3 className="text-2xl font-medium">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h3>
              <h3 className="text-2xl font-medium">
                LKR {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </h3>
            </div>
            <button className="w-full p-3 mt-4 bg-black text-white font-medium rounded-xl text-xl" disabled={cartItems.length === 0} onClick={checkOutHandler}>
              Go to checkout
            </button>
          </div>
        </div>
      </PopUp>

      {/* Delivery details */}
      <PopUp trigger={deliveryPopup} setTrigger={setDeliveryPopup} width="w-1/2" minHeight="h-[710px]">
        <FontAwesomeIcon icon={faXmark} className="cursor-pointer" onClick={() => setDeliveryPopup(false)} />
        <h2 className="text-3xl text-center">Delivery Address</h2>
        <form onSubmit={deliveryAddressHandler} className="mt-4">
          <div className="mb-4">
            <label htmlFor="address_line_1" className="block mb-2 text-xl font-medium text-gray-900">
              Address Line 1
            </label>
            <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} id="address_line_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5" placeholder="e.g. 50 E Waterloo Rd" required />
          </div>
          <div className="mb-4">
            <label htmlFor="address_line_2" className="block mb-2 text-xl font-medium text-gray-900">
              Address Line 2
            </label>
            <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} id="address_line_2" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5" placeholder="(optional)" />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block mb-2 text-xl font-medium text-gray-900">
              City
            </label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5" placeholder="e.g. Waterloo" required />
          </div>
          <div className="mb-4">
            <label htmlFor="landmark" className="block mb-2 text-xl font-medium text-gray-900">
              Landmark
            </label>
            <input type="text" value={landMark} onChange={(e) => setLandMark(e.target.value)} id="landmark" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-2.5" placeholder="e.g. Across Railway Station" />
          </div>
          <label htmlFor="instructions" className="block mb-2 text-xl font-medium text-gray-900">
            Instructions for delivery person
          </label>
          <textarea className="w-full p-2 bg-gray-100 rounded-lg outline-none" value={instruction} onChange={(e) => setInstructions(e.target.value)} placeholder="Add a Special note" />
          <button type="submit" className="w-full p-3 mt-6 bg-black text-white font-medium rounded-xl text-xl">
            Continue
          </button>
        </form>
      </PopUp>

      {/* Payment method details */}
      <PopUp trigger={paymentPopup} setTrigger={setPaymentPopup} width="w-1/2" minHeight="h-[310px]">
        <FontAwesomeIcon icon={faXmark} className="cursor-pointer" onClick={() => setPaymentPopup(false)} />
        <h2 className="text-3xl text-center">Payment Method</h2>
        <div className="flex items-center mt-12 justify-between cursor-pointer hover:bg-gray-50 rounded-xl transition-all ease-in-out px-6 py-4">
          <div className="flex flex-row items-center">
            <img src={paypal} alt="paypal" className="w-8 h-8 mr-4" />
            <label htmlFor="paypal_or_credit_card" className="ms-2 text-xl font-medium text-gray-900">
              PayPal
            </label>
          </div>
          <input
            id="paypal_or_credit_card"
            type="radio"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            name="paymentMethod"
            className="w-4 h-4 text-blue-600 bg-blue-600 border-blue-600 focus:ring-blue-500"
          />
        </div>
        <button type="button" onClick={paymentMethodHandler} className="w-full p-3 mt-6 bg-black text-white font-medium rounded-xl text-xl">
          Continue
        </button>
      </PopUp>

      <Footer />
    </div>
  );
};

export default Menu;
