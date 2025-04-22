'use client';

import React from 'react';
import Navbar from '@/components/Home/Navbar';
import { useLanguage } from '@/contexts/languageContext';
import { Globe } from 'lucide-react';

export default function ContactUs() {
  const { t, language, setLanguage } = useLanguage();
  
  // For phone number formats based on language/region
  const getPhoneNumberPlaceholder = () => {
    switch(language) {
      case 'Français': return '+33 1 23 45 67 89';
      case 'العربية': return '+971 50 123 4567';
      case '中文': return '+86 123 4567 8901';
      case 'Español': return '+34 612 34 56 78';
      case 'हिन्दी': return '+91 98765 43210';
      default: return '+1 (555) 123-4567';
    }
  };

  // Get flag emoji for language
  const getLanguageFlag = (lang: string) => {
    switch(lang) {
      case 'English': return '🇺🇸';
      case 'Français': return '🇫🇷';
      case 'العربية': return '🇦🇪';
      case '中文': return '🇨🇳';
      case 'Español': return '🇪🇸';
      case 'हिन्दी': return '🇮🇳';
      default: return '🌎';
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
       
        <div className="flex items-center mb-3">
          <Globe className="w-5 h-5 mr-2 text-teal-600" />
          <h1 className="text-1xl font-bold">{t('get_in_touch')}</h1>
        </div>
        
        <h1 className='text-4xl font-bold mb-2'>{t('contact_us')}</h1>
        
        {/* Multi-language welcome */}
        <div className="mb-4 text-center">
          <span className="text-gray-500 text-sm">Welcome • Bienvenue • مرحبًا • 欢迎 • Bienvenido • स्वागत है</span>
        </div>
        
        <p className="mb-8 text-center">{t('contact_subtitle')}</p>
        
        {/* Language Selector */}
        <div className="w-full max-w-4xl mb-4 flex justify-end">
          <div className="flex items-center border border-teal-600 rounded-lg bg-white overflow-hidden">
            <div className="px-2 bg-teal-50">{getLanguageFlag(language)}</div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="p-2 bg-white text-sm border-0 focus:ring-0 focus:outline-none"
            >
              <option value="English">🇺🇸 English</option>
              <option value="Français">🇫🇷 Français</option>
              <option value="العربية">🇦🇪 العربية</option>
              <option value="中文">🇨🇳 中文</option>
              <option value="Español">🇪🇸 Español</option>
              <option value="हिन्दी">🇮🇳 हिन्दी</option>
            </select>
          </div>
        </div>
        
        <form className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md" dir={language === 'العربية' ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="mb-2">{t('first_name')}</label>
              <input 
                type="text" 
                placeholder={t('first_name_placeholder')} 
                className="border border-teal-600 p-3 rounded-lg w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">{t('last_name')}</label>
              <input 
                type="text" 
                placeholder={t('last_name_placeholder')} 
                className="border border-teal-600 p-3 rounded-lg w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="flex flex-col">
              <label className="mb-2">{t('email')}</label>
              <input 
                type="email" 
                placeholder={t('email_placeholder')} 
                className="border border-teal-600 p-3 rounded-lg w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">{t('phone_number')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  {getLanguageFlag(language)}
                </div>
                <input 
                  type="tel" 
                  placeholder={getPhoneNumberPlaceholder()} 
                  className="border border-teal-600 p-3 pl-10 rounded-lg w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2">{t('choose_topic')}</label>
            <select className="border border-teal-600 p-3 rounded-lg w-full">
              <option>{t('select_one')}</option>
              <option>{t('general_inquiry')}</option>
              <option>{t('support')}</option>
              <option>{t('feedback')}</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2">{t('message')}</label>
            <textarea 
              placeholder={t('message_placeholder')} 
              className="border border-teal-600 p-3 rounded-lg w-full"
              rows={4} 
            />
          </div>
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" 
            />
            <span className="ml-2 text-gray-700">{t('terms_agree')}</span>
          </div>
          
          <button className="w-full md:w-auto bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
            {t('submit')}
          </button>
          
          {/* International support note */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>{t('international_support')}</p>
          </div>
        </form>
      </div>
    </div>
  );
}