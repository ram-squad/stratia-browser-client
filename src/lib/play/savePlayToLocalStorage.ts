import type {Play} from "$lib/play/Play.ts";
import {computePlayLocalStorageItemKey} from "$lib/play/computePlayLocalStorageItemKey.ts";

export function savePlayToLocalStorage(play: Play): void {
	const itemKey = computePlayLocalStorageItemKey(play.id);

	const itemValue = JSON.stringify({
		entities: play.entities,
		id: play.id,
		tiles: play.tiles.map(({data, position}) => ({
			data,
			position: {
				x: position.inGridX,
				y: position.inGridY,
			},
		})),
	});

	localStorage.setItem(itemKey, itemValue);
}
