import type {TileData} from "$lib/tile/TileData.ts";

/**
 * A tile is a background element of a play board.
 * Entities can only move on tiles.
 * A tile consists of a data object and a position.
 * The data object's type is global to the whole game,
 * but the position's type is generic, because it depends
 * on the tile's position type used in a specific play.
 */
export type Tile<TilePosition> = Readonly<{
	data: TileData;
	position: TilePosition;
}>;
