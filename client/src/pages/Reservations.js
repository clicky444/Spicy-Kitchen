import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { useCreateReservationMutation, useGetReservationsQuery } from '../slices/reservationApiSlice';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';

const Reservations = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [occation, setOccation] = useState('');
  const [message, setMessage] = useState('');


  const [isTyping, setIsTyping] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const [createReservation ] = useCreateReservationMutation();
  const { data: reservations, error, isLoading } = useGetReservationsQuery();



  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setIsPhoneValid(false);
      return;
    }
    try {
      const data = {
        name,
        email,
        phone,
        date,
        time,
        guests,
        occation,
        message,
      };
      await createReservation(data).unwrap();
      setName('');
      setEmail('');
      setPhone('');
      setDate(null);
      setTime('');
      setGuests('');
      setOccation('');
      setMessage('');
      toast.success('Your Reservation has been made successfully');
    } catch (err) {
      console.error(err);
      if (err.data && err.data.message) {
        toast.error(err.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      submitHandler(event);
    }
  };

  const convertTime = (timeStr, offsetMinutes) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const time = new Date();
    time.setHours(hours, minutes, 0);
    time.setMinutes(time.getMinutes() + offsetMinutes);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(/,/g, '') : '';

  const renderStep1 = () => {
    if (isLoading) {
      return <div>Loading...</div>
    }
  
    if (error) {
      return <div>Error loading reservations</div>
    }
  
    return (
      <div className='flex flex-col justify-center items-center mb-6 w-full'>
        <div className="flex flex-col lg:flex-row justify-between items-center w-full space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-1/3">
            <label htmlFor="guests" className="block text-gray-700 text-lg font-bold mb-2">Guests</label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            >
              <option value="" disabled>Select number of Guests</option>
              {[...Array(20)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
              
            </select>
          </div>
          <div className="w-full lg:w-1/3">
            <label htmlFor="date" className="block text-gray-700 text-lg font-bold mb-2 sm:ml-4">Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="MMM d"
              className="shadow appearance-none border rounded w-full sm:ml-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              minDate={new Date()}
            />
          </div>
          <div className="w-full lg:w-1/3">
            <label htmlFor="time" className="block text-gray-700 text-lg font-bold mb-2">Time</label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            >
              <option value="" disabled>Select Time</option>
              {[...Array(28)].map((_, index) => {
                const hour = 14 + Math.floor(index / 4);
                const minute = (index % 4) * 15;
                const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const displayTime = `${hour % 12 === 0 ? 12 : hour % 12}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
  
                const isReserved = reservations && reservations.some(reservation => {
                  const reservationDate = new Date(reservation.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(/,/g, '');
                  const selectedDate = date ? new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(/,/g, '') : '';
                  return reservationDate === selectedDate && reservation.time === timeValue;
                });
  
                if (!isReserved) {
                  return (
                    <option key={index} value={timeValue}>
                      {displayTime}
                    </option>
                  );
                }
                return null;
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
  

  const renderStep2 = () => (
    <div className='flex flex-col lg:flex-row items-center justify-between'>
      <form onSubmit={submitHandler} className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full lg:w-1/2">
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus"
            id="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="phone">Phone</label>
          <input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setIsPhoneValid(validatePhone(e.target.value));
              setIsTyping(true);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus"
            id="phone"
            type="text"
            placeholder="Phone"
          />
          {isTyping && !isPhoneValid && phone !== '' ? (<span className="text-red-500 text-xs">Please enter a valid phone number</span>) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="occation">Occation</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus"
            id="occation"
            placeholder="Select an option (optional)"
            value={occation}
            onChange={(e) => setOccation(e.target.value)}
          >
            <option>Select Occation</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Date night</option>
            <option>Business meal</option>
            <option>Celebration</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="message">Message</label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus"
            id="message"
            placeholder="Add a special request (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-red-600 rounded" />
          <label htmlFor="default-checkbox" className="ms-2 text-base font-medium text-gray-900">Yes, I want to get text updates and reminders about my reservations.*</label>
        </div>
        <div className="flex items-center">
          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-red-600 rounded" />
          <label htmlFor="default-checkbox" className="ms-2 text-base font-medium text-gray-900">Yes, I want to receive dining offers and news from our restaurant by email.</label>
        </div>
      </form>

      <div className="details w-full lg:w-1/2 lg:ml-4 mt-6 lg:mt-0">
        <h2 className='text-2xl font-semibold'>Spicy Kitchen</h2>
        <div className='flex justify-start items-center mt-6'>
          <FontAwesomeIcon icon={faCalendar} className='text-gray-600' />
          <span className='text-lg ml-4 text-gray-600'>{date === null ? 'Date' : formattedDate}</span>
        </div>
        <div className='flex justify-start items-center mt-4'>
          <FontAwesomeIcon icon={faClock} className='text-gray-600' />
          <span className='text-lg ml-4 text-gray-600'>{time === '' ? 'Time' : convertTime(time, 0)}</span>
        </div>
        <div className='flex justify-start items-center mt-4'>
          <FontAwesomeIcon icon={faUser} className='text-gray-600' />
          <span className='text-lg ml-4 text-gray-600'>{`${guests} guests`}</span>
        </div>
        <div className='flex justify-start items-center mt-4'>
          <FontAwesomeIcon icon={faLocationDot} className='text-gray-600' />
          <span className='text-lg ml-4 text-gray-600'>No. 24, Lotus Road, Colombo 01</span>
        </div>
        <hr className='my-6' />
        <h2 className='text-xl font-medium mb-4'>What to know before you go</h2>
        <h5 className='font-medium text-gray-800 mb-3'>Important dining information</h5>
        <p className='text-gray-600 mb-4 text-sm'>
          We may contact you about this reservation, <br /> so please ensure your email and phone number are up to date.
        </p>
        <h5 className='font-medium text-gray-800 mb-3'>A note from the restaurant</h5>
        <p className='text-gray-600 mb-4 text-sm'>
          We look forward to welcoming you to our restaurant.
        </p>
        <p className='text-gray-600 mb-4 text-sm'>
          Please note that while we do our best to accommodate requests for outdoor seating, we cannot guarantee them.
        </p>
        <p className='text-gray-600 mb-4 text-sm'>
          In consideration of our clients, we kindly remind you that tables are reserved for 1.5 hours at lunch and 2 hours at dinner.
        </p>
      </div>
    </div>
  );

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <Header />
      <HeroSection title='Reservations' />
      <h2 className="text-4xl font-normal text-center text-gray-800 mb-8 mt-8" data-aos="fade-up">
        Make <span className="text-red-500">a Reservation</span>
      </h2>
      <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center mb-6" data-aos="fade-up">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full lg:w-3/4">
          <div className="steps flex justify-start mb-8 text-lg">
            <span
              className={`cursor-pointer step-item ${step === 1 ? 'text-red-500' : ''}`}
              onClick={() => setStep(1)}
            >
              1. Find a Table
            </span>
            <span
              className={`cursor-pointer step-item ml-8 ${step === 2 ? 'text-red-500' : ''}`}
              onClick={() => {
                if (guests && date && time) {
                  setStep(2);
                } else {
                  toast.error('Please fill out all fields in Step 1');
                }
              }}
            >
              2. Your Details
            </span>
          </div>
          {step === 1 ? renderStep1() : renderStep2()}
          <button
            className="bg-red-500 text-lg hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 lg:mt-0"
            type="submit"
          >
            {step === 1 ? 'Continue' : 'Confirm reservation'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Reservations;
