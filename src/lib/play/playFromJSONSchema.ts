import {hexTileFromJSONSchema} from "$lib/hex/hexTileFromJSONSchema.ts";
import * as Zod from "zod";

export const playFromJSONSchema = Zod.object({
	id: Zod.string(),
	tiles: Zod.array(hexTileFromJSONSchema).readonly(),
}).readonly();
