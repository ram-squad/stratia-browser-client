import type {Play} from "$lib/play/Play.ts";
import {computePlayLocalStorageItemKey} from "$lib/play/computePlayLocalStorageItemKey.ts";
import {playSchema} from "./playSchema";

export function loadPlayFromLocalStorage(playId: string): Play {
	const itemKey = computePlayLocalStorageItemKey(playId);
	const itemValue = localStorage.getItem(itemKey);
	if (itemValue === null) {
		throw new Error(`Play with id "${playId}" not found in local storage.`);
	}
	return playSchema.parse(JSON.parse(itemValue));
}
