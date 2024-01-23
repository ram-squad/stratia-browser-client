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
	import { HexTilePosition } from "../tile/shapes/hex/tile/position/HexTilePosition.ts";
	import type { HexTile } from "../tile/shapes/hex/tile/HexTile.ts";
	import isTileNeighbourAndCanMove from "$lib/play/view/isTileNeighbourAndCanMove.ts";

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
		updateZoom(event.detail);
	};

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
	let whoseTurn:String= "player1";
	let clickedTile:HexTile|null;
	let selectedEntityTile:HexTile|null;
	function handleClicking() {
    console.log('Left mouse button clicked!');
	if(hexGrid.getHexTile(new HexTilePosition({x:$cameraStore.hoveredTilePosition.x,y:$cameraStore.hoveredTilePosition.y}))!=undefined)
	{
		clickedTile=hexGrid.getHexTile(new HexTilePosition({x:$cameraStore.hoveredTilePosition.x,y:$cameraStore.hoveredTilePosition.y}))
		console.log("I clicked tile below:!")
		console.log(clickedTile)
		if(clickedTile!=null)
		{
			if(clickedTile?.data.entity!="None")
			{
				selectedEntityTile=clickedTile
				//clickedTile.data.entity = "None" // test if set works by clicking any hex entity and seeing if it disappears
				hexGrid.setHexTile({x:$cameraStore.hoveredTilePosition.x,y:$cameraStore.hoveredTilePosition.y},clickedTile)
			}
			if(selectedEntityTile!=null&&selectedEntityTile!=undefined)
			{
				if(isTileNeighbourAndCanMove(selectedEntityTile,clickedTile))
				{
					// move unit and maybe capture field or kill enemy unit
					let newClickedTile = clickedTile
					let newSelectedEntityTile = selectedEntityTile
					newClickedTile.data.entity=selectedEntityTile.data.entity
					newSelectedEntityTile.data.entity="None"
					//capture field
					if(clickedTile.data.ownership!=selectedEntityTile.data.ownership)
					{
						newClickedTile.data.ownership = selectedEntityTile.data.ownership
					}
					hexGrid.setHexTile(clickedTile.position,newClickedTile)
					hexGrid.setHexTile(selectedEntityTile.position,newSelectedEntityTile)
					selectedEntityTile=null
				}
			}
		}
		
	}
	}
	// Attach the event listener to the window
	window.addEventListener('click', handleClicking);

// Cleanup the event listener when the component is destroyed
onDestroy(() => {
  window.removeEventListener('click', handleClicking);
});
</script>

<main class="play-view">
	<div class="play-view__selected-entity-bar-wrapper">
		<SelectedEntityBar 
		debugWhoseTurn = {whoseTurn}
		debugClickedTile = {clickedTile!=undefined?clickedTile:null} 
		debugHoveredTile={hexGrid.getHexTile(new HexTilePosition({x:$cameraStore.hoveredTilePosition.x,y:$cameraStore.hoveredTilePosition.y}))} 
		debugSelectedEntityTile ={selectedEntityTile!=undefined?selectedEntityTile:null} 
		/>
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
		<svelte:fragment let:layoutStylesCalculationPrecission let:neighbors let:tile slot="tile" >
			<HexTileOnBoard 
			{layoutStylesCalculationPrecission} 
			{neighbors} 
			{tile} 
			selectedEntityTile={selectedEntityTile}
			choosenTilePositionX={$cameraStore.hoveredTilePosition.x} 
			choosenTilePositionY={$cameraStore.hoveredTilePosition.y}/>
		</svelte:fragment>
		</Board>
	</div>
	<div>
		<input
			on:click={() => {
				updateZoom(1);
			}}
			type="button"
			value="zoom+"
		/>
		<input
			on:click={() => {
				updateZoom(-1);
			}}
			type="button"
			value="zoom-"
		/>
	</div>
</main>

<style lang="scss">
	.play-view {
		display: grid;
		grid-template-areas: "board" "selected-entity-bar";
		grid-template-rows: 1fr 5rem;
		border-width: 9px;
		background-color: rgb(26, 26, 26);
	}

	.play-view__selected-entity-bar-wrapper {
		grid-area: selected-entity-bar;
		color: yellow;
		border: solid;
		border-color: yellow;
		background-color: black;
		text-align: center;
	}

	.play-view__board-wrapper {
		grid-area: board;
	}

	.play-view__selected-entity-bar-wrapper,
	.play-view__board-wrapper {
		display: grid;
	}
</style>
