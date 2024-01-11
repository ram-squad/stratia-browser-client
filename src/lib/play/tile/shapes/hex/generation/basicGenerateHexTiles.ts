import type {Circle} from "$lib/math/circle/Circle.ts";
import {checkIfPointIsInsideOfCircle} from "$lib/math/circle/checkIfPointIsInsideOfCircle.ts";
import {generatePerlinNoise} from "$lib/math/noise/perlinNoise.ts";
import type {Point} from "$lib/math/point/Point.ts";
import {Tile} from "$lib/play/tile/Tile.ts";
import {HexTilePosition} from "$lib/play/tile/shapes/hex/tile/position/HexTilePosition.ts";
import type {HexTile} from "../tile/HexTile.ts";

export function basicGenerateHexTiles(): readonly HexTile[] {
	const tiles: HexTile[] = [];

	// Wielki okrąg o jednym typie terenu
	const center: Point = {
x: 0, y: 0
};

	const radius = 20;

	const mainCircle: Circle = {
center, radius
};

	const mainLandType = "water"; // Domyślny typ terenu

	// Generowanie szumu Perlina
	const perlinScale = 0.2; // Skala szumu Perlina

	const perlinOffsetX = Math.random() * 1000;

	const perlinOffsetY = Math.random() * 1000;

	for (let y = -radius; y <= radius; y++) {
		for (let x = -radius; x <= radius; x++) {
			const hexTilePosition = new HexTilePosition({
x, y
});

			// Sprawdzanie, czy punkt należy do głównego okręgu
			if (checkIfPointIsInsideOfCircle(hexTilePosition.real, mainCircle) >= 0) {
				// Ustawianie typu terenu zgodnie z szumem Perlin
				const perlinValue = generatePerlinNoise(
					(hexTilePosition.real.x + perlinOffsetX) * perlinScale,
					(hexTilePosition.real.y + perlinOffsetY) * perlinScale,
				);

				console.log(perlinValue);

				const landType = perlinValue > 0 ? "dirt" : mainLandType;

				const hexTile: HexTile = new Tile(
					{
						landType,
					},
					hexTilePosition,
				);

				tiles.push(hexTile);
			}
		}
	}

	return tiles;
}
