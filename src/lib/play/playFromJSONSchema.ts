import {hexTileFromJSONSchema} from "$lib/hex/hexTileFromJSONSchema.ts";
import {entityFromJSONSchema} from "$lib/play/entities/entityFromJSONSchema.ts";
import * as Zod from "zod";

export const playFromJSONSchema = Zod.object({
	entities: Zod.array(entityFromJSONSchema),
	id: Zod.string(),
	tiles: Zod.array(hexTileFromJSONSchema).readonly(),
}).readonly();
