import {entityPositionFromJSONSchema} from "$lib/play/entities/entityPositionFromJSONSchema.ts";
import * as Zod from "zod";

export const entityFromJSONSchema = Zod.object({
	position: entityPositionFromJSONSchema,
}).readonly();
