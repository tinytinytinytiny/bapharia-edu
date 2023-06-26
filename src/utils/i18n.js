import { ui, defaultLang } from '@data/i18n';

export function useTranslations(lang) {
	return function t(key) {
		return ui[lang][key] || ui[defaultLang][key] || key;
	}
}