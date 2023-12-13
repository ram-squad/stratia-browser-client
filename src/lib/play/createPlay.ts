import type {HexTile} from "$lib/hex/HexTile.ts";
import {HexTilePosition} from "$lib/hex/HexTilePosition.ts";
import type {Play} from "$lib/play/Play.ts";
import {generateNewPlayID} from "$lib/play/generateNewPlayID.ts";

export function createPlay(): Play {
	const tiles: HexTile[] = [];

	for (let y = -8; y <= 8; ++y) {
		for (let x = -8; x <= 8; ++x) {
			const position = new HexTilePosition(x, y);

			const distanceFromOrigin = Math.sqrt(
				position.computeRealX() ** 2 + position.computeRealY() ** 2,
			);

			if (distanceFromOrigin <= 5.3) {
				if (Math.random() < distanceFromOrigin / 5) {
					tiles.push({
						data: {},
						position: new HexTilePosition(x, y),
					});
				}
			}
		}
	}

	return {
		id: generateNewPlayID(),
		tiles,
	};
}
