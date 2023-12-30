import type {Point} from "$lib/math/point/Point.ts";
import type {EventDispatcher} from "svelte";

export function createMousePositionChangedHook(
	dispatchEvent: EventDispatcher<{
		"mouse-position-change": null | Point;
	}>,
) {
	const handleMousemove = (event: MouseEvent) => {
		const boardElement = event.currentTarget as HTMLDivElement;

		const mousePosition: Point = {
			x: event.clientX - boardElement.getBoundingClientRect().left,
			y: event.clientY - boardElement.getBoundingClientRect().top,
		};

		dispatchEvent("mouse-position-change", mousePosition);
	};

	const handleMouseleave = () => {
		dispatchEvent("mouse-position-change", null);
	};

	const handleMouseenter = (event: MouseEvent) => {
		const boardElement = event.currentTarget as HTMLDivElement;

		const mousePosition: Point = {
			x: event.clientX - boardElement.getBoundingClientRect().left,
			y: event.clientY - boardElement.getBoundingClientRect().top,
		};

		dispatchEvent("mouse-position-change", mousePosition);
	};

	return {
		handleMouseenter,
		handleMouseleave,
		handleMousemove,
	} as const;
}
