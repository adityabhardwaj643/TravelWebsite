
import React, { useState, useEffect } from 'react';
import bgImg from '../assets/bgImg.png';

const Home = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const services = [
    "Access detailed travel guides, local recommendations, and real-time updates for a seamless journey.",
    "Connect with fellow travelers, share experiences, and get insider tips from our vibrant community of wanderers.",
    "Discover unique destinations and create personalized travel itineraries tailored to your interests and preferences."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Content Container */}
      <div className="w-full min-h-screen">
        {/* Main Content */}
        <div className="w-full h-full p-12">
          {/* Brand Name - Centered */}
          <h1 className="text-white text-4xl font-bold mb-16 text-center">
            Vagabonder
          </h1>

          {/* Content Wrapper */}
          <div className="flex justify-between items-center gap-8">
            {/* Left Side - Text Content */}
            <div className="max-w-2xl">
              <h2 className="text-white text-6xl font-bold mb-4 leading-tight">
                It's A Big World
                <br />
                Out There.
              </h2>
              <h3 className="text-white text-4xl font-semibold mb-6">
                Plan. Explore. Connect.
              </h3>
              <p className="text-white/90 mb-8 text-lg max-w-md">
                one liner description lorem ipsum worth like two lines 
                here like this cool like this this
              </p>
              <button className="px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full
                              text-white font-semibold hover:bg-white/30 transition-colors">
                Get Started
              </button>
            </div>

            {/* Right Side - Services Card */}
            <div className="w-[400px] h-[400px] bg-black/20 backdrop-blur-md
                          rounded-3xl p-8 border border-white/20 flex flex-col">
              <h3 className="text-white text-3xl font-semibold mb-16 text-center">
                Our Services
              </h3>
              
              {/* Services Text Container */}
              <div className="flex-1 relative">
                {services.map((service, index) => (
                  <p
                    key={index}
                    className={`absolute top-0 left-0 text-white/90 text-xl leading-relaxed transition-opacity duration-500 ease-in-out
                              ${currentServiceIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {service}
                  </p>
                ))}
              </div>

              {/* Dots Indicator - Moved to bottom */}
              <div className="flex justify-center gap-3 mb-4">
                {services.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300
                              ${currentServiceIndex === index ? 'bg-white' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;