<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import * as AppEnvironment from "$app/environment";
	import * as AppStores from "$app/stores";
	import PlayView from "$lib/play/view/PlayView.svelte";

	const {page} = AppStores;

	$: ({playID} = $page.params);
</script>

{#if playID !== undefined && AppEnvironment.browser}
	<PlayView {playID} />
{/if}
