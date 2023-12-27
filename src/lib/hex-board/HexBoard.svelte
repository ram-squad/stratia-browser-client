<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {Dimensions} from "$lib/dimensions/Dimensions.ts";
	import type {HexGrid} from "$lib/hex/HexGrid.ts";
	import type {EntityWithSelectionStatus} from "$lib/hex-board/entity/EntityWithSelectionStatus.ts";
	import HexBoardEntity from "$lib/hex-board/entity/HexBoardEntity.svelte";
	import HexBoardCell from "$lib/hex-board/tile/HexBoardTile.svelte";
	import type {Camera} from "$lib/play/camera/Camera.ts";
	import type {Entity} from "$lib/play/entities/Entity.ts";
	import type {Point} from "$lib/point/Point.ts";
	import {createEventDispatcher} from "svelte";

	export let hexGrid: HexGrid;
	export let entityWithSelectionStatuses: readonly EntityWithSelectionStatus[];

	export let camera: Camera;

	const cellLayoutStylesCalculationPrecission = 100;

	$: hexBoardScale = camera.zoomFactor / cellLayoutStylesCalculationPrecission;

	$: hexBoardScaleStyle = hexBoardScale.toString();

	$: hexBoardTransformTranslateXStyle = `${(
		-camera.position.x * cellLayoutStylesCalculationPrecission
	).toString()}px`;

	$: hexBoardTransformTranslateYStyle = `${(
		-camera.position.y * cellLayoutStylesCalculationPrecission
	).toString()}px`;

	$: hexBoardTransformStyle = `translate(${hexBoardTransformTranslateXStyle}, ${hexBoardTransformTranslateYStyle})`;

	const dispatchEvent = createEventDispatcher<{
		"dimensions-change": Dimensions;
		"entity-clicked": Entity["id"] | null;
		"mouse-position-change": null | Point;
	}>();

	let clickedEntitiesIDsAccumulator: readonly Entity["id"][] = [];

	const handleHexBoardClick = () => {
		const clickedEntitiesIDs = clickedEntitiesIDsAccumulator;

		clickedEntitiesIDsAccumulator = [];

		if (clickedEntitiesIDs.length > 1) {
			throw new Error("Multiple entities clicked at the same time. Not implemented yet.");
		}

		const [clickedEntityID] = clickedEntitiesIDs;

		if (clickedEntityID === undefined) {
			dispatchEvent("entity-clicked", null);

			return;
		}

		dispatchEvent("entity-clicked", clickedEntityID);
	};

	const handleEntityClick = (event: CustomEvent<Entity>) => {
		const clickedEntity = event.detail;

		clickedEntitiesIDsAccumulator = [...clickedEntitiesIDsAccumulator, clickedEntity.id];
	};

	const handleMousemove = (event: MouseEvent) => {
		const hexBoardElement = event.currentTarget as HTMLDivElement;

		const mousePosition: Point = {
			x: event.clientX - hexBoardElement.getBoundingClientRect().left,
			y: event.clientY - hexBoardElement.getBoundingClientRect().top,
		};

		dispatchEvent("mouse-position-change", mousePosition);
	};

	const handleMouseleave = () => {
		dispatchEvent("mouse-position-change", null);
	};

	const handleMouseenter = (event: MouseEvent) => {
		const hexBoardElement = event.currentTarget as HTMLDivElement;

		const mousePosition: Point = {
			x: event.clientX - hexBoardElement.getBoundingClientRect().left,
			y: event.clientY - hexBoardElement.getBoundingClientRect().top,
		};

		dispatchEvent("mouse-position-change", mousePosition);
	};

	const observeDimensions = (element: HTMLDivElement) => {
		const resizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const {height, width} = entry.contentRect;

				dispatchEvent("dimensions-change", {
					height,
					width,
				});
			});
		});

		resizeObserver.observe(element);

		return {
			destroy: () => {
				resizeObserver.disconnect();
			},
		};
	};
</script>

<div
	class="hex-board-no-scrollbar-wrapper"
	on:click={handleHexBoardClick}
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
	on:mousemove={handleMousemove}
	role="presentation"
	use:observeDimensions
>
	<ul class="hex-board" style:scale={hexBoardScaleStyle} style:transform={hexBoardTransformStyle}>
		{#each hexGrid.iterateHexTilesWithNeighbors() as hexTileWithNeighbors (`${hexTileWithNeighbors.tile.position.inGridX.toString()},${hexTileWithNeighbors.tile.position.inGridY.toString()}`)}
			<HexBoardCell
				{hexTileWithNeighbors}
				layoutStylesCalculationPrecission={cellLayoutStylesCalculationPrecission}
			/>
		{/each}
		{#each entityWithSelectionStatuses as { entity, isSelected } (entity.id)}
			<HexBoardEntity
				{entity}
				{isSelected}
				layoutStylesCalculationPrecission={cellLayoutStylesCalculationPrecission}
				on:icon-click={handleEntityClick}
			/>
		{/each}
	</ul>
</div>

<style lang="scss">
	.hex-board {
		height: 100%;
		list-style: none;
		margin-block: 0 0;
		padding-inline-start: 0;
	}

	.hex-board-no-scrollbar-wrapper {
		overflow: hidden;
	}
</style>
