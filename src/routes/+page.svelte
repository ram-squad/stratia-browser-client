<script lang="ts" strictEvents>
	import * as AppNavigation from "$app/navigation";
	import WelcomeView from "$lib/welcome-view/WelcomeView.svelte";

	const gotoPlay = async (playId: string) => {
		await AppNavigation.goto(`/play/${playId}`);
	};
</script>

<WelcomeView {gotoPlay} />
