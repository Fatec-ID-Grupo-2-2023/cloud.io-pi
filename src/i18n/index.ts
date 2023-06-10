import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import de from './de.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import it from './it.json';
import pt from './pt.json';

const resources = {
    pt: {
        translation: pt
    },
    en: {
        translation: en
    },
    es: {
        translation: es
    },
    it: {
        translation: it
    },
    fr: {
        translation: fr
    },
    de: {
        translation: de
    }
}

i18n.use(initReactI18next).use(detector).init({
    resources,
    fallbackLng: 'en',

    interpolation: {
        escapeValue: false
    }
});

export default i18n;