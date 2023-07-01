import { useStoryblokApi } from '@storyblok/astro';
import { languages, ui } from '@data/i18n';

const storyblokApi = useStoryblokApi();

export async function useTranslations(lang) {
	let strings;
	const cachedStrings = ui.get();

	if (cachedStrings) {
		strings = cachedStrings;
	} else {
		strings = await getAllLangStrings();
		ui.set(strings);
	}

	return function t(key) {
		return strings[lang][key] || key;
	}
}

async function getStrings(dimension) {
	const { data: { datasource_entries }} = await storyblokApi.get('cdn/datasource_entries', {
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

async function getAllLangStrings() {
	return Object.fromEntries(
		await Promise.all(
			Object.keys(languages).map(async (lang) => 
				([lang, await getStrings(lang)])
		  	)
		)
	);
}
