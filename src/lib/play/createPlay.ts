import {generatePlayHexTiles} from "$lib/hex/generatePlayHexTiles.ts";
import type {Play} from "$lib/play/Play.ts";
import {generateNewEntityID} from "$lib/play/entities/generateNewEntityID.ts";
import {generateNewPlayID} from "$lib/play/generateNewPlayID.ts";

export function createPlay(): Play {
	return {
		entities: [
			{
				directionRadians: -0.5,
				id: generateNewEntityID(),
				position: {
					x: 0,
					y: 0,
				},
				speedPerSecond: 2,
			},
			{
				directionRadians: 1,
				id: generateNewEntityID(),
				position: {
					x: 3,
					y: 1,
				},
				speedPerSecond: 1,
			},
		],
		id: generateNewPlayID(),
		tiles: generatePlayHexTiles(),
	};
}
