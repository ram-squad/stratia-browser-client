import type {TileData} from "$lib/play/tile/data/TileData.ts";
import type {TilePosition} from "$lib/play/tile/position/TilePosition.ts";

/**
 * A tile is a background element of a play board.
 * Entities can only move on tiles.
 * A tile consists of a data object and a position.
 * The data object's type is global to the whole game,
 * but the position's type is generic, because it depends
 * on the tile's position type used in a specific play.
 */
export class Tile<TilePositionInTile extends TilePosition> {
	public constructor(data: TileData, position: TilePositionInTile) {
		this.data = data;

		this.position = position;
	}

	public readonly data: TileData;

	public get id(): string {
		return this.position.id;
	}

	public readonly position: TilePositionInTile;
}
