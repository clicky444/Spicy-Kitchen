import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../constants';
import {increaseItemCount, decreaseItemCount, removeFromCart} from '../slices/cartSlice'
import { useDispatch } from 'react-redux';


const CartItem = ({id,title, price, image, quantity}) => {
  const dispatch = useDispatch();
  const baseUrl = BASE_URL
  const imagePath = `${baseUrl}${image}`;

  const increaseItemHandler = () => {
    dispatch(increaseItemCount(id));
  }

  const decreaseItemHandler = ()=> {
    dispatch(decreaseItemCount(id));
  }

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(id));
  }

  const totalPrice = price * quantity;

  return (
    <div className='flex flex-row justify-between items-center w-full'>
        <div className='flex flex-row items-center'>
        <img src={imagePath} className='w-28 h-28 rounded-xl'/>
        <div className='block ml-8'>
            <h2 className='text-2xl font-semibold'>{title}</h2>
            <h3 className='text-xl'>LKR {totalPrice.toFixed(2)}</h3>
        </div>
        </div>
        <div className='flex flex-row justify-between items-center'>
            <div className='flex items-center space-x-4 justify-center w-24 bg-gray-200 rounded-2xl'>
                <button className='bg-transparent text-gray-700 text-4xl' onClick={decreaseItemHandler}>-</button>
                <h3 className='text-xl'>{quantity}</h3>
                <button className='bg-transparent text-gray-700 text-4xl' onClick={increaseItemHandler}>+</button>
            </div>
            <FontAwesomeIcon icon={faTrash} className='ml-6 mr-3 cursor-pointer' onClick={removeFromCartHandler}/>
        </div>
    
      
    </div>
  )
}

export default CartItem
