import * as Zod from "zod";

export const pointFromJSONSchema = Zod.object({
	x: Zod.number(),
	y: Zod.number(),
}).readonly();
