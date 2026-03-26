import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      home: "Accueil",
      catalogue: "Catalogue",
      selection: "Ma Sélection",
      atelier: "L'Atelier",
      contact: "Contact",
      darkMode: "Mode sombre",
      lightMode: "Mode clair",
      language: "Langue",
      whatsapp: "Envoyer sur WhatsApp",
      // Tu pourras ajouter tous les textes plus tard
    }
  },
  en: {
    translation: {
      home: "Home",
      catalogue: "Catalogue",
      selection: "My Selection",
      atelier: "The Workshop",
      contact: "Contact",
      darkMode: "Dark mode",
      lightMode: "Light mode",
      language: "Language",
      whatsapp: "Send on WhatsApp",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;