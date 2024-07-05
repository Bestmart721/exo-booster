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
      "Passwords must match.": "Passwords must match.",

      "Invalid username, should not contain any spaces , or special characters (eg: $ é # â .....)": "Invalid username, should not contain any spaces or special characters (e.g., $ é # â ...)",
      "Username must be at least 3 characters long.": "Username must be at least 3 characters long.",
      "Username must be at most 20 characters long.": "Username must be at most 20 characters long.",
      "Password must be at least 6 characters long.": "Password must be at least 6 characters long.",
      "Password is required.": "Password is required.",
      "Credentials entered are incorrect": "Credentials entered are incorrect.",
      "Too many attempts, try again later": "Too many attempts, try again later.",
      "cover-letter":"Join thousands of Brands and Influencers who elevated their social media growth with Exo Booster, the most trusted social media boosting service with over 50,000 users.",
      "Create your account": "Create your account",
      "Firebase: Error (auth/invalid-credential).": "Credentials entered are incorrect.",
      "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).": "Too many attempts, try again later.",
      "Could not get available countries.": "Could not get available countries.",
      "Log in": "Log in",
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
      "Passwords must match.": "Les mots de passe doivent correspondre.",

      "Invalid username, should not contain any spaces , or special characters (eg: $ é # â .....)": "Nom d'utilisateur non valide, ne doit pas contenir d'espaces ni de caractères spéciaux (ex. : $ é # â ...)",
      "Username must be at least 3 characters long.": "Le nom d'utilisateur doit comporter au moins 3 caractères.",
      "Username must be at most 20 characters long.": "Le nom d'utilisateur doit comporter au maximum 20 caractères.",
      "Password must be at least 6 characters long.": "Le mot de passe doit comporter au moins 6 caractères.",
      "Password is required.": "Le mot de passe est requis.",
      "Credentials entered are incorrect": "Les données d'identification saisies sont incorrectes.",
      "Too many attempts, try again later": "Trop de tentatives, réessayer plus tard.",
      "cover-letter":"Rejoignez des milliers de marques et d'influenceurs qui ont boosté leur croissance sur les réseaux sociaux avec Exo Booster, le service de boosting fiable avec plus de 50 000 utilisateurs.",
      "Create your account": "Créez votre compte",
      "Firebase: Error (auth/invalid-credential).": "Les données d'identification saisies sont incorrectes.",
      "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)." : "Trop de tentatives, réessayer plus tard.",
      "Could not get available countries." : "Impossible d'obtenir les pays disponibles.",
      "Log in": "Se connecter",
    }
  }
};

const queryParams = new URLSearchParams(window.location.search);
const lng = (window.location.hash.substring(1) || navigator.language || navigator.userLanguage).slice(0, 2) || en;

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
