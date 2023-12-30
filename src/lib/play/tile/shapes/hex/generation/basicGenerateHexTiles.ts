import type {Circle} from "$lib/math/circle/Circle.ts";
import {checkIfPointIsInsideOfCircle} from "$lib/math/circle/checkIfPointIsInsideOfCircle.ts";
import type {Point} from "$lib/math/point/Point.ts";
import {Tile} from "$lib/play/tile/Tile.ts";
import type {HexTile} from "$lib/play/tile/shapes/hex/tile/HexTile.ts";
import {HexTilePosition} from "$lib/play/tile/shapes/hex/tile/position/HexTilePosition.ts";

export function basicGenerateHexTiles(): readonly HexTile[] {
	const tiles: HexTile[] = [];

	const circleWithLandTypes: readonly Readonly<{
		circle: Circle;
		landType: HexTile["data"]["landType"];
	}>[] = Array(20 + Math.floor(Math.random() * 20))
		.fill(null)
		.map(() => {
			const center: Point = {
				x: Math.random() * 16 - 8,
				y: Math.random() * 16 - 8,
			};

			const radius = Math.random() * 10;

			const landType = Math.random() < 0.3 ? "water" : "dirt";

			const circle: Circle = {
				center,
				radius,
			};

			return {
				circle,
				landType,
			};
		});

	/**
	 * TODO: The safe boundaries can be smaller than 2. Find the exact safe boundaries using math.
	 */
	const minX =
		2 *
		Math.floor(
			Math.min(...circleWithLandTypes.map(({circle: {center, radius}}) => center.x - radius)),
		);

	const maxX =
		2 *
		Math.ceil(
			Math.max(...circleWithLandTypes.map(({circle: {center, radius}}) => center.x + radius)),
		);

	const minY =
		2 *
		Math.floor(
			Math.min(...circleWithLandTypes.map(({circle: {center, radius}}) => center.y - radius)),
		);

	const maxY =
		2 *
		Math.ceil(
			Math.max(...circleWithLandTypes.map(({circle: {center, radius}}) => center.y + radius)),
		);

	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
			const hexTilePosition = new HexTilePosition({
				x,
				y,
			});

			const matchedCircleWithLandTypes = circleWithLandTypes.filter(
				({circle}) => checkIfPointIsInsideOfCircle(hexTilePosition.real, circle) >= 0,
			);

			const landTypePrevalences = matchedCircleWithLandTypes.reduce<
				Readonly<Record<HexTile["data"]["landType"], number>>
			>(
				(accumulator, {landType}) => {
					return {
						...accumulator,
						[landType]: accumulator[landType] + 1,
					};
				},
				{
					dirt: 0,
					water: 0,
				},
			);

			if (landTypePrevalences.dirt === 0 && landTypePrevalences.water === 0) {
				continue;
			}

			const landTypeToUse =
				landTypePrevalences.dirt > landTypePrevalences.water
					? "dirt"
					: landTypePrevalences.dirt < landTypePrevalences.water
						? "water"
						: Math.random() < 0.5
							? "dirt"
							: "water";

			const hexTile: HexTile = new Tile(
				{
					landType: landTypeToUse,
				},
				hexTilePosition,
			);

			tiles.push(hexTile);
		}
	}

	return tiles;
}
