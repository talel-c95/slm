'use client';

import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiEdit, FiPaperclip, FiSend, FiChevronLeft, FiPhone, FiVideo, FiInfo, FiCalendar, FiClock, FiCheckCircle, FiLoader, FiImage, FiFile, FiPlus } from 'react-icons/fi';
import Image from 'next/image';

// Dummy data for conversations
const conversations = [
  {
    id: 1,
    patientName: 'Ahmed Ben Ali',
    patientId: 'P10045',
    avatar: '/avatars/patient1.jpg',
    lastMessage: {
      content: 'I\'ve been taking the medication as prescribed, but I still have some concerns about the side effects.',
      time: '10:30 AM',
      isRead: true,
      sender: 'patient'
    },
    unread: 0,
    online: true,
    messages: [
      {
        id: 1,
        content: 'Good morning Dr. Karim, I hope you\'re doing well.',
        time: '09:15 AM',
        sender: 'patient',
        isRead: true
      },
      {
        id: 2,
        content: 'Good morning Ahmed. How can I help you today?',
        time: '09:20 AM',
        sender: 'doctor',
        isRead: true
      },
      {
        id: 3,
        content: 'I wanted to discuss the results of my recent blood test.',
        time: '09:25 AM',
        sender: 'patient',
        isRead: true
      },
      {
        id: 4,
        content: 'Of course. I\'ve reviewed your lab results, and I\'m happy to inform you that overall they look good. Your cholesterol levels have improved since your last check-up.',
        time: '09:30 AM',
        sender: 'doctor',
        isRead: true
      },
      {
        id: 5,
        content: 'That\'s great to hear! What about the medication you prescribed last time?',
        time: '09:35 AM',
        sender: 'patient',
        isRead: true
      },
      {
        id: 6,
        content: 'I recommend continuing with the current prescription for another month. It appears to be working well based on your lab results.',
        time: '09:40 AM',
        sender: 'doctor',
        isRead: true
      },
      {
        id: 7,
        content: 'I\'ve been taking the medication as prescribed, but I still have some concerns about the side effects.',
        time: '10:30 AM',
        sender: 'patient',
        isRead: true
      }
    ]
  },
  {
    id: 2,
    patientName: 'Fatima Mansouri',
    patientId: 'P10062',
    avatar: '/avatars/patient2.jpg',
    lastMessage: {
      content: 'Thank you for sending the prescription, doctor.',
      time: '9:45 AM',
      isRead: false,
      sender: 'patient'
    },
    unread: 2,
    online: false,
    messages: [
      {
        id: 1,
        content: 'Hello Dr. Karim, I hope you\'re having a good day.',
        time: '9:15 AM',
        sender: 'patient',
        isRead: true
      },
      {
        id: 2,
        content: 'Hello Fatima, I hope you\'re feeling better today. How can I assist you?',
        time: '9:20 AM',
        sender: 'doctor',
        isRead: true
      },
      {
        id: 3,
        content: 'I wanted to ask if my prescription is ready?',
        time: '9:30 AM',
        sender: 'patient',
        isRead: true
      },
      {
        id: 4,
        content: 'Yes, I\'ve just uploaded it to the system. You should be able to access it now.',
        time: '9:35 AM',
        sender: 'doctor',
        isRead: true
      },
      {
        id: 5,
        content: 'Thank you for sending the prescription, doctor.',
        time: '9:45 AM',
        sender: 'patient',
        isRead: false
      }
    ]
  },
  {
    id: 3,
    patientName: 'Mohamed Karim',
    patientId: 'P10078',
    avatar: '/avatars/patient3.jpg',
    lastMessage: {
      content: 'I\'ll see you at my appointment tomorrow.',
      time: 'Yesterday',
      isRead: true,
      sender: 'patient'
    },
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        content: 'Hi Dr. Karim, I just wanted to confirm my appointment for tomorrow at 2 PM.',
        time: 'Yesterday',
        sender: 'patient',
        isRead: true
      },
      {
        id: 2,
        content: 'Hello Mohamed, yes, your appointment is confirmed for tomorrow at 2 PM. Please arrive 10 minutes early to complete any necessary paperwork.',
        time: 'Yesterday',
        sender: 'doctor',
        isRead: true
      },
      {
        id: 3,
        content: 'Perfect, thank you for confirming. Is there anything I should bring?',
        time: 'Yesterday',
        sender: 'patient',
        isRead: true
      },
      {
        id: 4,
        content: 'Just bring your insurance card and a list of any current medications you\'re taking.',
        time: 'Yesterday',
        sender: 'doctor',
        isRead: true
      },
      {
        id: 5,
        content: 'I\'ll see you at my appointment tomorrow.',
        time: 'Yesterday',
        sender: 'patient',
        isRead: true
      }
    ]
  },
  {
    id: 4,
    patientName: 'Nour Benali',
    patientId: 'P10103',
    avatar: '/avatars/patient4.jpg',
    lastMessage: {
      content: 'The new medication seems to be working much better. Thank you.',
      time: 'Yesterday',
      isRead: true,
      sender: 'patient'
    },
    unread: 0,
    online: true,
    messages: [
      {
        id: 1,
        content: 'Good afternoon Dr. Karim. I wanted to update you on how I\'m doing with the new medication.',
        time: 'Yesterday',
        sender: 'patient',
        isRead: true
      },
      {
        id: 2,
        content: 'Hello Nour, I appreciate you reaching out. How are you feeling with the new prescription?',
        time: 'Yesterday',
        sender: 'doctor',
        isRead: true
      },
      {
        id: 3,
        content: 'The new medication seems to be working much better. Thank you.',
        time: 'Yesterday',
        sender: 'patient',
        isRead: true
      }
    ]
  },
  {
    id: 5,
    patientName: 'Yasmine Taleb',
    patientId: 'P10125',
    avatar: '/avatars/patient5.jpg',
    lastMessage: {
      content: 'Here is the photo of the rash I mentioned during our last appointment.',
      time: '2 days ago',
      isRead: true,
      sender: 'patient',
      attachment: {
        type: 'image',
        name: 'rash_photo.jpg'
      }
    },
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        content: 'Hello Dr. Karim, as discussed during our appointment, I\'m sending you a photo of the rash.',
        time: '2 days ago',
        sender: 'patient',
        isRead: true
      },
      {
        id: 2,
        content: 'Here is the photo of the rash I mentioned during our last appointment.',
        time: '2 days ago',
        sender: 'patient',
        isRead: true,
        attachment: {
          type: 'image',
          name: 'rash_photo.jpg'
        }
      },
      {
        id: 3,
        content: 'Thank you for sharing this image, Yasmine. From what I can see, it appears to be a mild case of contact dermatitis. I recommend applying the hydrocortisone cream I prescribed twice daily for a week. If it doesn\'t improve or worsens, please come in for a follow-up appointment.',
        time: '2 days ago',
        sender: 'doctor',
        isRead: true
      }
    ]
  }
];

export default function Messages() {
  const [search, setSearch] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [activeConversations, setActiveConversations] = useState(conversations);
  const messageEndRef = useRef(null);

  // Filter conversations based on search term
  useEffect(() => {
    const filtered = conversations.filter(
      (conversation) =>
        conversation.patientName.toLowerCase().includes(search.toLowerCase()) ||
        conversation.patientId.toLowerCase().includes(search.toLowerCase())
    );
    setActiveConversations(filtered);
  }, [search]);

  // Scroll to bottom of messages when a chat is selected or when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // In a real app, you would send this message to an API
    // For now, we'll just update our local state to simulate sending a message
    const newMessage = {
      id: selectedChat.messages.length + 1,
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'doctor',
      isRead: false
    };

    // Clone the conversations array to avoid mutating state directly
    const updatedConversations = [...conversations];
    const chatIndex = updatedConversations.findIndex(chat => chat.id === selectedChat.id);
    
    if (chatIndex !== -1) {
      // Update the messages array for the selected chat
      updatedConversations[chatIndex] = {
        ...updatedConversations[chatIndex],
        messages: [...updatedConversations[chatIndex].messages, newMessage],
        lastMessage: newMessage
      };
      
      // Update the state with the new conversations array
      setActiveConversations(updatedConversations);
      
      // Update the selectedChat with the new messages array
      setSelectedChat(updatedConversations[chatIndex]);
    }

    // Reset the message input
    setMessage('');

    // Scroll to the bottom of the messages container
    setTimeout(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const formatMessageTime = (time) => {
    // If time is "Yesterday" or contains "days ago", return as is
    if (time === 'Yesterday' || time.includes('days ago')) {
      return time;
    }
    
    // Otherwise, return the time portion
    return time;
  };

  return (
    <div className="flex h-[calc(100vh-6rem)]">
      {/* Conversations Sidebar */}
      <div className={`w-full md:w-1/3 bg-white border-r ${selectedChat ? 'hidden md:block' : 'block'}`}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-5rem)]">
          {activeConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-start p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedChat?.id === conversation.id ? 'bg-gray-50' : ''
              }`}
              onClick={() => setSelectedChat(conversation)}
            >
              <div className="relative mr-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {conversation.avatar ? (
                    <Image
                      src={conversation.avatar}
                      alt={conversation.patientName}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-lg font-medium text-gray-700">
                      {conversation.patientName.charAt(0)}
                    </span>
                  )}
                </div>
                {conversation.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{conversation.patientName}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {formatMessageTime(conversation.lastMessage.time)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">ID: {conversation.patientId}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-600 truncate max-w-[200px]">
                    {conversation.lastMessage.attachment ? (
                      <span className="flex items-center">
                        {conversation.lastMessage.attachment.type === 'image' ? (
                          <FiImage className="mr-1" size={12} />
                        ) : (
                          <FiFile className="mr-1" size={12} />
                        )}
                        {conversation.lastMessage.content}
                      </span>
                    ) : (
                      conversation.lastMessage.content
                    )}
                  </p>
                  {conversation.unread > 0 && (
                    <span className="ml-2 bg-[#007E85] text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-white">
          <button className="w-full flex items-center justify-center px-4 py-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75] transition-colors">
            <FiEdit className="mr-2" /> New Message
          </button>
        </div>
      </div>

      {/* Chat View */}
      {selectedChat ? (
        <div className={`w-full md:w-2/3 flex flex-col bg-gray-50 ${selectedChat ? 'block' : 'hidden md:block'}`}>
          {/* Chat Header */}
          <div className="bg-white p-4 flex items-center border-b">
            <button
              className="md:hidden mr-2 text-gray-600"
              onClick={() => setSelectedChat(null)}
            >
              <FiChevronLeft size={24} />
            </button>
            <div className="relative mr-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {selectedChat.avatar ? (
                  <Image
                    src={selectedChat.avatar}
                    alt={selectedChat.patientName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-700">
                    {selectedChat.patientName.charAt(0)}
                  </span>
                )}
              </div>
              {selectedChat.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">{selectedChat.patientName}</h3>
              <p className="text-xs text-gray-500">
                {selectedChat.online ? (
                  <span className="text-green-600">Online</span>
                ) : (
                  'Offline'
                )} | ID: {selectedChat.patientId}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <FiPhone size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <FiVideo size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <FiInfo size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-center mb-6">
              <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-3 py-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            
            {selectedChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === 'doctor'
                      ? 'bg-[#007E85] text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.content}
                  
                  {msg.attachment && (
                    <div className={`mt-2 p-2 rounded ${
                      msg.sender === 'doctor' ? 'bg-[#006e75]' : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center">
                        {msg.attachment.type === 'image' ? (
                          <FiImage className={`mr-2 ${msg.sender === 'doctor' ? 'text-white' : 'text-gray-600'}`} />
                        ) : (
                          <FiFile className={`mr-2 ${msg.sender === 'doctor' ? 'text-white' : 'text-gray-600'}`} />
                        )}
                        <span className={`text-sm ${msg.sender === 'doctor' ? 'text-white' : 'text-gray-600'}`}>
                          {msg.attachment.name}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`text-xs mt-1 ${
                      msg.sender === 'doctor' ? 'text-gray-200' : 'text-gray-500'
                    } flex justify-between items-center`}
                  >
                    <span>{formatMessageTime(msg.time)}</span>
                    {msg.sender === 'doctor' && (
                      <span>
                        {msg.isRead ? (
                          <FiCheckCircle size={12} className="ml-1" />
                        ) : (
                          <FiClock size={12} className="ml-1" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <FiPaperclip size={20} />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button 
                className="ml-2 p-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75] transition-colors"
                onClick={handleSendMessage}
                disabled={message.trim() === ''}
              >
                <FiSend size={20} />
              </button>
            </div>
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <FiCalendar size={12} className="mr-1" /> 
              <span className="mr-4">Schedule message</span>
              
              <button className="flex items-center text-[#007E85]">
                <FiPlus size={12} className="mr-1" /> Quick responses
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex md:w-2/3 items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <FiMessageSquare size={24} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Your Messages</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Select a conversation or start a new one to begin messaging with your patients.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// This component isn't imported in the code above but is needed for the empty state
function FiMessageSquare({ size, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
} 