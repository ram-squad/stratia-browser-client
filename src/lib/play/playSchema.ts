import * as Zod from "zod";

export const playSchema = Zod.object({
	id: Zod.string(),
});
