<script lang="ts" strictEvents>
	import {createPlay} from "$lib/play/createPlay.ts";
	import {savePlayToLocalStorage} from "$lib/play/savePlayToLocalStorage.ts";

	export let gotoPlay: (playID: string) => Promise<void>;

	const handleStartNewPlayButtonClick = async () => {
		const newPlay = createPlay();

		savePlayToLocalStorage(newPlay);
		await gotoPlay(newPlay.id);
	};
</script>

<main>
	<h1>Stratia</h1>
	<button on:click={handleStartNewPlayButtonClick} type="button"> Start a new play </button>
</main>
