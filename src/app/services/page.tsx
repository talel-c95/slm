"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaCalendarCheck, FaHeartbeat, FaFileMedical, 
         FaGlobe, FaUserMd, FaAmbulance, FaMobileAlt, FaLaptopMedical, 
         FaCommentMedical, FaClinicMedical, FaHospital, FaArrowRight } from 'react-icons/fa';

const Services = () => {
  const featuredServices = [
    {
      id: 1,
      title: "Video Consultations",
      description: "Connect with healthcare professionals from around the world through secure video calls.",
      icon: <FaVideo size={36} className="text-teal-600" />,
      benefits: ["24/7 availability", "No travel required", "Access specialists globally"]
    },
    {
      id: 2,
      title: "Appointment Booking",
      description: "Schedule in-person or virtual appointments with your preferred healthcare providers.",
      icon: <FaCalendarCheck size={36} className="text-teal-600" />,
      benefits: ["Easy scheduling", "Reminders & notifications", "Flexible booking options"]
    },
    {
      id: 3,
      title: "Health Monitoring",
      description: "Track your vital signs and health metrics with integration to wearable devices and apps.",
      icon: <FaHeartbeat size={36} className="text-teal-600" />,
      benefits: ["Real-time monitoring", "Historical data analysis", "Personalized insights"]
    },
    {
      id: 4,
      title: "Medical Records",
      description: "Access and share your medical history securely with healthcare professionals.",
      icon: <FaFileMedical size={36} className="text-teal-600" />,
      benefits: ["Centralized records", "Secure sharing", "Complete medical history"]
    }
  ];

  const specializedServices = [
    {
      id: 1,
      title: "International Second Opinions",
      description: "Get expert second opinions from leading specialists across the globe for complex health conditions.",
      icon: <FaGlobe size={28} className="text-teal-600" />
    },
    {
      id: 2,
      title: "Specialist Referrals",
      description: "Connect with the right specialists for your specific health needs with our global network.",
      icon: <FaUserMd size={28} className="text-teal-600" />
    },
    {
      id: 3,
      title: "Emergency Consultations",
      description: "24/7 access to emergency healthcare professionals for urgent medical advice.",
      icon: <FaAmbulance size={28} className="text-teal-600" />
    },
    {
      id: 4,
      title: "Mobile Health Apps",
      description: "Track your health, medication, and appointments with our suite of mobile applications.",
      icon: <FaMobileAlt size={28} className="text-teal-600" />
    },
    {
      id: 5,
      title: "Remote Patient Monitoring",
      description: "Continuous monitoring of chronic conditions through integrated devices and telehealth.",
      icon: <FaLaptopMedical size={28} className="text-teal-600" />
    },
    {
      id: 6,
      title: "Multilingual Support",
      description: "Medical interpretation services available in over 50 languages during consultations.",
      icon: <FaCommentMedical size={28} className="text-teal-600" />
    }
  ];

  const packages = [
    {
      id: 1,
      title: "Basic Care",
      price: "$9.99",
      period: "monthly",
      description: "Essential healthcare services for individuals",
      features: [
        "3 video consultations/month",
        "Basic health monitoring",
        "Medical records access",
        "24/7 chat support"
      ],
      popular: false
    },
    {
      id: 2,
      title: "Family Care",
      price: "$24.99",
      period: "monthly",
      description: "Comprehensive healthcare for the whole family",
      features: [
        "Unlimited video consultations",
        "Up to 5 family members",
        "Advanced health monitoring",
        "Prescription management",
        "Priority scheduling",
        "Specialist referrals"
      ],
      popular: true
    },
    {
      id: 3,
      title: "Premium Care",
      price: "$49.99",
      period: "monthly",
      description: "Advanced healthcare with global specialist access",
      features: [
        "Unlimited video consultations",
        "Global specialist access",
        "Emergency consultations",
        "Comprehensive health monitoring",
        "International second opinions",
        "Concierge medical services",
        "Annual in-person health assessment"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: "Doctor Connect has transformed how our family manages healthcare. Being expatriates, we can now consult with doctors who speak our language from anywhere in the world.",
      author: "Maria G.",
      location: "Spanish expat in Dubai",
      rating: 5
    },
    {
      id: 2,
      text: "The second opinion service saved my life. After consulting with a specialist in another country, I received a different diagnosis and treatment plan that made all the difference.",
      author: "John T.",
      location: "Canada",
      rating: 5
    },
    {
      id: 3,
      text: "As someone with a chronic condition, the remote monitoring service gives me peace of mind knowing my doctor can track my vitals in real-time and adjust my treatment immediately.",
      author: "Aisha K.",
      location: "Kenya",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-teal-400 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-white mb-10 lg:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Healthcare Without Borders
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl mb-8"
              >
                Connect with healthcare professionals globally, manage your health, and access medical services from anywhere, anytime.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <button className="bg-white text-teal-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300">
                  Get Started
                </button>
                <button className="bg-transparent border border-white text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition duration-300">
                  Learn More
                </button>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <img 
                  src="https://placehold.co/600x400/007E85/FFFFFF?text=Global+Healthcare+Services" 
                  alt="Global Healthcare Services"
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Featured Services */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Doctor Connect offers a comprehensive suite of healthcare services designed to make quality healthcare accessible to everyone, everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-2 bg-teal-600"></div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-center mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 bg-teal-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-teal-700 transition duration-300 flex items-center justify-center">
                    Learn More
                    <FaArrowRight className="ml-2" size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with Doctor Connect is simple. Follow these steps to access quality healthcare services globally.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Create an Account</h3>
                <p className="text-gray-600">
                  Sign up for a free account to access our platform and explore available healthcare services.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Find a Provider</h3>
                <p className="text-gray-600">
                  Search our global network of healthcare professionals by specialty, language, or location.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Receive Care</h3>
                <p className="text-gray-600">
                  Connect with your provider through video consultations, messaging, or in-person appointments.
                </p>
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <button className="bg-teal-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-teal-700 transition duration-300">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Specialized Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beyond our core offerings, we provide specialized healthcare services to address specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specializedServices.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-teal-50 rounded-full mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-6 text-teal-600 font-medium flex items-center hover:text-teal-800 transition duration-300">
                  Learn more
                  <FaArrowRight className="ml-2" size={12} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-teal-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Pricing Plans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose a plan that fits your healthcare needs and budget. All plans include access to our global network of providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -10 }}
                className={`bg-white rounded-xl shadow-md overflow-hidden relative ${pkg.popular ? 'ring-2 ring-teal-500' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-3 py-1">
                    Most Popular
                  </div>
                )}
                <div className={`h-2 ${pkg.popular ? 'bg-teal-500' : 'bg-teal-600'}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-gray-800">{pkg.price}</span>
                    <span className="text-gray-500">/{pkg.period}</span>
                  </div>
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full font-medium py-2 rounded-lg transition duration-300 ${
                    pkg.popular
                      ? 'bg-teal-500 text-white hover:bg-teal-600'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}>
                    Select Plan
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Need a custom solution for your organization?</p>
            <button className="bg-white border border-teal-600 text-teal-600 font-medium px-6 py-3 rounded-lg hover:bg-teal-50 transition duration-300">
              Contact Our Enterprise Team
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from patients around the world who have transformed their healthcare experience with Doctor Connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Healthcare Experience?</h2>
          <p className="text-xl mb-8">
            Join thousands of patients worldwide who use Doctor Connect for convenient, accessible healthcare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300">
              Get Started Free
            </button>
            <button className="bg-transparent border border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition duration-300">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Partners/Clinics */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Global Network</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We partner with leading hospitals, clinics, and healthcare providers worldwide to offer you the best care.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center justify-center p-4">
                <div className="bg-gray-100 p-4 rounded-lg w-full h-24 flex items-center justify-center">
                  {i % 2 === 0 ? (
                    <FaClinicMedical size={36} className="text-gray-400" />
                  ) : (
                    <FaHospital size={36} className="text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="text-teal-600 font-medium hover:text-teal-800 transition duration-300">
              View All Partners
              <FaArrowRight className="ml-2 inline-block" size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section - Just a Link */}
      <section className="py-10 px-6 bg-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Have questions about our services?</h3>
          <button className="text-teal-600 font-medium hover:text-teal-800 transition duration-300">
            Visit our FAQ page for answers
            <FaArrowRight className="ml-2 inline-block" size={12} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services; 