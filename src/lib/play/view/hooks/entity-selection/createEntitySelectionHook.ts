import type {EntityWithSelectionStatus} from "$lib/play/board/entity-with-selection-status/EntityWithSelectionStatus.ts";
import type {Entity} from "$lib/play/entity/Entity.ts";
import type {EntitySelection} from "$lib/play/entity/selection/EntitySelection.ts";
import {derived, writable} from "svelte/store";

export function createEntitySelectionHook(initialValidEntities: readonly Entity[]) {
	const validEntitiesStore = writable<readonly Entity[]>(initialValidEntities);

	const selectedEntityStore = writable<Entity | null>(null);

	const entityWithSelectionStatusesStore = derived<
		[typeof validEntitiesStore, typeof selectedEntityStore],
		readonly EntityWithSelectionStatus[]
	>([validEntitiesStore, selectedEntityStore], ([validEntities, selectedEntity]) =>
		validEntities.map((entity) => ({
			entity,
			isSelected: selectedEntity !== null && entity.id === selectedEntity.id,
		})),
	);

	const entitySelectionStore = derived<[typeof selectedEntityStore], EntitySelection | null>(
		[selectedEntityStore],
		([selectedEntity]) =>
			selectedEntity === null
				? null
				: {
						entity: selectedEntity,
					},
	);

	const updateEntitySelectionValidEntities = (validEntities: readonly Entity[]) => {
		validEntitiesStore.set(validEntities);

		selectedEntityStore.update((oldSelectedEntity) => {
			if (oldSelectedEntity === null) {
				return oldSelectedEntity;
			}

			const updatedEntity = validEntities.find((entity) => entity.id === oldSelectedEntity.id);

			if (updatedEntity === undefined) {
				return null;
			}

			return updatedEntity;
		});

		const requestSelectingEntityByID = (entityToSelectID: Entity["id"] | null) => {
			if (entityToSelectID === null) {
				selectedEntityStore.set(null);

				return;
			}

			const entityToSelect = validEntities.find((entity) => entity.id === entityToSelectID);

			if (entityToSelect === undefined) {
				selectedEntityStore.set(null);

				return;
			}

			selectedEntityStore.set(entityToSelect);
		};

		return {
			requestSelectingEntityByID,
		} as const;
	};

	return {
		entitySelectionStore,
		entityWithSelectionStatusesStore,
		updateEntitySelectionValidEntities,
	} as const;
}
