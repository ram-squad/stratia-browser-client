import type {TileNeighbors} from "$lib/play/tile/TileNeighbors.ts";
import type {HexTilePosition} from "$lib/play/tile/shapes/hex/tile/position/HexTilePosition.ts";
import type {HexTileSideKey} from "$lib/play/tile/shapes/hex/tile/side/HexTileSideKey.ts";

export type HexTileNeighbors = TileNeighbors<HexTilePosition, HexTileSideKey>;
