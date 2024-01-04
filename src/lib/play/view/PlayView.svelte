<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {Dimensions} from "$lib/math/dimensions/Dimensions.ts";
	import type {Point} from "$lib/math/point/Point.ts";
	import Board from "$lib/play/board/Board.svelte";
	import type {Entity} from "$lib/play/entity/Entity.ts";
	import {HexGrid} from "$lib/play/tile/shapes/hex/grid/HexGrid.ts";
	import HexTileOnBoard from "$lib/play/tile/shapes/hex/tile/on-board/HexTileOnBoard.svelte";
	import {computeEntityWithSelectionStatusesHook} from "$lib/play/view/hooks/compute-entity-with-selection-statuses/computeEntityWithSelectionStatusesHook.ts";
	import {createEntitySelectionStateHook} from "$lib/play/view/hooks/entity-selection-state/createEntitySelectionStateHook.ts";
	import {createPlayStateHook} from "$lib/play/view/hooks/play-state/createPlayStateHook.ts";
	import SelectedEntityBar from "$lib/play/view/selected-entity-bar/SelectedEntityBar.svelte";
	import {onDestroy} from "svelte";

	export let playID: string;

	let boardMousePositionPixels: null | Point = null;

	let boardDimensionsPixels: Dimensions | null = null;

	const playStateHook = createPlayStateHook();

	$: ({cameraStore, destroyPlayState, playStore, updateZoom} = playStateHook({
		boardDimensionsPixels,
		boardMousePositionPixels,
		playID,
	}));

	onDestroy(() => {
		destroyPlayState();
	});

	$: ({entities: playEntities, tiles: playTiles} = $playStore);

	const entitySelectionStateHook = createEntitySelectionStateHook();

	$: ({entitySelectionStore, requestDeselectingEntity, requestSelectingEntityByID} =
		entitySelectionStateHook({
			entities: playEntities,
		}));

	$: entityWithSelectionStatuses = computeEntityWithSelectionStatusesHook(
		playEntities,
		$entitySelectionStore,
	);

	const handleBoardMouseScrolled = (event: CustomEvent<number>) => {
		updateZoom(event.detail)
	}

	const handleBoardMousePositionChange = (event: CustomEvent<null | Point>) => {
		boardMousePositionPixels = event.detail;
	};

	const handleBoardDimensionsChange = (event: CustomEvent<Dimensions>) => {
		boardDimensionsPixels = event.detail;
	};

	const handleEntityClicked = (event: CustomEvent<Entity["id"] | null>) => {
		const clickedEntityID = event.detail;

		if (clickedEntityID === null) {
			requestDeselectingEntity();

			return;
		}

		requestSelectingEntityByID(clickedEntityID);
	};

	$: hexGrid = new HexGrid(playTiles);

	$: tileWithNeighbors = Array.from(hexGrid.iterateHexTilesWithNeighbors());
</script>

<main class="play-view">
	<div class="play-view__selected-entity-bar-wrapper">
		<SelectedEntityBar entitySelection={$entitySelectionStore} />
	</div>
	<div class="play-view__board-wrapper">
		<Board
			camera={$cameraStore}
			{entityWithSelectionStatuses}
			on:dimensions-change={handleBoardDimensionsChange}
			on:entity-clicked={handleEntityClicked}
			on:mouse-position-change={handleBoardMousePositionChange}
			on:mouse-scrolled={handleBoardMouseScrolled}
			{tileWithNeighbors}
		>
			<svelte:fragment let:layoutStylesCalculationPrecission let:neighbors let:tile slot="tile">
				<HexTileOnBoard {layoutStylesCalculationPrecission} {neighbors} {tile} />
			</svelte:fragment>
		</Board>
	</div>
	<div>
		<input on:click={() => { updateZoom(1); }} type="button" value="zoom+">
		<input on:click={() => { updateZoom(-1); }} type="button" value="zoom-">
	</div>
</main>

<style lang="scss">
	.play-view {
		display: grid;
		grid-template-areas: "board" "selected-entity-bar";
		grid-template-rows: 1fr 10rem;
	}

	.play-view__selected-entity-bar-wrapper {
		grid-area: selected-entity-bar;
	}

	.play-view__board-wrapper {
		grid-area: board;
	}

	.play-view__selected-entity-bar-wrapper,
	.play-view__board-wrapper {
		display: grid;
	}
</style>
