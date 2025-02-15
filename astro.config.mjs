import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
// import basicSsl from '@vitejs/plugin-basic-ssl';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import netlify from "@astrojs/netlify/functions";
import svelte from "@astrojs/svelte";

const env = import.meta.env.STORYBLOK_TOKEN || loadEnv('', process.cwd(), 'STORYBLOK');

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			applyBaseStyles: false
		}),
		svelte(),
		storyblok({
			accessToken: env.STORYBLOK_TOKEN,
			bridge: false,
			components: {
				article: 'storyblok/Article',
				skill: 'storyblok/Skill',
				classLink: 'storyblok/ClassLink'
			},
			apiOptions: { region: 'us' }
		})
	],
	output: "server",
	// vite: {
	// 	plugins: [basicSsl()],
	// 	server: {
	// 		https: true,
	// 	},
	// },
	adapter: netlify()
});