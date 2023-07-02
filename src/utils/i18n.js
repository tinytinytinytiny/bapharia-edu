import { useStoryblokApi } from '@storyblok/astro';
import { languages, defaultLang, ui } from '@data/i18n';

const storyblokApi = useStoryblokApi();

export async function useTranslations(lang = defaultLang) {
	let strings;
	const cachedStrings = ui.get();
	const _lang = (lang in languages) ? lang : defaultLang;

	if (_lang in cachedStrings) {
		strings = cachedStrings[_lang];
	} else {
		strings = await getStrings(_lang);
		ui.setKey(_lang, strings);
	}

	return function t(key) {
		return strings[key] || key;
	}
}

async function getStrings(dimension) {
	const { data: { datasource_entries } } = await storyblokApi.get('cdn/datasource_entries', {
		datasource: 'ui',
		dimension,
		per_page: 1000
	});

	return Object.fromEntries(
		datasource_entries.map(
			x => ([x.name, x.dimension_value || x.value])
		)
	);
}