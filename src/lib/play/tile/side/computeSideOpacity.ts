import type {Tile} from "$lib/play/tile/Tile.ts";
import type {TilePosition} from "$lib/play/tile/position/TilePosition.ts";

const noNeighborSideOpacity = 1;

const neighborSideOpacity = 0.5;

export function computeSideOpacity<TilePositionInTile extends TilePosition>(
	sideNeighbor: null | Tile<TilePositionInTile>,
): number {
	return sideNeighbor === null ? noNeighborSideOpacity : neighborSideOpacity;
}
