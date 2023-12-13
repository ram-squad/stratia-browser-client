import type {HexTile} from "$lib/hex/HexTile.ts";
import {HexTilePosition} from "$lib/hex/HexTilePosition.ts";

export function generatePlayHexTiles(): readonly HexTile[] {
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
						data: {
							landType: Math.random() < 0.5 ? "water" : "dirt",
						},
						position: new HexTilePosition(x, y),
					});
				}
			}
		}
	}

	return tiles;
}
