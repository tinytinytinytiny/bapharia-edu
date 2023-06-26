export const slugify = str =>
	str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');

export const getStoryblokImageDimensions = (url) => ({
	width: url.split('/')[5].split('x')[0],
	height: url.split('/')[5].split('x')[1]
});

import { useStoryblokApi } from "@storyblok/astro";
export const getStoryblokLinks = async (startsWith) => {
	const storyblokApi = useStoryblokApi();
	const { data: { links } } = await storyblokApi.get('cdn/links/', {
		starts_with: startsWith,
		version: import.meta.env.DEV ? 'draft' : 'published'
	});
	const sortedLinks = Object.values(links)
		.filter(link => link.is_startpage === false)
		.sort((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});

	return sortedLinks;
};