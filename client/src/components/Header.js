import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faPaperPlane, faEye, faEyeSlash, faXmark, faCartShopping, faCaretDown, faCaretUp, faUser, faRightFromBracket  } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import PopUp from './PopUp';
import { useLoginMutation, useRegisterMutation, useLogoutMutation, useForgotPasswordMutation } from '../slices/usersApiSlice';
import { setCredentials, logout } from '../slices/authSlice';
import NavBar from './NavBar';


const Header = () => {
  const [popup, setPopup] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [currentForm, setCurrentForm] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [logoutApiCall, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [forgotPassword, { isLoading: isForgotPasswordLoading }] = useForgotPasswordMutation();


  const { userInfo } = useSelector((state) => state.auth);
  const {cartItems} = useSelector((state)=> state.cart);

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password)=>{
    return password.length >= 6;
   
  }

  
  useEffect(() => {
    if (userInfo && location.pathname === '/') {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate, location.pathname]);

  const handleScroll = () => {
    setSticky(window.scrollY > 500);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate('/');
      toast.success('Logged in successfully');
      setLoginPopup(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Login error: ", error);
      if (error.data) {
        toast.error(error.data.message || "Login failed");
      } else {
        toast.error(error.message || "Login failed");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await register({ name, email, password, phone }).unwrap();
      dispatch(setCredentials(res));
      navigate('/');
      toast.success('Account created successfully');
      toast.success('Email verfication sent successfully');
      setRegisterPopup(false);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhone('');
    } catch (error) {
      console.error("Register error: ", error);
      toast.error(error.data?.message || error.error || "Registration failed");
    }
  };



  const handleLogOut = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error("Logout error: ", error);
      toast.error(error.data?.message || error.error || "Logout failed");
    }
  };

  const handleForgotPassword = async(e)=> {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message);
      setForgotPasswordPopup(false);
    } catch (error) {
      console.error("Forgot password error: ", error);
      toast.error(error.data?.message || error.error || "Forgot password failed");
    }

  }


  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [forgotPasswordPopup, setForgotPasswordPopup] = useState(false);

  return (
    <div>
      <div className={`bg-black bg-opacity-85 ${sticky ? 'hidden' : 'hidden md:flex'}`}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center md:items-center px-0 md:px-4 py-2">
            <div className="flex-grow">
              <div className="flex flex-row justify-between">
                <div className="ml-44 flex items-center">
                  <FontAwesomeIcon icon={faPhone} className="text-white mr-2" />
                  <p className="text-white">+ 1235 2355 98</p>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPaperPlane} className="text-white mr-2" />
                  <p className="text-white">spicykitchen56@email.com</p>
                </div>
                <div className="flex items-center">
                  <p className="text-white">
                    <span>Open hours:</span> <span>Monday - Sunday</span> <span>8:00AM - 9:00PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <NavBar sticky={sticky} userInfo={userInfo} handleLogOut={handleLogOut} setLoginPopup={setLoginPopup} setRegisterPopup={setRegisterPopup} isLoginLoading={isLoginLoading} isRegisterLoading={isRegisterLoading}/>


        <PopUp trigger={loginPopup} setTrigger={setLoginPopup} width='w-full' maxWidth='max-w-md'>
        <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onClick={() => setLoginPopup(false)} />
          <form onSubmit={handleLogin}>
            <p className="text-center text-3xl mb-4 font-semibold">Login</p>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Email</label>
              <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} id="email" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="email" required />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} id="password" onChange={(e) => setPassword(e.target.value)} value={password} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="password" required />
                <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} className="absolute inset-y-0 top-1/3 right-0 flex items-center px-3 text-gray-500 cursor-pointer" />
              </div>
            </div>
            <div className="flex justify-end mb-4 mt-2">
              <p className="text-sm text-decoration-none text-blue-500 cursor-pointer" onClick={() => {setForgotPasswordPopup(true); setLoginPopup(false)}}>Forgot password</p>
            </div>
            <button type="submit" className="w-full bg-customOrange text-white rounded-xl py-2 text-xl mt-4">
              Sign In
            </button>
            <p className="mt-2 text-center text-gray-900 font-medium">Don't have an account? <span onClick={() => {setRegisterPopup(true); setLoginPopup(false)}} className="text-blue-600 cursor-pointer">Create One</span></p>
          </form>
        </PopUp>


        <PopUp trigger={registerPopup} setTrigger={setRegisterPopup} width='w-full' maxWidth='max-w-md'>
        <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onClick={() => setRegisterPopup(false)} />
          <form onSubmit={handleRegister}>
            <p className="text-center text-3xl mb-4 font-semibold">Register</p>
            <div className="mb-3">
              <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900">Name</label>
              <input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Email</label>
              <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="block mb-2 text-lg font-medium text-gray-900">Phone</label>
              <input type="text" id="phone" onChange={(e) => {
                setPhone(e.target.value);
                setIsPhoneValid(validatePhone(e.target.value));
                setIsTyping(true);
              }} value={phone} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="phone" required />
              { isTyping && !isPhoneValid && phone !== '' ? (<span className="text-red-500 text-xs">Please enter a valid phone number</span>) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} id="password" onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordValid(validatePassword(e.target.value));
                  setIsTyping(true);
                  }} value={password} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="password" required />
                <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} className="absolute inset-y-0 top-1/3 right-0 flex items-center px-3 text-gray-500 cursor-pointer" />
              </div>
              { isTyping && !isPasswordValid && password !== '' ? (<span className="text-red-500 text-xs">Password length should be minimum 6 characters</span>) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="block mb-2 text-lg font-medium text-gray-900">Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="confirm password" required />
                <FontAwesomeIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} icon={showConfirmPassword ? faEyeSlash : faEye} className="absolute inset-y-0 top-1/3 right-0 flex items-center px-3 text-gray-500 cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center h-5 mt-4">
              <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
              <label htmlFor="remember" className="ms-2 text-sm font-normal text-gray-900">Remember me</label>
            </div>
            <button type="submit" className="w-full bg-customOrange text-white rounded-xl py-2 text-xl mt-4">
              Sign Up
            </button>
            <p className="mt-3 text-center text-gray-900 font-medium">Already have an account? <span onClick={() => {setRegisterPopup(false) ; setLoginPopup(true)}} className="text-blue-600 cursor-pointer">Log In</span></p>
          </form>
        </PopUp>

    
        <PopUp trigger={forgotPasswordPopup} setTrigger={setForgotPasswordPopup} width="w-1/3">
          <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onClick={() => setForgotPasswordPopup(false)} />
          <form onSubmit={handleForgotPassword}>
            <p className="text-center text-3xl mb-4 font-semibold">Forgot Password</p>
            <p>Kindly enter the email address tied to your account, we would help you to reset your password.</p>
            <div className="mb-4 mt-4">
              <input type="text" onChange={(e) => setEmail(e.target.value)}  id="email" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="email" required />
            </div>
            <div className='flex justify-end mb-4 mt-2'>
                <p  className='text-sm text-decoration-none text-blue-500 cursor-pointer' onClick={() => {setLoginPopup(true); setForgotPasswordPopup(false)}}>
                    Back to Login page
                </p>
            </div>
            <button type="submit" className="w-full bg-customOrange text-white rounded-xl py-2 text-xl mt-4">Recover my password</button>
          </form>
        </PopUp>

    </div>
  );
};

export default Header;