import type {HexTile} from "$lib/play/tile/shapes/hex/tile/HexTile.ts";
import type {HexTileNeighbors} from "$lib/play/tile/shapes/hex/tile/HexTileNeighbors.ts";
import type {HexTileSideKey} from "$lib/play/tile/shapes/hex/tile/side/HexTileSideKey.ts";
import {computeSideStrokeColor} from "$lib/play/tile/side/computeSideStrokeColor.ts";

export function computeHexSideStrokeColors(
	tile: HexTile,
	neighbors: HexTileNeighbors,
): Readonly<Record<HexTileSideKey, string>> {
	return {
		bottom: computeSideStrokeColor(neighbors.bottom),
		bottomLeft: computeSideStrokeColor(neighbors.bottomLeft),
		bottomRight: computeSideStrokeColor(neighbors.bottomRight),
		top: computeSideStrokeColor(neighbors.top),
		topLeft: computeSideStrokeColor(neighbors.topLeft),
		topRight: computeSideStrokeColor(neighbors.topRight),
	};
}
