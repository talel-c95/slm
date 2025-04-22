'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/authContext';
import { useLanguage } from '@/contexts/languageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';
import Image from 'next/image';

type UserRole = 'patient' | 'doctor';

export default function Register() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [specialty, setSpecialty] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, error, loading, clearError } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Basic validation
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }

    // Doctor-specific validation
    if (role === 'doctor') {
      if (!specialty) {
        setFormError('Please enter your medical specialty');
        return;
      }
      if (!licenseNumber) {
        setFormError('Please enter your medical license number');
        return;
      }
    }

    try {
      // Create registration data object based on role
      const userData = {
        firstName,
        lastName,
        email,
        password,
        role,
        phoneNumber,
        ...(role === 'doctor' && { specialty, licenseNumber }),
      };

      await register(userData);
      
      // Redirect after successful registration based on role
      if (localStorage.getItem('token')) {
        if (role === 'doctor') {
          router.push('/dashboard/doctor');
        } else if (role === 'patient') {
          router.push('/dashboard/patient');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      // Authentication errors are handled in the context
    }
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate first step
      if (!firstName || !lastName || !email) {
        setFormError('Please fill in all required fields');
        return;
      }
      if (!validateEmail(email)) {
        setFormError('Please enter a valid email address');
        return;
      }
    }
    
    if (step === 2) {
      // Validate second step
      if (!password || !confirmPassword) {
        setFormError('Please fill in all required fields');
        return;
      }
      if (password !== confirmPassword) {
        setFormError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setFormError('Password must be at least 6 characters long');
        return;
      }
    }

    if (step === 3 && role === 'doctor') {
      // Validate doctor information
      if (!specialty || !licenseNumber) {
        setFormError('Please fill in all required fields');
        return;
      }
    }

    clearError();
    setFormError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    clearError();
    setFormError('');
    setStep(step - 1);
  };

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const languages = ['English', 'Français', 'العربية', '中文', 'Español', 'हिन्दी'];
  const specialties = [
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'Neurology',
    'Obstetrics & Gynecology',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Urology'
  ];

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
            <h2 className="text-3xl font-bold mb-4">{t('join_network')}</h2>
            <p className="text-white/80 text-lg mb-8">
              {t('join_subtitle')}
            </p>
            
            <motion.div
              className="relative w-full overflow-hidden rounded-2xl"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Progress steps */}
              <div className="mb-12">
                <div className="flex items-center justify-between w-full relative">
                  {/* Progress bar */}
                  <div className="absolute h-1 bg-white/20 w-full top-4 left-0 z-0"></div>
                  <div 
                    className="absolute h-1 bg-white w-full top-4 left-0 z-10 transition-all duration-300" 
                    style={{ width: `${(step - 1) * (100 / 3)}%` }}
                  ></div>
                  
                  {/* Steps */}
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                      key={i}
                      className={`z-20 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        step >= i 
                          ? 'bg-white text-[#007E85] border-white' 
                          : 'bg-transparent text-white/50 border-white/50'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {step > i ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        i
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Step labels */}
                <div className="flex justify-between mt-2 text-sm">
                  <span className={step >= 1 ? 'text-white' : 'text-white/50'}>
                    {t('create_title').split(' ')[0]}
                  </span>
                  <span className={step >= 2 ? 'text-white' : 'text-white/50'}>
                    {t('security_title').split(' ')[0]}
                  </span>
                  <span className={step >= 3 ? 'text-white' : 'text-white/50'}>
                    {t('account_type_title').split(' ')[0]}
                  </span>
                  <span className={step >= 4 ? 'text-white' : 'text-white/50'}>
                    {t('confirmation_title').split(' ')[0]}
                  </span>
                </div>
              </div>
              
              <Image
                className=""
                alt="Placeholder"
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
            
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('create_title')}</h2>
              <p className="text-gray-600 mb-8">{t('create_subtitle')}</p>
              
              {/* First Name */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="firstName">
                  {t('first_name')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85] focus:border-transparent"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      clearError();
                    }}
                    required
                  />
                </div>
              </div>
              
              {/* Last Name */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="lastName">
                  {t('last_name')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85] focus:border-transparent"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      clearError();
                    }}
                    required
                  />
                </div>
              </div>
              
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
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError();
                    }}
                    required
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('security_title')}</h2>
              <p className="text-gray-600 mb-8">{t('security_subtitle')}</p>
              
              {/* Phone Number */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="phoneNumber">
                  {t('phone_number')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85] focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      clearError();
                    }}
                  />
                </div>
              </div>
              
              {/* Password */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
                  {t('password')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85] focus:border-transparent"
                    placeholder={t('password')}
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
                <p className="text-xs text-gray-500 mt-1">{t('password_hint')}</p>
              </div>
              
              {/* Confirm Password */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="confirmPassword">
                  {t('confirm_password')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85] focus:border-transparent"
                    placeholder={t('confirm_password')}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearError();
                    }}
                    required
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? 
                      <FiEyeOff className="text-gray-400 hover:text-gray-600" /> : 
                      <FiEye className="text-gray-400 hover:text-gray-600" />
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('account_type_title')}</h2>
              <p className="text-gray-600 mb-8">{t('account_type_subtitle')}</p>
              
              {/* Account type selection */}
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      role === 'patient' 
                        ? 'border-[#007E85] bg-[#007E85]/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setRole('patient')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                        role === 'patient' ? 'bg-[#007E85] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      </div>
                      <h3 className="font-medium mb-1">{t('patient')}</h3>
                      <p className="text-sm text-gray-500">{t('patient_desc')}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      role === 'doctor' 
                        ? 'border-[#007E85] bg-[#007E85]/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setRole('doctor')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                        role === 'doctor' ? 'bg-[#007E85] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.5 20.25h-9a1.5 1.5 0 0 1-1.5-1.5v-10.5a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5Z" />
                        </svg>
                      </div>
                      <h3 className="font-medium mb-1">{t('doctor')}</h3>
                      <p className="text-sm text-gray-500">{t('doctor_desc')}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Doctor-specific fields */}
              {role === 'doctor' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Specialty */}
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="specialty">
                      {t('specialty')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="specialty"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85] focus:border-transparent"
                      value={specialty}
                      onChange={(e) => {
                        setSpecialty(e.target.value);
                        clearError();
                      }}
                      required
                    >
                      <option value="">Select your specialty</option>
                      {specialties.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
              
                  {/* License Number */}
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="licenseNumber">
                      {t('license')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="licenseNumber"
                      type="text"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85] focus:border-transparent"
                      placeholder={t('license_placeholder')}
                      value={licenseNumber}
                      onChange={(e) => {
                        setLicenseNumber(e.target.value);
                        clearError();
                      }}
                      required
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center py-8">
                <motion.div 
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </motion.div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('confirmation_title')}</h2>
                <p className="text-gray-600 mb-8">{t('confirmation_subtitle')}</p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-8">
                  <h3 className="font-medium text-gray-800 mb-3">{t('account_summary')}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">{t('account_name')}</div>
                    <div className="text-gray-800 font-medium">{firstName} {lastName}</div>
                    <div className="text-gray-500">{t('account_email')}</div>
                    <div className="text-gray-800 font-medium">{email}</div>
                    <div className="text-gray-500">{t('account_type')}</div>
                    <div className="text-gray-800 font-medium capitalize">{t(role)}</div>
                    {role === 'doctor' && (
                      <>
                        <div className="text-gray-500">{t('account_specialty')}</div>
                        <div className="text-gray-800 font-medium">{specialty}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <motion.button
                type="button"
                className="flex items-center px-4 py-2 text-[#007E85] hover:text-[#006e75] font-medium"
                onClick={prevStep}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiArrowLeft className="mr-2" />
                {t('back')}
              </motion.button>
            ) : (
              <div></div> // Empty div to maintain layout with flex justify-between
            )}
            
            {step < 4 ? (
              <motion.button
                type="button" 
                className="flex items-center px-6 py-3 bg-[#007E85] text-white rounded-lg font-medium hover:bg-[#006e75] transition duration-300"
                onClick={nextStep}
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('next_step')}
                <FiArrowRight className="ml-2" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                className="w-full px-6 py-3 bg-[#007E85] text-white rounded-lg font-medium hover:bg-[#006e75] transition duration-300 flex items-center justify-center"
                onClick={handleSubmit}
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
                    {t('creating_account')}
                  </>
                ) : t('create_account')}
              </motion.button>
            )}
          </div>
          
          {/* Sign in link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              {t('have_account')}{' '}
              <Link href="/login" className="text-[#007E85] font-medium hover:underline">
                {t('sign_in_link')}
              </Link>
            </p>
          </div>
          
          {/* Social sign up options */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <div className="flex items-center">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">{t('or_sign_up_with')}</span>
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
          )}
        </motion.div>
      </div>
    </div>
  );
} 