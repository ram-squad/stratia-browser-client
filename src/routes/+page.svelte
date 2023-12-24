<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import * as AppNavigation from "$app/navigation";
	import WelcomeView from "$lib/welcome-view/WelcomeView.svelte";

	const gotoPlay = async (playID: string) => {
		await AppNavigation.goto(`/play/${playID}`);
	};
</script>

<WelcomeView {gotoPlay} />
