import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import translations, { Locale, TranslationKey } from '../data/translations';

type I18nContextType = {
  locale: Locale;
  t: (key: TranslationKey) => string;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  t: (key) => key,
  toggleLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'en' ? 'fr' : 'en';
      localStorage.setItem('locale', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[locale][key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
