import type {tileDataFromJSONSchema} from "$lib/play/tile/data/json/tileDataFromJSONSchema.ts";
import type * as Zod from "zod";

export type TileData = Zod.infer<typeof tileDataFromJSONSchema>;
