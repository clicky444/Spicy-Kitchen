import React, { useEffect, useState } from 'react';
import email from '../assets/navbar/verify-email.jpg';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [verified, setVerified] = useState(false);
  const { id, token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}/verify/${token}`);
        if (response.ok) {
          setValidUrl(true);
        } else {
          setValidUrl(false);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setValidUrl(false);
      }
    };

    verifyEmailUrl();
  }, [id, token]);

  const verifyHandler = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        setVerified(true);
        dispatch(setCredentials(data)); 
       
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo) {
          userInfo.verified = true;
          console.log('Updated userInfo: ', userInfo);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          dispatch(setCredentials(userInfo));
        }

        toast.success('Email verified successfully');
      } else {
        console.error('Verification failed:', response.statusText);
        toast.error('Verification failed');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Error verifying email');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center'>
        <img src={email} alt='email' className='w-1/2 mx-auto' />
        <h2 className='text-4xl font-medium'>Verify your email address</h2>
        <p className='text-gray-800 text-2xl mt-4'>Please verify your email address by clicking the button below.</p>
        {validUrl ? (
          <div>
            <button onClick={verifyHandler} className='bg-blue-400 text-white w-64 h-16 text-2xl rounded-lg mt-12'>
              Verify Email
            </button>
            {verified && (
              <p className='mt-4'>Your email has been verified</p>
            )}
          </div>
        ) : (
          <p className='text-red-600'>Invalid verification link</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
