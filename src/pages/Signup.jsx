import React from 'react';
import { Link } from 'react-router-dom';
import bgImg from '../assets/bgImg.png';
import googleIcon from '../assets/googleIcon.png';

const Signup = () => {
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

        {/* Signup Card */}
        <div className="w-[450px] bg-white/10 backdrop-blur-md rounded-3xl p-8">
          <h2 className="text-white text-5xl font-normal mb-4 text-center">
            Sign Up
          </h2>

          {/* Login Link */}
          <div className="flex justify-center items-center gap-2 mb-8 text-white/90">
            <span>Already Have An Account?</span>
            <Link to="/login" className="text-white font-semibold">
              Login
            </Link>
          </div>

          {/* Signup Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm rounded-full
                     text-white placeholder-white/60 outline-none"
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm rounded-full
                     text-white placeholder-white/60 outline-none"
            />

            {/* Signup Buttons */}
            <div className="flex justify-between gap-4 mt-8">
              {/* Google Signup */}
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
                Sign Up With Google
              </button>

              {/* Regular Signup */}
              <button
                type="submit"
                className="w-28 px-4 py-2.5 bg-black/60 backdrop-blur-sm rounded-full
                       text-white text-sm font-medium"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;