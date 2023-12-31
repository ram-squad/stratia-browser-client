import type {Point} from "$lib/math/point/Point.ts";

export type Camera = Readonly<{
	position: Point;
	zoomFactor: number;
}>;
