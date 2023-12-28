<svelte:options immutable={true} />

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
	<div class="background">
		<div class="main-menu">
			<h1 class="game-title-text">Stratia</h1>
			<button class="menu-button slide_inside" on:click={handleStartNewPlayButtonClick} type="button"
				>Start a new game</button
			>
		</div>
	</div>
</main>

<style lang="scss">
	.background {
		background-color: rgb(0 0 0);
		height: 100%;
		width: 100%;
	}

	.main-menu {
		background-color: rgb(0 0 46);
		border: solid;
		border-color: rgb(255 255 0);
		border-radius: 40px;
		border-width: 10px;
		height: 80vh;
		margin-left: 10vw;
		margin-top: 10vh;
		position: absolute;
		text-align: center;
		width: 80vw;
	}

	/* menu-button */

	.menu-button {
		background-color: rgb(0 174 255);
		border: 2px solid rgb(216 2 134);
		border-radius: 0;
		box-shadow: inset 0 0 0 0 #ff009d;
		color: rgb(0 0 0);
		cursor: pointer;
		display: inline-block;
		font-family: "Lucida Console", "Monaco", monospace;
		font-size: 24px;
		font-weight: 4px;
		letter-spacing: 1px;
		padding: 18px 36px;
		transition: ease-out 0.4s;
	}

	.menu-button:hover {
		color: rgb(255 230 0);
		font-size: 24px;
	}

	.slide_down:hover {
		box-shadow: inset 0 100px 0 0 #bb5400;
	}

	.slide_right:hover {
		box-shadow: inset 400px 0 0 0 #bb5400;
	}

	.slide_inside:hover {
		box-shadow: inset 0 0 0 50px #bb5400;
	}

	.slide_diagonal:hover {
		box-shadow: inset 400px 50px 0 0 #bb5400;
	}

	/* end menu-button */

	/* game-title-text */

	.game-title-text {
		background: linear-gradient(
			to bottom,
			#cfc09f 22%,
			#cfc09f 26%,
			#cfc09f 27%,
			#ffecb3 40%,
			#3a2c0f 78%
		);
		background-clip: text;
		color: #ffffff;
		font-family: "Playfair Display", serif;
		font-size: 14vw;
		font-weight: 400;
		margin: 0;
		position: relative;
		-webkit-text-fill-color: transparent;
		text-transform: uppercase;
	}

	.game-title-text::after {
		background: none;
		content: attr(data-heading);
		left: 0;
		position: absolute;
		text-shadow:
			-1px 0 1px #c6bb9f,
			0 1px 1px #c6bb9f,
			5px 5px 10px rgb(0 0 0 / 0.4),
			-5px -5px 10px rgb(0 0 0 / 0.4);
		top: 0;
		z-index: -1;
	}

	/* end game-title-text */
</style>
