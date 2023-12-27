<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import type {Entity} from "$lib/play/entities/Entity.ts";

	export let selectedEntity: Entity | null;
</script>

<div>
	{#if selectedEntity === null}
		No entity selected.
	{:else}
		Selected entity: {selectedEntity.id}
	{/if}
</div>
