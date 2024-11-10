import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ItineraryDetail = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [itineraryData, setItineraryData] = useState({
    title: 'Shimla 2024',
    content: `Day 1: Arrival And Local Exploration
• Arrival In Shimla (By Morning)
  • Check Into Your Hotel/Homestay.
• Mall Road & Ridge
  • Visit A Road For Some Casual Shopping And Cafes.
  • Walk To The Ridge For Panoramic Views Of The Hills And The Christ Church.
• Scandal Point
  • A Quick Photo-Op Spot With A Rich Colonial History.
• Kali Bari Temple
  • Visit The Kali Bari Temple, Located Near The Ridge For A Peaceful Retreat.
• Dinner: Have A Nice Dinner At Cafe Simla Times Or Wake & Bake Café.

Day 2: Kufri And Mashobra
• Kufri Adventure
• Head To Kufri (40 Mins From Shimla) For Fun Activities Like Horse Riding, Skiing (In Winter), And Tobogganing.Visit The
• Himalayan Nature Park To See Local Wildlife And Capture Breathtaking Mountain Views.`
  });

  const [originalContent, setOriginalContent] = useState(itineraryData.content);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(itineraryData.content);
      alert('Itinerary copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleContentUpdate = async () => {
    try {
      setOriginalContent(itineraryData.content);
      setIsEditing(false);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Failed to save changes:', error);
      setItineraryData(prev => ({
        ...prev,
        content: originalContent
      }));
      alert('Failed to save changes. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-[#f5faf5] py-6 px-8">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-normal mb-2">Tell Us Your Preferences</h1>
        <p className="text-gray-700 text-lg">
          Just Provide Some Basic Info And Our Trip Planner Will Generate A Customised Itinerary For You!
        </p>
      </div>

      {/* Itinerary Content Card */}
      <div className="max-w-4xl mx-auto bg-[#f8e4e4] rounded-3xl p-8 relative">
        {/* Title and Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">{itineraryData.title}</h2>
          <div className="flex gap-4">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="p-2 hover:bg-[#f8d4d4] rounded-lg transition-colors"
                  title="Edit itinerary"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-[#f8d4d4] rounded-lg transition-colors"
                  title="Copy itinerary"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </>
            ) : (
              <button
                onClick={handleContentUpdate}
                className="px-4 py-2 bg-[#3C4434] text-white rounded-lg hover:bg-[#4a5340] transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {isEditing ? (
          <textarea
            value={itineraryData.content}
            onChange={(e) => setItineraryData(prev => ({ ...prev, content: e.target.value }))}
            className="w-full h-[500px] p-4 rounded-lg bg-white border-none focus:ring-1 focus:ring-gray-300"
          />
        ) : (
          <div className="whitespace-pre-wrap">{itineraryData.content}</div>
        )}
      </div>
    </div>
  );
};

export default ItineraryDetail;