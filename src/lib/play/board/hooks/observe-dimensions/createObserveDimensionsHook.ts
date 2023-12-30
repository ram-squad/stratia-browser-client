import type {Dimensions} from "$lib/math/dimensions/Dimensions.ts";
import type {EventDispatcher} from "svelte";

export function createObserveDimensionsHook(
	dispatchEvent: EventDispatcher<{
		"dimensions-change": Dimensions;
	}>,
) {
	return (element: HTMLDivElement) => {
		const resizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const {height, width} = entry.contentRect;

				dispatchEvent("dimensions-change", {
					height,
					width,
				});
			});
		});

		resizeObserver.observe(element);

		return {
			destroy: () => {
				resizeObserver.disconnect();
			},
		};
	};
}
