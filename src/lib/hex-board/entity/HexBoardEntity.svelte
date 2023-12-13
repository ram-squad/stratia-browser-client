<script lang="ts" strictEvents>
	import type {Entity} from "$lib/play/entities/Entity.ts";
	import {createEventDispatcher} from "svelte";

	export let entity: Entity;
	export let layoutStylesCalculationPrecission: number;
	export let isSelected: boolean;

	$: iconFontSizeStyle = `${(0.8 * layoutStylesCalculationPrecission).toString()}px`;

	$: entityTransformStyleX = `calc(${(
		layoutStylesCalculationPrecission * entity.position.x
	).toString()}px - 50%)`;

	$: entityTransformStyleY = `calc(${(
		layoutStylesCalculationPrecission * entity.position.y
	).toString()}px - 50%)`;

	$: entityTransformStyle = `translate(${entityTransformStyleX}, ${entityTransformStyleY})`;

	const eventDispatcher = createEventDispatcher<{
		"icon-click": string;
	}>();

	const handleIconClick = () => {
		eventDispatcher("icon-click", entity.id);
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
		position: absolute;
		left: 50%;
		top: 50%;
		display: grid;
		place-items: center;
	}

	.hex-board-entity__icon {
		cursor: pointer;
		padding-block: 0;
		padding-inline: 0;
		border-width: 0;
		background: none;
	}
	.hex-board-entity__icon--selected {
		outline: 2px solid black;
		background-color: hsla(0, 0%, 0%, 0.1);
	}
</style>
