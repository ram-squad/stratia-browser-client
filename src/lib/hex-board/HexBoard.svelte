<script lang="ts" strictEvents>
	import type {HexGrid} from "$lib/hex/HexGrid.ts";
	import HexBoardCell from "$lib/hex-board/tile/HexBoardTile.svelte";

	export let hexGrid: HexGrid;

	const cellLayoutStylesCalculationPrecission = 100;
	const zoomFactor = 20;
	const hexBoardScale = zoomFactor / cellLayoutStylesCalculationPrecission;
	const hexBoardScaleStyle = hexBoardScale.toString();
</script>

<div class="hex-board-no-scrollbar-wrapper">
	<ul class="hex-board" style:scale={hexBoardScaleStyle}>
		{#each hexGrid.iterateHexTilesWithNeighbors() as hexTileWithNeighbors (`${hexTileWithNeighbors.tile.position.inGridX.toString()},${hexTileWithNeighbors.tile.position.inGridY.toString()}`)}
			<HexBoardCell
				{hexTileWithNeighbors}
				layoutStylesCalculationPrecission={cellLayoutStylesCalculationPrecission}
			/>
		{/each}
	</ul>
</div>

<style lang="scss">
	.hex-board {
		list-style: none;
		margin-block-start: 0;
		margin-block-end: 0;
		padding-inline-start: 0;
		height: 100%;
	}
	.hex-board-no-scrollbar-wrapper {
		overflow: hidden;
	}
</style>
