import type {HexTile} from "$lib/hex/HexTile.ts";
import {HexTilePosition} from "$lib/hex/HexTilePosition.ts";
import type {Point} from "$lib/point/Point.ts";

type Circle = Readonly<{
	center: Point;
	landType: HexTile["data"]["landType"];
	radius: number;
}>;

function calculateDistanceBetweenTwoPoints(point1: Point, point2: Point): number {
	return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}

function matchPointToCircles(point: Point, circles: readonly Circle[]): readonly Circle[] {
	return circles.filter(({center, radius}) => {
		const distance = calculateDistanceBetweenTwoPoints(center, point);

		return distance <= radius;
	});
}

export function generatePlayHexTiles(): readonly HexTile[] {
	const tiles: HexTile[] = [];

	const circles: readonly Circle[] = Array(20 + Math.floor(Math.random() * 20))
		.fill(null)
		.map(() => {
			const center: Point = {
				x: Math.random() * 16 - 8,
				y: Math.random() * 16 - 8,
			};

			const radius = Math.random() * 10;
			const landType = Math.random() < 0.3 ? "water" : "dirt";

			return {
				center,
				landType,
				radius,
			};
		});

	/**
	 * TODO: The safe boundaries can be smaller than 2. Find the exact safe boundaries using math.
	 */
	const minX = 2 * Math.floor(Math.min(...circles.map(({center, radius}) => center.x - radius)));
	const maxX = 2 * Math.ceil(Math.max(...circles.map(({center, radius}) => center.x + radius)));
	const minY = 2 * Math.floor(Math.min(...circles.map(({center, radius}) => center.y - radius)));
	const maxY = 2 * Math.ceil(Math.max(...circles.map(({center, radius}) => center.y + radius)));

	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
			const hexTilePosition = new HexTilePosition(x, y);

			const realPosition: Point = {
				x: hexTilePosition.computeRealX(),
				y: hexTilePosition.computeRealY(),
			};

			const matchedCircles = matchPointToCircles(realPosition, circles);

			const landTypePrevalences = matchedCircles.reduce<
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

			const hexTile: HexTile = {
				data: {
					landType: landTypeToUse,
				},
				position: hexTilePosition,
			};

			tiles.push(hexTile);
		}
	}

	return tiles;
}
