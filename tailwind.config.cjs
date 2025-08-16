const plugin = require('tailwindcss/plugin');

const borderRadius = require('./src/data/design-tokens/border-radius.json');
const color = require('./src/data/design-tokens/colors.json');
const fontSize = require('./src/data/design-tokens/font-sizes.cjs');
const spacing = require('./src/data/design-tokens/spacing.cjs');
const screens = require('./src/data/design-tokens/screen-sizes.json');

/**
 * Flattens a nested object into a single depth object
 * @param {Object} obj
 * @returns {Object} the flattened object
 */
function flatten(obj) {
	const result = {};

	for (const key in obj) {
		if (typeof obj[key] === 'object') {
			// recursively call the function again
			const _obj = flatten(obj[key]);
			// store _obj in result
			for (const _key in _obj) {
				result[`${key}.${_key}`] = _obj[_key];
			}
		} else {
			// store obj[key] in result if obj[key] can be flattened no more
			result[key] = obj[key];
		}
	}

	return result;
}

/**
 * Converts design tokens into CSS variables. Tailwind classes will reference these variables instead of hardcoded values
 * @param {Object} tokens 
 * @param {String} prefix 
 * @returns {Object} Object with design token values replaced with CSS variables
 */
function makeCSSVariables(tokens, prefix = '') {
	const CSSVar = (prefix, token) =>
		`var(--${[prefix, ...token.split('.')]
			.filter(x => x.length && x !== 'DEFAULT')
			.join('-')})`;
	const _tokens = JSON.parse(JSON.stringify(tokens));
	const flatTokens = flatten(_tokens);

	for (const token in flatTokens) {
		token.split('.').reduce((o, i) => {
			if (typeof o[i] === 'object') return o[i];
			o[i] = CSSVar(prefix, token);
		}, _tokens);
	}

	return _tokens;
}

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	important: false,
	theme: {
		screens,
		containers: screens,
		borderRadius: makeCSSVariables(borderRadius, 'border-radius'),
		colors: makeCSSVariables(color, 'color'),
		fontSize: makeCSSVariables(fontSize, 'text'),
		spacing: makeCSSVariables(spacing, 'space'),
		margin: ({ theme }) => ({
			auto: 'auto',
			...theme('spacing')
		}),
		padding: ({ theme }) => theme('spacing'),
		extend: {
			backgroundColor: ({ colors }) => ({
				transparent: colors.transparent
			}),
			colors: ({ colors }) => ({
				current: colors.current,
				inherit: colors.inherit
			}),
			textColor: makeCSSVariables(color.text, 'color-text')
		},
		variables: {
			DEFAULT: {
				'border-radius': borderRadius,
				color,
				space: spacing,
				text: fontSize
			}
		}
	},
	corePlugins: {
		preflight: false
	},
	blocklist: ['container'],
	plugins: [
		require('@mertasan/tailwindcss-variables'),
		require('tailwindcss-logical'),
		require('@tailwindcss/container-queries'),
		plugin(function ({ addUtilities, theme }) {
			const customUtilities = [
				{ configKey: 'spacing', prefix: '.stack-space', property: '--stack-space' }
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