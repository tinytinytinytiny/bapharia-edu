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

export const queryStoryblokGApi = async (reqBody) => {
	const response = await fetch('https://gapi-us.storyblok.com/v1/api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Token: import.meta.env.STORYBLOK_TOKEN,
			Version: import.meta.env.DEV ? 'draft' : 'published'
		},
		body: JSON.stringify(reqBody),
	});
	const json = await response.json();
	return json.data;
};