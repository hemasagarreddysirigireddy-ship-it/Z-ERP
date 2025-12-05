import React, { useState, useEffect, ReactNode, createContext, useContext } from 'react';
import { translations, languageCodeMap } from './translations';
import type { TranslationKey, LanguageCode } from './translations';

interface LanguageContextType {
  currentLanguage: string;
  languageCode: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem('selectedLanguage') || 'English';
  });

  const languageCode: string = (languageCodeMap[currentLanguage] || 'en') as string;

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const t = (key: string): string => {
    const code = languageCode as keyof typeof translations;
    return (translations[code] as any)?.[key] || (translations.en as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, languageCode, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
