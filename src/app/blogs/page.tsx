"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaRegClock, FaRegUser, FaRegComment, 
         FaHeartbeat, FaPills, FaBrain, FaRunning, 
         FaAppleAlt, FaBaby, FaRegHospital, FaGlobeAmericas } from 'react-icons/fa';

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'all', name: 'All Posts', icon: null },
    { id: 'wellness', name: 'Wellness', icon: <FaHeartbeat /> },
    { id: 'medicine', name: 'Medicine', icon: <FaPills /> },
    { id: 'mental-health', name: 'Mental Health', icon: <FaBrain /> },
    { id: 'fitness', name: 'Fitness', icon: <FaRunning /> },
    { id: 'nutrition', name: 'Nutrition', icon: <FaAppleAlt /> },
    { id: 'pediatrics', name: 'Pediatrics', icon: <FaBaby /> },
    { id: 'global-health', name: 'Global Health', icon: <FaGlobeAmericas /> },
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "The Future of Telemedicine: Connecting Patients Worldwide",
      excerpt: "Explore how telemedicine is breaking down geographical barriers and making healthcare accessible to patients across the globe.",
      category: "global-health",
      image: "https://placehold.co/600x400/007E85/FFFFFF?text=Telemedicine",
      author: "Dr. Sarah Johnson",
      date: "June 15, 2023",
      readTime: "8 min read",
      comments: 24
    },
    {
      id: 2,
      title: "Understanding Vaccine Development in a Global Context",
      excerpt: "A comprehensive look at how vaccines are developed, tested, and distributed worldwide to combat infectious diseases.",
      category: "medicine",
      image: "https://placehold.co/600x400/007E85/FFFFFF?text=Vaccines",
      author: "Dr. Michael Wong",
      date: "May 28, 2023",
      readTime: "12 min read",
      comments: 36
    },
    {
      id: 3,
      title: "Mental Health Awareness: Breaking Stigmas Across Cultures",
      excerpt: "Examining different cultural approaches to mental health and efforts to reduce stigma around seeking psychological help.",
      category: "mental-health",
      image: "https://placehold.co/600x400/007E85/FFFFFF?text=Mental+Health",
      author: "Dr. Elena Petrova",
      date: "May 10, 2023",
      readTime: "10 min read",
      comments: 42
    }
  ];

  const articles = [
    {
      id: 4,
      title: "Nutrition Guidelines for Different Life Stages",
      excerpt: "Learn about the varying nutritional needs across different age groups and how to optimize your diet accordingly.",
      category: "nutrition",
      image: "https://placehold.co/600x300/007E85/FFFFFF?text=Nutrition",
      author: "Dr. James Wilson",
      date: "April 22, 2023",
      readTime: "7 min read",
      comments: 18
    },
    {
      id: 5,
      title: "Common Childhood Illnesses: A Global Perspective",
      excerpt: "Understanding the most common pediatric conditions worldwide and approaches to prevention and treatment.",
      category: "pediatrics",
      image: "https://placehold.co/600x300/007E85/FFFFFF?text=Pediatrics",
      author: "Dr. Aisha Patel",
      date: "April 15, 2023",
      readTime: "9 min read",
      comments: 15
    },
    {
      id: 6,
      title: "Exercise Fundamentals: Building a Routine That Works",
      excerpt: "Discover how to create an effective fitness routine that fits your lifestyle and helps you achieve your health goals.",
      category: "fitness",
      image: "https://placehold.co/600x300/007E85/FFFFFF?text=Fitness",
      author: "Dr. Carlos Rodriguez",
      date: "April 8, 2023",
      readTime: "6 min read",
      comments: 27
    },
    {
      id: 7,
      title: "Heart Health: Prevention Strategies from Around the World",
      excerpt: "Exploring successful cardiovascular disease prevention approaches from different healthcare systems globally.",
      category: "wellness",
      image: "https://placehold.co/600x300/007E85/FFFFFF?text=Heart+Health",
      author: "Dr. Sophia Chen",
      date: "March 30, 2023",
      readTime: "8 min read",
      comments: 21
    },
    {
      id: 8,
      title: "Understanding Antibiotics: Use and Resistance",
      excerpt: "A guide to responsible antibiotic use and the global challenge of antimicrobial resistance.",
      category: "medicine",
      image: "https://placehold.co/600x300/007E85/FFFFFF?text=Antibiotics",
      author: "Dr. Ahmed Hassan",
      date: "March 22, 2023",
      readTime: "11 min read",
      comments: 33
    },
    {
      id: 9,
      title: "Stress Management Techniques from Different Cultures",
      excerpt: "Learn diverse approaches to stress reduction and mental wellness inspired by traditions from around the world.",
      category: "mental-health",
      image: "https://placehold.co/600x300/007E85/FFFFFF?text=Stress+Management",
      author: "Dr. Natalie Kim",
      date: "March 15, 2023",
      readTime: "7 min read",
      comments: 29
    },
    {
      id: 10,
      title: "Digital Health Records: Benefits and Privacy Concerns",
      excerpt: "Examining the advantages of electronic health records and addressing important privacy considerations.",
      category: "global-health",
      image: "https://placehold.co/600x300/007E85/FFFFFF?text=Digital+Health",
      author: "Dr. Thomas Miller",
      date: "March 8, 2023",
      readTime: "9 min read",
      comments: 24
    },
    {
      id: 11,
      title: "Superfoods: Separating Facts from Marketing Hype",
      excerpt: "A science-based look at so-called superfoods and their actual nutritional benefits.",
      category: "nutrition",
      image: "https://placehold.co/600x300/007E85/FFFFFF?text=Superfoods",
      author: "Dr. Lisa Nguyen",
      date: "February 28, 2023",
      readTime: "8 min read",
      comments: 31
    }
  ];

  const allArticles = [...featuredArticles, ...articles];
  
  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredFeaturedArticles = featuredArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredRegularArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              Health Insights from Around the World
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Expert articles, research insights, and health tips from leading healthcare professionals across the globe.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search for articles..."
                className="w-full py-3 px-5 pl-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full flex items-center ${
                  selectedCategory === category.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition duration-300`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon && <span className="mr-2">{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {filteredFeaturedArticles.length > 0 && (
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredFeaturedArticles.map((article) => (
                <motion.div
                  key={article.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded-full">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-teal-600 transition duration-300">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <FaRegUser className="mr-1" />
                      <span className="mr-4">{article.author}</span>
                      <FaRegClock className="mr-1" />
                      <span className="mr-4">{article.readTime}</span>
                      <FaRegComment className="mr-1" />
                      <span>{article.comments}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{article.date}</span>
                      <button className="text-teal-600 font-medium hover:text-teal-800 transition duration-300">
                        Read more →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {filteredArticles.length === 0 ? 'No articles found' : 
             selectedCategory === 'all' ? 'Latest Articles' : 
             `${categories.find(cat => cat.id === selectedCategory)?.name} Articles`}
          </h2>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <FaRegHospital className="mx-auto text-gray-300 text-5xl mb-4" />
              <p className="text-gray-500 text-lg">No articles found matching your search criteria.</p>
              <button 
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRegularArticles.map((article) => (
                <motion.div
                  key={article.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded-full">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-teal-600 transition duration-300">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-gray-500 text-xs mb-4">
                      <FaRegUser className="mr-1" />
                      <span className="mr-3">{article.author}</span>
                      <FaRegClock className="mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{article.date}</span>
                      <button className="text-sm text-teal-600 font-medium hover:text-teal-800 transition duration-300">
                        Read more →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {filteredArticles.length > 0 && (
            <div className="mt-12 flex justify-center">
              <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-teal-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Updated with Health Insights</h2>
          <p className="text-teal-100 mb-8">
            Subscribe to our newsletter to receive the latest health articles, research, and tips directly in your inbox.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <button className="bg-white text-teal-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300">
              Subscribe
            </button>
          </div>
          <p className="text-teal-100 text-sm mt-4">
            We respect your privacy. You can unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Topics */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Popular Topics</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Telemedicine', 'COVID-19', 'Mental Health', 'Nutrition', 'Chronic Disease', 
              'Women\'s Health', 'Men\'s Health', 'Pediatrics', 'Geriatrics', 'Global Health Policy',
              'Alternative Medicine', 'Exercise', 'Sleep', 'Stress Management', 'Preventive Care'].map((topic, index) => (
              <button
                key={index}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-300"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contributing */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Are You a Healthcare Professional?</h2>
          <p className="text-gray-600 mb-8">
            Share your expertise with our global community. We welcome contributions from healthcare professionals worldwide.
          </p>
          <button className="bg-teal-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-700 transition duration-300">
            Become a Contributor
          </button>
        </div>
      </section>
    </div>
  );
};

export default Blogs; 