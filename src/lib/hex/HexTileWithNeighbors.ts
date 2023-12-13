import type {HexTilePosition} from "$lib/hex/HexTilePosition.ts";
import type {HexTileSideKey} from "$lib/hex/HexTileSideKey.ts";
import type {TileWithNeighbors} from "$lib/tile/TileWithNeighbors.ts";

export type HexTileWithNeighbors = TileWithNeighbors<HexTilePosition, HexTileSideKey>;
