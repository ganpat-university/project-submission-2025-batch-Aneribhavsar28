import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPass() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess('Password reset link sent to your email.');
    }, 2000);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white relative">
      {/* Background Image for Mobile */}
      <div className="absolute inset-0 bg-cover bg-center md:hidden z-20 transition-all duration-500"
           style={{ backgroundImage: "url('https://m.media-amazon.com/images/M/MV5BNTIwM2U3N2ItNThlYi00NWJkLThlZTQtMTZiODkzZTIwNjJiXkEyXkFqcGc@._V1_FMjpg_UY2048_.jpg')" }}>
      </div>
      <div className="absolute inset-0 bg-gray-900 opacity-90 md:hidden z-30"></div>

      {/* Reset Form */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center z-40">
        <div className="w-full max-w-md p-8 rounded-lg animate-fade-in">
          <h1 className="text-6xl font-stretch-extra-expanded font-bold mb-10 text-white transition-transform transform">MRS</h1>
          <h2 className="text-2xl font-semibold mb-4 animate-slide-in">Forgot Password</h2>
          <form onSubmit={handleReset}>
            <div className="mb-4">
              <input 
                type="email" 
                className={`w-full p-3 bg-transparent border ${error ? 'border-red-500' : 'border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                  setSuccess('');
                }}
                placeholder="Enter your email"
                required
              />
              {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
              {success && <p className="text-green-400 text-sm mt-1">{success}</p>}
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "RESET PASSWORD"
              )}
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Remembered your password? <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/login')}>Login Here</span>
          </p>
        </div>
      </div>

      {/* Right Side - Movie Poster */}
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center transition-all duration-500" 
           style={{ backgroundImage: "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSBA3dGLs178d3WiW6M34_SNs5ueN5LLTowYrCnKutYyJh07QiGTs7BPoO6rdt5esVaYHH2zZVRErNCFMVPHjNxOSYOUw4gDbWtZySL8Zrrx9LmDQ3jFAk0Yu0YBU9240_WiV7LK55A1w/s1600/Make+Creative+Movie+Poster+With+Dark+and+Red+Tone+in+Photoshop+CC.jpg)" }}>
      </div>
    </div>
  );
}

export default ForgotPass;
