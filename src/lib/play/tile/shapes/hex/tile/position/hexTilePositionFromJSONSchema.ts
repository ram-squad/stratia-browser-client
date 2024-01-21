import {pointFromJSONSchema} from "$lib/math/point/json/pointFromJSONSchema.ts";
import {HexTilePosition} from "$lib/play/tile/shapes/hex/tile/position/HexTilePosition.ts";

export const hexTilePositionFromJSONSchema = pointFromJSONSchema.transform(
	(point): HexTilePosition => new HexTilePosition(point),
);
