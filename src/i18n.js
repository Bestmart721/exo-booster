import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Username is required.": "Username is required.",
      "Your username should be a minimum of 3 characters.": "Your username should be a minimum of 3 characters.",
      "Your username should be a maximum of 20 characters.": "Your username should be a maximum of 20 characters.",
      "Only alphanumeric characters are allowed.": "Only alphanumeric characters are allowed.",
      "Your Whatsapp number is required.": "Your Whatsapp number is required.",
      "Only numbers are allowed, no spaces or letters.": "Only numbers are allowed, no spaces or letters.",
      "Country cannot be empty.": "Country cannot be empty.",
      "Password cannot be empty.": "Password cannot be empty.",
      "Password must be at least 6 characters.": "Password must be at least 6 characters.",
      "Passwords must match.": "Passwords must match."
    }
  },
  fr: {
    translation: {
      "Username is required.": "Le nom d'utilisateur est requis.",
      "Your username should be a minimum of 3 characters.": "Votre nom d'utilisateur doit comporter au minimum 3 caractères.",
      "Your username should be a maximum of 20 characters.": "Votre nom d'utilisateur doit comporter au maximum 20 caractères.",
      "Only alphanumeric characters are allowed.": "Seuls les caractères alphanumériques sont autorisés.",
      "Your Whatsapp number is required.": "Votre numéro Whatsapp est requis.",
      "Only numbers are allowed, no spaces or letters.": "Seuls les chiffres sont autorisés, pas d'espaces ni de lettres.",
      "Country cannot be empty.": "Le pays ne peut pas être vide.",
      "Password cannot be empty.": "Le mot de passe ne peut pas être vide.",
      "Password must be at least 6 characters.": "Le mot de passe doit comporter au moins 6 caractères.",
      "Passwords must match.": "Les mots de passe doivent correspondre."
    }
  }
};

const queryParams = new URLSearchParams(window.location.search);
const lng = navigator.language || navigator.userLanguage || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: lng, // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
