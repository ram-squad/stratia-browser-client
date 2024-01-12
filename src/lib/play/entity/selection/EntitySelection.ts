import type {Entity} from "$lib/play/entity/Entity.ts";
import type {EntitySelectionMode} from "$lib/play/entity/selection/mode/EntitySelectionMode.ts";

export type EntitySelection = Readonly<{
	entity: Entity;
	mode: EntitySelectionMode | null;
}>;
