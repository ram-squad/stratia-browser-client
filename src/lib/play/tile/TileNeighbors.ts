import type {Tile} from "$lib/play/tile/Tile.ts";
import type {TilePosition} from "$lib/play/tile/position/TilePosition.ts";

export type TileNeighbors<
	TilePositionInTile extends TilePosition,
	SideKey extends string,
> = Readonly<Record<SideKey, null | Tile<TilePositionInTile>>>;
