import React, { useState } from "react";
import user1 from "../assets/userImages/user1.jpeg";
import travelmemory1 from "../assets/userImages/travelmemory1.jpeg";
import travelmemory2 from "../assets/userImages/travelmemory2.jpeg";
import travelmemory3 from "../assets/userImages/travelmemory3.jpeg";
import travelmemory4 from "../assets/userImages/travelmemory4.jpeg";
import travelmemory5 from "../assets/userImages/travelmemory5.jpeg";
import travelmemory6 from "../assets/userImages/travelmemory6.jpeg";

const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const CameraIcon = () => (
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
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const CloseIcon = () => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Profile = () => {
  const [isManageView, setIsManageView] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activePage, setActivePage] = useState(0);

  const [userData, setUserData] = useState({
    name: "Aadi",
    age: "24 Years Old",
    coverPhoto: null,
    profilePhoto: user1,
    basicInfo: {
      fullName: "Aadi Singh",
      gender: "Male",
      dob: "1999-05-15",
      residence: "Mumbai, India",
      languages: "English, Hindi",
      ethnicity: "Asian",
      religion: "Hindu",
      occupation: "Software Engineer",
    },
    introduction:
      "Love to travel and explore new places. Photography enthusiast.",
    placesVisited: "Manali, Goa, Kerala, Singapore",
    bestTravelStory:
      "My first solo trip to Manali was an incredible experience...",
    travelMemories: [
      { id: 1, image: travelmemory1 },
      { id: 2, image: travelmemory2 },
      { id: 3, image: travelmemory3 },
      { id: 4, image: travelmemory4 },
      { id: 5, image: travelmemory5 },
      { id: 6, image: travelmemory6 },
    ],
    futureItineraries: [
      { id: 1, name: "Udaipur Itinerary", date: "2024" },
      { id: 2, name: "Shimla 2025", date: "2025" },
    ],
  });

  const handleSave = () => {
    setShowSaveConfirmation(true);
    setTimeout(() => {
      setShowSaveConfirmation(false);
      setIsManageView(false);
      setEditedFields({});
    }, 2000);
  };

  const handleImageUpload = async (type, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "travelMemories") {
          if (userData.travelMemories.length < 8) {
            setUserData((prev) => ({
              ...prev,
              travelMemories: [
                ...prev.travelMemories,
                { id: prev.travelMemories.length + 1, image: reader.result },
              ],
            }));
          }
        } else {
          setUserData((prev) => ({
            ...prev,
            [type]: reader.result,
          }));
          setEditedFields((prev) => ({
            ...prev,
            [type]: true,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
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
            <div
              key={startIndex + index}
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
            >
              {memory ? (
                <img
                  src={memory.image}
                  alt={`memory ${startIndex + index + 1}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(memory.image)}
                />
              ) : isManageView && userData.travelMemories.length < 8 ? (
                <label className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <CameraIcon />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload("travelMemories", e)}
                  />
                </label>
              ) : null}
            </div>
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
                  ? "bg-[#3C4434]"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Page ${page + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#f5faf5]">
      {/* Cover Photo Section */}
      <div className="relative h-[350px]">
        <div className="w-full h-full bg-gray-300">
          {userData.coverPhoto ? (
            <img
              src={userData.coverPhoto}
              alt="cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              {isManageView && (
                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg">
                  <CameraIcon />
                  <span>Add Cover Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload("coverPhoto", e)}
                  />
                </label>
              )}
            </div>
          )}

          {isManageView && userData.coverPhoto && (
            <label className="absolute bottom-4 right-[15px] cursor-pointer p-1 bg-white/80 rounded-lg hover:bg-white transition-colors">
              <EditIcon />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload("coverPhoto", e)}
              />
            </label>
          )}
        </div>

        <div className="absolute -bottom-16 left-8">
          <div className="relative w-32 h-32">
            <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg">
              {userData.profilePhoto ? (
                <img
                  src={userData.profilePhoto}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CameraIcon />
                </div>
              )}
            </div>
            {isManageView && (
              <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer">
                <EditIcon />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload("profilePhoto", e)}
                />
              </label>
            )}
          </div>
        </div>

        <button className="absolute top-4 right-4 px-4 py-2 bg-[#3C4434] text-white rounded-lg">
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="pt-24 px-8 pb-20">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-gray-600">{userData.age}</p>
          </div>
          <button
            onClick={() => setIsManageView(!isManageView)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isManageView
                ? "bg-[#3C4434] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {isManageView ? "Done" : "Manage View"}
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
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  {isManageView ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        setUserData((prev) => ({
                          ...prev,
                          basicInfo: {
                            ...prev.basicInfo,
                            [key]: e.target.value,
                          },
                        }));
                        setEditedFields((prev) => ({
                          ...prev,
                          [`basicInfo.${key}`]: true,
                        }));
                      }}
                      className="w-full p-2 mt-1 border rounded-lg"
                    />
                  ) : (
                    <p className="mt-1">{value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Introduce Yourself</h2>
              {isManageView ? (
                <textarea
                  value={userData.introduction}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      introduction: e.target.value,
                    }));
                    setEditedFields((prev) => ({
                      ...prev,
                      introduction: true,
                    }));
                  }}
                  className="w-full p-2 border rounded-lg min-h-[100px]"
                />
              ) : (
                <p>{userData.introduction}</p>
              )}
            </div>

            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                Places You Have Travelled
              </h2>
              {isManageView ? (
                <textarea
                  value={userData.placesVisited}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      placesVisited: e.target.value,
                    }));
                    setEditedFields((prev) => ({
                      ...prev,
                      placesVisited: true,
                    }));
                  }}
                  className="w-full p-2 border rounded-lg min-h-[100px]"
                />
              ) : (
                <p>{userData.placesVisited}</p>
              )}
            </div>

            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Best Travel Story</h2>
              {isManageView ? (
                <textarea
                  value={userData.bestTravelStory}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      bestTravelStory: e.target.value,
                    }));
                    setEditedFields((prev) => ({
                      ...prev,
                      bestTravelStory: true,
                    }));
                  }}
                  className="w-full p-2 border rounded-lg min-h-[150px]"
                />
              ) : (
                <p>{userData.bestTravelStory}</p>
              )}
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
                  <button
                    key={itinerary.id}
                    onClick={() => setSelectedItinerary(itinerary)}
                    className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg flex justify-between items-center"
                  >
                    <span>{itinerary.name}</span>
                    <span className="text-gray-500">{itinerary.date}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      {isManageView && Object.keys(editedFields).length > 0 && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-[#3C4434] text-white rounded-lg shadow-lg hover:bg-[#4a5340] transition-colors"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Save Confirmation Toast */}
      {showSaveConfirmation && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-[#3C4434] text-white rounded-lg shadow-lg">
          Changes saved successfully!
        </div>
      )}

      {/* Itinerary Modal */}
      {selectedItinerary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                {selectedItinerary.name}
              </h2>
              <button
                onClick={() => setSelectedItinerary(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                Itinerary details for {selectedItinerary.name} planned for{" "}
                {selectedItinerary.date}
              </p>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default Profile;
