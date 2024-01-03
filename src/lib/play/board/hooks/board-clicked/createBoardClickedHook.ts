import type {Point} from "$lib/math/point/Point.ts";
import type {Camera} from "$lib/play/camera/Camera.ts";
import type {EventDispatcher} from "svelte";

type API = Readonly<{
	handleBoardClick: (event: MouseEvent) => void;
}>;

type BoardClickedHook = (
	values: Readonly<{
		camera: Camera;
	}>,
) => API;

export function createBoardClickedHook(
	dispatchEvent: EventDispatcher<{
		"board-clicked": Point;
	}>,
): BoardClickedHook {
	let updateHandler: BoardClickedHook = (initialValues) => {
		let currentValues = initialValues;

		const handleBoardClick = (event: MouseEvent) => {
			const boardElement = event.currentTarget as HTMLDivElement;

			const clickPositionX =
				(event.clientX -
					boardElement.getBoundingClientRect().left -
					boardElement.getBoundingClientRect().width / 2) /
					currentValues.camera.zoomFactor +
				currentValues.camera.position.x;

			const clickPositionY =
				(event.clientY -
					boardElement.getBoundingClientRect().top -
					boardElement.getBoundingClientRect().height / 2) /
					currentValues.camera.zoomFactor +
				currentValues.camera.position.y;

			const clickPosition: Point = {
				x: clickPositionX,
				y: clickPositionY,
			};

			dispatchEvent("board-clicked", clickPosition);
		};

		const api = {
			handleBoardClick,
		} as const;

		updateHandler = (newValues) => {
			currentValues = newValues;

			return api;
		};

		return api;
	};

	return (...args) => updateHandler(...args);
}
