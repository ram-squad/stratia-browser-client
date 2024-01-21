import type {Handle} from "@sveltejs/kit";

export const handle: Handle = async ({
	event,
	resolve,
}: Parameters<Handle>[0]): Promise<Response> => {
	const response = await resolve(event, {
		transformPageChunk: ({html}): string => html.replace(/%sveltekit\.lang%/gu, "en"),
	});

	return response;
};
