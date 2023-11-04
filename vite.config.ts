import {sveltekit} from "@sveltejs/kit/vite";
import type {UserConfig} from "vite";

export default ((): UserConfig => ({
	plugins: [sveltekit()],
}))();
