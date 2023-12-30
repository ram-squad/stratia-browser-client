import type {Tile} from "$lib/play/tile/Tile.ts";
import type {TilePosition} from "$lib/play/tile/position/TilePosition.ts";
import {computeSideOpacity} from "$lib/play/tile/side/computeSideOpacity.ts";

export function computeSideStrokeColor<TilePositionInTile extends TilePosition>(
	tileNeighbor: null | Tile<TilePositionInTile>,
): string {
	return `rgba(0, 0, 0, ${computeSideOpacity(tileNeighbor).toString()})`;
}
