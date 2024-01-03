import {calculateModuloRespectiveToDividend} from "$lib/math/aritmetic/calculateModuloRespectiveToDividend.ts";
import type {Point} from "$lib/math/point/Point.ts";
import type {TilePosition} from "$lib/play/tile/position/TilePosition.ts";

export class HexTilePosition implements TilePosition {
	private computeRealX(): number {
		return (this.inGrid.x * 3 ** 0.5) / 2;
	}

	private computeRealY(): number {
		return this.inGrid.y + calculateModuloRespectiveToDividend(this.inGrid.x, 2) / 2;
	}

	public constructor(inGrid: Point) {
		this.inGrid = inGrid;
	}

	public static createFromRealPosition(realPosition: Point): HexTilePosition {
		const x = Math.round((realPosition.x / 3 ** 0.5) * 2);

		const y = realPosition.y - calculateModuloRespectiveToDividend(x, 2) / 2;

		return new HexTilePosition({
			x: Math.round(x),
			y: Math.round(y),
		});
	}

	public goBottom(): HexTilePosition {
		return new HexTilePosition({
			x: this.inGrid.x,
			y: this.inGrid.y + 1,
		});
	}

	public goBottomLeft(): HexTilePosition {
		return new HexTilePosition({
			x: this.inGrid.x - 1,
			y: this.inGrid.y + calculateModuloRespectiveToDividend(this.inGrid.x, 2),
		});
	}

	public goBottomRight(): HexTilePosition {
		return new HexTilePosition({
			x: this.inGrid.x + 1,
			y: this.inGrid.y + calculateModuloRespectiveToDividend(this.inGrid.x, 2),
		});
	}

	public goTop(): HexTilePosition {
		return new HexTilePosition({
			x: this.inGrid.x,
			y: this.inGrid.y - 1,
		});
	}

	public goTopLeft(): HexTilePosition {
		return new HexTilePosition({
			x: this.inGrid.x - 1,
			y: this.inGrid.y - calculateModuloRespectiveToDividend(this.inGrid.x + 1, 2),
		});
	}

	public goTopRight(): HexTilePosition {
		return new HexTilePosition({
			x: this.inGrid.x + 1,
			y: this.inGrid.y - calculateModuloRespectiveToDividend(this.inGrid.x + 1, 2),
		});
	}

	public get id(): string {
		return `${this.inGrid.x.toString()},${this.inGrid.y.toString()}`;
	}

	public readonly inGrid: Point;

	public get real(): Point {
		return {
			x: this.computeRealX(),
			y: this.computeRealY(),
		};
	}
}
