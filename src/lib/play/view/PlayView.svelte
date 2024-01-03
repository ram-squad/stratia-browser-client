<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import Board from "$lib/play/board/Board.svelte";
	import HexTileOnBoard from "$lib/play/tile/shapes/hex/tile/on-board/HexTileOnBoard.svelte";
	import SelectedEntityBar from "$lib/play/view/selected-entity-bar/SelectedEntityBar.svelte";
	import {createPlayViewStateHook} from "$lib/play/view/state-hook/createPlayViewStateHook.ts";

	export let playID: string;

	const playViewStateHook = createPlayViewStateHook();

	$: ({
		cameraStore,
		entitySelectionStore,
		entityWithSelectionStatusesStore,
		handleBoardDimensionsChange,
		handleBoardEntityClicked,
		handleBoardMousePositionChange,
		handleBoardMouseScrolled,
		handleEntitySelectionModeChangeRequested,
		handleZoomInButtonClick,
		handleZoomOutButtonClick,
		tileWithNeighborsStore,
	} = playViewStateHook({
		playID,
	}));
</script>

<main class="play-view">
	<div class="play-view__selected-entity-bar-wrapper">
		<SelectedEntityBar
			entitySelection={$entitySelectionStore}
			on:mode-change-requested={handleEntitySelectionModeChangeRequested}
		/>
	</div>
	<div class="play-view__board-wrapper">
		<Board
			camera={$cameraStore}
			entityWithSelectionStatuses={$entityWithSelectionStatusesStore}
			on:board-clicked={handleBoardClick}
			on:dimensions-change={handleBoardDimensionsChange}
			on:entity-clicked={handleBoardEntityClicked}
			on:mouse-position-change={handleBoardMousePositionChange}
			on:mouse-scrolled={handleBoardMouseScrolled}
			tileWithNeighbors={$tileWithNeighborsStore}
		>
			<svelte:fragment let:layoutStylesCalculationPrecission let:neighbors let:tile slot="tile">
				<HexTileOnBoard {layoutStylesCalculationPrecission} {neighbors} {tile} />
			</svelte:fragment>
		</Board>
	</div>
	<div>
		<input on:click={handleZoomInButtonClick} type="button" value="zoom+" />
		<input on:click={handleZoomOutButtonClick} type="button" value="zoom-" />
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
