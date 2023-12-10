<script lang="ts" strictEvents>
	import {HexGrid} from "$lib/hex/HexGrid.ts";
	import HexBoard from "$lib/hex-board/HexBoard.svelte";
	import {loadPlayFromLocalStorage} from "$lib/play/loadPlayFromLocalStorage.ts";

	export let playId: string;

	$: play = loadPlayFromLocalStorage(playId);
</script>

<main class="play-view">
	<h1>Play "{play.id}"</h1>
	<HexBoard hexGrid={new HexGrid(play.tiles)} />
</main>

<style lang="scss">
	.play-view {
		display: grid;
		grid-template-rows: auto 1fr;
	}
</style>
