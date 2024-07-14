import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCaretDown, faCaretUp, faUser, faRightFromBracket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/navbar/Spicy.png';
import LogoBlack from '../assets/navbar/LogoBlack.png';
import Avatar from '../assets/navbar/man.png';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../constants';

const NavBar = ({ sticky, userInfo, handleLogOut, setLoginPopup, setRegisterPopup, isLoginLoading, isRegisterLoading }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [profilePicture, setProfilePicture] = useState(Avatar);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (userInfo) {
      setProfilePicture(userInfo.profilePicture || Avatar);
    }
  }, [userInfo]);

  return (
    <nav className={`fixed w-full z-20 ${sticky ? 'bg-white top-0' : 'top-10'}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={sticky ? LogoBlack : Logo} alt="Restaurant Logo" className="h-24" />
        </NavLink>
        <button
          className="text-customOrange md:hidden"
          onClick={() => setNavbarOpen(!navbarOpen)}
          aria-expanded={navbarOpen}
          aria-label="Toggle navigation"
        >
          {navbarOpen ? <FontAwesomeIcon icon={faTimes} size="lg" /> : <FontAwesomeIcon icon={faBars} size="lg" />}
        </button>
        <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
          {userInfo ? (
            <div className="w-40 bg-transparent relative">
              <div className="flex flex-row justify-around items-center">
                <img src={profilePicture && profilePicture !== Avatar ? `${BASE_URL}${profilePicture}` : Avatar} className="w-12 h-12 rounded-full" />
                <h2 className={`${sticky ? 'text-black' : 'text-white'}`}>{userInfo.name}</h2>
                {showDropdown ? (
                  <FontAwesomeIcon icon={faCaretUp} className={`${sticky ? 'text-black cursor-pointer' : 'text-white cursor-pointer'}`} onClick={() => setShowDropdown(!showDropdown)} />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} className={`${sticky ? 'text-black cursor-pointer' : 'text-white cursor-pointer'}`} onClick={() => setShowDropdown(!showDropdown)} />
                )}
              </div>
              <div className={`${showDropdown ? 'transition-all' : 'hidden transition-all'} w-40 h-16 mt-3 bg-white rounded-lg flex flex-col justify-center items-center absolute font-medium`}>
                <div className="flex flex-row items-center mb-1">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                  <NavLink to="/myProfile" className="ml-3 text-customOrange">Profile</NavLink>
                </div>
                <div className="flex flex-row items-center">
                  <FontAwesomeIcon icon={faRightFromBracket} className="text-gray-400" />
                  <button className="ml-3 text-customOrange" onClick={handleLogOut}>Log Out</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <button
                onClick={() => setLoginPopup(true)}
                type="button"
                className="text-customOrange font-semibold rounded-lg text-lg px-1 py-2"
                disabled={isLoginLoading && isRegisterLoading}
              >
                Login
              </button>
              <p className="text-lg text-customOrange">/</p>
              <button
                onClick={() => setRegisterPopup(true)}
                type="button"
                className="text-customOrange font-semibold rounded-lg text-lg px-1 py-2"
                disabled={isRegisterLoading && isLoginLoading}
              >
                Register
              </button>
            </div>
          )}
        </div>
        <div className="relative md:order-3">
          <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6 text-customOrange" />
          <div className="w-5 h-5 rounded-full bg-white absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
            <p className="text-customOrange text-sm text-center">
              {cartItems.length === 0 ? 0 : cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </p>
          </div>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${navbarOpen ? '' : 'hidden'}`} id="navbar-sticky">
          <ul className="flex flex-col p-4 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li><NavLink to="/" className={`block py-2 px-3 ${sticky ? 'text-black' : 'text-white'}`}>Home</NavLink></li>
            <li><NavLink to="/aboutUs" className={`block py-2 px-3 rounded ${sticky ? 'text-black' : 'text-white'}`}>About Us</NavLink></li>
            <li><NavLink to="/menu" className={`block py-2 px-3 rounded ${sticky ? 'text-black' : 'text-white'}`}>Menu</NavLink></li>
            <li><NavLink to="/reservations" className={`block py-2 px-3 rounded ${sticky ? 'text-black' : 'text-white'}`}>Reservations</NavLink></li>
            <li><NavLink to="/gallery" className={`block py-2 px-3 rounded ${sticky ? 'text-black' : 'text-white'}`}>Gallery</NavLink></li>
            <li><NavLink to="/contact" className={`block py-2 px-3 rounded ${sticky ? 'text-black' : 'text-white'}`}>Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
