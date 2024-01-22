<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import * as AppNavigation from "$app/navigation";
	import WelcomeView from "$lib/welcome-view/WelcomeView.svelte";

	const gotoInitView = async () => {
		await AppNavigation.goto(`/init-view`);
	};
</script>

<WelcomeView {gotoInitView} />