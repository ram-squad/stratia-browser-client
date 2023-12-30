import {entityFromJSONSchema} from "$lib/play/entity/json/entityFromJSONSchema.ts";
import {hexTileFromJSONSchema} from "$lib/play/tile/shapes/hex/tile/json/hexTileFromJSONSchema.ts";
import * as Zod from "zod";

export const playFromJSONSchema = Zod.object({
	entities: Zod.array(entityFromJSONSchema),
	id: Zod.string(),
	tiles: Zod.array(hexTileFromJSONSchema).readonly(),
}).readonly();
