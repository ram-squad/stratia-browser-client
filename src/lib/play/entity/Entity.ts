import type {entityFromJSONSchema} from "$lib/play/entity/json/entityFromJSONSchema.ts";
import type * as Zod from "zod";

export type Entity = Zod.infer<typeof entityFromJSONSchema>;
