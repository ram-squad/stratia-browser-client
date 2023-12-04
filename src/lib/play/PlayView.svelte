<script lang="ts" strictEvents>
	import {loadPlayFromLocalStorage} from "$lib/play/loadPlayFromLocalStorage.ts";

	export let playId: string;

	$: play = loadPlayFromLocalStorage(playId);
</script>

<main>
	<h1>Play "{play.id}"</h1>
</main>
