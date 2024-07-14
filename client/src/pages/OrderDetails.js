import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import paypalImg from '../assets/payments/paypal.png';
import user from '../assets/delivery/user.png';
import email from '../assets/delivery/email.png';
import address from '../assets/delivery/delivery.png';
import landmark from '../assets/delivery/landmark.png';
import orderID from '../assets/delivery/order-id.png';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/ordersApiSlice';
import { useCreatePaymentMutation } from '../slices/paymentApiSlice';
import { BASE_URL } from '../constants';
import { PayPalButtons, usePayPalScriptReducer, FUNDING } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import PopUp from '../components/PopUp';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const OrderDetails = () => {
    const [paymentPopup, setPaymentPopup] = useState(false);
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, isError } = useGetOrderDetailsQuery(orderId);
    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();
    const [createPaymentIntent, { isLoading: loadingPayment }] = useCreatePaymentMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD'
                    }
                });
                paypalDispatch({
                    type: 'setLoadingStatus',
                    value: 'pending'
                });
            };
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success('Payment successful');
                navigate('/myOrders');
            } catch (error) {
                console.log(error);
                toast.error('Payment failed');
            }
        });
    };

    const onError = (err) => {
        console.log(err);
        toast.error(err.message);
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: order?.totalPrice,
                }
            }]
        }).then((orderId) => {
            return orderId;
        });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading order details.</p>;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            const paymentData = { amount: order.totalPrice };
            const result = await createPaymentIntent(paymentData).unwrap();
            const { clientSecret } = result;

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: order.user.name,
                        email: order.user.email,
                    },
                },
            });

            if (paymentResult.error) {
                toast.error(paymentResult.error.message);
            } else {
                if (paymentResult.paymentIntent.status === 'succeeded') {
                    await payOrder({ orderId, details: paymentResult.paymentIntent });
                    refetch();
                    toast.success('Payment successful');
                    navigate('/myOrders');
                }
            }
        } catch (error) {
            console.error('Error creating payment intent:', error);
            toast.error('Payment failed');
        }
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
            <h2 className='text-xl sm:text-2xl lg:text-3xl font-medium text-center sm:text-left lg:mr-96'>Your order details</h2>
            </section>
            <section className='w-full h-auto sm:h-screen bg-gray-100'>
            <div className='flex flex-col lg:flex-row px-4 sm:px-6 lg:px-52 justify-center lg:space-x-4 items-start w-full h-auto sm:h-screen'>
                <div className='flex flex-col w-full lg:w-4/5 h-auto'>
                <div className='bg-white w-full h-auto rounded-lg p-4 sm:p-6 mt-4'>
                    <h2 className='text-xl sm:text-2xl font-medium'>Order ID</h2>
                    <div className='flex items-center justify-between mt-6'>
                    <div className='flex items-center'>
                        <img src={orderID} alt='delivery' className='w-6 sm:w-8 h-6 sm:h-8' />
                        <h4 className='text-lg sm:text-xl ml-4'>{order?._id}</h4>
                    </div>
                    </div>
                    <h2 className='text-xl sm:text-2xl font-medium mt-8'>Customer details</h2>
                    <div className='flex items-center justify-between mt-8'>
                    <div className='flex items-center'>
                        <img src={user} alt='delivery' className='w-6 sm:w-8 h-6 sm:h-8' />
                        <h4 className='text-lg sm:text-xl ml-4'>{order?.user.name}</h4>
                    </div>
                    </div>
                    <div className='flex items-center justify-between mt-8'>
                    <div className='flex items-center'>
                        <img src={email} alt='delivery' className='w-6 sm:w-8 h-6 sm:h-8' />
                        <h4 className='text-lg sm:text-xl ml-4'>{order?.user.email}</h4>
                    </div>
                    </div>
                    <h2 className='text-xl sm:text-2xl font-medium mt-8'>Delivery details</h2>
                    <div className='flex items-center justify-between mt-8'>
                    <div className='flex items-center'>
                        <img src={address} alt='delivery' className='w-6 sm:w-8 h-6 sm:h-8' />
                        <h4 className='text-lg sm:text-xl ml-4'>
                        {order?.deliveryAddress.address1},
                        {order?.deliveryAddress.address2 === "" 
                            ? order?.deliveryAddress.city 
                            : `${order?.deliveryAddress.address2}, ${order?.deliveryAddress.city}`}
                        </h4>
                    </div>
                    </div>
                    <div className='flex items-center justify-between mt-8'>
                    <div className='flex items-center'>
                        <img src={landmark} alt='delivery' className='w-6 sm:w-8 h-6 sm:h-8' />
                        <h4 className='text-lg sm:text-xl ml-4'>
                        {order?.deliveryAddress.landMark === "" 
                            ? 'landmark is not set' 
                            : order?.deliveryAddress.landMark}
                        </h4>
                    </div>
                    </div>
                    <div className='flex items-center justify-between mt-8'>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faPerson} className='w-8 sm:w-10 h-8 sm:h-10' />
                        <h4 className='text-lg sm:text-xl ml-3'>Meet at my door</h4>
                    </div>
                    </div>
                    <h2 className='text-xl sm:text-2xl font-medium mt-8'>Payment method</h2>
                    <div className='flex items-center justify-between mt-6'>
                    <div className='flex items-center'>
                        <img src={paypalImg} alt='delivery' className='w-6 sm:w-8 h-6 sm:h-8' />
                        <h4 className='text-lg sm:text-xl ml-4'>{order?.paymentMethod}</h4>
                    </div>
                    </div>
                </div>
                </div>
                <div className='flex flex-col w-full lg:w-1/2 h-auto'>
                <div className='bg-white w-full h-64 sm:h-80 max-h-80 hover:overflow-y-auto overflow-hidden rounded-lg p-4 sm:p-6 mt-4 sm:mt-6 custom-scrollbar'>
                    <h2 className='text-xl sm:text-2xl font-medium'>Order Items ({order?.orderItems.reduce((acc, item) => acc + item?.qty, 0)})</h2>
                    {order?.orderItems.length === 0 ? (
                    <p className='text-gray-500'>There are no orders</p>
                    ) : (
                    <div>
                        {order?.orderItems.map((item, index) => (
                        <div key={index}>
                            <div className='flex items-center justify-between mt-6'>
                            <div className='flex items-center'>
                                <img src={`${BASE_URL}${item?.image}`} alt='image' className='w-16 sm:w-20 h-16 sm:h-20 mr-4 rounded-lg' />
                                <div>
                                <h3 className='text-lg sm:text-xl font-medium'>{item?.title}</h3>
                                <p className='text-gray-500 mt-1'>LKR {item?.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <p className='text-gray-700 text-lg sm:text-xl ml-4 bg-gray-200 p-2.5 rounded-lg font-medium'>{item?.qty}</p>
                            </div>
                            <hr className='my-4' />
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                <div className='bg-white w-full h-auto rounded-lg p-4 sm:p-6 mt-4 mb-4'>
                    <h2 className='text-xl sm:text-2xl font-medium mb-4 sm:mb-6'>Order Summary</h2>
                    <div className='flex items-center justify-between'>
                    <h3 className='text-lg sm:text-xl font-normal'>Subtotal</h3>
                    <h3 className='text-lg font-normal text-gray-500'>LKR {order?.itemsPrice.toFixed(2)}</h3>
                    </div>
                    <div className='flex items-center justify-between my-4'>
                    <h3 className='text-lg sm:text-xl font-normal'>Delivery fee</h3>
                    <h3 className='text-lg font-normal text-gray-500'>LKR {order?.deliveryFee.toFixed(2)}</h3>
                    </div>
                    <div className='flex items-center justify-between my-4'>
                    <h3 className='text-lg sm:text-xl font-normal'>Service fee</h3>
                    <h3 className='text-lg font-normal text-gray-500'>LKR {order?.serviceFee.toFixed(2)}</h3>
                    </div>
                    <hr className='my-4' />
                    <div className='flex items-center justify-between mb-4 sm:mb-8'>
                    <h3 className='text-lg sm:text-xl font-medium'>Total</h3>
                    <h3 className='text-lg sm:text-xl font-semibold text-gray-700'>LKR {order?.totalPrice.toFixed(2)}</h3>
                    </div>
                    
                    <PayPalButtons 
                    fundingSource={FUNDING.PAYPAL}
                    style={{
                        layout: "horizontal",
                        size: "small",
                        label: "pay",
                        height: 48,
                        tagline: "false",
                        borderRadius: 10,
                        color: 'black'
                    }}
                    createOrder={createOrder} 
                    onApprove={onApprove} 
                    onError={onError} 
                    />
                </div>
                </div>
            </div>
            </section>

          
           
        </div>
    );
};

export default OrderDetails;
