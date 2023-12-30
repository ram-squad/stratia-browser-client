<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {Point} from "$lib/math/point/Point.ts";

	export let position: Point;

	export let layoutStylesCalculationPrecission: number;

	interface $$Slots {
		default: Readonly<Record<string, never>>;
	}

	$: positionX = position.x;

	$: positionY = position.y;

	$: transformStyleX = `calc(${(
		layoutStylesCalculationPrecission * positionX
	).toString()}px - 50%)`;

	$: transformStyleY = `calc(${(
		layoutStylesCalculationPrecission * positionY
	).toString()}px - 50%)`;

	$: transformStyle = `translate(${transformStyleX}, ${transformStyleY})`;
</script>

<li class="board-object-list-item" style:transform={transformStyle}>
	<slot />
</li>

<style lang="scss">
	.board-object-list-item {
		display: grid;
		left: 50%;
		position: absolute;
		top: 50%;
	}
</style>
