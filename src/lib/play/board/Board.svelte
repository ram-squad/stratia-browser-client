<svelte:options immutable={true} />

<script
	generics="TilePositionInTile extends TilePosition, TileSideKey extends string"
	lang="ts"
	strictEvents
>
	import type {Dimensions} from "$lib/math/dimensions/Dimensions.ts";
	import type {Point} from "$lib/math/point/Point.ts";
	import {createEntityClickedHook} from "$lib/play/board/hooks/entity-clicked/createEntityClickedHook.ts";
	import {createMousePositionChangedHook} from "$lib/play/board/hooks/mouse-position-changed/createMousePositionChangedHook.ts";
	import {createObserveDimensionsHook} from "$lib/play/board/hooks/observe-dimensions/createObserveDimensionsHook.ts";
	import BoardObjectList from "$lib/play/board/object-list/BoardObjectList.svelte";
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

	export let entityWithSelectionStatuses: readonly Readonly<{
		entity: Entity;
		isSelected: boolean;
	}>[];

	export let tileWithNeighbors: readonly TileWithNeighbors<TilePositionInTile, TileSideKey>[];

	export let camera: Camera;

	const dispatchEvent = createEventDispatcher<{
		"dimensions-change": Dimensions;
		"entity-clicked": Entity["id"] | null;
		"mouse-position-change": null | Point;
	}>();

	const {handleBoardClick, handleEntityClick} = createEntityClickedHook(dispatchEvent);

	const {handleMouseenter, handleMouseleave, handleMousemove} =
		createMousePositionChangedHook(dispatchEvent);

	const observeDimensionsHook = createObserveDimensionsHook(dispatchEvent);
</script>

<div
	class="board"
	on:click={handleBoardClick}
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
	on:mousemove={handleMousemove}
	role="presentation"
	use:observeDimensionsHook
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
