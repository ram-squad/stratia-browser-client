import type {Entity} from "$lib/play/entity/Entity.ts";

export type EntitySelection = Readonly<{
	entity: Entity;
	mode: null;
}>;
