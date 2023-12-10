import {entityPositionFromJSONSchema} from "$lib/play/entities/entityPositionFromJSONSchema.ts";
import * as Zod from "zod";

export const entityFromJSONSchema = Zod.object({
	directionRadians: Zod.number(),
	id: Zod.string(),
	position: entityPositionFromJSONSchema,
}).readonly();
