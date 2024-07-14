import React, { useState } from 'react';

const OrderDetails = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phoneNumber: '',
    address: ''
  });
  const [promoCode, setPromoCode] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  const handleAddToCart = (menuItem) => {
    // Add the selected menu item to the order
    setOrderItems([...orderItems, menuItem]);
    // Update the order total
    setOrderTotal(orderTotal + menuItem.price);
  };

  const handleRemoveFromCart = (index) => {
    // Remove the selected menu item from the order
    const updatedOrderItems = [...orderItems];
    const removedItem = updatedOrderItems.splice(index, 1)[0];
    setOrderItems(updatedOrderItems);
    // Update the order total
    setOrderTotal(orderTotal - removedItem.price);
  };

  const handleDeliveryMethodChange = (method) => {
    // Update the selected delivery method
    setDeliveryMethod(method);
  };

  const handleInputChange = (e) => {
    // Update customer information
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleApplyPromoCode = () => {
    // Logic to apply promo code and calculate discounted order total
    // For simplicity, let's assume the promo code gives a 10% discount
    const discountedTotal = orderTotal * 0.9;
    setOrderTotal(discountedTotal);
  };

  const handlePlaceOrder = () => {
    // Logic to place the order
    console.log('Order placed:', {
      items: orderItems,
      deliveryMethod,
      customerInfo,
      promoCode,
      total: orderTotal
    });
    // Clear order items and customer info after placing the order
    setOrderItems([]);
    setCustomerInfo({
      name: '',
      phoneNumber: '',
      address: ''
    });
    setPromoCode('');
    setOrderTotal(0);
    // Redirect or show confirmation message to the user
  };

  return (
    <div>
      <h2>Order Summary</h2>
      {orderItems.map((item, index) => (
        <div key={index}>
          <p>{item.name} - ${item.price}</p>
          <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
        </div>
      ))}
      <p>Total: ${orderTotal}</p>
      <h3>Delivery Method</h3>
      <div>
        <input
          type="radio"
          id="delivery"
          name="deliveryMethod"
          value="delivery"
          checked={deliveryMethod === 'delivery'}
          onChange={() => handleDeliveryMethodChange('delivery')}
        />
        <label htmlFor="delivery">Delivery</label>
        <input
          type="radio"
          id="pickup"
          name="deliveryMethod"
          value="pickup"
          checked={deliveryMethod === 'pickup'}
          onChange={() => handleDeliveryMethodChange('pickup')}
        />
        <label htmlFor="pickup">Pickup</label>
      </div>
      <h3>Customer Information</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={customerInfo.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={customerInfo.phoneNumber}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={customerInfo.address}
        onChange={handleInputChange}
      />
      <h3>Promo Code</h3>
      <input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <button onClick={handleApplyPromoCode}>Apply</button>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default OrderDetails;
