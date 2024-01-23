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

	export let gotoWelcomeView: () => Promise<void>;
		
		const handleGoToWelcomeViewButtonClick = async () => {
			await gotoWelcomeView();
		};

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
	let player1Won=false;
	let player2Won=false;
	let whoseTurn:String= "player1";
	let numberOfPlayer1Fields=2;
	let numberOfPlayer2Fields=2;
	let moneyOfPlayer1=0;
	let moneyOfPlayer2=0;
	let upkeepOfPlayer1=5;
	let upkeepOfPlayer2=5;
	$: numberOfAllLandTilesOnMap=playTiles.filter(e=>e.data.landType=="dirt").length;
	let clickedTile:HexTile|null;
	let selectedEntityTile:HexTile|null;
	function handleNextTurn() {
		if(0==numberOfPlayer1Fields)
		{
			console.log("Player 1 Won")
			player1Won=true
			return;
		}
		if(0==numberOfPlayer2Fields)
		{
			console.log("Player 2 Won")
			player2Won=true
			return;
		}
		if(whoseTurn=="player1")
					{
						whoseTurn="player2"
					}
					else
					{
						whoseTurn="player1"
					}
					numberOfPlayer1Fields=0;
					numberOfPlayer2Fields=0;
					upkeepOfPlayer1=0;
					upkeepOfPlayer2=0;
					playTiles.forEach(element => {
						let newElement;
						newElement=element;
						if(element.data.entity!="None")
						{
							element.data.entityCanMove="true"
						}
						hexGrid.setHexTile(element.position,newElement)
						if(element.data.ownership=="player1")
						{
							if(element.data.entity=="recruit")
							{
								upkeepOfPlayer1=upkeepOfPlayer1+5
							}
							numberOfPlayer1Fields=numberOfPlayer1Fields+1;
						}
						if(element.data.ownership=="player2")
						{
							if(element.data.entity=="recruit")
							{
								upkeepOfPlayer2=upkeepOfPlayer2+5
							}
							numberOfPlayer2Fields=numberOfPlayer2Fields+1;
						}
					});
					moneyOfPlayer1=moneyOfPlayer1+numberOfPlayer1Fields-upkeepOfPlayer1
					moneyOfPlayer2=moneyOfPlayer2+numberOfPlayer2Fields-upkeepOfPlayer2
		
	}
	function handleClicking() {
    console.log('Left mouse button clicked!');
	if(hexGrid.getHexTile(new HexTilePosition({x:$cameraStore.hoveredTilePosition.x,y:$cameraStore.hoveredTilePosition.y}))!=undefined)
	{
		clickedTile=hexGrid.getHexTile(new HexTilePosition({x:$cameraStore.hoveredTilePosition.x,y:$cameraStore.hoveredTilePosition.y}))
		console.log("I clicked tile below:!")
		console.log(clickedTile)
		if(clickedTile!=null)
		{
			if(clickedTile?.data.entity!="None" && clickedTile?.data.ownership==whoseTurn)
			{
				selectedEntityTile=clickedTile
				//clickedTile.data.entity = "None" // test if set works by clicking any hex entity and seeing if it disappears
				hexGrid.setHexTile({x:$cameraStore.hoveredTilePosition.x,y:$cameraStore.hoveredTilePosition.y},clickedTile)
			}
			if(selectedEntityTile!=null&&selectedEntityTile!=undefined)
			{
				if(isTileNeighbourAndCanMove(selectedEntityTile,clickedTile,whoseTurn))
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
					if(clickedTile.data.ownership!=whoseTurn && clickedTile.data.entity=="recruit")
					{
						if(whoseTurn=="player1")
						{
							moneyOfPlayer1=moneyOfPlayer1-10
						}
						if(whoseTurn=="player2")
						{
							moneyOfPlayer2=moneyOfPlayer2-10
						}
					}
					newClickedTile.data.entityCanMove="false"
					newSelectedEntityTile.data.entityCanMove="false"
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
		debugMoneyOfPlayer1 = {moneyOfPlayer1}
		debugMoneyOfPlayer2 = {moneyOfPlayer2}
		debugIncomeOfPlayer1 = {numberOfPlayer1Fields}
		debugIncomeOfPlayer2 = {numberOfPlayer2Fields}
		debugUpkeepOfPlayer1 = {upkeepOfPlayer1}
		debugUpkeepOfPlayer2 = {upkeepOfPlayer2}
		debugWhoseTurn = {whoseTurn}
		debugClickedTile = {clickedTile!=undefined?clickedTile:null} 
		debugHoveredTile={hexGrid.getHexTile(new HexTilePosition({x:$cameraStore.hoveredTilePosition.x,y:$cameraStore.hoveredTilePosition.y}))} 
		debugSelectedEntityTile ={selectedEntityTile!=undefined?selectedEntityTile:null} 
		/>
	</div>
	{#if (player1Won==false&&player2Won==false)}
	<button
		class="menu-button slide-inside"
		on:click={handleNextTurn}
		type="button">
		NEXT TURN
	</button>
	{/if}
	{#if (player1Won==true)}
	<button
	class="menu-button slide-inside"
	on:click={handleNextTurn}
	type="button">
	PLAYER 1 WON
	</button>
	{/if}
	{#if (player2Won==true)}
	<button
	class="menu-button slide-inside"
	on:click={handleNextTurn}
	type="button">
	PLAYER 2 WON
	</button>
	{/if}
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
			choosenTilePositionY={$cameraStore.hoveredTilePosition.y}
			HexTileWhoseTurn={whoseTurn}/>
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
		grid-template-rows: 1fr 13rem;
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
	.menu-button {
		background-color: rgb(0 174 255);
		border: 2px solid rgb(216 2 134);
		border-radius: 0;
		box-shadow: inset 0 0 0 0 #ff009d;
		color: rgb(0 0 0);
		cursor: pointer;
		display: inline-block;
		font-family: "Lucida Console", "Monaco", monospace;
		font-size: 24px;
		font-weight: 4px;
		letter-spacing: 1px;
		padding: 18px 36px;
		transition: ease-out 0.4s;
	}
	.slide-inside:hover {
		box-shadow: inset 0 0 0 50px #bb5400;
	}
	.slide-inside:active {
		box-shadow: inset 0 0 0 50px #fbff00;
	}
</style>
