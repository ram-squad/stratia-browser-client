import type {HexTileSideKey} from "$lib/hex/HexTileSideKey.ts";
import type {HexTileWithNeighbors} from "$lib/hex/HexTileWithNeighbors.ts";
import {computeSideStrokeColor} from "$lib/hex-board/tile/computeSideStrokeColor.ts";

export function computeSideStrokeColors(
	hexTileWithNeighbors: HexTileWithNeighbors,
): Readonly<Record<HexTileSideKey, string>> {
	return {
		bottom: computeSideStrokeColor(hexTileWithNeighbors.neighbors.bottom),
		bottomLeft: computeSideStrokeColor(hexTileWithNeighbors.neighbors.bottomLeft),
		bottomRight: computeSideStrokeColor(hexTileWithNeighbors.neighbors.bottomRight),
		top: computeSideStrokeColor(hexTileWithNeighbors.neighbors.top),
		topLeft: computeSideStrokeColor(hexTileWithNeighbors.neighbors.topLeft),
		topRight: computeSideStrokeColor(hexTileWithNeighbors.neighbors.topRight),
	};
}
