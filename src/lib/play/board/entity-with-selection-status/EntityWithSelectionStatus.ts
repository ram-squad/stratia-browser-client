import type {Entity} from "$lib/play/entity/Entity.ts";

export type EntityWithSelectionStatus = Readonly<{
	entity: Entity;
	isSelected: boolean;
}>;
