import React, { useState, useEffect } from 'react';

const PromptTemplate = () => {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    budget: '',
    startDate: '',
    endDate: '',
    travelers: ''
  });

  const [numberOfDays, setNumberOfDays] = useState(0);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setNumberOfDays(diffDays);
      console.log('Number of days:', diffDays);
    }
  }, [formData.startDate, formData.endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Trip duration:', numberOfDays, 'days');
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === 'startDate' || name === 'endDate') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="h-screen bg-[#f5faf5] flex flex-col items-center pt-6">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-normal mb-2">Tell Us Your Preferences</h1>
        <p className="text-gray-700 text-lg">
          Just Provide Some Basic Info And Our Trip Planner Will Generate A Customised Itinerary For You!
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-2xl bg-[#c6ecc6] rounded-3xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Itinerary Name */}
          <div>
            <label className="block text-xl mb-2">
              Name Your Itinerary
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-white border-none focus:ring-0"
              required
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-xl mb-2">
              Select Your Destination Of Choice
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-white border-none focus:ring-0"
              required
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xl mb-2">
              What Is Your Budget?
            </label>
            <div className="flex gap-16 ml-1">
              {['Budget', 'Moderate', 'Luxury'].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="budget"
                    value={option.toLowerCase()}
                    checked={formData.budget === option.toLowerCase()}
                    onChange={handleChange}
                    className="w-4 h-4 border-2 border-gray-300 text-[#3C4434] focus:ring-0"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div>
            <label className="block text-xl mb-2">
              Select Dates
            </label>
            <div className="flex items-center gap-4">
              <div className="relative flex items-center bg-white rounded-lg w-56">
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate ? new Date(formData.startDate).toLocaleDateString('en-GB') : ''}
                  onFocus={(e) => e.target.type = 'date'}
                  onBlur={(e) => e.target.type = 'text'}
                  onChange={handleChange}
                  className="p-2 rounded-lg bg-transparent border-none focus:ring-0 w-44"
                  required
                  placeholder="dd/mm/yyyy"
                />
                <span className="absolute right-2">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </span>
              </div>
              <span className="text-lg">To</span>
              <div className="relative flex items-center bg-white rounded-lg w-56">
                <input
                  type="text"
                  name="endDate"
                  value={formData.endDate ? new Date(formData.endDate).toLocaleDateString('en-GB') : ''}
                  onFocus={(e) => e.target.type = 'date'}
                  onBlur={(e) => e.target.type = 'text'}
                  onChange={handleChange}
                  className="p-2 rounded-lg bg-transparent border-none focus:ring-0 w-44"
                  required
                  min={formData.startDate}
                  placeholder="dd/mm/yyyy"
                />
                <span className="absolute right-2">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Number of Travelers */}
          <div>
            <label className="block text-xl mb-2">
              Number Of People Travelling
            </label>
            <input
              type="number"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              min="1"
              className="w-40 p-2 rounded-lg bg-white border-none focus:ring-0"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-[#3C4434] text-white px-8 py-2 rounded-lg hover:bg-[#4a5340] transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptTemplate;