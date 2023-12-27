import {entityPositionFromJSONSchema} from "$lib/play/entities/entityPositionFromJSONSchema.ts";
import * as Zod from "zod";

export const entityFromJSONSchema = Zod.object({
	directionRadians: Zod.number(),
	healthPoints: Zod.number(),
	id: Zod.string(),
	maximalHealthPoints: Zod.number(),
	position: entityPositionFromJSONSchema,
	speedPerSecond: Zod.number(),
}).readonly();
