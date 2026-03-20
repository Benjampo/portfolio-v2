import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import translations, { Locale, TranslationKey } from '../data/translations';

type I18nContextType = {
  locale: Locale;
  renderLocale: Locale;
  t: (key: TranslationKey) => string;
  toggleLocale: () => void;
  commitLocale: () => void;
};

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  renderLocale: 'en',
  t: (key) => key,
  toggleLocale: () => {},
  commitLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [renderLocale, setRenderLocale] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved && (saved === 'en' || saved === 'fr')) {
      setLocale(saved);
      setRenderLocale(saved);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'en' ? 'fr' : 'en';
      localStorage.setItem('locale', next);
      return next;
    });
  }, []);

  const commitLocale = useCallback(() => {
    setRenderLocale((prev) => {
      const current = localStorage.getItem('locale') as Locale | null;
      return current ?? prev;
    });
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[renderLocale][key] ?? key;
    },
    [renderLocale]
  );

  return (
    <I18nContext.Provider value={{ locale, renderLocale, t, toggleLocale, commitLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
