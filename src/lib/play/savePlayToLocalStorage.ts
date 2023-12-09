import type {Play} from "$lib/play/Play.ts";
import {computePlayLocalStorageItemKey} from "$lib/play/computePlayLocalStorageItemKey.ts";

export function savePlayToLocalStorage(play: Play): void {
	const itemKey = computePlayLocalStorageItemKey(play.id);

	const itemValue = JSON.stringify({
		id: play.id,
		tiles: play.tiles.map((tile) => ({
			position: {
				x: tile.position.inGridX,
				y: tile.position.inGridY,
			},
		})),
	});

	localStorage.setItem(itemKey, itemValue);
}
