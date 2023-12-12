import type {Play} from "$lib/play/Play.ts";
import {computePlayLocalStorageItemKey} from "$lib/play/computePlayLocalStorageItemKey.ts";

export function savePlayToLocalStorage(play: Play): void {
	const itemKey = computePlayLocalStorageItemKey(play.id);
	const itemValue = JSON.stringify(play);

	localStorage.setItem(itemKey, itemValue);
}
