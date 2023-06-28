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