import type {Entity} from "$lib/play/entity/Entity.ts";
import type {EntitySelection} from "$lib/play/entity/selection/EntitySelection.ts";
import {writable, type Readable} from "svelte/store";

type EntitySelectionStateHookAPI = Readonly<{
	entitySelectionStore: Readable<EntitySelection | null>;
	requestDeselectingEntity: () => void;
	requestSelectingEntityByID: (entityToSelectID: Entity["id"]) => void;
}>;

type EntitySelectionStateHook = (
	values: Readonly<{
		entities: readonly Entity[];
	}>,
) => EntitySelectionStateHookAPI;

function findEntityInListByID(entities: readonly Entity[], entityToFindID: Entity["id"]) {
	const foundEntity = entities.find((entity) => entity.id === entityToFindID);

	return foundEntity ?? null;
}

export function createEntitySelectionStateHook(): EntitySelectionStateHook {
	let updateHandler: EntitySelectionStateHook = (initialValues) => {
		let currentValues = initialValues;

		const entitySelectionStore = writable<EntitySelection | null>(null);

		const requestDeselectingEntity = () => {
			entitySelectionStore.set(null);
		};

		const requestSelectingEntityByID = (entityToSelectID: Entity["id"]) => {
			const entityToSelect = findEntityInListByID(currentValues.entities, entityToSelectID);

			const newEntitySelection =
				entityToSelect === null
					? null
					: {
							entity: entityToSelect,
							mode: null,
						};

			entitySelectionStore.set(newEntitySelection);
		};

		const api: EntitySelectionStateHookAPI = {
			entitySelectionStore,
			requestDeselectingEntity,
			requestSelectingEntityByID,
		};

		updateHandler = (newValues) => {
			if (newValues.entities !== currentValues.entities) {
				entitySelectionStore.update((oldEntitySelection) => {
					if (oldEntitySelection === null) {
						return null;
					}

					const oldSelectedEntity = oldEntitySelection.entity;

					const newSelectedEntity = findEntityInListByID(newValues.entities, oldSelectedEntity.id);

					if (newSelectedEntity === null) {
						return null;
					}

					return {
						...oldEntitySelection,
						entity: newSelectedEntity,
					};
				});
			}

			currentValues = newValues;

			return api;
		};

		return api;
	};

	return (...args) => updateHandler(...args);
}
