import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import user1 from '../assets/userImages/user1.jpeg';
import user2 from '../assets/userImages/user2.jpeg';

const initialProfiles = [
  { id: 1, name: 'Aayushi', age: 20, image: user2 },
  { id: 2, name: 'Aryan', age: 22, image: 'https://source.unsplash.com/random/400x500?portrait=2' },
  { id: 3, name: 'Zara', age: 21, image: 'https://source.unsplash.com/random/400x500?portrait=3' },
  { id: 4, name: 'Kabir', age: 23, image: 'https://source.unsplash.com/random/400x500?portrait=4' },
  { id: 5, name: 'Anaya', age: 19, image: 'https://source.unsplash.com/random/400x500?portrait=5' },
  { id: 6, name: 'Vihan', age: 24, image: 'https://source.unsplash.com/random/400x500?portrait=6' },
  { id: 7, name: 'Myra', age: 20, image: 'https://source.unsplash.com/random/400x500?portrait=7' },
  { id: 8, name: 'Advait', age: 25, image: 'https://source.unsplash.com/random/400x500?portrait=8' },
  { id: 9, name: 'Ishaan', age: 23, image: 'https://source.unsplash.com/random/400x500?portrait=9' },
  // Queue of next profiles
  { id: 10, name: 'Saisha', age: 22, image: 'https://source.unsplash.com/random/400x500?portrait=10' },
  { id: 11, name: 'Aadi', age: 24, image: user1 },
  { id: 12, name: 'Diya', age: 20, image: 'https://source.unsplash.com/random/400x500?portrait=12' },
  { id: 13, name: 'Reyansh', age: 25, image: 'https://source.unsplash.com/random/400x500?portrait=13' },
  { id: 14, name: 'Aanya', age: 21, image: 'https://source.unsplash.com/random/400x500?portrait=14' },
  { id: 15, name: 'Vivaan', age: 23, image: 'https://source.unsplash.com/random/400x500?portrait=15' }
];

const DiscoverCard = ({ profile, onAction, isLeaving }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Don't navigate if clicking action buttons
    if (e.target.closest('button')) {
      e.stopPropagation();
      return;
    }
    navigate(`/user/${profile.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`relative w-full aspect-[3/4] rounded-3xl overflow-hidden transition-all duration-500 
                 bg-white shadow-sm cursor-pointer hover:shadow-lg transform hover:-translate-y-1
                 ${isLeaving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
    >
      {/* Image Container */}
      <div className="absolute inset-0">
        {profile.image && (
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        )}
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-3 left-0 right-0 px-3">
        <div className="mb-2">
          <h3 className="text-base font-medium text-white drop-shadow-md">{profile.name}</h3>
          <p className="text-sm text-white drop-shadow-md">{profile.age} years old</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction(profile.id, 'accept');
            }}
            className="w-7 h-7 rounded-full bg-green-500 hover:bg-green-600 
                     flex items-center justify-center transition-all duration-300
                     hover:scale-110 border border-white/80"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction(profile.id, 'reject');
            }}
            className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 
                     flex items-center justify-center transition-all duration-300
                     hover:scale-110 border border-white/80"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

const Discover = () => {
  const [displayProfiles, setDisplayProfiles] = useState(initialProfiles.slice(0, 9));
  const [queuedProfiles, setQueuedProfiles] = useState(initialProfiles.slice(9));
  const [leavingCard, setLeavingCard] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);

  const handleCardAction = async (profileId, action) => {
    setLeavingCard(profileId);
    
    // Show feedback message
    setActionFeedback({
      type: action,
      message: action === 'accept' ? 'Request Sent!' : 'Profile Skipped'
    });

    // Hide feedback after animation
    setTimeout(() => {
      setActionFeedback(null);
    }, 2000);

    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedDisplayProfiles = [...displayProfiles];
    const cardIndex = updatedDisplayProfiles.findIndex(p => p.id === profileId);

    if (queuedProfiles.length > 0) {
      const [nextProfile, ...remainingQueued] = queuedProfiles;
      updatedDisplayProfiles[cardIndex] = nextProfile;
      setQueuedProfiles(remainingQueued);
    }

    setDisplayProfiles(updatedDisplayProfiles);
    setLeavingCard(null);
  };

  return (
    <div className="min-h-screen bg-[#f5faf5] py-4 px-6 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-center">Discover</h1>

      {/* Cards Grid Container */}
      <div className="w-[70%] bg-[#81A7A2] rounded-xl p-6">
        <div className="h-[calc(100vh-140px)] overflow-y-auto">
          <div className="grid grid-cols-3 gap-5 pb-4">
            {displayProfiles.map((profile) => (
              <div
                key={profile.id}
                className="transform transition-all duration-500"
              >
                <DiscoverCard
                  profile={profile}
                  onAction={handleCardAction}
                  isLeaving={leavingCard === profile.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Feedback Toast */}
      {actionFeedback && (
        <div 
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg
                     transition-all duration-300 ${
                       actionFeedback.type === 'accept' 
                         ? 'bg-green-500' 
                         : 'bg-gray-700'
                     } text-white`}
        >
          {actionFeedback.message}
        </div>
      )}
    </div>
  );
};

export default Discover;