import { createContext, ReactNode, FC, useState, useEffect, useContext } from "react";
import { useAsyncStorage } from "~/hooks/use-async-storage";
import i18n from "~/services/localization/i18n";

const LANGUAGE_KEY = "en";

interface LanguageContextProps {
  locale: string;
  changeLanguage: (lang: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<string>(i18n.locale);
  const { setAsyncValue, getAsyncValue } = useAsyncStorage(LANGUAGE_KEY);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await getAsyncValue();
        if (savedLanguage) {
          i18n.locale = savedLanguage;
          setLocale(savedLanguage);
        }
      } catch (error) {
        console.error("Failed to load language from async storage: ", error);
      }
    };

    loadLanguage();
  }, [getAsyncValue]);

  const changeLanguage = async (lang: string) => {
    try {
      i18n.locale = lang;
      setLocale(lang);
      await setAsyncValue(lang);
    } catch (error) {
      console.error("Failed to save language to async storage: ", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to access the language context.
 * Use it in the page level to subscribe to language changes.
 *
 * @example
 * ```tsx
 * useLanguage();
 * ```
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
