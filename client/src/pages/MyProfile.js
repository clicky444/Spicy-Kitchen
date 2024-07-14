import React, { useEffect, useState } from 'react';
import { faPencil, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideBar from '../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProfileMutation, useUploadProfileImgMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Avatar from '../assets/navbar/man.png';
import { BASE_URL } from '../constants';

const MyProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(Avatar);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const [uploadProfileImg, { isLoading: loadingUploadProfile }] = useUploadProfileImgMutation();

  useEffect(() => {
    if (userInfo) {
      console.log('User Info:', userInfo);
      setName(userInfo.name || '');
      setEmail(userInfo.email || '');
      setPhone(userInfo.phone || '');
      setProfilePicture(userInfo.profilePicture || Avatar);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        phone,
        profilePicture,
        oldPassword,
        newPassword,
        verified: userInfo.verified
      }).unwrap();

      dispatch(setCredentials(res));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const uploadImgHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Uploading file:', file);
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const res = await uploadProfileImg(formData).unwrap();
        console.log('Upload response:', res);
  
       
        if (res.image) {
          setProfilePicture(res.image); 
          toast.success('Profile picture updated successfully');
        } else {
          toast.error('Failed to update profile picture.');
          console.warn('Response does not contain image key:', res);
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(error.message);
      }
    }
  };
  
  console.log(userInfo);
  

  const handleCancel = () => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setProfilePicture(userInfo.profilePicture || Avatar);
  };

  return (
    <div>
      <SideBar />
      <div className='p-4 sm:ml-64'>
        <div className='flex items-center justify-between w-2/3'>
        <h2 className='text-3xl ml-6'>My Profile</h2>
        
        </div>
        <form onSubmit={submitHandler} className='p-4 sm:p-12'>
  <div className="w-full sm:w-1/2 sm:ml-64">
    <div className="flex flex-col items-center pb-10">
      <div className="relative">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg cursor-pointer"
          src={profilePicture && profilePicture !== Avatar ? `${BASE_URL}${profilePicture}` : Avatar}
          alt="Profile"
        />
        <div className='absolute bottom-2 right-5 bg-blue-200 w-6 h-6 rounded-lg'>
          <input type='file' onChange={uploadImgHandler} id='file' className='hidden'/>
          <label htmlFor='file' className='cursor-pointer bg-blue-200 w-6 h-6 rounded-full flex items-center justify-center'>
            <FontAwesomeIcon className='ml-1.5 w-3 h-3 text-gray-600 cursor-pointer' icon={faPencil}/>
          </label>
        </div>
      </div>
      <h4 className="mb-1 font-medium text-gray-900 text-3xl">{userInfo.name}</h4>
    </div>
  </div>

  <div className="grid gap-6 mb-6 sm:grid-cols-2">
    <div>
      <label htmlFor="name" className="block mb-2 text-lg sm:text-xl font-semibold text-gray-900">Name</label>
      <input
        type="text"
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder='Enter name'
      />
    </div>
    <div>
      <label htmlFor="email" className="block mb-2 text-lg sm:text-xl font-semibold text-gray-900">Email Address</label>
      <input
        type="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder='Enter email'
      />
    </div>
    <div>
      <label htmlFor="phone" className="block mb-2 text-lg sm:text-xl font-semibold text-gray-900">Phone number</label>
      <input
        type="number"
        id="phone"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder='Enter phone number'
      />
    </div>
    <div>
      <label htmlFor="old password" className="block mb-2 text-lg sm:text-xl font-semibold text-gray-900">Old Password</label>
      <div className="relative">
        <input
          type={showOldPassword ? 'text' : 'password'}
          id="old password"
          onChange={(e) => setOldPassword(e.target.value)}
          value={oldPassword}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="•••••••••"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowOldPassword(!showOldPassword)}
        >
          <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
        </div>
      </div>
    </div>
    <div>
      <label htmlFor="new password" className="block mb-2 text-lg sm:text-xl font-semibold text-gray-900">New Password</label>
      <div className="relative">
        <input
          type={showNewPassword ? 'text' : 'password'}
          id="new password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="•••••••••"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowNewPassword(!showNewPassword)}
        >
          <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
        </div>
      </div>
    </div>
    <div>
      <label htmlFor="confirm new password" className="block mb-2 text-lg sm:text-xl font-semibold text-gray-900">Confirm New Password</label>
      <div className="relative">
        <input
          type={showConfirmNewPassword ? 'text' : 'password'}
          id="confirm new password"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          value={confirmNewPassword}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="•••••••••"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
        >
          <FontAwesomeIcon icon={showConfirmNewPassword ? faEyeSlash : faEye} />
        </div>
      </div>
    </div>
  </div>

  <div className="flex flex-col sm:flex-row gap-4">
    <button type="submit" className="text-white bg-update hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Update
    </button>
    <button type="button" className="text-white bg-update hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleCancel}>
      Cancel
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default MyProfile;
