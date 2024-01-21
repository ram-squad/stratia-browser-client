import type {Dimensions} from "$lib/math/dimensions/Dimensions.ts";
import type {Point} from "$lib/math/point/Point.ts";
import {convertSecondsToMiliseconds} from "$lib/math/time/convertSecondsToMiliseconds.ts";
import type {Play} from "$lib/play/Play.ts";
import type {EntityWithSelectionStatus} from "$lib/play/board/entity-with-selection-status/EntityWithSelectionStatus.ts";
import type {Camera} from "$lib/play/camera/Camera.ts";
import {computeCameraTick} from "$lib/play/camera/tick/computeCameraTick.ts";
import type {Entity} from "$lib/play/entity/Entity.ts";
import type {EntitySelection} from "$lib/play/entity/selection/EntitySelection.ts";
import {loadPlayFromLocalStorage} from "$lib/play/local-storage/loadPlayFromLocalStorage.ts";
import {computePlayTick} from "$lib/play/tick/computePlayTick.ts";
import type {TileWithNeighbors} from "$lib/play/tile/TileWithNeighbors.ts";
import {HexGrid} from "$lib/play/tile/shapes/hex/grid/HexGrid.ts";
import type {HexTile} from "$lib/play/tile/shapes/hex/tile/HexTile.ts";
import type {HexTilePosition} from "$lib/play/tile/shapes/hex/tile/position/HexTilePosition.ts";
import type {HexTileSideKey} from "$lib/play/tile/shapes/hex/tile/side/HexTileSideKey.ts";
import {createCreateSvelteHook} from "$lib/svelte/createCreateSvelteHook.ts";
import {createImmutableDerivedSvelteStore} from "$lib/svelte/createImmutableDerivedSvelteStore.ts";
import {createImmutableWritableSvelteStore} from "$lib/svelte/createImmutableWritableSvelteStore.ts";
import type {Readable, Writable} from "svelte/store";

const tickIntervalSeconds = 0.05;

type PlayViewStateData = Readonly<{
	boardDimensionsPixels: Dimensions | null;
	boardMousePositionPixels: null | Point;
	camera: Camera;
	entitySelection: EntitySelection | null;
	play: Play;
}>;

function createTickPlay(playViewStateDataStore: Writable<PlayViewStateData>): () => void {
	return (): void => {
		playViewStateDataStore.update((oldPlayViewStateData): PlayViewStateData => {
			const newPlay = computePlayTick(oldPlayViewStateData.play, tickIntervalSeconds);

			return {
				...oldPlayViewStateData,
				play: newPlay,
			};
		});
	};
}

function computeEntitySelection(
	entities: readonly Entity[],
	entityToSelectID: Entity["id"],
): EntitySelection | null {
	const entityToSelect = entities.find((entity): boolean => entity.id === entityToSelectID);

	if (entityToSelect === undefined) {
		return null;
	}

	return {
		entity: entityToSelect,
	};
}

const createTickCamera = (playViewStateDataStore: Writable<PlayViewStateData>): (() => void) => {
	return (): void => {
		playViewStateDataStore.update((oldPlayViewStateData): PlayViewStateData => {
			const newCamera = computeCameraTick(
				oldPlayViewStateData.camera,
				oldPlayViewStateData.boardMousePositionPixels,
				oldPlayViewStateData.boardDimensionsPixels,
				tickIntervalSeconds,
			);

			return {
				...oldPlayViewStateData,
				camera: newCamera,
			};
		});
	};
};

const intialCamera: Camera = {
	position: {
		x: 0,
		y: 0,
	},
	zoomFactor: 20,
};

type CreatePlayViewStateHookArgs = readonly [];

type UpdatePlayViewStateHookArgs = readonly [
	Readonly<{
		playID: string;
	}>,
];

function setupPlayViewStateHookIntervals({
	tickCamera,
	tickPlay,
}: {
	tickCamera: () => void;
	tickPlay: () => void;
}): () => void {
	const playTickIntervalID = setInterval(
		tickPlay,
		convertSecondsToMiliseconds(tickIntervalSeconds),
	);

	const cameraTickIntervalID = setInterval(
		tickCamera,
		convertSecondsToMiliseconds(tickIntervalSeconds),
	);

	return (): void => {
		clearInterval(playTickIntervalID);

		clearInterval(cameraTickIntervalID);
	};
}

function computeEntityWithSelectionStatuses(
	entities: readonly Entity[],
	entitySelection: EntitySelection | null,
): readonly EntityWithSelectionStatus[] {
	return entities.map((entity): EntityWithSelectionStatus => {
		const isSelected = entitySelection !== null && entity.id === entitySelection.entity.id;

		return {
			entity,
			isSelected,
		};
	});
}

type PlayViewStateHookReturnValue = Readonly<{
	cameraStore: Readable<Camera>;
	cleanupPlayViewStateHook: () => void;
	entitySelectionStore: Readable<EntitySelection | null>;
	entityWithSelectionStatusesStore: Readable<readonly EntityWithSelectionStatus[]>;
	handleBoardDimensionsChange: (event: CustomEvent<Dimensions | null>) => void;
	handleBoardEntityClicked: (event: CustomEvent<Entity["id"] | null>) => void;
	handleBoardMousePositionChange: (event: CustomEvent<null | Point>) => void;
	handleBoardMouseScrolled: (event: CustomEvent<number>) => void;
	handleZoomInButtonClick: () => void;
	handleZoomOutButtonClick: () => void;
	tileWithNeighborsStore: Readable<readonly TileWithNeighbors<HexTilePosition, HexTileSideKey>[]>;
}>;

type PlayViewStateHookState = Readonly<{
	api: PlayViewStateHookReturnValue;
	playID: string;
	playViewStateDataStore: Writable<PlayViewStateData>;
	tickCamera: () => void;
	tickPlay: () => void;
}>;

export const createPlayViewStateHook = createCreateSvelteHook<
	CreatePlayViewStateHookArgs,
	UpdatePlayViewStateHookArgs,
	PlayViewStateHookState,
	PlayViewStateHookReturnValue
>({
	computeHookReturnValue: (
		playViewStateHookState: PlayViewStateHookState,
	): PlayViewStateHookReturnValue => playViewStateHookState.api,
	computeInitialHookState: ({initialUpdateHookArgs}): PlayViewStateHookState => {
		const [{playID: initialPlayID}] = initialUpdateHookArgs;

		const initialPlay = loadPlayFromLocalStorage(initialPlayID);

		const initialPlayViewStateData: PlayViewStateData = {
			boardDimensionsPixels: null,
			boardMousePositionPixels: null,
			camera: intialCamera,
			entitySelection: null,
			play: initialPlay,
		};

		const playViewStateDataStore =
			createImmutableWritableSvelteStore<PlayViewStateData>(initialPlayViewStateData);

		const tickCamera = createTickCamera(playViewStateDataStore);

		const tickPlay = createTickPlay(playViewStateDataStore);

		const initialCleanupPlayViewStateHook = setupPlayViewStateHookIntervals({
			tickCamera,
			tickPlay,
		});

		const updateZoom = (scrollDelta: number): void => {
			playViewStateDataStore.update((oldPlayViewStateData): PlayViewStateData => {
				const oldCamera = oldPlayViewStateData.camera;

				const newZoomFactor =
					scrollDelta > 0
						? Math.min(oldCamera.zoomFactor * 2, 200)
						: Math.max(oldCamera.zoomFactor / 2, 1);

				const newCamera: Camera = {
					...oldPlayViewStateData.camera,
					zoomFactor: newZoomFactor,
				};

				return {
					...oldPlayViewStateData,
					camera: newCamera,
				};
			});
		};

		const cameraStore = createImmutableDerivedSvelteStore(
			playViewStateDataStore,
			(playViewStateData): Camera => playViewStateData.camera,
		);

		const entitySelectionStore = createImmutableDerivedSvelteStore(
			playViewStateDataStore,
			(playViewStateData): EntitySelection | null => playViewStateData.entitySelection,
		);

		const requestDeselectingEntity = (): void => {
			playViewStateDataStore.update((oldPlayViewStateData): PlayViewStateData => {
				const newEntitySelection = null;

				return {
					...oldPlayViewStateData,
					entitySelection: newEntitySelection,
				};
			});
		};

		const requestSelectingEntityByID = (entityToSelectID: Entity["id"]): void => {
			playViewStateDataStore.update((oldPlayViewStateData): PlayViewStateData => {
				const newEntitySelection = computeEntitySelection(
					oldPlayViewStateData.play.entities,
					entityToSelectID,
				);

				return {
					...oldPlayViewStateData,
					entitySelection: newEntitySelection,
				};
			});
		};

		const entityWithSelectionStatusesStore = createImmutableDerivedSvelteStore(
			playViewStateDataStore,
			(playViewStateData): readonly EntityWithSelectionStatus[] =>
				computeEntityWithSelectionStatuses(
					playViewStateData.play.entities,
					playViewStateData.entitySelection,
				),
		);

		const playStore = createImmutableDerivedSvelteStore(
			playViewStateDataStore,
			(playViewStateData): Play => playViewStateData.play,
		);

		const playTilesStore = createImmutableDerivedSvelteStore(
			playStore,
			(play): readonly HexTile[] => play.tiles,
		);

		const tileWithNeighborsStore = createImmutableDerivedSvelteStore(
			playTilesStore,
			(playTiles): readonly TileWithNeighbors<HexTilePosition, HexTileSideKey>[] => {
				const hexGrid = new HexGrid(playTiles);

				const tileWithNeighbors = hexGrid.iterateHexTilesWithNeighbors();

				return Array.from(tileWithNeighbors);
			},
		);

		const handleBoardDimensionsChange = (event: CustomEvent<Dimensions | null>): void => {
			const newBoardDimensionsPixels = event.detail;

			playViewStateDataStore.update((oldPlayViewStateData): PlayViewStateData => {
				return {
					...oldPlayViewStateData,
					boardDimensionsPixels: newBoardDimensionsPixels,
				};
			});
		};

		const handleBoardEntityClicked = (event: CustomEvent<Entity["id"] | null>): void => {
			const entityToSelectID = event.detail;

			if (entityToSelectID === null) {
				requestDeselectingEntity();

				return;
			}

			requestSelectingEntityByID(entityToSelectID);
		};

		const handleBoardMousePositionChange = (event: CustomEvent<null | Point>): void => {
			const newBoardMousePositionPixels = event.detail;

			playViewStateDataStore.update(
				(oldPlayViewStateData): PlayViewStateData => ({
					...oldPlayViewStateData,
					boardMousePositionPixels: newBoardMousePositionPixels,
				}),
			);
		};

		const handleBoardMouseScrolled = (event: CustomEvent<number>): void => {
			const scrollDelta = event.detail;

			updateZoom(scrollDelta);
		};

		const handleZoomInButtonClick = (): void => {
			const scrollDelta = 1;

			updateZoom(scrollDelta);
		};

		const handleZoomOutButtonClick = (): void => {
			const scrollDelta = -1;

			updateZoom(scrollDelta);
		};

		const api: PlayViewStateHookReturnValue = {
			cameraStore,
			cleanupPlayViewStateHook: initialCleanupPlayViewStateHook,
			entitySelectionStore,
			entityWithSelectionStatusesStore,
			handleBoardDimensionsChange,
			handleBoardEntityClicked,
			handleBoardMousePositionChange,
			handleBoardMouseScrolled,
			handleZoomInButtonClick,
			handleZoomOutButtonClick,
			tileWithNeighborsStore,
		};

		return {
			api,
			playID: initialPlayID,
			playViewStateDataStore,
			tickCamera,
			tickPlay,
		};
	},
	computeNewHookState: ({newUpdateHookArgs, oldHookState}): PlayViewStateHookState => {
		const {
			api: oldAPI,
			playID: oldPlayID,
			playViewStateDataStore,
			tickCamera,
			tickPlay,
		} = oldHookState;

		const [{playID: newPlayID}] = newUpdateHookArgs;

		if (oldPlayID === newPlayID) {
			return oldHookState;
		}

		oldAPI.cleanupPlayViewStateHook();

		const newPlay = loadPlayFromLocalStorage(newPlayID);

		const newCamera = intialCamera;

		playViewStateDataStore.update(
			(oldPlayViewStateData): PlayViewStateData => ({
				...oldPlayViewStateData,
				camera: newCamera,
				play: newPlay,
			}),
		);

		const newCleanupPlayViewStateHook = setupPlayViewStateHookIntervals({
			tickCamera,
			tickPlay,
		});

		const newAPI: PlayViewStateHookReturnValue = {
			...oldAPI,
			cleanupPlayViewStateHook: newCleanupPlayViewStateHook,
		};

		return {
			...oldHookState,
			api: newAPI,
			playID: newPlayID,
		};
	},
});
