import type {Play} from "$lib/play/Play.ts";
import {computePlayLocalStorageItemKey} from "$lib/play/computePlayLocalStorageItemKey.ts";
import {playFromJSONSchema} from "$lib/play/playFromJSONSchema.ts";

export function loadPlayFromLocalStorage(playId: string): Play {
	const itemKey = computePlayLocalStorageItemKey(playId);
	const itemValue = localStorage.getItem(itemKey);

	if (itemValue === null) {
		throw new Error(`Play with id "${playId}" not found in local storage.`);
	}

	return playFromJSONSchema.parse(JSON.parse(itemValue));
}
