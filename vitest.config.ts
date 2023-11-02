import {svelte} from "@sveltejs/vite-plugin-svelte";
import {defineConfig} from "vitest/config";

export default defineConfig({
	plugins: [svelte({hot: process.env["VITEST"] === undefined})],
	test: {
		include: ["**/*.unit.test.ts", "**/*.unit.test.js", "**/*.unit.test.cjs", "**/*.unit.test.mjs"],

		environment: "jsdom",
		coverage: {
			provider: "v8",
			reportsDirectory: "coverage-report",
			reporter: ["html", "text"],
		},
	},
	resolve: {
		alias: [
			{find: /^\$lib$/u, replacement: "/src/lib"},
			{find: /^\$lib\/(?<pathInLib>.*)$/u, replacement: "/src/lib/$1"},
		],
	},
});
