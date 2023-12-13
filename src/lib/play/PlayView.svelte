<script lang="ts" strictEvents>
	import {HexGrid} from "$lib/hex/HexGrid.ts";
	import HexBoard from "$lib/hex-board/HexBoard.svelte";
	import {loadPlayFromLocalStorage} from "$lib/play/loadPlayFromLocalStorage.ts";

	export let playID: string;

	$: play = loadPlayFromLocalStorage(playID);
</script>

<main class="play-view">
	<h1>Play "{play.id}"</h1>
	<HexBoard entities={play.entities} hexGrid={new HexGrid(play.tiles)} />
</main>

<style lang="scss">
	.play-view {
		display: grid;
		grid-template-rows: auto 1fr;
	}
</style>
