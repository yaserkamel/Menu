import { createContext, useState } from 'react';

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // default language is English

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
