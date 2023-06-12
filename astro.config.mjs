import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import netlify from "@astrojs/netlify/functions";
import svelte from "@astrojs/svelte";

const env = import.meta.env.STORYBLOK_TOKEN || loadEnv('', process.cwd(), 'STORYBLOK');

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false
			}
		}),
		mdx(),
		svelte(),
		storyblok({
			accessToken: env.STORYBLOK_TOKEN,
			components: {
				article: 'storyblok/Article'
			},
			apiOptions: { region: 'us' }
		})
	],
	output: "server",
	adapter: netlify()
});