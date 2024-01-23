<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {EntitySelection} from "$lib/play/entity/selection/EntitySelection.ts";
	import type { HexTile } from "$lib/play/tile/shapes/hex/tile/HexTile.ts";
	import isTileNeighbourAndCanMove from "$lib/play/view/isTileNeighbourAndCanMove.ts";

	//export let entitySelection: EntitySelection | null;
	export let	debugMoneyOfPlayer1;
	export let	debugMoneyOfPlayer2;
	export let	debugIncomeOfPlayer1;
	export let	debugIncomeOfPlayer2;
	export let	debugUpkeepOfPlayer1;
	export let	debugUpkeepOfPlayer2;
	export let debugWhoseTurn:String;
	export let debugHoveredTile: HexTile | null;
	export let debugClickedTile: HexTile | null;
	export let debugSelectedEntityTile: HexTile | null;

	//export let selectedTile: HexTile | null;
</script>

<div>
	<div>
		Money of Player 1 Red: {debugMoneyOfPlayer1}
	</div>
	<div>
		Income of Player 1 Red: {debugIncomeOfPlayer1}
	</div>
	<div>
		Money of Player 2 Light Blue: {debugMoneyOfPlayer2}
	</div>
	<div>
		Income of Player 2 Light Blue: {debugIncomeOfPlayer2}
	</div>
	<div>
		Upkeep of Player 1 Light Blue: {debugUpkeepOfPlayer1}
	</div>
	<div>
		Upkeep of Player 2 Light Blue: {debugUpkeepOfPlayer2}
	</div>
	<div>
		{#if debugWhoseTurn === null || debugWhoseTurn === ""}
		No one's turn
	{:else}
		Turn of: {debugWhoseTurn=="player1"?"Player 1 Red":"Player 2 Light Blue"}
	{/if}
	</div>
	<div>
		{#if debugHoveredTile === null}
		No tile hovered.
	{:else}
		Hovered tile: X: {debugHoveredTile.position.inGrid.x} Y: {debugHoveredTile.position.inGrid.y}
	{/if}
	</div>
	<div>
		{#if debugClickedTile === null && debugClickedTile !== undefined}
		No tile clicked.
	{:else}
		Clicked tile: X: {debugClickedTile.position.inGrid.x} Y: {debugClickedTile.position.inGrid.y}
	{/if}
	</div>
	<div>
		{#if debugSelectedEntityTile === null && debugSelectedEntityTile !== undefined}
		No tile with entity clicked.
	{:else}
		Clicked tile with entity: X: {debugSelectedEntityTile.position.inGrid.x} Y: {debugSelectedEntityTile.position.inGrid.y}
	{/if}
	</div>
	
</div>
