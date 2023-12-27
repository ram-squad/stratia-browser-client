<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {Entity} from "$lib/play/entities/Entity.ts";
	import {createEventDispatcher} from "svelte";

	export let entity: Entity;
	export let layoutStylesCalculationPrecission: number;
	export let isSelected: boolean;

	$: iconFontSizeStyle = `${(0.8 * layoutStylesCalculationPrecission).toString()}px`;

	$: entityTransformTranslateXStyle = `calc(${(
		layoutStylesCalculationPrecission * entity.position.x
	).toString()}px - 50%)`;

	$: entityTransformTranslateYStyle = `calc(${(
		layoutStylesCalculationPrecission * entity.position.y
	).toString()}px - 50%)`;

	$: entityTransformStyle = `translate(${entityTransformTranslateXStyle}, ${entityTransformTranslateYStyle})`;

	$: iconTransformStyle = `rotate(${entity.directionRadians.toString()}rad)`;

	const eventDispatcher = createEventDispatcher<{
		"icon-click": Entity;
	}>();

	const handleIconClick = () => {
		eventDispatcher("icon-click", entity);
	};
</script>

<li class="hex-board-entity" style:transform={entityTransformStyle}>
	<progress
		class="hex-board-entity__health-bar"
		max={entity.maximalHealthPoints.toString()}
		value={entity.healthPoints.toString()}
	/>
	<button
		class="hex-board-entity__icon"
		class:hex-board-entity__icon--selected={isSelected}
		on:click={handleIconClick}
		style:font-size={iconFontSizeStyle}
		style:transform={iconTransformStyle}
		type="button"
	>
		🧍
	</button>
</li>

<style lang="scss">
	.hex-board-entity {
		display: grid;
		left: 50%;
		place-items: center;
		position: absolute;
		top: 50%;
	}

	.hex-board-entity__icon {
		background: none;
		border-width: 0;
		cursor: pointer;
		padding-block: 0;
		padding-inline: 0;
	}

	.hex-board-entity__icon--selected {
		background-color: hsl(0deg 0% 0% / 0.1);
		outline: 2px solid hsl(0deg 0% 0% / 1);
	}

	.hex-board-entity__health-bar {
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
