import {svelte} from "@sveltejs/vite-plugin-svelte";
import {defineConfig} from "vitest/config";

export default defineConfig({
	plugins: [svelte({hot: process.env["VITEST"] === undefined})],
	resolve: {
		alias: [
			{find: /^\$lib$/u, replacement: "/src/lib"},
			{find: /^\$lib\/(?<pathInLib>.*)$/u, replacement: "/src/lib/$1"},
		],
	},
	test: {
		include: ["**/*.unit.test.cjs", "**/*.unit.test.js", "**/*.unit.test.mjs", "**/*.unit.test.ts"],
	},
});
