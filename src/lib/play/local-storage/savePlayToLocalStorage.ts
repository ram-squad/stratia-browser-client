import type {Point} from "$lib/math/point/Point.ts";
import type {Play} from "$lib/play/Play.ts";
import {computePlayLocalStorageItemKey} from "$lib/play/local-storage/computePlayLocalStorageItemKey.ts";
import type {HexTile} from "$lib/play/tile/shapes/hex/tile/HexTile.ts";

export function savePlayToLocalStorage(play: Play): void {
	const itemKey = computePlayLocalStorageItemKey(play.id);

	const itemValue = JSON.stringify({
		entities: play.entities,
		id: play.id,
		tiles: play.tiles.map(
			({
				data,
				position,
			}): Readonly<{
				data: HexTile["data"];
				position: Point;
			}> => ({
				data,
				position: position.inGrid,
			}),
		),
	});

	localStorage.setItem(itemKey, itemValue);
}
