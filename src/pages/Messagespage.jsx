import React, { useState } from "react";
import user1 from "../assets/userImages/user1.jpeg";

// Icons
const RequestIcon = () => (
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
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

const SendIcon = () => (
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
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const Messages = () => {
  // States
  const [showRequests, setShowRequests] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Dummy Data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Aadi",
      image: user1,
      lastMessage: "Hey!",
      unread: true,
      messages: [
        { id: 1, text: "Hey!", sent: false, read: true },
        { id: 2, text: "Hello", sent: true, read: true },
      ],
    },
    // Add more conversations...
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Joshua Sen",
      image: user1,
    },
    // Add more requests...
  ]);

  // Handlers
  const handleAcceptRequest = (requestId) => {
    const request = requests.find((r) => r.id === requestId);
    setRequests(requests.filter((r) => r.id !== requestId));
    setConversations([
      ...conversations,
      {
        id: Date.now(),
        name: request.name,
        image: request.image,
        messages: [],
        unread: false,
      },
    ]);
  };

  const handleRejectRequest = (requestId) => {
    setRequests(requests.filter((r) => r.id !== requestId));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedConversations = conversations.map((conv) =>
      conv.id === selectedChat.id
        ? {
            ...conv,
            messages: [
              ...conv.messages,
              { id: Date.now(), text: newMessage, sent: true, read: false },
            ],
          }
        : conv
    );

    setConversations(updatedConversations);
    setNewMessage("");
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="h-screen bg-[#f5faf5] flex">
      {/* Left Panel - Conversations List */}
      <div className="w-1/3 border-r bg-white">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            {showRequests ? "Message Requests" : "Conversations"}
          </h1>
          <button
            onClick={() => setShowRequests(!showRequests)}
            className="relative p-2 hover:bg-gray-100 rounded-full"
          >
            <RequestIcon />
            {requests.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full" />
            )}
          </button>
        </div>

        {/* Conversations/Requests List */}
        <div className="overflow-y-auto h-[calc(100vh-72px)]">
          {showRequests ? (
            // Requests List
            requests.map((request) => (
              <div
                key={request.id}
                className="p-4 border-b hover:bg-gray-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={request.image}
                    alt={request.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="font-medium">{request.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Conversations List
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation)}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer 
                          ${selectedChat?.id === conversation.id ? "bg-gray-50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conversation.image}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {conversation.unread && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 w-3 h-3 rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{conversation.name}</h3>
                    <p className="text-sm text-gray-500">
                      {conversation.messages[conversation.messages.length - 1]?.text}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Chat Window */}
      <div
        className={`fixed inset-y-0 right-0 w-2/3 bg-white transform transition-transform duration-300 
                   ${selectedChat ? "translate-x-0" : "translate-x-full"}`}
      >
        {selectedChat && (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={selectedChat.image}
                  alt={selectedChat.name}
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="font-semibold">{selectedChat.name}</h2>
              </div>
              <button
                onClick={() => setSelectedChat(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[calc(100vh-160px)] overflow-y-auto p-4">
              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sent ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sent
                        ? "bg-[#3C4434] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    typing...
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#3C4434]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-[#3C4434] text-white rounded-lg hover:bg-[#4a5340]"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;