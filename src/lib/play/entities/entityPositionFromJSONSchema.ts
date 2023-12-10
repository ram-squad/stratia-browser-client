import * as Zod from "zod";

export const entityPositionFromJSONSchema = Zod.object({
	x: Zod.number(),
	y: Zod.number(),
}).readonly();
