import type {Play} from "$lib/play/Play.ts";
import {generateNewPlayID} from "$lib/play/generateNewPlayID.ts";

export function createPlay(): Play {
	return {
		id: generateNewPlayID(),
		tiles: [],
	};
}
