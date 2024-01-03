import type {Point} from "$lib/math/point/Point.ts";
import type {TilePosition} from "$lib/play/tile/position/TilePosition.ts";

export type CreateTilePositionFromRealPosition = (realPosition: Point) => TilePosition;
