'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/authContext';
import { useLanguage } from '@/contexts/languageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, error, loading, clearError } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Validate form
    if (!email || !password) {
      setFormError('Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
      
      // Get the current user role after login and redirect accordingly
      if (localStorage.getItem('token')) {
        const userDataStr = localStorage.getItem('user');
        if (userDataStr) {
          const userData = JSON.parse(userDataStr);
          if (userData.role === 'doctor') {
            router.push('/dashboard/doctor');
          } else if (userData.role === 'patient') {
            router.push('/dashboard/patient');
          } else if (userData.role === 'admin') {
            router.push('/dashboard/admin');
          } else {
            router.push('/dashboard');
          }
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      // Authentication errors are handled in the context
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const languages = ['English', 'Français', 'العربية', '中文', 'Español', 'हिन्दी'];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Illustration */}
      <div className="hidden md:block md:w-1/2 bg-[#007E85]">
        <div className="h-full flex items-center justify-center p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg text-white"
          >
            <h2 className="text-3xl font-bold mb-4">{t('welcome_dc')}</h2>
            <p className="text-white/80 text-lg mb-8">
              {t('welcome_dc_subtitle')}
            </p>
            
            <motion.div
              className="relative w-full overflow-hidden rounded-2xl"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Image
                className=""
                alt="Healthcare Professionals"
                width={600}
                height={600}
                priority={true}
                src="/image/img1.jpg"
              />
            </motion.div>
            
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">{t('why_choose')}</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>{t('benefit_1')}</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>{t('benefit_2')}</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>{t('benefit_3')}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Language selector */}
          <div className="absolute top-6 right-6">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#007E85]"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <motion.div 
              className="w-12 h-12 bg-[#007E85] rounded-lg flex items-center justify-center mr-3"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <span className="text-white font-bold text-xl">DC</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800">Doctor Connect</h1>
          </div>
          
          <AnimatePresence mode="wait">
            {/* Error message */}
            {(error || formError) && (
              <motion.div 
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-medium">{formError || error}</p>
              </motion.div>
            )}
          </AnimatePresence>
            
          <motion.div
            key="loginForm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('signin_title')}</h2>
            <p className="text-gray-600 mb-8">{t('signin_subtitle')}</p>
            
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
                  {t('email')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85] focus:border-transparent"
                    placeholder={`${t('email').toLowerCase()}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError();
                    }}
                    required
                  />
                </div>
              </div>
              
              {/* Password */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 font-medium" htmlFor="password">
                    {t('password')} <span className="text-red-500">*</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-[#007E85] hover:text-[#006e75]">
                    {t('forgot_password')}
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85] focus:border-transparent"
                    placeholder={`${t('password').toLowerCase()}`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError();
                    }}
                    required
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 
                      <FiEyeOff className="text-gray-400 hover:text-gray-600" /> : 
                      <FiEye className="text-gray-400 hover:text-gray-600" />
                    }
                  </div>
                </div>
              </div>
              
              {/* Remember me */}
              <div className="flex items-center mb-6">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#007E85] focus:ring-[#007E85] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  {t('remember_me')}
                </label>
              </div>
              
              {/* Submit button */}
              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-[#007E85] text-white rounded-lg font-medium hover:bg-[#006e75] transition duration-300 flex items-center justify-center"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('signing_in')}
                  </>
                ) : t('sign_in')}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Sign up link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              {t('no_account')}{' '}
              <Link href="/register" className="text-[#007E85] font-medium hover:underline">
                {t('create_account_link')}
              </Link>
            </p>
          </div>
          
          {/* Social sign in options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <div className="flex items-center">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">{t('or_sign_in_with')}</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="flex space-x-4 mt-5">
              <motion.button 
                type="button" 
                className="flex-1 flex items-center justify-center bg-white border border-gray-300 p-2 rounded-lg hover:bg-gray-50"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGoogle className="text-red-500" />
              </motion.button>
              <motion.button 
                type="button" 
                className="flex-1 flex items-center justify-center bg-white border border-gray-300 p-2 rounded-lg hover:bg-gray-50"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaApple className="text-black" />
              </motion.button>
              <motion.button 
                type="button" 
                className="flex-1 flex items-center justify-center bg-white border border-gray-300 p-2 rounded-lg hover:bg-gray-50"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaFacebook className="text-blue-600" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 