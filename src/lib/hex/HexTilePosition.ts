import {calculateModuloRespectiveToDividend} from "$lib/math/calculateModuloRespectiveToDividend.ts";

export class HexTilePosition {
	public computeRealX(): number {
		return (this.inGridX * 3 ** 0.5) / 2;
	}

	public computeRealY(): number {
		return this.inGridY + calculateModuloRespectiveToDividend(this.inGridX, 2) / 2;
	}

	public constructor(inGridX: number, inGridY: number) {
		this.inGridX = inGridX;

		this.inGridY = inGridY;
	}

	public goBottom(): HexTilePosition {
		return new HexTilePosition(this.inGridX, this.inGridY + 1);
	}

	public goBottomLeft(): HexTilePosition {
		return new HexTilePosition(
			this.inGridX - 1,
			this.inGridY + calculateModuloRespectiveToDividend(this.inGridX, 2),
		);
	}

	public goBottomRight(): HexTilePosition {
		return new HexTilePosition(
			this.inGridX + 1,
			this.inGridY + calculateModuloRespectiveToDividend(this.inGridX, 2),
		);
	}

	public goTop(): HexTilePosition {
		return new HexTilePosition(this.inGridX, this.inGridY - 1);
	}

	public goTopLeft(): HexTilePosition {
		return new HexTilePosition(
			this.inGridX - 1,
			this.inGridY - calculateModuloRespectiveToDividend(this.inGridX + 1, 2),
		);
	}

	public goTopRight(): HexTilePosition {
		return new HexTilePosition(
			this.inGridX + 1,
			this.inGridY - calculateModuloRespectiveToDividend(this.inGridX + 1, 2),
		);
	}

	public readonly inGridX: number;

	public readonly inGridY: number;
}
