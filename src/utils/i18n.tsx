import React, { createContext, useContext, useMemo, useState } from 'react';

type LanguageCode = 'fr' | 'en' | 'wolof';

type Dictionary = Record<string, Record<LanguageCode, string>>;

const dictionary: Dictionary = {
  hello: { fr: 'Bonjour', en: 'Hello', wolof: 'Nanga def' },
  welcomeMuseum: {
    fr: 'Bienvenue au Musée des Civilisations Noires',
    en: 'Welcome to Museum of Black Civilisations',
    wolof: 'Dalal ak jàmm ci Muséem bi',
  },
  searchPlaceholder: { fr: 'Rechercher', en: 'Search', wolof: 'Seet' },
  seeMore: { fr: 'Voir plus', en: 'See more', wolof: 'Gëna xem' },
  settings: { fr: 'Paramètres', en: 'Settings', wolof: 'Tànneef' },
  griot: { fr: 'Griot', en: 'Griot', wolof: 'Gewël' },
  writeToGriot: { fr: 'Écris au griot...', en: 'Write to the griot...', wolof: 'Bindeel ci gewël bi...' },
};

function translate(lang: LanguageCode, key: string): string {
  const entry = dictionary[key];
  if (!entry) return key;
  return entry[lang] ?? entry.fr;
}

type I18nContextType = {
  lang: LanguageCode;
  setLang: (l: LanguageCode) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>('fr');
  const value = useMemo(() => ({ lang, setLang, t: (k: string) => translate(lang, k) }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}


