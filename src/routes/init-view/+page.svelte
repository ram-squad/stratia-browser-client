<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import * as AppNavigation from "$app/navigation";
	import InitView from "$lib/init-view/InitView.svelte";

	const gotoPlay = async (playID: string) => {
		await AppNavigation.goto(`/plays/${playID}`);
	};
	const gotoWelcomeView = async () => {
		await AppNavigation.goto(`/`);
	};
</script>

<InitView {gotoPlay}{gotoWelcomeView} />
