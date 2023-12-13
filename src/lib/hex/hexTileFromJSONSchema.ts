import type {HexTile} from "$lib/hex/HexTile.ts";
import {HexTilePosition} from "$lib/hex/HexTilePosition.ts";
import * as Zod from "zod";

export const hexTileFromJSONSchema = Zod.object({
	position: Zod.object({
		x: Zod.number(),
		y: Zod.number(),
	}).readonly(),
})
	.readonly()
	.transform(
		(hexTileJSON): HexTile => ({
			data: {},
			position: new HexTilePosition(hexTileJSON.position.x, hexTileJSON.position.y),
		}),
	);
