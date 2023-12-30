import type {Point} from "$lib/math/point/Point.ts";

export type Circle = Readonly<{
	center: Point;
	radius: number;
}>;
