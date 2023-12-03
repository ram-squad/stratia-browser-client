import {generateNewPlayId} from "$lib/play/generateNewPlayId.ts";
import type {Play} from "./Play.ts";

export function createPlay(): Play {
	return {
		id: generateNewPlayId(),
	};
}
