import type {tileDataFromJSONSchema} from "$lib/tile/tileDataFromJSONSchema.ts";
import type * as Zod from "zod";

export type TileData = Zod.infer<typeof tileDataFromJSONSchema>;
