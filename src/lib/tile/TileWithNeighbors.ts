import type {Tile} from "$lib/tile/Tile.ts";

/**
 * Combined information about a tile and its neighbors.
 */
export type TileWithNeighbors<TilePosition, SideKey extends string> = Readonly<{
	neighbors: Readonly<Record<SideKey, null | Tile<TilePosition>>>;
	tile: Tile<TilePosition>;
}>;
