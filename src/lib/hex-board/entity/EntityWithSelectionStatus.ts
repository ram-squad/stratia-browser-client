import type {Entity} from "$lib/play/entities/Entity.ts";

export type EntityWithSelectionStatus = Readonly<{
	entity: Entity;
	isSelected: boolean;
}>;
