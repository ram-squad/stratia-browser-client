import * as Zod from "zod";

export const tileDataFromJSONSchema = Zod.object({
	landType: Zod.enum(["dirt", "water"]),
}).readonly();
