import type {Tile} from "$lib/play/tile/Tile.ts";
import type {TileNeighbors} from "$lib/play/tile/TileNeighbors.ts";
import type {TilePosition} from "$lib/play/tile/position/TilePosition.ts";

/**
 * Combined information about a tile and its neighbors.
 */
export type TileWithNeighbors<
	TilePositionInTile extends TilePosition,
	SideKey extends string,
> = Readonly<{
	neighbors: TileNeighbors<TilePositionInTile, SideKey>;
	tile: Tile<TilePositionInTile>;
}>;
