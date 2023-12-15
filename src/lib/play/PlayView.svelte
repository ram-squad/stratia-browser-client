<script lang="ts" strictEvents>
	import {HexGrid} from "$lib/hex/HexGrid.ts";
	import HexBoard from "$lib/hex-board/HexBoard.svelte";
	import {convertSecondsToMiliseconds} from "$lib/math/convertSecondsToMiliseconds.ts";
	import {computePlayTick} from "$lib/play/computePlayTick.ts";
	import {loadPlayFromLocalStorage} from "$lib/play/loadPlayFromLocalStorage.ts";
	import {onDestroy} from "svelte";

	export let playID: string;

	const tickIntervalSeconds = 0.1;
	let lastPlayID = playID;
	let play = loadPlayFromLocalStorage(playID);

	const tick = () => {
		play = computePlayTick(play, tickIntervalSeconds);
	};

	const setupTickInterval = () =>
		setInterval(tick, convertSecondsToMiliseconds(tickIntervalSeconds));

	let tickIntervalID = setupTickInterval();

	$: if (lastPlayID !== playID) {
		play = loadPlayFromLocalStorage(playID);
		clearInterval(tickIntervalID);
		tickIntervalID = setupTickInterval();
		lastPlayID = playID;
	}

	onDestroy(() => {
		clearInterval(tickIntervalID);
	});
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
