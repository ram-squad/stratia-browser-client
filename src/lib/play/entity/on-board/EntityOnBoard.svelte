<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {Entity} from "$lib/play/entity/Entity.ts";
	import {createEventDispatcher} from "svelte";

	export let entity: Entity;

	export let layoutStylesCalculationPrecission: number;

	export let isSelected: boolean;

	$: entityPosition = entity.position;

	$: entityPositionX = entityPosition.x;

	$: entityPositionY = entityPosition.y;

	$: iconFontSizeStyle = `${(0.8 * layoutStylesCalculationPrecission).toString()}px`;

	$: entityTransformTranslateXStyle = `calc(${(
		layoutStylesCalculationPrecission * entityPositionX
	).toString()}px - 50%)`;

	$: entityTransformTranslateYStyle = `calc(${(
		layoutStylesCalculationPrecission * entityPositionY
	).toString()}px - 50%)`;

	$: entityTransformStyle = `translate(${entityTransformTranslateXStyle}, ${entityTransformTranslateYStyle})`;

	$: iconTransformStyle = `rotate(${entity.directionRadians.toString()}rad)`;

	const eventDispatcher = createEventDispatcher<{
		"icon-click": Entity;
	}>();

	const handleIconClick = (): void => {
		eventDispatcher("icon-click", entity);
	};
</script>

<li class="entity-on-board" style:transform={entityTransformStyle}>
	<progress
		class="entity-on-board__health-bar"
		max={entity.maximalHealthPoints.toString()}
		value={entity.healthPoints.toString()}
	/>
	<button
		class="entity-on-board__icon"
		class:entity-on-board__icon--selected={isSelected}
		on:click={handleIconClick}
		style:font-size={iconFontSizeStyle}
		style:transform={iconTransformStyle}
		type="button"
	>
		🧍
	</button>
</li>

<style lang="scss">
	.entity-on-board {
		display: grid;
		left: 50%;
		place-items: center;
		position: absolute;
		top: 50%;
	}

	.entity-on-board__icon {
		background: none;
		border-width: 0;
		cursor: pointer;
		padding-block: 0;
		padding-inline: 0;
	}

	.entity-on-board__icon--selected {
		background-color: hsl(0deg 0% 0% / 0.1);
		outline: 2px solid hsl(0deg 0% 0% / 1);
	}

	.entity-on-board__health-bar {
		$health-bar-width: 10rem !default;
		$health-bar-height: 1rem !default;
		border-radius: 0;
		height: $health-bar-height;
		left: calc($health-bar-width / -2 + 50%);
		position: absolute;
		top: -$health-bar-height;
		width: $health-bar-width;

		&::-webkit-progress-bar {
			background-color: hsl(0deg 100% 50% / 1);
		}

		&::-webkit-progress-value {
			background-color: hsl(120deg 100% 50% / 1);
		}
	}
</style>
