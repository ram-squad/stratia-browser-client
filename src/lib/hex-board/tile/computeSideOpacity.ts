import type {HexTile} from "$lib/hex/HexTile.ts";

const noNeighborSideOpacity = 1;

const neighborSideOpacity = 0.5;

export function computeSideOpacity(sideNeighbor: HexTile | null): number {
	return sideNeighbor === null ? noNeighborSideOpacity : neighborSideOpacity;
}
