"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaQuestionCircle, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaComments, 
  FaHeadset, 
  FaBookMedical, 
  FaVideo, 
  FaLock, 
  FaGlobe, 
  FaMoneyBillWave, 
  FaUserMd, 
  FaFileMedical, 
  FaMobileAlt,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const Help = () => {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      category: "Getting Started",
      question: "How do I create an account on Doctor Connect?",
      answer: "Creating an account is simple! Click the 'Sign Up' button on the top right of the homepage. Fill in your details including name, email, and password. Verify your email address using the link we'll send you, and you're ready to go."
    },
    {
      id: 2,
      category: "Getting Started",
      question: "What information do I need to provide during registration?",
      answer: "During registration, you'll need to provide your full name, email address, create a password, date of birth, and contact information. For enhanced healthcare services, you may optionally add your medical history, allergies, and current medications."
    },
    {
      id: 3,
      category: "Consultations",
      question: "How do video consultations work?",
      answer: "After scheduling an appointment, you'll receive a confirmation email with a link to your virtual consultation room. At the scheduled time, click the link or go to your appointments section and click 'Join'. Ensure your camera and microphone are working properly before the appointment."
    },
    {
      id: 4,
      category: "Consultations",
      question: "What if I need to reschedule or cancel my appointment?",
      answer: "You can reschedule or cancel appointments up to 2 hours before the scheduled time without any penalty. Go to 'My Appointments' in your dashboard, select the appointment, and choose 'Reschedule' or 'Cancel'. For cancellations made less than 2 hours before, a small fee may apply."
    },
    {
      id: 5,
      category: "Technical Support",
      question: "What should I do if I experience technical issues during a consultation?",
      answer: "If you experience technical issues during a consultation, first check your internet connection. If problems persist, use the chat function to message your doctor or our support team. You can also refresh the page or rejoin the consultation. If needed, our support team can help reschedule your appointment."
    },
    {
      id: 6,
      category: "Payments",
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, and in some regions, we support mobile payment solutions like Apple Pay and Google Pay. All transactions are secure and encrypted."
    },
    {
      id: 7,
      category: "Privacy",
      question: "How is my health information protected?",
      answer: "Doctor Connect takes your privacy seriously. We employ industry-standard encryption for all data transmission and storage. Our platform is HIPAA compliant, and we never share your personal health information with third parties without your explicit consent."
    },
    {
      id: 8,
      category: "International Services",
      question: "Can I use Doctor Connect when traveling internationally?",
      answer: "Yes! Doctor Connect is designed to be used globally. You can access our services from anywhere with an internet connection. If you're traveling, you can consult with healthcare providers in your home country or find local medical professionals in your current location."
    },
    {
      id: 9,
      category: "Medical Records",
      question: "How do I access my medical records?",
      answer: "You can access your medical records anytime from your user dashboard. Go to the 'Medical Records' section to view your consultation history, prescriptions, test results, and other medical documents. You can also download, print, or share these records with other healthcare providers."
    },
    {
      id: 10,
      category: "Mobile App",
      question: "Is there a mobile app available?",
      answer: "Yes, Doctor Connect offers a mobile app for both iOS and Android devices. You can download it from the App Store or Google Play Store. The app provides all the features available on the web platform, optimized for mobile use."
    }
  ];

  const faqCategories = [
    { id: "getting-started", name: "Getting Started", icon: <FaQuestionCircle /> },
    { id: "consultations", name: "Consultations", icon: <FaVideo /> },
    { id: "technical-support", name: "Technical Support", icon: <FaHeadset /> },
    { id: "payments", name: "Payments", icon: <FaMoneyBillWave /> },
    { id: "privacy", name: "Privacy", icon: <FaLock /> },
    { id: "international", name: "International Services", icon: <FaGlobe /> },
    { id: "medical-records", name: "Medical Records", icon: <FaFileMedical /> },
    { id: "mobile-app", name: "Mobile App", icon: <FaMobileAlt /> }
  ];

  const supportChannels = [
    {
      id: 1,
      title: "Email Support",
      description: "Send us a message anytime. We usually respond within 24 hours.",
      icon: <FaEnvelope className="text-teal-600" size={24} />,
      contact: "support@doctorconnect.com",
      action: "Send Email"
    },
    {
      id: 2,
      title: "Phone Support",
      description: "Speak directly with our support team during business hours.",
      icon: <FaPhoneAlt className="text-teal-600" size={24} />,
      contact: "+1 (800) 123-4567",
      action: "Call Now",
      hours: "Mon-Fri: 8am-8pm EST"
    },
    {
      id: 3,
      title: "Live Chat",
      description: "Get instant help with our online chat support service.",
      icon: <FaComments className="text-teal-600" size={24} />,
      contact: "Available 24/7",
      action: "Start Chat"
    }
  ];

  const helpGuides = [
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Learn how to create an account, update your profile, and navigate the platform.",
      icon: <FaQuestionCircle />,
      articles: 5
    },
    {
      id: 2,
      title: "Video Consultation Guide",
      description: "Everything you need to know about scheduling and attending virtual appointments.",
      icon: <FaVideo />,
      articles: 8
    },
    {
      id: 3,
      title: "Medical Records Guide",
      description: "How to access, manage, and share your health information securely.",
      icon: <FaFileMedical />,
      articles: 6
    },
    {
      id: 4,
      title: "Payment & Billing Guide",
      description: "Understanding payment options, insurance coverage, and billing procedures.",
      icon: <FaMoneyBillWave />,
      articles: 7
    },
    {
      id: 5,
      title: "International Users Guide",
      description: "Special information for users accessing our services across borders.",
      icon: <FaGlobe />,
      articles: 4
    },
    {
      id: 6,
      title: "Healthcare Provider Guide",
      description: "Resources for doctors and healthcare professionals using our platform.",
      icon: <FaUserMd />,
      articles: 9
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-400 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              How Can We Help You?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Find answers to common questions and get the support you need to make the most of Doctor Connect.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search for help topics..."
                className="w-full py-3 px-5 pl-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <FaQuestionCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 rounded-full flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-300"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Find answers to the most common questions about our services.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div>
                    <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                      {faq.category}
                    </span>
                    <h3 className="font-medium text-gray-800 mt-1">{faq.question}</h3>
                  </div>
                  {openFaqId === faq.id ? 
                    <FaChevronUp className="text-teal-600" /> : 
                    <FaChevronDown className="text-gray-500" />
                  }
                </button>
                {openFaqId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 pt-0 border-t border-gray-100"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="text-teal-600 font-medium hover:text-teal-800 transition duration-300 flex items-center justify-center mx-auto">
              View all FAQs
              <FaArrowRight className="ml-2" size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Support</h2>
            <p className="text-gray-600">
              Need more help? Our support team is available through multiple channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel) => (
              <motion.div
                key={channel.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  {channel.icon}
                  <h3 className="text-xl font-semibold text-gray-800 ml-3">{channel.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                <div className="font-medium text-lg text-gray-800 mb-4">
                  {channel.contact}
                </div>
                {channel.hours && (
                  <p className="text-sm text-gray-500 mb-4">{channel.hours}</p>
                )}
                <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition duration-300">
                  {channel.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Guides Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Help Guides & Resources</h2>
            <p className="text-gray-600">
              Comprehensive guides to help you navigate our platform and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpGuides.map((guide) => (
              <motion.div
                key={guide.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-2 bg-teal-600"></div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-teal-600">{guide.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{guide.title}</h3>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{guide.articles} articles</span>
                    <button className="text-teal-600 font-medium hover:text-teal-800 transition duration-300 flex items-center">
                      Read Guide
                      <FaArrowRight className="ml-2" size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials Section */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Video Tutorials</h2>
            <p className="text-gray-600">
              Watch step-by-step guides on how to use Doctor Connect's features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Setting Up Your Profile', 'Scheduling Your First Appointment', 'Using Video Consultations'].map((title, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative pt-[56.25%]">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <div className="w-16 h-16 bg-teal-600/80 rounded-full flex items-center justify-center cursor-pointer">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800">{title}</h3>
                  <p className="text-gray-500 text-sm mt-1">3:45 mins</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="text-teal-600 font-medium hover:text-teal-800 transition duration-300 flex items-center justify-center mx-auto">
              View all tutorials
              <FaArrowRight className="ml-2" size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* Community Support */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-10">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <FaBookMedical className="text-teal-600" size={28} />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Join Our Health Community</h2>
                  <p className="text-gray-600 mb-6">
                    Connect with other users, share experiences, and learn from each other in our community forum.
                  </p>
                  <button className="bg-teal-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-teal-700 transition duration-300">
                    Join Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not Finding Help */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Not Finding What You Need?</h2>
          <p className="text-gray-600 mb-8">
            Our support team is always ready to help with any questions or issues you might have.
          </p>
          <button className="bg-teal-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-teal-700 transition duration-300 flex items-center justify-center mx-auto">
            <FaHeadset className="mr-2" />
            Contact Support
          </button>
        </div>
      </section>

      {/* Global Support */}
      <section className="py-12 px-6 bg-white border-t">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 max-w-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Global Support Available</h2>
                <p className="text-gray-600 mb-4">
                  Our multilingual support team is available to help users from around the world. Get assistance in your preferred language.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic'].map((language, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                  <FaGlobe className="text-teal-600" size={24} />
                </div>
                <div className="flex flex-col ml-4">
                  <span className="text-gray-800 font-medium">24/7 International Support</span>
                  <span className="text-gray-500">Support in 6 languages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help; 