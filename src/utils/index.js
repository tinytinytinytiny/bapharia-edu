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

export const storyblokImage = (url) => {
	const baseUrl = url.split('/').slice(0, 8).join('/');
	const optimizedUrl = (url.split('/')[8] === 'm') ? url : baseUrl + '/m/';
	const dimensions = url.split('/')[5].split('x').map(x => Number(x));
	return {
		url,
		baseUrl,
		optimizedUrl,
		dimensions,
		get width() {
			return this.dimensions[0];
		},
		get height() {
			return this.dimensions[1];
		},
		generateSrcset: (multipliers = [0.875, 0.75, 0.625, 0.5, 0.375, 0.25]) => {
			const width = dimensions[0];
			const srcset = multipliers.map(x => {
				const w = Math.round(width * x);
				return `${optimizedUrl}${w}x0/ ${w}w`;
			});
			srcset.splice(0, 0, `${optimizedUrl} ${width}w`);
			return srcset.join(', ');
		},
		setSize: (width, height = 0) =>
			storyblokImage(`${optimizedUrl}${width}x${height}/`)
	};
};

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