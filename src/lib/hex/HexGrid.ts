import type {HexTile} from "$lib/hex/HexTile.ts";
import type {HexTilePosition} from "$lib/hex/HexTilePosition.ts";
import type {HexTileWithNeighbors} from "$lib/hex/HexTileWithNeighbors.ts";

/**
 * Immutable data structure that represents a hexagonal grid.
 * It ensures that the given hex tiles are indeed a valid hex grid.
 */
export class HexGrid {
	private static addHexTileToHexTilesMap(
		hexTilesMap: Map<number, Map<number, HexTile>>,
		hexTile: HexTile,
	): void {
		const hexTilesRow = HexGrid.getOrCreateAndGetHexTilesRow(hexTilesMap, hexTile.position.inGridY);

		if (hexTilesRow.has(hexTile.position.inGridX)) {
			throw new Error(
				`Duplicate hex tile at ${hexTile.position.inGridX.toString()}, ${hexTile.position.inGridY.toString()}.`,
			);
		}

		hexTilesRow.set(hexTile.position.inGridX, hexTile);
	}

	public constructor(hexTiles: Iterable<HexTile>) {
		const hexTilesMap = new Map<number, Map<number, HexTile>>();

		for (const hexTile of hexTiles) {
			HexGrid.addHexTileToHexTilesMap(hexTilesMap, hexTile);
		}

		this.hexTilesMap = hexTilesMap;
	}

	public getHexTile(targetHexTilePosition: HexTilePosition): HexTile | null {
		const hexTilesRow = this.hexTilesMap.get(targetHexTilePosition.inGridY);

		if (hexTilesRow === undefined) {
			return null;
		}

		const hexTile = hexTilesRow.get(targetHexTilePosition.inGridX);

		if (hexTile === undefined) {
			return null;
		}

		return hexTile;
	}

	public getHexTileWithNeighbors(
		targetHexTilePosition: HexTilePosition,
	): HexTileWithNeighbors | null {
		const hexTile = this.getHexTile(targetHexTilePosition);

		if (hexTile === null) {
			return null;
		}

		const neighbors = this.getNeighborsAtHexTilePosition(targetHexTilePosition);

		return {
			neighbors,
			tile: hexTile,
		};
	}

	private getNeighborsAtHexTilePosition(
		targetHexTilePosition: HexTilePosition,
	): HexTileWithNeighbors["neighbors"] {
		return {
			bottom: this.getHexTile(targetHexTilePosition.goBottom()),
			bottomLeft: this.getHexTile(targetHexTilePosition.goBottomLeft()),
			bottomRight: this.getHexTile(targetHexTilePosition.goBottomRight()),
			top: this.getHexTile(targetHexTilePosition.goTop()),
			topLeft: this.getHexTile(targetHexTilePosition.goTopLeft()),
			topRight: this.getHexTile(targetHexTilePosition.goTopRight()),
		};
	}

	private static getOrCreateAndGetHexTilesRow(
		hexTilesMap: Map<number, Map<number, HexTile>>,
		positionInGridY: number,
	): Map<number, HexTile> {
		const existingHexTilesRow = hexTilesMap.get(positionInGridY);

		if (existingHexTilesRow !== undefined) {
			return existingHexTilesRow;
		}

		const newHexTilesRow = new Map<number, HexTile>();

		hexTilesMap.set(positionInGridY, newHexTilesRow);

		return newHexTilesRow;
	}

	private readonly hexTilesMap: ReadonlyMap<number, ReadonlyMap<number, HexTile>>;

	public *iterateHexTiles(): Iterable<HexTile> {
		for (const hexTilesRow of this.hexTilesMap.values()) {
			for (const hexTile of hexTilesRow.values()) {
				yield hexTile;
			}
		}
	}

	public *iterateHexTilesWithNeighbors(): Iterable<HexTileWithNeighbors> {
		for (const hexTilesRow of this.hexTilesMap.values()) {
			for (const hexTile of hexTilesRow.values()) {
				const neighbors = this.getNeighborsAtHexTilePosition(hexTile.position);

				yield {
					neighbors,
					tile: hexTile,
				};
			}
		}
	}
}
