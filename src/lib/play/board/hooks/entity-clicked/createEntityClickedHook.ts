import type {Entity} from "$lib/play/entity/Entity.ts";
import type {EventDispatcher} from "svelte";

export function createEntityClickedHook(
	dispatchEvent: EventDispatcher<{
		"entity-clicked": Entity["id"] | null;
	}>,
) {
	let clickedEntitiesIDsAccumulator: readonly Entity["id"][] = [];

	const handleBoardClick = () => {
		if (clickedEntitiesIDsAccumulator.length > 1) {
			throw new Error("Multiple entities clicked at the same time. Not implemented yet.");
		}

		const [clickedEntityID] = clickedEntitiesIDsAccumulator;

		dispatchEvent("entity-clicked", clickedEntityID ?? null);

		clickedEntitiesIDsAccumulator = [];
	};

	const handleEntityClick = (event: CustomEvent<Entity>) => {
		const clickedEntity = event.detail;

		clickedEntitiesIDsAccumulator = [...clickedEntitiesIDsAccumulator, clickedEntity.id];
	};

	return {
		handleBoardClick,
		handleEntityClick,
	} as const;
}
