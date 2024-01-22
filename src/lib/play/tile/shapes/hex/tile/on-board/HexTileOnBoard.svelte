<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {HexTile} from "$lib/play/tile/shapes/hex/tile/HexTile.ts";
	import type {HexTileNeighbors} from "$lib/play/tile/shapes/hex/tile/HexTileNeighbors.ts";
	import {computeHexSideStrokeColors} from "$lib/play/tile/shapes/hex/tile/side/computeHexSideStrokeColors.ts";

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
	tile.data.ownership == "player2" && tile.data.landType == "dirt"? "green":
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
  		<div class="recruit"></div>
	{/if}
	{#if selectedEntityTile !== null}
		{#if (selectedEntityTile.position.inGrid.x,selectedEntityTile.position.inGrid.y) !== (tile.position.inGrid.x,tile.position.inGrid.y)}
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
  background: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2b524626-861a-4a6a-ae53-bc8572fa8f06/ddkbb7f-56f05503-f161-4ec4-bf69-4c0b56f44990.png/v1/fill/w_512,h_512/pixel_art_farmer_by_goodgame128_ddkbb7f-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvMmI1MjQ2MjYtODYxYS00YTZhLWFlNTMtYmM4NTcyZmE4ZjA2XC9kZGtiYjdmLTU2ZjA1NTAzLWYxNjEtNGVjNC1iZjY5LTRjMGI1NmY0NDk5MC5wbmciLCJ3aWR0aCI6Ijw9NTEyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.UEawn7HaHQcrJtxDMPfjWj_MQESUjDRZyoKUoXfZrqE');
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
  background: url('https://i.pinimg.com/originals/e2/29/50/e22950b0a26db427c651dccba60ab62c.png');
  background-color: inherit;
  background-repeat: no-repeat;
  background-size: cover; 
  position: absolute;
  margin-left: 20%;
  margin-top: 10%;
	}
</style>
