<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {EntitySelection} from "$lib/play/entity/selection/EntitySelection.ts";

	export let entitySelection: EntitySelection | null;
</script>

<div>
	{#if entitySelection === null}
		No entity selected.
	{:else}
		Selected entity: {entitySelection.entity.id}
	{/if}
</div>
