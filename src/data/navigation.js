import { useStoryblokApi } from '@storyblok/astro';

export default async function () {
	const storyblokApi = useStoryblokApi();
	const { data: { links } } = await storyblokApi.get('cdn/links/', {
		starts_with: 'guides/',
		version: import.meta.env.DEV ? 'draft' : 'published'
	});
	const sortedLinks = Object.values(links).sort((a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});

	return [
		{
			title: 'Home',
			url: '/',
			icon: import('@assets/icons/bapharia.svg?raw')
		},
		{
			title: 'World Map',
			url: '/map',
			icon: import('@assets/icons/msq.svg?raw')
		},
		{
			title: 'Guides',
			url: '/guides',
			icon: import('@assets/icons/guide.svg?raw'),
			children: sortedLinks.map((link) => ({
				title: link.name,
				url: `/${link.slug}`
			}))
		},
		{
			title: 'Test',
			url: '/test',
			icon: import('@assets/icons/bapharia.svg?raw')
		}
	];
}