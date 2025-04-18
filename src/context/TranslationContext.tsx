// src/context/TranslationContext.js
import React, { createContext, useState, useContext } from "react";
import { enTranslations, ruTranslations } from "../i18n/i18n";

type TranslationFunction = (key: string) => string|Array<string>;

type TranslationContextType = {
  language: string;
  changeLanguage: (lang: string) => void;
  t: TranslationFunction;
  availableLanguages: { code: string; name: string }[];
};

// Import translation files
const TranslationContext = createContext<TranslationContextType | null>(null);

const translations = {
  en: enTranslations,
  ru: ruTranslations,
};

export const TranslationProvider = ({ children }) => {
  // Get saved language from localStorage or use browser language or default to 'en'
  const getSavedLanguage = () => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }

    // Check browser language
    const browserLang = navigator.language.split("-")[0];
    if (translations[browserLang]) {
      return browserLang;
    }

    return "en"; // Default to English
  };

  const [language, setLanguage] = useState(getSavedLanguage());

  // Change language and store it in localStorage
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  // Translation function
  const t = (key) => {
    let value = translations[language];

    if (!value) {
      value = translations["en"];
    }

    if (value[key]) {
      return value[key];
    }

    return key;
  };

  // Available languages for the language switcher
  const availableLanguages = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
  ];

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === null) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

export default TranslationContext;
