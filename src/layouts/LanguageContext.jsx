import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for the language
const LanguageContext = createContext();

// Create a provider component
export const LanguageProvider = ({ children }) => {
	const [language, setLanguage] = useState(
		(
			window.localStorage.getItem("language") ||
			navigator.language ||
			navigator.userLanguage
		).slice(0, 2)
	);

  useEffect(() => {
    window.localStorage.setItem("language", language);
  }, [language]);

	const switchLanguage = (lang) => {
		setLanguage(lang);
	};

	return (
		<LanguageContext.Provider value={{ language, switchLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

// Create a custom hook to use the language context
export const useLanguage = () => {
	return useContext(LanguageContext);
};
