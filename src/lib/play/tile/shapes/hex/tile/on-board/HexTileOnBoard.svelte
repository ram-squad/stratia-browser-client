<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {HexTile} from "$lib/play/tile/shapes/hex/tile/HexTile.ts";
	import type {HexTileNeighbors} from "$lib/play/tile/shapes/hex/tile/HexTileNeighbors.ts";
	import {computeHexSideStrokeColors} from "$lib/play/tile/shapes/hex/tile/side/computeHexSideStrokeColors.ts";
	import isTileNeighbourAndCanMove from "$lib/play/view/isTileNeighbourAndCanMove.ts";

	export let HexTileWhoseTurn;

	export let choosenTilePositionX;

	export let choosenTilePositionY;

	export let selectedEntityTile: HexTile | null = null;

	export let tile: HexTile;

	export let neighbors: HexTileNeighbors;

	export let layoutStylesCalculationPrecission: number;

	$: sideStrokeColors = computeHexSideStrokeColors(tile, neighbors);

	$: svgHeightStyle = `${layoutStylesCalculationPrecission.toString()}px`;

	$: realHexTilePosition = tile.position.real;

	$: cellTransformStyleX = `calc(${(
		layoutStylesCalculationPrecission * realHexTilePosition.x
	).toString()}px - 50%)`;

	$: cellTransformStyleY = `calc(${(
		layoutStylesCalculationPrecission * realHexTilePosition.y
	).toString()}px - 50%)`;

	$: cellTransformStyle = `translate(${cellTransformStyleX}, ${cellTransformStyleY})`;

	$: svgFillStyle = choosenTilePositionX == tile.position.inGrid.x && choosenTilePositionY == tile.position.inGrid.y ? "yellow": 
	tile.data.ownership == "None" && tile.data.landType == "dirt"? "grey":
	tile.data.ownership == "player1" && tile.data.landType == "dirt"? "red":
	tile.data.ownership == "player2" && tile.data.landType == "dirt"? "lightblue":
	(
		{
			dirt: "grey",
			water: "blue",
		} as const
	)[tile.data.landType];

</script>

<li class="hex-board-cell" style:transform={cellTransformStyle}>
	<svg
		fill={svgFillStyle}
		style:height={svgHeightStyle}
		viewBox="0 0 184.6 160"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g>
			<path d="m0 80 46.2-80 92.4 0 46.2 80-46.2 80-92.4 0-46.2-80z" />
			<path d="m4.3 82.5 l46.228 -80z" stroke={sideStrokeColors.topLeft} stroke-width="10" />
			<path d="m46.2 5 l92.4 0z" stroke={sideStrokeColors.top} stroke-width="10" />
			<path
				d="m180.5 82.55 l-46.228 -80.05z"
				stroke={sideStrokeColors.topRight}
				stroke-width="10"
			/>
			<path
				d="m180.473 77.5 l-46.25 80.1z"
				stroke={sideStrokeColors.bottomRight}
				stroke-width="10"
			/>
			<path d="m46.2 155 l92.4 0z" stroke={sideStrokeColors.bottom} stroke-width="10" />
			<path
				d="m50.5 157.5 l-46.17 -80.001z"
				stroke={sideStrokeColors.bottomLeft}
				stroke-width="10"
			/>
		</g>
	</svg>
	{#if tile.data.building === "capital"}
  		<div class="building"></div>
	{/if}
	{#if tile.data.entity === "recruit"}
		{#if tile.data.entityCanMove === "true"}
		<div class="recruit"></div>
		{/if}
		{#if tile.data.entityCanMove === "false"}
		<div class="recruit" style="opacity: 0.5;"></div>
		{/if}
	{/if}
	{#if selectedEntityTile !== null}
		{#if (isTileNeighbourAndCanMove(selectedEntityTile, tile, HexTileWhoseTurn))}
			<div class="canMoveDot"></div>
		{/if}
	{/if}
</li>

<style lang="scss">
	.hex-board-cell {
		display: grid;
		left: 50%;
		position: absolute;
		top: 50%;
	}
	.building {
		height: 70%;
  width: 60%;
  background: url('https://krita-artists.org/uploads/default/original/3X/1/1/1146000c972c87c1d9d359fe8fb73ce2839a826f.png');
  background-color: inherit;
  background-repeat: no-repeat;
  background-size: cover; 
  position: absolute;
  margin-left: 20%;
  margin-top: 10%;
	}
	.recruit {
		height: 70%;
  width: 60%;
  background: url('Recruit.png');
  background-color: inherit;
  background-repeat: no-repeat;
  background-size: cover; 
  position: absolute;
  margin-left: 20%;
  margin-top: 10%;
	}
	.canMoveDot{
		height: 70%;
  width: 60%;
  background: url('CanMoveDot.png');
  opacity: 0.5;
  background-color: inherit;
  background-repeat: no-repeat;
  background-size: cover; 
  position: absolute;
  margin-left: 20%;
  margin-top: 10%;
	}
</style>
