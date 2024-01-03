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

function computeEntitySelection(entities: readonly Entity[], entityToSelectID: Entity["id"]) {
	const entityToSelect = entities.find((entity) => entity.id === entityToSelectID);

	if (entityToSelect === undefined) {
		return null;
	}

	return {
		entity: entityToSelect,
	};
}

export function createEntitySelectionStateHook(): EntitySelectionStateHook {
	let updateHandler: EntitySelectionStateHook = (initialValues) => {
		let currentValues = initialValues;

		const entitySelectionStore = writable<EntitySelection | null>(null);

		const requestDeselectingEntity = () => {
			entitySelectionStore.set(null);
		};

		const requestSelectingEntityByID = (entityToSelectID: Entity["id"]) => {
			const newEntitySelection = computeEntitySelection(currentValues.entities, entityToSelectID);

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

					return computeEntitySelection(newValues.entities, oldSelectedEntity.id);
				});
			}

			currentValues = newValues;

			return api;
		};

		return api;
	};

	return (...args) => updateHandler(...args);
}
