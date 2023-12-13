import {hexTileFromJSONSchema} from "$lib/play/hexTileFromJSONSchema.ts";
import * as Zod from "zod";

export const playFromJSONSchema = Zod.object({
	id: Zod.string(),
	tiles: Zod.array(hexTileFromJSONSchema),
});
