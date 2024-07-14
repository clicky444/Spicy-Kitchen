import React from 'react'
import PopUp from './PopUp';

const FogotPassword = () => {
    const [popup, setPopup] = useState(false);
    const [email, setEmail] = useState('');
  return (
    <div>
      <PopUp trigger={popup} setTrigger={setPopup} >
      <form className="p-4 sm:p-6">
          <p className="text-center text-2xl sm:text-3xl mb-4 font-semibold">Forgot Password</p>
          <p className="text-sm sm:text-base mb-4">
            Kindly enter the email address tied to your account, we would help you to reset your
            password.
          </p>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-base sm:text-lg font-medium text-gray-900">Email</label>
            <input 
              type="text" 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              id="email" 
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
              placeholder="email" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-customOrange text-white rounded-xl py-2 text-lg sm:text-xl mt-4"
          >
            Recover my password
          </button>
        </form>
        </PopUp>
    </div>
  )
}

export default FogotPassword
