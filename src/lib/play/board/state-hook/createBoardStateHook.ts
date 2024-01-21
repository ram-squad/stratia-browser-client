import type {Dimensions} from "$lib/math/dimensions/Dimensions.ts";
import type {Point} from "$lib/math/point/Point.ts";
import type {Entity} from "$lib/play/entity/Entity.ts";
import {createCreateSvelteHook} from "$lib/svelte/createCreateSvelteHook.ts";
import type * as Svelte from "svelte";
import type * as SvelteAction from "svelte/action";
import * as SvelteStore from "svelte/store";

type CreateBoardStateHookArgs = readonly [
	Readonly<{
		dispatchEvent: Svelte.EventDispatcher<
			Readonly<{
				"dimensions-change": Dimensions;
				"entity-clicked": Entity["id"] | null;
				"mouse-position-change": null | Point;
				"mouse-scrolled": number;
			}>
		>;
	}>,
];

type UpdateBoardStateHookArgs = readonly [];

type BoardStateHookReturnValue = Readonly<{
	handleBoardClick: () => void;
	handleEntityClick: (event: CustomEvent<Entity>) => void;
	handleMouseenter: (event: MouseEvent) => void;
	handleMouseleave: () => void;
	handleMousemove: (event: MouseEvent) => void;
	handleScroll: (event: WheelEvent) => void;
	observeBoardDimensions: SvelteAction.Action<HTMLElement, undefined>;
}>;

export type BoardStateHookState = Readonly<{
	api: BoardStateHookReturnValue;
}>;

export const createBoardStateHook = createCreateSvelteHook<
	CreateBoardStateHookArgs,
	UpdateBoardStateHookArgs,
	BoardStateHookState,
	BoardStateHookReturnValue
>({
	computeHookReturnValue: (hookState) => hookState.api,
	computeInitialHookState: ({createHookArgs}): BoardStateHookState => {
		const [{dispatchEvent}] = createHookArgs;

		const clickedEntitiesIDsAccumulatorStore = SvelteStore.writable<readonly Entity["id"][]>([]);

		const handleBoardClick = (): void => {
			clickedEntitiesIDsAccumulatorStore.update(
				(oldClickedEntitiesIDsAccumulator): readonly Entity["id"][] => {
					if (oldClickedEntitiesIDsAccumulator.length > 1) {
						throw new Error("Multiple entities clicked at the same time. Not implemented yet.");
					}

					const [clickedEntityID] = oldClickedEntitiesIDsAccumulator;

					dispatchEvent("entity-clicked", clickedEntityID ?? null);

					return [];
				},
			);
		};

		const handleEntityClick = (event: CustomEvent<Entity>): void => {
			const clickedEntity = event.detail;

			clickedEntitiesIDsAccumulatorStore.update(
				(oldClickedEntitiesIDsAccumulator): readonly Entity["id"][] => [
					...oldClickedEntitiesIDsAccumulator,
					clickedEntity.id,
				],
			);
		};

		const handleScroll = (event: WheelEvent): void => {
			dispatchEvent("mouse-scrolled", event.deltaY);
		};

		const handleMousemove = (event: MouseEvent): void => {
			const boardElement = event.currentTarget as HTMLDivElement;

			const mousePosition: Point = {
				x: event.clientX - boardElement.getBoundingClientRect().left,
				y: event.clientY - boardElement.getBoundingClientRect().top,
			};

			dispatchEvent("mouse-position-change", mousePosition);
		};

		const handleMouseleave = (): void => {
			dispatchEvent("mouse-position-change", null);
		};

		const handleMouseenter = (event: MouseEvent): void => {
			const boardElement = event.currentTarget as HTMLDivElement;

			const mousePosition: Point = {
				x: event.clientX - boardElement.getBoundingClientRect().left,
				y: event.clientY - boardElement.getBoundingClientRect().top,
			};

			dispatchEvent("mouse-position-change", mousePosition);
		};

		const observeBoardDimensions: SvelteAction.Action<HTMLElement, undefined> = (
			boardElement,
		): SvelteAction.ActionReturn<undefined> => {
			const resizeObserver = new ResizeObserver((entries): void => {
				entries.forEach((entry): void => {
					const {height, width} = entry.contentRect;

					dispatchEvent("dimensions-change", {
						height,
						width,
					});
				});
			});

			resizeObserver.observe(boardElement);

			return {
				destroy: (): void => {
					resizeObserver.disconnect();
				},
			};
		};

		return {
			api: {
				handleBoardClick,
				handleEntityClick,
				handleMouseenter,
				handleMouseleave,
				handleMousemove,
				handleScroll,
				observeBoardDimensions,
			},
		};
	},
	computeNewHookState: ({oldHookState}) => oldHookState,
});
