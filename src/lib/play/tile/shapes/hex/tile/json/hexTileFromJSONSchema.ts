import {Tile} from "$lib/play/tile/Tile.ts";
import {tileDataFromJSONSchema} from "$lib/play/tile/data/json/tileDataFromJSONSchema.ts";
import {hexTilePositionFromJSONSchema} from "$lib/play/tile/shapes/hex/tile/position/hexTilePositionFromJSONSchema.ts";
import * as Zod from "zod";

export const hexTileFromJSONSchema = Zod.object({
	data: tileDataFromJSONSchema,
	position: hexTilePositionFromJSONSchema,
})
	.readonly()
	.transform(({data, position}) => new Tile(data, position));
