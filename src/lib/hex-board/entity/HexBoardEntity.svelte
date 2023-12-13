<script lang="ts" strictEvents>
	import type {Entity} from "$lib/play/entities/Entity.ts";

	export let entity: Entity;
	export let layoutStylesCalculationPrecission: number;

	$: iconFontSizeStyle = `${(0.8 * layoutStylesCalculationPrecission).toString()}px`;

	$: entityTransformStyleX = `calc(${(
		layoutStylesCalculationPrecission * entity.position.x
	).toString()}px - 50%)`;

	$: entityTransformStyleY = `calc(${(
		layoutStylesCalculationPrecission * entity.position.y
	).toString()}px - 50%)`;

	$: entityTransformStyle = `translate(${entityTransformStyleX}, ${entityTransformStyleY})`;
</script>

<li class="hex-board-entity" style:transform={entityTransformStyle}>
	<span style:font-size={iconFontSizeStyle}> 🧍 </span>
</li>

<style lang="scss">
	.hex-board-entity {
		position: absolute;
		left: 50%;
		top: 50%;
		display: grid;
		place-items: center;
	}
</style>
