<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {EntitySelection} from "$lib/play/entity/selection/EntitySelection.ts";
	import type {EntitySelectionMode} from "$lib/play/entity/selection/mode/EntitySelectionMode.ts";
	import {createEventDispatcher} from "svelte";

	export let entitySelection: EntitySelection | null;

	const eventDispatcher = createEventDispatcher<{
		"mode-change-requested": EntitySelectionMode | null;
	}>();

	const handleModeGoButtonClicked = () => {
		eventDispatcher("mode-change-requested", "go");
	};

	const handleCancelModeButtonClicked = () => {
		eventDispatcher("mode-change-requested", null);
	};
</script>

<div>
	{#if entitySelection === null}
		No entity selected.
	{:else}
		Selected entity: {entitySelection.entity.id}
		{#if entitySelection.mode === null}
			<button on:click={handleModeGoButtonClicked} type="button">Go</button>
		{:else}
			<button on:click={handleCancelModeButtonClicked} type="button">Cancel</button>
		{/if}
	{/if}
</div>
