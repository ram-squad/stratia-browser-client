import type {Point} from "$lib/math/point/Point.ts";

export function calculateDistanceBetweenTwoPoints(point1: Point, point2: Point): number {
	return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}
