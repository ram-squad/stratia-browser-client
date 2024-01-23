<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import * as AppEnvironment from "$app/environment";
	import * as AppStores from "$app/stores";
	import * as AppNavigation from "$app/navigation";
	import PlayView from "$lib/play/view/PlayView.svelte";
	const gotoWelcomeView = async () => {
		await AppNavigation.goto(`/`);
	};

	const {page} = AppStores;

	$: ({playID} = $page.params);
</script>

{#if playID !== undefined && AppEnvironment.browser}
	<PlayView {playID} {gotoWelcomeView}/>
{/if}
