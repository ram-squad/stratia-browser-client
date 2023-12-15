import type {HexTile} from "$lib/hex/HexTile.ts";
import {HexTilePosition} from "$lib/hex/HexTilePosition.ts";
import {tileDataFromJSONSchema} from "$lib/tile/tileDataFromJSONSchema.ts";
import * as Zod from "zod";

export const hexTileFromJSONSchema = Zod.object({
	data: tileDataFromJSONSchema,
	position: Zod.object({
		x: Zod.number(),
		y: Zod.number(),
	}).readonly(),
})
	.readonly()
	.transform(
		({data, position}): HexTile => ({
			data,
			position: new HexTilePosition(position.x, position.y),
		}),
	);
