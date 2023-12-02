import type {playSchema} from "$lib/play/playSchema.ts";

export type Play = Zod.infer<ReturnType<(typeof playSchema)["readonly"]>>;
