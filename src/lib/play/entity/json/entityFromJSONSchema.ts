import {pointFromJSONSchema} from "$lib/math/point/json/pointFromJSONSchema.ts";
import * as Zod from "zod";

export const entityFromJSONSchema = Zod.object({
	directionRadians: Zod.number(),
	healthPoints: Zod.number(),
	id: Zod.string(),
	maximalHealthPoints: Zod.number(),
	position: pointFromJSONSchema,
	speedPerSecond: Zod.number(),
}).readonly();
