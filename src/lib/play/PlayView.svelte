<script lang="ts" strictEvents>
	import {loadPlayFromLocalStorage} from "./loadPlayFromLocalStorage";

	export let playId: string;

	$: play = loadPlayFromLocalStorage(playId);
</script>

<main>
	<h1>Play "{play.id}"</h1>
</main>
