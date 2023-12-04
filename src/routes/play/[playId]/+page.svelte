<script lang="ts" strictEvents>
	import * as AppEnvironment from "$app/environment";
	import * as AppStores from "$app/stores";
	import PlayView from "$lib/play/PlayView.svelte";

	const {page} = AppStores;
	$: ({playId} = $page.params);
</script>

{#if playId !== undefined && AppEnvironment.browser}
	<PlayView {playId} />
{/if}
