import * as Zod from "zod";

export const tileDataFromJSONSchema = Zod.object({
	landType: Zod.enum(["dirt", "water"]),
	entity: Zod.enum(["None","recruit","soldier"]),
	entityCanMove: Zod.enum(["true","false"]),
	building: Zod.enum(["None","capital","village","city"]),
	ownership: Zod.enum(["None","player1","player2"]),
});
