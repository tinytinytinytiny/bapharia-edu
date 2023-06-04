const plugin = require('tailwindcss/plugin');

const color = require('./src/design-tokens/colors.json');
const fontSize = require('./src/design-tokens/font-sizes.cjs');
const spacing = require('./src/design-tokens/spacing.cjs');
const screens = require('./src/design-tokens/screen-sizes.json');

function getTokens(tokens, prefix = '') {
	const flatten = (obj) => {
		const result = {};

		Object.keys(obj).forEach((key) => {
			if (typeof obj[key] === 'object') {
				const _obj = flatten(obj[key]);
				Object.keys(_obj).forEach((_key) => {
					result[`${key}.${_key}`] = _obj[_key];
				});
			} else {
				result[key] = obj[key];
			}
		});

		return result;
	};

	const makeCSSVariable = (str) => {
		const variable = [prefix, ...str.split('.')]
			.filter(x => x.length && x !== 'DEFAULT')
			.join('-');
		return `var(--${variable})`;
	};

	const _tokens = JSON.parse(JSON.stringify(tokens));
	const flatTokens = flatten(_tokens);

	Object.keys(flatTokens).forEach((token) => {
		token.split('.').reduce((o, i) => {
			if (typeof o[i] === 'object') return o[i];
			o[i] = makeCSSVariable(token);
		}, _tokens);
	});

	return _tokens;
}

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens,
		colors: getTokens(color, 'color'),
		fontSize: getTokens(fontSize, 'text'),
		spacing: getTokens(spacing, 'space'),
		margin: ({ theme }) => ({
			auto: 'auto',
			...theme('spacing')
		}),
		padding: ({ theme }) => theme('spacing'),
		extend: {
			colors: ({ colors }) => ({
				current: colors.current,
				inherit: colors.inherit
			}),
			textColor: getTokens(color.text, 'color-text')
		},
		variables: {
			DEFAULT: {
				color,
				space: spacing,
				text: fontSize
			}
		}
	},
	corePlugins: {
		preflight: false
	},
	plugins: [
		require('@mertasan/tailwindcss-variables'),
		require('tailwindcss-logical'),
		plugin(function ({ addUtilities, theme }) {
			const customUtilities = [
				{ configKey: 'spacing', prefix: '.stack-space', property: '--stack-space' },
				{ configKey: 'spacing', prefix: '.gutter', property: '--gutter' }
			];

			customUtilities.forEach(({ configKey, prefix, property }) =>
				addUtilities(
					Object.fromEntries(
						Object.entries(theme(configKey))
							.map(([key, value]) => [`${prefix}-${key}`, { [property]: value }])
					)
				)
			);
		})
	]
}