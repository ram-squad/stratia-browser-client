import type {TileWithNeighbors} from "$lib/play/tile/TileWithNeighbors.ts";
import type {HexTilePosition} from "$lib/play/tile/shapes/hex/tile/position/HexTilePosition.ts";
import type {HexTileSideKey} from "$lib/play/tile/shapes/hex/tile/side/HexTileSideKey.ts";

export type HexTileWithNeighbors = TileWithNeighbors<HexTilePosition, HexTileSideKey>;
