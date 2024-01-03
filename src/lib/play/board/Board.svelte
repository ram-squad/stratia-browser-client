<svelte:options immutable={true} />

<script
	generics="TilePositionInTile extends TilePosition, TileSideKey extends string"
	lang="ts"
	strictEvents
>
	import type {Dimensions} from "$lib/math/dimensions/Dimensions.ts";
	import type {Point} from "$lib/math/point/Point.ts";
	import type {EntityWithSelectionStatus} from "$lib/play/board/entity-with-selection-status/EntityWithSelectionStatus.ts";
	import BoardObjectList from "$lib/play/board/object-list/BoardObjectList.svelte";
	import {createBoardStateHook} from "$lib/play/board/state-hook/createBoardStateHook.ts";
	import type {Camera} from "$lib/play/camera/Camera.ts";
	import type {Entity} from "$lib/play/entity/Entity.ts";
	import EntityOnBoard from "$lib/play/entity/on-board/EntityOnBoard.svelte";
	import type {Tile} from "$lib/play/tile/Tile.ts";
	import type {TileNeighbors} from "$lib/play/tile/TileNeighbors.ts";
	import type {TileWithNeighbors} from "$lib/play/tile/TileWithNeighbors.ts";
	import type {TilePosition} from "$lib/play/tile/position/TilePosition.ts";
	import {createEventDispatcher} from "svelte";

	interface $$Slots {
		tile: Readonly<{
			layoutStylesCalculationPrecission: number;
			neighbors: TileNeighbors<TilePositionInTile, TileSideKey>;
			tile: Tile<TilePositionInTile>;
		}>;
	}

	export let entityWithSelectionStatuses: readonly EntityWithSelectionStatus[];

	export let tileWithNeighbors: readonly TileWithNeighbors<TilePositionInTile, TileSideKey>[];

	export let camera: Camera;

	const dispatchEvent = createEventDispatcher<{
		"board-clicked": Point;
		"dimensions-change": Dimensions;
		"entity-clicked": Entity["id"] | null;
		"mouse-position-change": null | Point;
		"mouse-scrolled": number;
	}>();

	const boardStateHook = createBoardStateHook({
		dispatchEvent,
	});

	const {
		handleBoardClick,
		handleEntityClick,
		handleMouseenter,
		handleMouseleave,
		handleMousemove,
		handleScroll,
		observeBoardDimensions,
	} = boardStateHook();
</script>

<div
	class="board"
	on:click={handleBoardClick}
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
	on:mousemove={handleMousemove}
	on:wheel={handleScroll}
	role="presentation"
	use:observeBoardDimensions
>
	<BoardObjectList {camera}>
		<svelte:fragment let:layoutStylesCalculationPrecission>
			{#each tileWithNeighbors as { neighbors, tile } (tile.id)}
				<slot {layoutStylesCalculationPrecission} name="tile" {neighbors} {tile} />
			{/each}
			{#each entityWithSelectionStatuses as { entity, isSelected } (entity.id)}
				<EntityOnBoard
					{entity}
					{isSelected}
					{layoutStylesCalculationPrecission}
					on:icon-click={handleEntityClick}
				/>
			{/each}
		</svelte:fragment>
	</BoardObjectList>
</div>

<style lang="scss">
	.board {
		overflow: hidden;
	}
</style>
