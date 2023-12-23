import type {Point} from "$lib/point/Point.ts";

export type Camera = Readonly<{
	position: Point;
	zoomFactor: number;
}>;
