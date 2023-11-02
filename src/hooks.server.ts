import type {Handle} from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
	const response = await resolve(event, {
		transformPageChunk: ({html}) => html.replace(/%sveltekit\.lang%/gu, "en"),
	});
	return response;
};
