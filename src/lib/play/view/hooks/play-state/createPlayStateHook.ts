import type {Dimensions} from "$lib/math/dimensions/Dimensions.ts";
import type {Point} from "$lib/math/point/Point.ts";
import {convertSecondsToMiliseconds} from "$lib/math/time/convertSecondsToMiliseconds.ts";
import type {Play} from "$lib/play/Play.ts";
import type {Camera} from "$lib/play/camera/Camera.ts";
import {computeCameraTick} from "$lib/play/camera/tick/computeCameraTick.ts";
import {loadPlayFromLocalStorage} from "$lib/play/local-storage/loadPlayFromLocalStorage.ts";
import {computePlayTick} from "$lib/play/tick/computePlayTick.ts";
import {writable, type Readable} from "svelte/store";

const tickIntervalSeconds = 0.05;

const intialCamera: Camera = {
	position: {
		x: 0,
		y: 0,
	},
	hoveredTilePosition: {
		x: 0,
		y: 0,
	},
	zoomFactor: 20,
};

type PlayStateHook = (
	values: Readonly<{
		boardDimensionsPixels: Dimensions | null;
		boardMousePositionPixels: null | Point;
		playID: string;
	}>,
) => Readonly<{
	cameraStore: Readable<Camera>;
	destroyPlayState: () => void;
	playStore: Readable<Play>;
	updateZoom: (scrollAmount: number) => void;
}>;

export function createPlayStateHook(): PlayStateHook {
	let updateHandler: PlayStateHook = (initialValues) => {
		let currentValues = initialValues;

		let currentPlay = loadPlayFromLocalStorage(initialValues.playID);

		const playStore = writable<Play>(currentPlay);

		const playTick = () => {
			playStore.update((oldPlay) => computePlayTick(oldPlay, tickIntervalSeconds));
		};

		const cameraStore = writable<Camera>(intialCamera);

		const cameraTick = () => {
			cameraStore.update((oldCamera) =>
				computeCameraTick(
					oldCamera,
					currentValues.boardMousePositionPixels,
					currentValues.boardDimensionsPixels,
					tickIntervalSeconds,
				),
			);
		};

		const updateZoom = (scrollDelta: number) => {
			cameraStore.update((oldCamera) => ({
				...oldCamera,
				zoomFactor:
					scrollDelta > 0
						? Math.min(oldCamera.zoomFactor * 2, 200)
						: Math.max(oldCamera.zoomFactor / 2, 1),
			}));
		};

		let playTickIntervalID = setInterval(
			playTick,
			convertSecondsToMiliseconds(tickIntervalSeconds),
		);

		let cameraTickIntervalID = setInterval(
			cameraTick,
			convertSecondsToMiliseconds(tickIntervalSeconds),
		);

		const unsubscribePlayStore = playStore.subscribe((newPlay) => {
			if (currentPlay.id !== newPlay.id) {
				clearInterval(playTickIntervalID);

				clearInterval(cameraTickIntervalID);

				cameraStore.set(intialCamera);

				playTickIntervalID = setInterval(
					playTick,
					convertSecondsToMiliseconds(tickIntervalSeconds),
				);

				cameraTickIntervalID = setInterval(
					cameraTick,
					convertSecondsToMiliseconds(tickIntervalSeconds),
				);
			}

			currentPlay = newPlay;
		});

		const destroyPlayState = () => {
			unsubscribePlayStore();

			clearInterval(playTickIntervalID);

			clearInterval(cameraTickIntervalID);
		};

		const api = {
			cameraStore,
			destroyPlayState,
			playStore,
			updateZoom,
		} as const;

		updateHandler = (newValues) => {
			if (newValues.playID !== currentValues.playID) {
				const newPlay = loadPlayFromLocalStorage(newValues.playID);

				playStore.set(newPlay);

				cameraStore.set(intialCamera);
			}

			currentValues = newValues;

			return api;
		};

		return api;
	};

	return (...args) => updateHandler(...args);
}
