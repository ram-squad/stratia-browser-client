import {generatePlayHexTiles} from "$lib/hex/generatePlayHexTiles.ts";
import type {Play} from "$lib/play/Play.ts";
import {generateNewPlayID} from "$lib/play/generateNewPlayID.ts";

export function createPlay(): Play {
	return {
		entities: [
			{
				position: {
					x: 0,
					y: 0,
				},
			},
			{
				position: {
					x: 3,
					y: 1,
				},
			},
		],
		id: generateNewPlayID(),
		tiles: generatePlayHexTiles(),
	};
}
