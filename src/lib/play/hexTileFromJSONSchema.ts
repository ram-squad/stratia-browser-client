import type {HexTile} from "$lib/hex/HexTile.ts";
import {HexTilePosition} from "$lib/hex/HexTilePosition.ts";
import { TileData } from "$lib/tile/TileData";
import * as Zod from "zod";

export const hexTileFromJSONSchema = Zod.object({
	position: Zod.object({
		x: Zod.number(),
		y: Zod.number(),
	}),
}).transform(
	(hexTileJSON): HexTile => ({
		data: {
			landType: Math.random() < 0.5 ? "Water" : "Dirt"
		},
		position: new HexTilePosition(hexTileJSON.position.x, hexTileJSON.position.y),
	}),
);
