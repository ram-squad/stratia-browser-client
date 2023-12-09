import * as Zod from "zod";

export const playFromJSONSchema = Zod.object({
	id: Zod.string(),
});
