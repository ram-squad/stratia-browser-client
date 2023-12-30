import type {Dimensions} from "$lib/math/dimensions/Dimensions.ts";
import type {Point} from "$lib/math/point/Point.ts";
import type {Camera} from "$lib/play/camera/Camera.ts";

const maximalMousePositionDistanceFromBoardEdgeToMoveCameraPixels = 100;

const cameraSpeedAtBoardEdgePerSecond = 10;

export function computeCameraTick(
	camera: Camera,
	boardMousePositionPixels: null | Point,
	boardDimensionsPixels: Dimensions | null,
	deltaTimeSeconds: number,
): Camera {
	if (boardMousePositionPixels === null || boardDimensionsPixels === null) {
		return camera;
	}

	const mousePositionRelativeToBoardCenterAngleRadians =
		Math.atan2(
			boardMousePositionPixels.y - boardDimensionsPixels.height / 2,
			boardMousePositionPixels.x - boardDimensionsPixels.width / 2,
		) +
		(3 * Math.PI) / 2;

	const mousePositionDistanceFromBoardEdgePixels = Math.min(
		boardMousePositionPixels.x,
		boardMousePositionPixels.y,
		boardDimensionsPixels.width - boardMousePositionPixels.x,
		boardDimensionsPixels.height - boardMousePositionPixels.y,
	);

	if (
		mousePositionDistanceFromBoardEdgePixels >=
		maximalMousePositionDistanceFromBoardEdgeToMoveCameraPixels
	) {
		return camera;
	}

	const cameraMovementSpeedPerSecond =
		cameraSpeedAtBoardEdgePerSecond -
		(cameraSpeedAtBoardEdgePerSecond * mousePositionDistanceFromBoardEdgePixels) /
			maximalMousePositionDistanceFromBoardEdgeToMoveCameraPixels;

	return {
		...camera,
		position: {
			x:
				camera.position.x -
				Math.sin(mousePositionRelativeToBoardCenterAngleRadians) *
					cameraMovementSpeedPerSecond *
					deltaTimeSeconds,
			y:
				camera.position.y +
				Math.cos(mousePositionRelativeToBoardCenterAngleRadians) *
					cameraMovementSpeedPerSecond *
					deltaTimeSeconds,
		},
	};
}
