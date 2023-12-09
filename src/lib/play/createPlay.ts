import type {Play} from "$lib/play/Play.ts";
import {generateNewPlayId} from "$lib/play/generateNewPlayId.ts";

export function createPlay(): Play {
	return {
		id: generateNewPlayId(),
	};
}
