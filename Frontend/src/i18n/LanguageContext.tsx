import React, { useState, type ReactNode, createContext, useContext } from 'react';
import { translations, languageCodeMap, type TranslationKey, type LanguageCode } from './translations';

interface LanguageContextType {
  currentLanguage: string;
  languageCode: LanguageCode;
  setLanguage: (language: string) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
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

  const languageCode: LanguageCode = (languageCodeMap[currentLanguage] || 'en') as LanguageCode;

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const t = (key: TranslationKey): string => {
    return translations[languageCode]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, languageCode, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
