import type {playFromJSONSchema} from "$lib/play/playFromJSONSchema.ts";
import type * as Zod from "zod";

export type Play = Zod.infer<ReturnType<(typeof playFromJSONSchema)["readonly"]>>;
