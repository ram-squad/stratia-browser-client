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

	$: entityTransformTranslateStyle = `translate(${entityTransformTranslateXStyle}, ${entityTransformTranslateYStyle})`;

	$: entityTransformRotateStyle = `rotate(${entity.directionRadians.toString()}rad)`;

	$: entityTransformStyle = `${entityTransformTranslateStyle} ${entityTransformRotateStyle}`;

	const eventDispatcher = createEventDispatcher<{
		"icon-click": Entity;
	}>();

	const handleIconClick = () => {
		eventDispatcher("icon-click", entity);
	};
</script>

<li class="hex-board-entity" style:transform={entityTransformStyle}>
	<button
		class="hex-board-entity__icon"
		class:hex-board-entity__icon--selected={isSelected}
		on:click={handleIconClick}
		style:font-size={iconFontSizeStyle}
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
</style>
