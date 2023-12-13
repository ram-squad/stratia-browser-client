<script lang="ts" strictEvents>
	import type {HexTileWithNeighbors} from "$lib/hex/HexTileWithNeighbors.ts";
	import {computeSideStrokeColors} from "$lib/hex-board/tile/computeSideStrokeColors.ts";
	import { string } from "zod";

	export let hexTileWithNeighbors: HexTileWithNeighbors;
	export let layoutStylesCalculationPrecission: number;

	$: sideStrokeColors = computeSideStrokeColors(hexTileWithNeighbors);
	const svgHeightStyle = `${layoutStylesCalculationPrecission.toString()}px`;

	$: cellTransformStyleX = `calc(${(
		layoutStylesCalculationPrecission * hexTileWithNeighbors.tile.position.computeRealX()
	).toString()}px - 50%)`;

	$: cellTransformStyleY = `calc(${(
		layoutStylesCalculationPrecission * hexTileWithNeighbors.tile.position.computeRealY()
	).toString()}px - 50%)`;

	$: cellTransformStyle = `translate(${cellTransformStyleX}, ${cellTransformStyleY})`;
	$: svgFillStyle = {
		"Water": "blue",
		"Dirt": "green",
	}[hexTileWithNeighbors.tile.data.landType]
</script>

<li class="hex-board-cell" style:transform={cellTransformStyle}>
	<svg
		fill={svgFillStyle}
		style:height={svgHeightStyle}
		viewBox="0 0 184.6 160"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g>
			<path d="m0 80 46.2-80 92.4 0 46.2 80-46.2 80-92.4 0-46.2-80z" />
			<path d="m4.3 82.5 l46.228 -80z" stroke={sideStrokeColors.topLeft} stroke-width="10" />
			<path d="m46.2 5 l92.4 0z" stroke={sideStrokeColors.top} stroke-width="10" />
			<path
				d="m180.5 82.55 l-46.228 -80.05z"
				stroke={sideStrokeColors.topRight}
				stroke-width="10"
			/>
			<path
				d="m180.473 77.5 l-46.25 80.1z"
				stroke={sideStrokeColors.bottomRight}
				stroke-width="10"
			/>
			<path d="m46.2 155 l92.4 0z" stroke={sideStrokeColors.bottom} stroke-width="10" />
			<path
				d="m50.5 157.5 l-46.17 -80.001z"
				stroke={sideStrokeColors.bottomLeft}
				stroke-width="10"
			/>
		</g>
	</svg>
</li>

<style lang="scss">
	.hex-board-cell {
		position: absolute;
		left: 50%;
		top: 50%;
		display: grid;
	}
</style>
