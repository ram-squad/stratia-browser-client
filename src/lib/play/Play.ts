import type {playFromJSONSchema} from "$lib/play/playFromJSONSchema.ts";

export type Play = Zod.infer<ReturnType<(typeof playFromJSONSchema)["readonly"]>>;
