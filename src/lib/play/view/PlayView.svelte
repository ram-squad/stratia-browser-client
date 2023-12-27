<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {Dimensions} from "$lib/dimensions/Dimensions.ts";
	import {HexGrid} from "$lib/hex/HexGrid.ts";
	import HexBoard from "$lib/hex-board/HexBoard.svelte";
	import {convertSecondsToMiliseconds} from "$lib/math/convertSecondsToMiliseconds.ts";
	import type {Camera} from "$lib/play/camera/Camera.ts";
	import {computeCameraTick} from "$lib/play/camera/computeCameraTick.ts";
	import {computePlayTick} from "$lib/play/computePlayTick.ts";
	import type {Entity} from "$lib/play/entities/Entity.ts";
	import {loadPlayFromLocalStorage} from "$lib/play/loadPlayFromLocalStorage.ts";
	import SelectedEntityBar from "$lib/play/view/selected-entity-bar/SelectedEntityBar.svelte";
	import type {Point} from "$lib/point/Point.ts";
	import {onDestroy} from "svelte";

	export let playID: string;

	const tickIntervalSeconds = 0.1;
	let lastPlayID = playID;
	let play = loadPlayFromLocalStorage(playID);

	let requestedEntitySelectionID: null | string = null;

	$: selectedEntity =
		requestedEntitySelectionID === null
			? null
			: play.entities.find((entity) => entity.id === requestedEntitySelectionID) ?? null;

	$: entityWithSelectionStatuses = play.entities.map((entity) => ({
		entity,
		isSelected:
			requestedEntitySelectionID === null ? false : entity.id === requestedEntitySelectionID,
	}));

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

		if (clickedEntityID === null) {
			requestedEntitySelectionID = null;

			return;
		}

		requestedEntitySelectionID = clickedEntityID;
	};
</script>

<main class="play-view">
	<div class="play-view__selected-entity-bar-wrapper">
		<SelectedEntityBar {selectedEntity} />
	</div>
	<div class="play-view__board-wrapper">
		<HexBoard
			{camera}
			{entityWithSelectionStatuses}
			hexGrid={new HexGrid(play.tiles)}
			on:dimensions-change={handleBoardDimensionsChange}
			on:entity-clicked={handleEntityClicked}
			on:mouse-position-change={handleBoardMousePositionChange}
		/>
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
