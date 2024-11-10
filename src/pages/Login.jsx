import React from 'react';
import { Link } from 'react-router-dom';
import bgImg from '../assets/bgImg.png';
import googleIcon from '../assets/googleIcon.png';

const Login = () => {
  return (
    <div className="absolute inset-0 overflow-auto bg-[#3C4434]">
      {/* Background Image Container */}
      <div className="fixed inset-0">
        <img
          src={bgImg}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content Container */}
      <div className="relative min-h-screen flex flex-col items-center pt-12">
        {/* Brand Name */}
        <h1 className="text-white text-4xl font-bold mb-16 text-center">
          Vagabonder
        </h1>

        {/* Login Card */}
        <div className="w-[450px] bg-white/10 backdrop-blur-md rounded-3xl p-8">
          <h2 className="text-white text-5xl font-normal mb-4 text-center">
            Login
          </h2>

          {/* Signup Link */}
          <div className="flex justify-center items-center gap-2 mb-8 text-white/90">
            <span>Don't Have An Account Yet?</span>
            <Link to="/signup" className="text-white font-semibold">
              Sign Up
            </Link>
          </div>

          {/* Login Form */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm rounded-full
                     text-white placeholder-white/60 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm rounded-full
                     text-white placeholder-white/60 outline-none"
            />
            
            <div className="flex justify-center">
              <Link to="/forgot-password" className="text-white hover:underline text-sm">
                Forgot Password?
              </Link>
            </div>

            {/* Login Buttons */}
            <div className="flex justify-between gap-4 mt-8">
              {/* Google Login */}
              <button
                type="button"
                className="flex-1 px-3 py-2.5 bg-white/20 backdrop-blur-sm rounded-full
                       text-white text-sm font-medium flex items-center justify-center gap-2"
              >
                <img
                  src={googleIcon}
                  alt="Google"
                  className="w-4 h-4"
                />
                Login With Google
              </button>

              {/* Regular Login */}
              <button
                type="submit"
                className="w-28 px-4 py-2.5 bg-black/60 backdrop-blur-sm rounded-full
                       text-white text-sm font-medium"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;