<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import * as AppNavigation from "$app/navigation";
	import WelcomeView from "$lib/welcome-view/WelcomeView.svelte";

	const gotoPlay = async (playID: string): Promise<void> => {
		await AppNavigation.goto(`/plays/${playID}`);
	};
</script>

<WelcomeView {gotoPlay} />
