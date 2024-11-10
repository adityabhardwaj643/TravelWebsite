import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Itinerary = () => {
  const previousItineraries = [
    { id: 1, name: 'Shimla 2024' },
    { id: 2, name: "Bachelor's Trip 2024" },
    { id: 3, name: 'Vrindavan Holi Festival' }
  ];

  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      {/* Generate Itinerary Button */}
      <Link 
        to="/create-itinerary"
        className="flex items-center gap-3 bg-amber-200 text-gray-800 px-8 py-4 rounded-full w-fit mb-12 hover:bg-amber-300 transition-all hover:shadow-lg group"
      >
        <span className="text-3xl font-light group-hover:rotate-90 transition-transform duration-300">+</span>
        <span className="text-2xl">Generate Your Itinerary</span>
      </Link>

      {/* Previous Itineraries Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-8">Previous Itineraries</h2>
        <div className="space-y-6">
          {previousItineraries.map((itinerary) => (
            <Link
              key={itinerary.id}
              to={`/itinerary/${itinerary.id}`}
              className="block bg-green-100 p-6 rounded-2xl cursor-pointer hover:bg-green-200 transition-all hover:shadow-md transform hover:-translate-y-1"
            >
              <h3 className="text-2xl text-gray-800 font-medium">{itinerary.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;