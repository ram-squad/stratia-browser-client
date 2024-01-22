import type {HexTile} from "$lib/play/tile/shapes/hex/tile/HexTile.ts";
import type {HexTileNeighbors} from "$lib/play/tile/shapes/hex/tile/HexTileNeighbors.ts";
import type {HexTileWithNeighbors} from "$lib/play/tile/shapes/hex/tile/HexTileWithNeighbors.ts";
import type {HexTilePosition} from "$lib/play/tile/shapes/hex/tile/position/HexTilePosition.ts";

/**
 * Immutable data structure that represents a hexagonal grid.
 * It ensures that the given hex tiles are indeed a valid hex grid.
 */
export class HexGrid {
	private static addHexTileToHexTilesMap(
		hexTilesMap: Map<number, Map<number, HexTile>>,
		hexTile: HexTile,
	): void {
		const hexTilesRow = HexGrid.getOrCreateAndGetHexTilesRow(
			hexTilesMap,
			hexTile.position.inGrid.y,
		);

		if (hexTilesRow.has(hexTile.position.inGrid.x)) {
			throw new Error(
				`Duplicate hex tile at ${hexTile.position.inGrid.x.toString()}, ${hexTile.position.inGrid.y.toString()}.`,
			);
		}

		hexTilesRow.set(hexTile.position.inGrid.x, hexTile);
	}

	public constructor(hexTiles: Iterable<HexTile>) {
		const hexTilesMap = new Map<number, Map<number, HexTile>>();

		for (const hexTile of hexTiles) {
			HexGrid.addHexTileToHexTilesMap(hexTilesMap, hexTile);
		}

		this.hexTilesMap = hexTilesMap;
	}

	public getHexTile(targetHexTilePosition: HexTilePosition): HexTile | null {
		const hexTilesRow = this.hexTilesMap.get(targetHexTilePosition.inGrid.y);

		if (hexTilesRow === undefined) {
			return null;
		}

		const hexTile = hexTilesRow.get(targetHexTilePosition.inGrid.x);

		if (hexTile === undefined) {
			return null;
		}

		return hexTile;
	}

	public setHexTile(targetHexTilePosition: HexTilePosition, newHexTile:HexTile): HexTile | null {
		const hexTilesRow = this.hexTilesMap.get(targetHexTilePosition.inGrid.y);

		if (hexTilesRow === undefined) {
			return null;
		}


		if (hexTilesRow.get(targetHexTilePosition.inGrid.x) !== undefined) {
			hexTilesRow.set(targetHexTilePosition.inGrid.x,newHexTile);
		}
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

	private getNeighborsAtHexTilePosition(targetHexTilePosition: HexTilePosition): HexTileNeighbors {
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

	private hexTilesMap: Map<number, Map<number, HexTile>>;

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
