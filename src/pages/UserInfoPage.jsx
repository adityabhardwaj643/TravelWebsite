import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import local images
import user2 from '../assets/userImages/user2.jpeg';
import travelmemory1 from '../assets/userImages/travelmemory1.jpeg';
import travelmemory2 from '../assets/userImages/travelmemory2.jpeg';
import travelmemory3 from '../assets/userImages/travelmemory3.jpeg';
import travelmemory4 from '../assets/userImages/travelmemory4.jpeg';
import travelmemory5 from '../assets/userImages/travelmemory5.jpeg';
import travelmemory6 from '../assets/userImages/travelmemory6.jpeg';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const UserInfoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [activePage, setActivePage] = useState(0);

  const [userData] = useState({
    name: 'Aayushi Singh',
    age: '20 Years Old',
    coverPhoto: 'https://source.unsplash.com/random/1200x400?city',
    profilePhoto: user2,
    basicInfo: {
      fullName: 'Aayushi Singh',
      gender: 'Female',
      dob: '2003-08-15',
      residence: 'Delhi, India',
      languages: 'English, Hindi',
      ethnicity: 'Asian',
      religion: 'Hindu',
      occupation: 'Student'
    },
    introduction: 'Travel enthusiast with a passion for photography. Love exploring new cultures and meeting new people.',
    placesVisited: 'Paris, London, Dubai, Singapore, Bali',
    bestTravelStory: 'Spent a magical evening at the Eiffel Tower watching the sunset and the city lights come alive...',
    travelMemories: [
      { id: 1, image: travelmemory1 },
      { id: 2, image: travelmemory2 },
      { id: 3, image: travelmemory3 },
      { id: 4, image: travelmemory4 },
      { id: 5, image: travelmemory5 },
      { id: 6, image: travelmemory6 }
    ],
    futureItineraries: [
        { 
          id: 1, 
          name: "Greece Adventure", 
          date: "2024",
          description: "Planning to explore Greece's beautiful landscapes, ancient ruins, and Mediterranean culture."
        },
        { 
          id: 2, 
          name: "Japan Cherry Blossoms", 
          date: "2025",
          description: "Experiencing the magical sakura season and exploring Japanese culture and traditions."
        }
      ]
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleSendRequest = () => {
    setRequestSent(true);
    // Add animation and reset after 2 seconds
    setTimeout(() => {
      setRequestSent(false);
    }, 2000);
  };

  const renderTravelMemories = () => {
    const startIndex = activePage * 4;
    const currentPagePhotos = Array.from({ length: 4 }, (_, index) => {
      const memoryIndex = startIndex + index;
      return userData.travelMemories[memoryIndex];
    });

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {currentPagePhotos.map((memory, index) => (
            memory && (
              <div key={startIndex + index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={memory.image}
                  alt={`memory ${startIndex + index + 1}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(memory.image)}
                />
              </div>
            )
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mt-4">
          {[0, 1].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                activePage === page 
                  ? 'bg-[#3C4434]' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Page ${page + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f5faf5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3C4434]"></div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-[#f5faf5]">
      {/* Cover Photo Section */}
      <div className="relative h-[350px]">
        <div className="w-full h-full bg-gray-300">
          <img src={userData.coverPhoto} alt="cover" className="w-full h-full object-cover"/>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate('/discover')}
          className="absolute top-4 left-4 p-2 bg-white/80 rounded-lg hover:bg-white transition-colors"
        >
          <BackIcon />
        </button>

        {/* Profile Photo */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative w-32 h-32">
            <div 
              className="w-full h-full rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(userData.profilePhoto)}
            >
              <img 
                src={userData.profilePhoto} 
                alt="profile" 
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 px-8 pb-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-gray-600">{userData.age}</p>
          </div>
          <button
            onClick={handleSendRequest}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              requestSent 
                ? 'bg-green-500 text-white scale-105' 
                : 'bg-[#3C4434] text-white hover:bg-[#4a5340]'
            }`}
          >
            {requestSent ? 'Request Sent!' : 'Send Request'}
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-[2fr,1fr] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              {Object.entries(userData.basicInfo).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <p className="mt-1">{value}</p>
                </div>
              ))}
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Introduction</h2>
              <p>{userData.introduction}</p>
            </div>

            {/* Places Visited */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Places Travelled</h2>
              <p>{userData.placesVisited}</p>
            </div>

            {/* Travel Story */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Best Travel Story</h2>
              <p>{userData.bestTravelStory}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Travel Memories */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Travel Memories</h2>
              {renderTravelMemories()}
            </div>

            {/* Future Itineraries */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Future Itineraries</h2>
              <div className="space-y-2">
                {userData.futureItineraries.map((itinerary) => (
                  <div
                    key={itinerary.id}
                    onClick={() => setSelectedItinerary(itinerary)}
                    className="w-full p-3 bg-gray-50 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <span>{itinerary.name}</span>
                    <span className="text-gray-500">{itinerary.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <CloseIcon />
            </button>
            <img
              src={selectedImage}
              alt="Travel memory"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Itinerary Modal */}
      {selectedItinerary && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedItinerary(null)}
        >
          <div 
            className="bg-white rounded-xl p-6 max-w-2xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{selectedItinerary.name}</h2>
              <button
                onClick={() => setSelectedItinerary(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Trip Date</h3>
                <p className="text-gray-600">{selectedItinerary.date}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Trip Overview</h3>
                <p className="text-gray-600">{selectedItinerary.description}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Planned Activities</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Local sightseeing and photography</li>
                  <li>Cultural experiences and workshops</li>
                  <li>Food and cuisine exploration</li>
                  <li>Nature walks and adventure activities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoPage;