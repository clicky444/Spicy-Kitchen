import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useResetPasswordMutation } from '../slices/usersApiSlice'; 
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const { id, token } = useParams();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [resetPassword] = useResetPasswordMutation();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast.error("Passwords are not match")
            return;
        }

        try {
            const response = await resetPassword({id, token, newPassword}).unwrap();

            toast.success(response.message);
        } catch (error) {
            toast.error("Error setting password");
            console.error(error);
        }
    }

    return (
        <div className='flex justify-center py-32'>
            <form className='w-96' onSubmit={handleForgotPassword}>
                <p className="text-center text-3xl mb-6 font-semibold">Reset your password</p>
                <div className="mb-6">
                    <label htmlFor="newPassword" className="block mb-2 text-lg font-medium text-gray-900">New Password</label>
                    <div className="relative">
                        <input type={showNewPassword ? "text" : "password"} id="newPassword" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="new password" required />
                        <FontAwesomeIcon onClick={() => setShowNewPassword(!showNewPassword)} icon={showNewPassword ? faEyeSlash : faEye} className="absolute inset-y-0 top-1/3 right-0 flex items-center px-3 text-gray-500 cursor-pointer" />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block mb-2 text-lg font-medium text-gray-900">Confirm New Password</label>
                    <div className="relative">
                        <input type={showConfirmNewPassword ? "text" : "password"} id="confirmPassword" onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="confirm password" required />
                        <FontAwesomeIcon onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} icon={showConfirmNewPassword ? faEyeSlash : faEye} className="absolute inset-y-0 top-1/3 right-0 flex items-center px-3 text-gray-500 cursor-pointer" />
                    </div>
                </div>
                
                <button type="submit" className="w-full bg-customOrange text-white rounded-xl py-2 text-xl mt-4">
                    Reset Password
                </button>

                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </form>
        </div>
    );
}

export default ForgotPassword;
