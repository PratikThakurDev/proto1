import { SUPPORTED_LANGUAGES } from '../config/constants.js';
import { translate } from './bhashini/translation.service.js';
import { detectLanguage } from './bhashini/language-detection.service.js';
export const languages = () => SUPPORTED_LANGUAGES;
export { translate, detectLanguage };
