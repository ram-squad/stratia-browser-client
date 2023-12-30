import type {Circle} from "$lib/math/circle/Circle.ts";
import type {Point} from "$lib/math/point/Point.ts";

/**
 * Checks if a point is inside of a circle.
 * Returns a positive number if the point is inside of the circle.
 * Returns 0 if the point is on the circle.
 * Returns a negative number if the  point is outside of the circle.
 */
export function checkIfPointIsInsideOfCircle(point: Point, circle: Circle): number {
	const distance = Math.sqrt((point.x - circle.center.x) ** 2 + (point.y - circle.center.y) ** 2);

	return circle.radius - distance;
}
