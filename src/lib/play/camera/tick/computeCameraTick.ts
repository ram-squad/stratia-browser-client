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
	const mousePosition = {x:0,y:0}
	console.log("camera.zoomFactor")
	console.log(camera.zoomFactor)
	console.log("camera.position.x")
	console.log(boardMousePositionPixels.x - boardDimensionsPixels.width / 2)
	console.log("camera.position.y")
	console.log(boardMousePositionPixels.y - boardDimensionsPixels.height / 2)
	console.log("mousePosition.x")
	mousePosition.x = boardMousePositionPixels.x - boardDimensionsPixels.width/2
	console.log(mousePosition.x)
	console.log("mousePosition.y")
	mousePosition.y = boardMousePositionPixels.y - boardDimensionsPixels.height / 2
	console.log(mousePosition.y)
	console.log("camera.hoveredTilePosition.x")
	console.log(camera.hoveredTilePosition.x)
	console.log("camera.hoveredTilePosition.y")
	console.log(camera.hoveredTilePosition.y)
	/*const mousePositionRelativeToBoardCenterAngleRadians =
		Math.atan2(
			boardMousePositionPixels.y - boardDimensionsPixels.height / 2,
			boardMousePositionPixels.x - boardDimensionsPixels.width / 2,
		) +
		(3 * Math.PI) / 2;
		console.log(boardMousePositionPixels.y - boardDimensionsPixels.height / 2)
		console.log(boardMousePositionPixels.x - boardDimensionsPixels.width/2)*/
		/*
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
*/
	/*const cameraMovementSpeedPerSecond =
		cameraSpeedAtBoardEdgePerSecond -
		(cameraSpeedAtBoardEdgePerSecond * mousePositionDistanceFromBoardEdgePixels) /
			maximalMousePositionDistanceFromBoardEdgeToMoveCameraPixels;*/
	let hoveredTilePositionX = Math.round(mousePosition.x/172.5/camera.zoomFactor*200)
	let hoveredTilePositionY;
	if(hoveredTilePositionX%2==0)
	{
		hoveredTilePositionY = Math.round(mousePosition.y/200/camera.zoomFactor*200)
	}
	else
	{
		hoveredTilePositionY = Math.round(mousePosition.y/200/camera.zoomFactor*200-0.5)
	}
	return {
		...camera,
		position:{x:camera.position.x,y:camera.position.y},
		hoveredTilePosition:{x:hoveredTilePositionX,y:hoveredTilePositionY}/*: {
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
		},*/
	};
}
