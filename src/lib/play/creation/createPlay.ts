import type {Play} from "$lib/play/Play.ts";
import {generateNewPlayID} from "$lib/play/creation/generateNewPlayID.ts";
import {generateNewEntityID} from "$lib/play/entity/creation/generateNewEntityID.ts";
import {basicGenerateHexTiles} from "$lib/play/tile/shapes/hex/generation/basicGenerateHexTiles.ts";

export function createPlay(): Play {
	return {
		entities: [
			{
				directionRadians: -0.5,
				healthPoints: 10,
				id: generateNewEntityID(),
				maximalHealthPoints: 40,
				position: {
					x: 0,
					y: 0,
				},
				speedPerSecond: 2,
			},
			{
				directionRadians: 1,
				healthPoints: 10,
				id: generateNewEntityID(),
				maximalHealthPoints: 20,
				position: {
					x: 3,
					y: 1,
				},
				speedPerSecond: 1,
			},
		],
		id: generateNewPlayID(),
		tiles: basicGenerateHexTiles(),
	};
}
