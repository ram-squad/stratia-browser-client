import type {playFromJSONSchema} from "$lib/play/json/playFromJSONSchema.ts";
import type * as Zod from "zod";

export type Play = Zod.infer<typeof playFromJSONSchema>;
