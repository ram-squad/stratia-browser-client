<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {Dimensions} from "$lib/math/dimensions/Dimensions.ts";
	import type {Point} from "$lib/math/point/Point.ts";
	import {convertSecondsToMiliseconds} from "$lib/math/time/convertSecondsToMiliseconds.ts";
	import Board from "$lib/play/board/Board.svelte";
	import type {Camera} from "$lib/play/camera/Camera.ts";
	import {computeCameraTick} from "$lib/play/camera/tick/computeCameraTick.ts";
	import type {Entity} from "$lib/play/entity/Entity.ts";
	import {loadPlayFromLocalStorage} from "$lib/play/local-storage/loadPlayFromLocalStorage.ts";
	import {computePlayTick} from "$lib/play/tick/computePlayTick.ts";
	import {HexGrid} from "$lib/play/tile/shapes/hex/grid/HexGrid.ts";
	import HexTileOnBoard from "$lib/play/tile/shapes/hex/tile/on-board/HexTileOnBoard.svelte";
	import {createEntitySelectionHook} from "$lib/play/view/hooks/entity-selection/createEntitySelectionHook.ts";
	import SelectedEntityBar from "$lib/play/view/selected-entity-bar/SelectedEntityBar.svelte";
	import {onDestroy} from "svelte";

	export let playID: string;

	const tickIntervalSeconds = 0.1;
	let lastPlayID = playID;
	let play = loadPlayFromLocalStorage(playID);

	let playEntities = play.entities;

	$: playEntities = play.entities;

	const {
		entitySelectionStore,
		entityWithSelectionStatusesStore,
		updateEntitySelectionValidEntities,
	} = createEntitySelectionHook(playEntities);

	$: ({requestSelectingEntityByID} = updateEntitySelectionValidEntities(playEntities));

	let camera: Camera = {
		position: {
			x: 0,
			y: 0,
		},
		zoomFactor: 20,
	};

	let boardMousePositionPixels: null | Point = null;

	let boardDimensionsPixels: Dimensions | null = null;

	const tick = () => {
		play = computePlayTick(play, tickIntervalSeconds);

		camera = computeCameraTick(
			camera,
			boardMousePositionPixels,
			boardDimensionsPixels,
			tickIntervalSeconds,
		);
	};

	const setupTickInterval = () =>
		setInterval(tick, convertSecondsToMiliseconds(tickIntervalSeconds));

	let tickIntervalID = setupTickInterval();

	$: if (lastPlayID !== playID) {
		play = loadPlayFromLocalStorage(playID);

		clearInterval(tickIntervalID);

		tickIntervalID = setupTickInterval();

		lastPlayID = playID;
	}

	onDestroy(() => {
		clearInterval(tickIntervalID);
	});

	const handleBoardMousePositionChange = (event: CustomEvent<null | Point>) => {
		boardMousePositionPixels = event.detail;
	};

	const handleBoardDimensionsChange = (event: CustomEvent<Dimensions>) => {
		boardDimensionsPixels = event.detail;
	};

	const handleEntityClicked = (event: CustomEvent<Entity["id"] | null>) => {
		const clickedEntityID = event.detail;

		requestSelectingEntityByID(clickedEntityID);
	};

	$: playTiles = play.tiles;

	$: hexGrid = new HexGrid(playTiles);

	$: tileWithNeighbors = Array.from(hexGrid.iterateHexTilesWithNeighbors());
</script>

<main class="play-view">
	<div class="play-view__selected-entity-bar-wrapper">
		<SelectedEntityBar entitySelection={$entitySelectionStore} />
	</div>
	<div class="play-view__board-wrapper">
		<Board
			{camera}
			entityWithSelectionStatuses={$entityWithSelectionStatusesStore}
			on:dimensions-change={handleBoardDimensionsChange}
			on:entity-clicked={handleEntityClicked}
			on:mouse-position-change={handleBoardMousePositionChange}
			{tileWithNeighbors}
		>
			<svelte:fragment let:layoutStylesCalculationPrecission let:neighbors let:tile slot="tile">
				<HexTileOnBoard {layoutStylesCalculationPrecission} {neighbors} {tile} />
			</svelte:fragment>
		</Board>
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
