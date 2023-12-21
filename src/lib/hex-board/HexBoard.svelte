<script lang="ts" strictEvents>
	import type {HexGrid} from "$lib/hex/HexGrid.ts";
	import HexBoardEntity from "$lib/hex-board/entity/HexBoardEntity.svelte";
	import HexBoardCell from "$lib/hex-board/tile/HexBoardTile.svelte";
	import type {Entity} from "$lib/play/entities/Entity.ts";

	export let hexGrid: HexGrid;
	export let entities: readonly Entity[];

	const cellLayoutStylesCalculationPrecission = 100;
	const zoomFactor = 20;
	const hexBoardScale = zoomFactor / cellLayoutStylesCalculationPrecission;
	const hexBoardScaleStyle = hexBoardScale.toString();
	let requestedEntitySelectionId: null | string = null;

	$: selectedEntity =
		requestedEntitySelectionId === null
			? null
			: entities.find((entity) => entity.id === requestedEntitySelectionId) ?? null;

	const handleEntityClick = (event: CustomEvent<string>) => {
		requestedEntitySelectionId = event.detail;
	};
</script>

<div class="hex-board-no-scrollbar-wrapper">
	<ul class="hex-board" style:scale={hexBoardScaleStyle}>
		{#each hexGrid.iterateHexTilesWithNeighbors() as hexTileWithNeighbors (`${hexTileWithNeighbors.tile.position.inGridX.toString()},${hexTileWithNeighbors.tile.position.inGridY.toString()}`)}
			<HexBoardCell
				{hexTileWithNeighbors}
				layoutStylesCalculationPrecission={cellLayoutStylesCalculationPrecission}
			/>
		{/each}
		{#each entities as entity (entity.id)}
			<HexBoardEntity
				{entity}
				isSelected={selectedEntity !== null && selectedEntity.id === entity.id}
				layoutStylesCalculationPrecission={cellLayoutStylesCalculationPrecission}
				on:icon-click={handleEntityClick}
			/>
		{/each}
	</ul>
</div>

<style lang="scss">
	.hex-board {
		height: 100%;
		list-style: none;
		margin-block: 0 0;
		padding-inline-start: 0;
	}

	.hex-board-no-scrollbar-wrapper {
		overflow: hidden;
	}
</style>
