export const addDecimal = (num)=> {
    return (Math.round(num * 100)/100).toFixed(2);

}

export const updateCart = (state)=> {
     //calculate items price
     state.itemsPrice = addDecimal(state.cartItems.reduce((acc,item) => acc+ item.price * item.qty, 0));
     //shipping price
     state.shippingPrice = addDecimal(100);

     //service charge
     state.serviceCharge = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));

     //total price
     state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.serviceCharge)).toFixed(2);
     //total qty
     // state.totalQty = state.cartItems.reduce((qty, item) => qty + item.qty, 0);
     localStorage.setItem('cart', JSON.stringify(state));

     return state;

}