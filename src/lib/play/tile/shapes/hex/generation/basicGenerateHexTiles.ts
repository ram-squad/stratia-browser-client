import type {Circle} from "$lib/math/circle/Circle.ts";
import {checkIfPointIsInsideOfCircle} from "$lib/math/circle/checkIfPointIsInsideOfCircle.ts";
import {generatePerlinNoise} from "$lib/math/noise/perlinNoise.ts";
import type {Point} from "$lib/math/point/Point.ts";
import {Tile} from "$lib/play/tile/Tile.ts";
import {HexTilePosition} from "$lib/play/tile/shapes/hex/tile/position/HexTilePosition.ts";
import type {HexTile} from "../tile/HexTile.ts";

export function basicGenerateHexTiles(radius): readonly HexTile[] {
	const tiles: HexTile[] = [];

	// Wielki okrąg o jednym typie terenu
	const center: Point = {
		x: 0,
		y: 0,
	};

	const mainCircle: Circle = {
		center,
		radius,
	};

	const mainLandType = "water"; // Domyślny typ terenu

	// Generowanie szumu Perlina
	const perlinScale = 0.2; // Skala szumu Perlina

	const perlinOffsetX = Math.random() * 1000;

	const perlinOffsetY = Math.random() * 1000;

	for (let y = -radius; y <= radius; y++) {
		for (let x = -radius; x <= radius; x++) {
			const hexTilePosition = new HexTilePosition({
				x,
				y,
			});

			// Sprawdzanie, czy punkt należy do głównego okręgu
			if (checkIfPointIsInsideOfCircle(hexTilePosition.real, mainCircle) >= 0) {
				// Ustawianie typu terenu zgodnie z szumem Perlin
				const perlinValue = generatePerlinNoise(
					(hexTilePosition.real.x + perlinOffsetX) * perlinScale,
					(hexTilePosition.real.y + perlinOffsetY) * perlinScale,
				);

				//console.log(perlinValue);

				const landType = perlinValue > 0 ? "dirt" : mainLandType;
				const entity = "None"
				const building = "None"
				const ownership = "None"

				const hexTile: HexTile = new Tile(
					{
						landType,
						building,
						ownership,
						entity
					},
					hexTilePosition,
				);

				tiles.push(hexTile);
			}
		}
	}
	console.log(tiles)
	//console.log(getNeighbours(tiles[0],tiles))
	tiles.forEach(element => {
		// add permanent land lines so bases can be set up symmetrically always
		if(element.position.inGrid.x==0 || element.position.inGrid.y==0)
		{
			element.data.landType = "dirt"
		}
		//and place player1 base on left, and player2 base on right
		if(element.position.inGrid.x==-radius && element.position.inGrid.y==0){
			element.data.ownership = "player1"
			element.data.building = "capital"
		}
		if(element.position.inGrid.x==radius && element.position.inGrid.y==0){
			element.data.ownership = "player2"
			element.data.building = "capital"
		}
		if(element.position.inGrid.x==radius-1 && element.position.inGrid.y==0){
			element.data.ownership = "player2"
			element.data.entity = "recruit"
		}
		if(element.position.inGrid.x==-radius+1 && element.position.inGrid.y==0){
			element.data.ownership = "player1"
			element.data.entity = "recruit"
		}
	});
	//make map symmetrical so chances are balanced 
	tiles.forEach(element1 => {
		if(element1.position.inGrid.x<=0)
		{
			tiles.forEach(element2 => {
				if(element1.position.inGrid.y===element2.position.inGrid.y && element1.position.inGrid.x==-element2.position.inGrid.x)
				{
					element2.data.landType=element1.data.landType
				}
			});
		}
	});
	return tiles;
}
