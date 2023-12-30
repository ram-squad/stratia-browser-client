<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {Camera} from "$lib/play/camera/Camera.ts";

	export let camera: Camera;

	interface $$Slots {
		default: Readonly<{
			layoutStylesCalculationPrecission: number;
		}>;
	}

	const layoutStylesCalculationPrecission = 100;

	$: cameraZoomFactor = camera.zoomFactor;

	$: scale = cameraZoomFactor / layoutStylesCalculationPrecission;

	$: scaleStyle = scale.toString();

	$: cameraPosition = camera.position;

	$: cameraPositionX = cameraPosition.x;

	$: cameraPositionY = cameraPosition.y;

	$: transformTranslateXStyle = `${(
		-cameraPositionX * layoutStylesCalculationPrecission
	).toString()}px`;

	$: transformTranslateYStyle = `${(
		-cameraPositionY * layoutStylesCalculationPrecission
	).toString()}px`;

	$: transformStyle = `translate(${transformTranslateXStyle}, ${transformTranslateYStyle})`;
</script>

<ul class="board-object-list" style:scale={scaleStyle} style:transform={transformStyle}>
	<slot {layoutStylesCalculationPrecission} />
</ul>

<style lang="scss">
	.board-object-list {
		height: 100%;
		list-style: none;
		margin-block: 0 0;
		padding-inline-start: 0;
	}
</style>
