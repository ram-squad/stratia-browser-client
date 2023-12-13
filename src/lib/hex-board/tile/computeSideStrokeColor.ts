import type {HexTile} from "$lib/hex/HexTile.ts";
import {computeSideOpacity} from "$lib/hex-board/tile/computeSideOpacity.ts";

export function computeSideStrokeColor(hexTileNeighbor: HexTile | null): string {
	return `rgba(0, 0, 0, ${computeSideOpacity(hexTileNeighbor).toString()})`;
}
