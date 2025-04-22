'use client';

import { useState } from 'react';
import { FiSearch, FiSend, FiPaperclip, FiImage, FiFile, FiUser, FiMoreVertical } from 'react-icons/fi';

type MessageSender = 'patient' | 'doctor';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  avatar: string;
  isOnline: boolean;
}

interface MessageItem {
  id: number;
  text: string;
  time: string;
  sender: MessageSender;
  isRead: boolean;
}

interface LastMessage {
  text: string;
  time: string;
  isRead: boolean;
  sender: MessageSender;
}

interface Conversation {
  id: number;
  doctor: Doctor;
  lastMessage: LastMessage;
  unreadCount: number;
}

export default function Messages() {
  // Dummy conversation data
  const conversationsData: Conversation[] = [
    {
      id: 1,
      doctor: {
        id: 101,
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        isOnline: true
      },
      lastMessage: {
        text: 'Please let me know if you have any questions about your prescription.',
        time: '10:30 AM',
        isRead: true,
        sender: 'doctor'
      },
      unreadCount: 0
    },
    {
      id: 2,
      doctor: {
        id: 102,
        name: 'Dr. Ahmed Mansour',
        specialty: 'Dermatology',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        isOnline: false
      },
      lastMessage: {
        text: 'Your test results look good. We should discuss them at your next appointment.',
        time: 'Yesterday',
        isRead: false,
        sender: 'doctor'
      },
      unreadCount: 2
    },
    {
      id: 3,
      doctor: {
        id: 103,
        name: 'Dr. Fatima Zouari',
        specialty: 'Pulmonology',
        avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
        isOnline: false
      },
      lastMessage: {
        text: 'Ill be available for a video consultation tomorrow at 3 PM.',
        time: 'Yesterday',
        isRead: true,
        sender: 'doctor'
      },
      unreadCount: 0
    }
  ];

  // Dummy messages for selected conversation
  const dummyMessages: MessageItem[] = [
    {
      id: 1,
      text: 'Hello Dr. Johnson, Ive been experiencing some chest pain after taking the new medication.',
      time: '9:45 AM',
      sender: 'patient',
      isRead: true
    },
    {
      id: 2,
      text: 'When did you start experiencing this pain? Is it constant or does it come and go?',
      time: '10:00 AM',
      sender: 'doctor',
      isRead: true
    },
    {
      id: 3,
      text: 'It started yesterday evening. It comes and goes, mainly after meals.',
      time: '10:15 AM',
      sender: 'patient',
      isRead: true
    },
    {
      id: 4,
      text: 'I see. This could be a side effect of the medication. Please reduce the dosage to once a day and monitor if the symptoms improve.',
      time: '10:20 AM',
      sender: 'doctor',
      isRead: true
    },
    {
      id: 5,
      text: 'Thank you, Ill try that. Should I still come in for my appointment next week?',
      time: '10:25 AM',
      sender: 'patient',
      isRead: true
    },
    {
      id: 6,
      text: 'Please let me know if you have any questions about your prescription.',
      time: '10:30 AM',
      sender: 'doctor',
      isRead: true
    }
  ];

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversationsData[0]);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<MessageItem[]>(dummyMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations] = useState<Conversation[]>(conversationsData);

  const filteredConversations = conversations.filter(conv => 
    conv.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    
    const newMessage: MessageItem = {
      id: messages.length + 1,
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'patient',
      isRead: false
    };
    
    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  return (
    <div className="container mx-auto px-0 py-4 h-[calc(100vh-130px)]">
      <div className="flex h-full rounded-lg overflow-hidden shadow-lg">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 bg-white border-r">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-5rem)]">
            {filteredConversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedConversation?.id === conversation.id ? 'bg-gray-100' : ''}`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start">
                  <div className="relative mr-3">
                    <img
                      src={conversation.doctor.avatar}
                      alt={conversation.doctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.doctor.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{conversation.doctor.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.lastMessage.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.text}</p>
                    <p className="text-xs text-[#007E85]">{conversation.doctor.specialty}</p>
                  </div>
                  
                  {conversation.unreadCount > 0 && (
                    <div className="ml-2 bg-[#007E85] text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        {selectedConversation ? (
          <div className="hidden md:flex md:flex-col md:w-2/3 bg-gray-50">
            {/* Chat Header */}
            <div className="bg-white p-4 border-b flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={selectedConversation.doctor.avatar}
                  alt={selectedConversation.doctor.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-medium">{selectedConversation.doctor.name}</h3>
                  <p className="text-xs text-[#007E85]">{selectedConversation.doctor.specialty}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <FiUser size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <FiMoreVertical size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'patient' 
                        ? 'bg-[#007E85] text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 text-right ${message.sender === 'patient' ? 'text-white/70' : 'text-gray-500'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="bg-white p-4 border-t">
              <div className="flex items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                      <FiPaperclip size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                      <FiImage size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                      <FiFile size={18} />
                    </button>
                  </div>
                </div>
                <button
                  className="ml-2 p-3 bg-[#007E85] text-white rounded-full hover:bg-[#006e75] transition-colors"
                  onClick={handleSendMessage}
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex md:w-2/3 bg-gray-50 items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSend className="text-gray-500" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No conversation selected</h3>
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 