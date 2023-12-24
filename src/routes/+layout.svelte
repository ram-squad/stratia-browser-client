<svelte:options immutable={true} />

<script lang="ts" strictEvents>
	import AppRoot from "$lib/app/AppRoot.svelte";

	interface $$Slots {
		default: Record<string, never>;
	}
</script>

<AppRoot>
	<slot />
</AppRoot>

<style global lang="scss">
	* {
		&,
		&::after,
		&::before {
			box-sizing: border-box;
		}
	}

	body {
		margin: 0;
	}

	html {
		min-height: 100%;
	}

	html,
	body,
	.sveltekit-body {
		display: grid;
	}
</style>
