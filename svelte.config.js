import adapter from "@sveltejs/adapter-node";
import {sveltePreprocess as preprocess} from "svelte-preprocess/dist/autoProcess.js";

/** @type {import("@sveltejs/kit").Config} */
export default {
	kit: {
		adapter: adapter(),
		files: {
			assets: "./src/assets",
		},
	},
	preprocess: preprocess(),
};
