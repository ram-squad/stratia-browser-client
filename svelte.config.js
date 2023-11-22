import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";

/** @type {import("@sveltejs/kit").Config} */
export default {
	kit: {
		adapter: adapter(),
		files: {
			assets: "./src/assets",
		},
	},
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
};
